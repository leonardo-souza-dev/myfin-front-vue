<template>
  <div>
    <div class="controles">
      <controles />
    </div>
    <div class="ano">
      <div class="semanaa">
        <div class="diaa fdss">dom</div>
        <div class="diaa">seg</div>
        <div class="diaa">ter</div>
        <div class="diaa">qua</div>
        <div class="diaa">qui</div>
        <div class="diaa">sex</div>
        <div class="diaa fdss">sab</div>
      </div>
      <div v-for="(semana, indice) in this.semanas" :key="semana.id">
        <semana
          :mostrarTipo="tiposMostrar"
          :semana="semana"
          :dataInicial="semana.dias[0].data"
          :indice="indice"
          :removerTarefa="avisoRemoverTarefa"
        />
    </div>
    </div>
  </div>
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
      dataInicial: this.obterUltimoDomingo(),
      //dataInicial: new Date('2021-01-24 00:00:00.000'),
      semanas: [ ],
      qtdSemanas: 6,
      tiposMostrar: "todos"
    };
  },
  methods: {
    mostrarEsconderTipo(tipo) {
      console.log('ano')
      console.log(tipo)
      console.log('')
      this.tiposMostrar = tipo
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
          this.semanas = dados
        },
        (err) => console.log(err)
      );

    this.$http
      .get(
        `https://localhost:5001/obter-contas`
      )
      .then((res) => res.json())
      .then(
        (dados) => {
          this.contas = dados.map(function(item){
            return { value: item.id, text: item.nome }
          });
          localStorage.setItem("contas", JSON.stringify(this.contas));
        },
        (err) => console.log(err)
      );
  },
};
</script>

<style scoped>
.ano {
  float: left;
  width: 90%;
  /*min-width: 700px;*/
}
.controles {
  float: left;
  width: 10%;
  /*min-width: 100px;*/
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