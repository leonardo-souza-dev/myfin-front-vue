<template>
  <ul class="semana" >
    <dia diaDaSemana="dom" :id="formatarData(this.dataInicial)" :dia="this.diaDom" />
    <dia diaDaSemana="seg" :id="formatarData(somaDias(this.dataInicial, 1))" :dia="this.diaSeg" />
    <dia diaDaSemana="ter" :id="formatarData(somaDias(this.dataInicial, 2))" :dia="this.diaTer" />
    <dia diaDaSemana="qua" :id="formatarData(somaDias(this.dataInicial, 3))" :dia="this.diaQua" />
    <dia diaDaSemana="qui" :id="formatarData(somaDias(this.dataInicial, 4))" :dia="this.diaQui" />
    <dia diaDaSemana="sex" :id="formatarData(somaDias(this.dataInicial, 5))" :dia="this.diaSex" />
    <dia diaDaSemana="sab" :id="formatarData(somaDias(this.dataInicial, 6))" :dia="this.diaSab" />
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
      //dataInicial: new Date(),
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
    const dataInicialParam = this.formatarData(this.dataInicial)
    this.$http.get('https://localhost:5001/obter?primeiroDia=' + dataInicialParam)
        .then(res => res.json())
        .then(function (data){
          this.diaDom = data.dias[0];
          this.diaSeg = data.dias[1];
          this.diaTer = data.dias[2];
          this.diaQua = data.dias[3];
          this.diaQui = data.dias[4];
          this.diaSex = data.dias[5];
          this.diaSab = data.dias[6];
        }, err => console.log(err));
  },
  methods: {
    gerarIdInicial() {
      var dataInicial2 = new Date();
      var dia = dataInicial2.getDate();
      var mes = dataInicial2.getMonth() + 1;
      var ano = dataInicial2.getFullYear();
      this.dataInicial2 = ano.toString() + mes.toString() + dia.toString();

      return this.dataInicial2;
    },
    processarDataDia(n) {
      return parseInt(this.dataInicial) + n;
    },
    formatarData(data){
      //debugger;
      const ano = data.getFullYear();
      const mes = (data.getMonth() + 1).toString().padStart(2, 0);
      const dia = data.getDate().toString().padStart(2, 0);

      return ano + '-' + mes + '-' + dia;
    },
    somaDias(date, days) {
      //debugger;
      let result = new Date(date);
      result.setDate(result.getDate() + days);
      return result;
    },
    obterDomingo(){
      const hoje = new Date();
      const defasagemDeDomingo = -(hoje.getDay());
      const domingo = this.somaDias(hoje, defasagemDeDomingo);

      return domingo;
    }
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