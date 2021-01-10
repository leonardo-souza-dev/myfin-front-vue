<template>
  <div>
    <ul class="semanaa" :id="this.semana.num">
      <dia
        v-for="dia in this.semana.dias"
        :key="dia.id"
        :diaDaSemana="dia.diaDaSemana"
        v-on:removerTarefaListener="removerTarefa"
        :id="dia.data.substring(0, 10)"
        :dia="dia"
        :indiceSemana="indice"
      />
    </ul>
  </div>
</template>

<script>
import Dia from "../dia/Dia.vue";

export default {
  components: {
    dia: Dia,
  },
  props: ["semana", "diaInicial", "indice"],
  name: "semana",
  data() {
    return {
      dias: [],
    };
  },
  created(){
    this.semana.tirarTarefa = this.tirarTarefa
  },
  methods: {
    tirarTarefa(id, dataAntiga, indiceSemanaAntiga){
      const numDestaSemana = this.semana.num
      for(let i = 0; i < this.semana.dias.length; i++) {
        const dia = this.semana.dias[i];
        if (dia.data === dataAntiga){
          dia.retiraTarefa(id)
        }
      }
    },
    removerTarefa2(id, data, indiceSemanaAntiga) {
      this.$parent.removerTarefa3(id, data, indiceSemanaAntiga);
    },
    removerTarefa(id, data) {
      var numDestaSemana = this.semana.num;
      const dataConvertida = this.$converterData(data);
      const diaIndice = new Date(dataConvertida).getDay();
      //debugger
      let tarefasDia = [];
      switch (diaIndice) {
        case 0:
          tarefasDia = this.semana.dias[0].tarefas;
          break;
        case 1:
          tarefasDia = this.semana.dias[1].tarefas;
          break;
        case 2:
          tarefasDia = this.semana.dias[2].tarefas;
          break;
        case 3:
          tarefasDia = this.semana.dias[3].tarefas;
          break;
        case 4:
          tarefasDia = this.semana.dias[4].tarefas;
          break;
        case 5:
          tarefasDia = this.semana.dias[5].tarefas;
          break;
        case 6:
          tarefasDia = this.semana.dias[6].tarefas;
          break;
      }
      for (let i = 0; i < tarefasDia.length; i++) {
        const idTarefa = tarefasDia[i].id;
        if (idTarefa === id) {
          tarefasDia.splice(i, 1);
        }
      }
    },
    processarDataDia(n) {
      return parseInt(this.dataInicial) + n;
    },
    formatarData(data) {
      //debugger;
      const ano = data.getFullYear();
      const mes = (data.getMonth() + 1).toString().padStart(2, 0);
      const dia = data.getDate().toString().padStart(2, 0);

      return ano + "-" + mes + "-" + dia;
    },
    somaDias(date, days) {
      //debugger;
      let result = new Date(date);
      result.setDate(result.getDate() + days);
      return result;
    },
    obterDomingo() {
      const hoje = new Date();
      const defasagemDeDomingo = -hoje.getDay();
      const domingo = this.somaDias(hoje, defasagemDeDomingo);

      return domingo;
    },
  },
};
</script>

<style>
.semanaa {
  display: flex;
  overflow: auto;  
  padding-left: 0;
  white-space: nowrap;
  background-color: #ffffff;
  width: 100%;
  list-style-type: none;
}
</style>

<style scoped>
.num-semana{
  position: absolute;
}
</style>