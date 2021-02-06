<template>
  <li class="diaa" :class="estiloFds" :id="this.id" @dragover="onDragOver" @drop="onDrop">
    <h6 class="data-subtitulo">{{ this.id }}</h6>
    <ul class="tarefas">
      <li v-for="tarefa in this.dia.tarefas" :key="tarefa.id">
        <tarefa :tarefa="tarefa" :indiceSemana="indiceSemana" :mostrarEsconderTipo="mostrarEsconderTipo"/>
      </li>
    </ul>
    <nova-tarefa :dia="this.id" />
    <div style="text-align: left; font-size: 10px; float: left">
      Saldo do dia:
    </div>
    <div style="text-align: right; font-size: 10px">
      R$ {{ this.obterSaldo()   }}
    </div>
  </li>
</template>

<script>
import Tarefa from "../tarefa/Tarefa.vue";
import NovaTarefa from "../novaTarefa/NovaTarefa.vue";

export default {
  name: "dia",
  props: ["dia", "id", "removerTarefaListener", "indiceSemana", "mostrarEsconderTipo"],
  components: {
    tarefa: Tarefa,
    novaTarefa: NovaTarefa,
  },
  data() {
    return {
      estiloFds: ""
    };
  },
  created() {
    this.dia.retiraTarefa = this.retiraTarefa;
    this.estiloFds = this.dia.diaDaSemana === 'dom' || this.dia.diaDaSemana === 'sab' ? 'fdss' : ''
  },
  methods: {
    retiraTarefa(id) {
      for (let i = 0; i < this.dia.tarefas.length; i++) {
        if (this.dia.tarefas[i].id === id) {
          this.dia.tarefas.splice(i, 1);
        }
      }
    },
    adicionarTarefa(tarefa) {
      console.warn("adicionar tarefa");
      this.dia.tarefas.push(tarefa);
    },
    avisarSemanaRemocaoTarefa(idTarefa, diaNovo) {
      this.$emit("removerTarefaListener", idTarefa, diaNovo);
    },
    onDragOver: function (event) {
      event.preventDefault();
      event.stopPropagation();
    },
    onDrop: function (e) {
      e.preventDefault();
      e.stopPropagation();
      
      let tarefaJson = JSON.parse(e.dataTransfer.getData("text/plain"));

      const dataAntiga = tarefaJson.data;
      const novaData = this.$converterDeYYYY_MM_DDParaDataISOShort(this.id);
      tarefaJson.data = novaData;
      if (e.currentTarget.getAttribute("diadasemana") !== null) {
        this.$http.post("https://localhost:5001/alterar", tarefaJson).then(
          (response) => {
            if (response.status === 200 && response.body) {
              this.dia.tarefas.push(tarefaJson);
              this.$parent.removerTarefa2(
                tarefaJson.id,
                dataAntiga,
                tarefaJson.semanaAntiga
              );
            }
          },
          (response) => {
            console.error(response);
          }
        );
      }
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
    obterSaldo(){
      let saldo = 0
      const tarefas = this.dia.tarefas
      if (typeof tarefas === 'undefined') {
        return 0;
      }
      for (var i = 0; i < tarefas.length; i++) {
        const tarefa = tarefas[i]
        if (tarefa.valor && tarefa.valor > 0){
          saldo += Number(tarefa.valor)
        }
      }
      return saldo
    }
  }
};
</script>

<style>
.fdss {
  background-color: #eeeeee !important;
}
.diaa {
  background-color: #d9e6df;
  vertical-align: top;
  display: inline-block;
  border: 0px;
  border-color: #dddddd;
  border-style: solid;
  width: 14.28%;
  min-width: 180px;
  max-height: 350px;
  overflow: scroll;
  white-space: nowrap;
  list-style-type: none;
  float: left;
  padding: 6px;
  margin: 1px;
  height: fit-content;
  border-radius: 4px;
}
</style>

<style scoped>
.visivel {
  display: block;
}
.escondido {
  display: none;
}
.dia-titulo {
  width: 100%;
  padding: 0px;
  margin: 0px;
}
.data-subtitulo {
  width: 100%;
  padding: 0px;
  margin-bottom: 8px;
  font-size: 9px;
}
.tarefas {
  list-style-type: none;
  margin: 0px;
  padding: 0px;
}
</style>