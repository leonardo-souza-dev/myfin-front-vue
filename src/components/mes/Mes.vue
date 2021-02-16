<template>
  <b-container fluid>
    <b-row>
      
      
      <b-col cols="12" class="mes">
        <b-row>
          <div style="margin-left: 400px;">FEVEREIRO</div>
          <controles @foo="msgRecebida" />
        </b-row>
        <b-row class="titulos-dias-da-semana">
          <b-col>dom</b-col>
          <b-col>seg</b-col>
          <b-col>ter</b-col>
          <b-col>qua</b-col>
          <b-col>qui</b-col>
          <b-col>sex</b-col>
          <b-col>sab</b-col>
        </b-row>

        <semana v-for="(semana, indice) in this.semanas" :key="semana.id"
          :mostrarTipos="tipos"
          :semana="semana"
          :dataInicial="semana.dias[0].data"
          :indice="indice"
          :removerTarefa="avisoRemoverTarefa"
        />
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import Semana from "../semana/Semana.vue"
import Controles from "../controles/Controles.vue"

export default {
  name: "ano",
  components: {
    semana: Semana,
    controles: Controles
  },
  data() {
    return {
      primeiroDiaExibir: this.obterPrimeiroDiaExibir(),
      semanas: [],
      qtdSemanas: 5,
      tipos: []
    };
  },
  methods: {
    msgRecebida(tipos){
      this.tipos = tipos
    },
    mostrarTipos(tipos) {
      this.tipos = tipos
    },
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
    obterPrimeiroDiaExibir() {
      const hoje = new Date()
      const dataBase = new Date(hoje.getFullYear(), hoje.getMonth(), 1)
      const defasagemDeDomingo = -dataBase.getDay()
      const domingo = this.somaDias(dataBase, defasagemDeDomingo)

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
    const primeiroDiaParam = this.formatarData(this.primeiroDiaExibir);
    this.$http
      .get(
        `https://localhost:7001/obter-semanas?primeiroDia=${primeiroDiaParam}&qtdSemanas=${this.qtdSemanas}`
      )
      .then((res) => res.json())
      .then(
        (dados) => {
          this.semanas = dados
        },
        (err) => console.log(err)
      );

    this.$http
      .get(`https://localhost:7001/obter-contas`)
      .then((res) => res.json())
      .then(
        (dados) => {
          this.contas = dados.map(function (item) {
            return { value: item.id, text: item.nome };
          });
          localStorage.setItem("contas", JSON.stringify(this.contas));
        },
        (err) => console.log(err)
      );
  },
};
</script>

<style scoped>
.titulos-dias-da-semana {
  text-align: center;
}
.ano {
  float: left;
  width: 90%;
}
.num-semana{
  position: absolute;
}
ul.cabecalho-dias-da-semana {
  padding: 0;
  list-style-type: none;
}
ul.cabecalho-semana {
  display: inline-flex;
  overflow: auto;
  padding-left: 0;
  white-space: nowrap;
  background-color: #555;  
  width: 100%;
  list-style-type: none;
}
</style>