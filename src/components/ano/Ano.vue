<template>
  <div>
    <ul class="cabecalho-dias-da-semana">
      <li>        
        <ul class="cabecalho-semana">
          <li class="cabecalho-dia"><h4>dom</h4></li>
          <li class="cabecalho-dia"><h4>seg</h4></li>
          <li class="cabecalho-dia"><h4>ter</h4></li>
          <li class="cabecalho-dia"><h4>qua</h4></li>
          <li class="cabecalho-dia"><h4>qui</h4></li>
          <li class="cabecalho-dia"><h4>sex</h4></li>
          <li class="cabecalho-dia"><h4>sab</h4></li>
        </ul>
      </li>
    </ul>
    <ul class="ano">
      <li v-for="(semana, indice) in this.semanas" :key="semana.id">
        <semana
          :semana="semana"
          :dataInicial="semana.dias[0].data"
          :indice="indice"
          :removerTarefa="avisoRemoverTarefa"
        />
      </li>
    </ul>
  </div>
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
      qtdSemanas: 5,
    };
  },
  methods: {
    avisoRemoverTarefa() {},
    removerTarefa3(id, dataAntiga, indiceSemanaAntiga) {
      this.semanas[indiceSemanaAntiga].tirarTarefa(
        id,
        dataAntiga,
        indiceSemanaAntiga
      );
    },
    formatarData(data) {
      const ano = data.getFullYear();
      const mes = (data.getMonth() + 1).toString().padStart(2, 0);
      const dia = data.getDate().toString().padStart(2, 0);

      return ano + "-" + mes + "-" + dia;
    },
    obterUltimoDomingo() {
      const hoje = new Date();
      const defasagemDeDomingo = -hoje.getDay();
      const domingo = this.somaDias(hoje, defasagemDeDomingo);

      return domingo;
    },
    somaDias(date, days) {
      //debugger;
      let result = new Date(date);
      result.setDate(result.getDate() + days);
      return result;
    },
  },
  created() {
    const dataInicialParam = this.formatarData(this.dataInicial);
    this.$http
      .get(
        `https://localhost:5001/obter-semanas?primeiroDia=${dataInicialParam}&qtdSemanas=${this.qtdSemanas}`
      )
      .then((res) => res.json())
      .then(
        (dados) => {
          this.semanas = dados;
        },
        (err) => console.log(err)
      );
  },
};
</script>

<style scoped>
.num-semana{
  position: absolute;
}
.ano {
  list-style-type: none;
}
ul.cabecalho-dias-da-semana {
  padding: 0;
}
ul.cabecalho-semana {
  width: 100%;
  background-color: #555;
  overflow: auto;
  list-style-type: none;
  padding-left: 0;
  white-space: nowrap;
  display: inline-flex;
}
.cabecalho-dia {
  list-style-type: none;
  float: left;
  
  border: 1px;
  border-color: #dddddd;
  border-style: solid;
  width: 14.28%;
  min-width: 180px;
  overflow: scroll;
  white-space: nowrap;
  background-color: #eeeeee;
}
</style>