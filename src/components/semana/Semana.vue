<template>
  <ul class="semana">
    <dia
      diaDaSemana="dom"
      v-on:removerTarefaListener="removerTarefa"
      :id="formatarData(this.dataInicial)"
      :dia="this.diaDom"
    />
    <dia
      diaDaSemana="seg"
      v-on:removerTarefaListener="removerTarefa"
      :id="formatarData(somaDias(this.dataInicial, 1))"
      :dia="this.diaSeg"
    />
    <dia
      diaDaSemana="ter"
      v-on:removerTarefaListener="removerTarefa"
      :id="formatarData(somaDias(this.dataInicial, 2))"
      :dia="this.diaTer"
    />
    <dia
      diaDaSemana="qua"
      v-on:removerTarefaListener="removerTarefa"
      :id="formatarData(somaDias(this.dataInicial, 3))"
      :dia="this.diaQua"
    />
    <dia
      diaDaSemana="qui"
      v-on:removerTarefaListener="removerTarefa"
      :id="formatarData(somaDias(this.dataInicial, 4))"
      :dia="this.diaQui"
    />
    <dia
      diaDaSemana="sex"
      v-on:removerTarefaListener="removerTarefa"
      :id="formatarData(somaDias(this.dataInicial, 5))"
      :dia="this.diaSex"
    />
    <dia
      diaDaSemana="sab"
      v-on:removerTarefaListener="removerTarefa"
      :id="formatarData(somaDias(this.dataInicial, 6))"
      :dia="this.diaSab"
    />
  </ul>
</template>

<script>
import Dia from "../dia/Dia.vue";

export default {
  components: {
    dia: Dia,
  },
  name: "semana",
  data() {
    return {
      dataInicial: this.obterDomingo(),
      diaDom: {},
      diaSeg: {},
      diaTer: {},
      diaQua: {},
      diaQui: {},
      diaSex: {},
      diaSab: {},
    };
  },
  created() {
    const dataInicialParam = this.formatarData(this.dataInicial);
    this.$http
      .get(
        "https://localhost:5001/obter-semana?primeiroDia=" + dataInicialParam
      )
      .then((res) => res.json())
      .then(
        function (data) {
          this.diaDom = data.dias[0];
          this.diaSeg = data.dias[1];
          this.diaTer = data.dias[2];
          this.diaQua = data.dias[3];
          //debugger;
          this.diaQui = data.dias[4];
          this.diaSex = data.dias[5];
          this.diaSab = data.dias[6];
        },
        (err) => console.log(err)
      );
  },
  methods: {
    removerTarefa(id, data) {
      //debugger;
      //console.warn(id + " " + data + " " + new Date(data).getDay());
      const diaIndice = new Date(data).getDay()
      let tarefasDia = []
      switch (diaIndice) {
        case 0:
          tarefasDia = this.diaDom.tarefas
          break
        case 1:
          tarefasDia = this.diaSeg.tarefas
          break
        case 2:
          tarefasDia = this.diaTer.tarefas
          break
        case 3:
          tarefasDia = this.diaQua.tarefas
          break
        case 4:
          tarefasDia = this.diaQui.tarefas
          break
        case 5:
          tarefasDia = this.diaSex.tarefas
          break
        case 6:
          tarefasDia = this.diaSab.tarefas
          break
      }
      for (let i = 0; i < tarefasDia.length; i++) {
        const idTarefa = tarefasDia[i].id;
        if (idTarefa === id) {
          tarefasDia.splice(i, 1);
        }
      }
    },
    gerarIdInicial() {
      var dataInicial = new Date();
      var dia = dataInicial.getDate();
      var mes = dataInicial.getMonth() + 1;
      var ano = dataInicial.getFullYear();
      this.dataInicial = ano.toString() + mes.toString() + dia.toString();

      return this.dataInicial;
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

<style scoped>
.semana {
  display: inline-block;
  overflow: auto;
  overflow-y: hidden;
  max-width: 100%;
  margin: 1;
  white-space: nowrap;
}
</style>