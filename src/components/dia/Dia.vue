<template>
  <li class="dia" :id="this.id" @dragover="onDragOver" @drop="onDrop">
    <h1 class="dia-titulo">{{ this.dia.diaDaSemana }}</h1>
    <ul class="tarefas">
      <li v-for="tarefa in this.dia.tarefas" :key="tarefa.id">
        <tarefa :descricao="tarefa.descricao" :id="tarefa.id" :data="tarefa.data" />
      </li>
    </ul>
    <input
      type="text"
      ref="nova"
      v-bind:class="{ visivel: this.ehVisivel, escondido: !this.ehVisivel }"
      v-on:keydown="confirmarNovaTarefa"
    />
    <button class="nova-tarefa" @click="adicionarTarefa()">Nova tarefa</button>
  </li>
</template>

<script>
import Tarefa from "../tarefa/Tarefa.vue";

export default {
  name: "dia",
  props: ["dia", "id", 'removerTarefaListener'/*, 'diaDaSemana'*/],
  components: {
    tarefa: Tarefa,
  },
  data() {
    return {
      ehVisivel: false,
    };
  },
  methods: {
    avisarSemanaRemocaoTarefa(idTarefa, dia) {
      //debugger;
      this.$emit('removerTarefaListener', idTarefa, dia)
    },
    onDragOver: function (event) {
      event.preventDefault();
      event.stopPropagation();
    },
    onDrop: function (e) {
      e.preventDefault();
      e.stopPropagation();
      //debugger;

      const tarefaJson = JSON.parse(e.dataTransfer.getData("text/plain"));
      
      console.warn('tarefa que está sendo largada é:')
      console.warn(tarefaJson)

      if (e.currentTarget.getAttribute("diadasemana") !== null) {
        this.$http
          .post("https://localhost:5001/alterar", {
            id: tarefaJson.id,
            descricao: tarefaJson.descricao,
            data: this.id,
          })
          .then(
            (response) => {
              //debugger;
              if (response.status === 200 && response.body) {
                //debugger;
                //console.warn("tarefa alterada com sucesso");
                this.dia.tarefas.push({ 
                  id: tarefaJson.id, 
                  descricao: tarefaJson.descricao, 
                  data: new Date(this.id).toISOString().substring(0, 19) });
                //debugger;
                this.avisarSemanaRemocaoTarefa(tarefaJson.id, tarefaJson.data)
              }
            },
            (response) => {
              console.error(response);
            }
          );
      } else {
        console.log('nao encontrado currentTarget')
      }
    },
    confirmarNovaTarefa(e) {
      const descricao = e.target.value;
      if (e.key == "Enter") {
        this.$http
          .put("https://localhost:5001/criar", {
            descricao: descricao,
            data: this.id,
          })
          .then(
            (response) => {
              if (response.status === 200 && response.body) {
                console.warn("tarefa criada com sucesso");
                this.dia.tarefas.push({ descricao: descricao });
                e.target.value = "";
                this.ehVisivel = false;
              }
            },
            (response) => {
              console.error(response);
            }
          );
      }
    },
    adicionarTarefa() {
      this.ehVisivel = true;
      this.$nextTick(() => this.$refs.nova.focus());
      //const idTicks = (new Date().getTime() * 10000) + 621355968000000000;
      //this.tarefas.push({ ,descricao: "alow", id: idTicks})
    },
    mudaDiaDaSemanaTemp() {
      this.dia.diaDaSemana = "ooo";
    },
    show() {
      this.$modal.show("my-first-modal");
    },
    hide() {
      this.$modal.hide("my-first-modal");
    },
  },
};
</script>

<style>
.visivel {
  display: block;
}
.escondido {
  display: none;
}
.nota-tarefa {
  width: 100%;
}
.dia {
  background-color: #ffffff;
  vertical-align: top;
  display: inline-block;
  padding: 10px;
  border: 1px;
  border-color: black;
  border-style: solid;
  margin: 0px;
  width: 180px;
}
.dia-titulo {
  width: 100%;
  padding: 0px;
  margin: 0px;
}
.tarefas {
  list-style-type: none;
  margin: 0px;
  padding: 0px;
}
</style>