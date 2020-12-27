<template>
  <ul class="ano">
    <li v-for="(semana, indice) in this.semanas" :key="semana.id">
      <semana :semana="semana" :dataInicial="semana.dias[0].data" :indice="indice" :removerTarefa="avisoRemoverTarefa" />
    </li>
  </ul>
</template>

<script>
import Semana from "../semana/Semana.vue";

export default {
  name: "ano",
  components: {
    semana: Semana,
  },
  data() {
    return {
      dataInicial: this.obterUltimoDomingo(),
      semanas: [],
      qtdSemanas: 2
    };
  },
  methods: {
    avisoRemoverTarefa(){

    },
    removerTarefa3(id, dataAntiga, indiceSemanaAntiga){
      this.semanas[indiceSemanaAntiga].tirarTarefa(id, dataAntiga, indiceSemanaAntiga)
    },
    formatarData(data) {
      const ano = data.getFullYear();
      const mes = (data.getMonth() + 1).toString().padStart(2, 0);
      const dia = data.getDate().toString().padStart(2, 0);

      return ano + "-" + mes + "-" + dia;
    },
    obterUltimoDomingo() {
      const hoje = new Date();
      const defasagemDeDomingo = - hoje.getDay();
      const domingo = this.somaDias(hoje, defasagemDeDomingo);

      return domingo;
    },
    somaDias(date, days) {
      //debugger;
      let result = new Date(date);
      result.setDate(result.getDate() + days);
      return result;
    }
  },
  created() {
    const dataInicialParam = this.formatarData(this.dataInicial);
    this.$http
      .get(
        `https://localhost:5001/obter-semanas?primeiroDia=${dataInicialParam}&qtdSemanas=${this.qtdSemanas}`
      )
      .then((res) => res.json())
      .then((dados) => { 
        //dados.forEach(x => { x.tirarTarefa = function(){ }; })
        this.semanas = dados;
        },
            (err) => console.log(err)
      );
  }
};
</script>

<style scoped>
.ano {
  list-style-type: none;  
}
</style>