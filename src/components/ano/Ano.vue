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
      qtdSemanas: 4,
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
.cabecalho-dias-da-semana {
  list-style-type: none;
  margin-bottom: 0px;
}
.cabecalho-semana {
  list-style-type: none;
  display: inline-block;
  overflow: auto;
  overflow-y: hidden;
  max-width: 100%;
  margin: 1;
  white-space: nowrap;
}
.cabecalho-dia {
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
</style>