<template>
  <li 
    class="dia" 
    :id="this.id" 
    @dragover="onDragOver" @drop="onDrop"
    >
    <h1 class="dia-titulo">{{ this.dia.diaDaSemana }}</h1>
    <h6 class="data-subtitulo">{{ this.id }}</h6>
    <ul class="tarefas">
      <li v-for="tarefa in this.dia.tarefas" :key="tarefa.id">
        <tarefa :tarefa="tarefa" />
      </li>
    </ul>
    <nova-tarefa :dia="this.id" />
    </li>
</template>

<script>
import Tarefa from '../tarefa/Tarefa.vue'
import NovaTarefa from '../novaTarefa/NovaTarefa.vue'

export default {
  name: 'dia',
  props: ['dia', 'id', 'removerTarefaListener'],
  components: {
    tarefa: Tarefa,
    novaTarefa: NovaTarefa
  },
  data() {
    return {
    };
  },
  methods: {
    adicionarTarefa(tarefa){
      console.warn('adicionar tarefa')
      this.dia.tarefas.push(tarefa);
    },
    avisarSemanaRemocaoTarefa(idTarefa, diaNovo) {
      this.$emit('removerTarefaListener', idTarefa, diaNovo)
    },
    onDragOver: function (event) {
      event.preventDefault();
      event.stopPropagation();
    },
    onDrop: function (e) {
      e.preventDefault();
      e.stopPropagation();
      debugger;
      let tarefaJson = JSON.parse(e.dataTransfer.getData("text/plain"));
      const dataAntiga = tarefaJson.data
      const novaData = this.$converterDeYYYY_MM_DDParaDataISOShort(this.id)
      tarefaJson.data = novaData
      //tarefaJson.pontos = Number(tarefaJson.pontos)      
      //console.warn('tarefa que está sendo largada é:')
      //console.warn(tarefaJson)
      if (e.currentTarget.getAttribute("diadasemana") !== null) {
        this.$http
          .post("https://localhost:5001/alterar", tarefaJson)
          .then(
            (response) => {
              if (response.status === 200 && response.body) {
                this.dia.tarefas.push(tarefaJson)
                this.avisarSemanaRemocaoTarefa(tarefaJson.id, dataAntiga)
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
  },
};
</script>

<style scoped>
.visivel {
  display: block;
}
.escondido {
  display: none;
}
.dia {
  background-color: #eeeeee;
  vertical-align: top;
  display: inline-block;
  padding: 10px;
  border: 1px;
  border-color: #dddddd;
  border-style: solid;
  margin: 0px;
  margin-top: 4px;
  width: 180px;
  min-width: 180px;
  overflow: scroll;
  white-space: nowrap;
}
.dia-titulo {
  width: 100%;
  padding: 0px;
  margin: 0px;
}
.data-subtitulo {
  width: 100%;
  padding: 0px;
  margin: 0px;
  font-size: 9px;
}
.tarefas {
  list-style-type: none;
  margin: 0px;
  padding: 0px;
}
</style>