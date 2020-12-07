<template>
  <li class="dia" :id="this.id">
    <h1 class="dia-titulo">{{ this.dia.diaDaSemana }}</h1>
    <ul class="tarefas">
      <li v-for="tarefa in this.dia.tarefas" :key="tarefa.id">
        <tarefa :descricao="tarefa.descricao" />
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
  props: ["dia", "id"],
  components: {
    tarefa: Tarefa,
  },
  data() {
    return {
      //tarefas: [],
      ehVisivel: false,
    };
  },
  methods: {
    confirmarNovaTarefa(e) {
      const descricao = e.target.value;
      if (e.key == "Enter") {
        this.$http
          .put("https://localhost:5001/criar", { descricao: descricao, data: this.id })
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