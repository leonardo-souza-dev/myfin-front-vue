<template>
  <b-col class="diaa" 
         :class="estiloFds" 
         :id="this.id" 
         @dragover="onDragOver" 
         @drop="onDrop">
    <div class="header-dia">
      <h6 class="data-subtitulo">{{ this.formatarDia(this.id) }}</h6>
      <nova-tarefa :dia="this.id" />
      <div v-show="mostrarTipos.includes('transacao')" class="saldo-total">
        <div style="text-align: left; font-size: 9px; float: left" >
          Saldo total:
        </div>
        <div style="text-align: right; font-size: 9px">
          R$ {{ this.obterSaldo()   }}
        </div>
      <!--</div>
      <div v-show="mostrarTipos.includes('transacao')">-->
        <div style="text-align: left; font-size: 9px; float: left" >
          Saldo do dia:
        </div>
        <div style="text-align: right; font-size: 9px">
          R$ {{ this.obterSaldo()   }}
        </div>
      </div>
    </div>
    <div class="tarefas-wrapper">
      <ul class="tarefas">
        <tarefa v-for="tarefa in this.dia.tarefas" :key="tarefa.id" 
          :tarefa="tarefa" 
          :indiceSemana="indiceSemana" 
          :mostrarTipos="mostrarTipos"
        />
      </ul>
    </div>
  </b-col>
</template>

<script>
import Tarefa from "../tarefa/Tarefa.vue";
import NovaTarefa from "../novaTarefa/NovaTarefa.vue";

export default {
  name: "dia",
  props: ["dia", "id", "removerTarefaListener", "indiceSemana", "mostrarTipos"],
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
    formatarDia(data){
      debugger
      return data.split('-')[2]
    },
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
        this.$http.post("https://localhost:7001/alterar", tarefaJson).then(
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
        if (tarefa.tipo.toLowerCase() === "transacao" && tarefa.valor > 0){
          saldo += Number(tarefa.valor)
        }
      }
      return saldo.toFixed(2)
    }
  }
};
</script>

<style>
.fdss {
  background-color: #eeeeee !important;
}
.diaa {
  background-color: green;
  vertical-align: top;
  display: inline-block;
  border: 0px;
  border-color: #dddddd;
  border-style: solid;
  deletarmax-height: 17.85vh;
  deletarmin-height: 100%;
  overflow: hidden;
  white-space: nowrap;
  list-style-type: none;
  float: left;
  border-radius: 4px;
  border-left: 1px solid #330033;

  margin: 0px;
  padding: 0px;
  height: 167px;
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
  width: 50%;
  padding: 6px;
  text-align: center;
  margin-bottom: 8px;
  font-size: 13px;
  float:left;
}
.tarefas {
  list-style-type: none;
  margin: 0px;
  padding: 0px;
  height: 100%;
}

.tarefas-wrapper {
  deletarheight: 13vh;
  overflow-y: scroll;
  width: 100%;
  max-height: 68%;
}
</style>