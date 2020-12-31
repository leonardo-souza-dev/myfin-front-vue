<template>
  <div draggable="true" @dragstart="onDragStart" :id="this.tarefa.id">
    <a @click="showModal()" class="tarefa">
      <div class="tarefa-detalhe">
        <span class="tarefa-titulo">
          {{ this.tarefa.descricao }}
        </span>
        <div class="badges">
          <div class="badge-text">Pontos: {{ this.tarefa.pontos }}</div>
        </div>
      </div>
    </a>

    <b-modal
      ref="rating-modal"
      centered
      hide-header
      no-close-on-esc
      no-close-on-backdrop
      title="Tarefa"
      class="rating-modal"
      @ok="hideModal1"
      @cancel="hideModal2"
      @close="hideModal3"
      @hide="hideModalEsc"
    >
      <b-form>
        <b-form-group id="input-group-descricao" label="Descrição:" label-for="input-descricao">
          <b-form-input id="input-descricao" v-model="tarefa.descricao" type="text" required placeholder="Descrição"></b-form-input>
        </b-form-group>
        <b-form-group id="input-group-pontos" label="Pontos:" label-for="input-pontos">
          <b-form-input id="input-pontos" v-model="tarefa.pontos" type="number" placeholder="Pontos" ></b-form-input>
        </b-form-group>
        <b-form-group id="input-group-valor" label="Valor:" label-for="input-valor">
          <b-form-input id="input-valor" v-model="tarefa.valor" type="number" placeholder="0.00" ></b-form-input>
        </b-form-group>
      </b-form>
    </b-modal>
  </div>
</template>

<script>
export default {
  name: "tarefa",
  props: ["tarefa", "indiceSemana"],
  data() {
    return {
      tarefaAntesAbrirModal: {},
    };
  },
  methods: {
    showModal() {
      this.$refs["rating-modal"].show();

      //guarda valores iniciais
      this.tarefaAntesAbrirModal.id = this.tarefa.id;
      this.tarefaAntesAbrirModal.descricao = this.tarefa.descricao;
      this.tarefaAntesAbrirModal.pontos = this.tarefa.pontos;
    },
    hideModal1() {
      console.warn("modal ok");
      //debugger;

      if (
        this.tarefaAntesAbrirModal.descricao !== this.tarefa.descricao ||
        this.tarefaAntesAbrirModal.pontos !== this.tarefa.pontos
      ) {
        this.$http
          .post("https://localhost:5001/alterar", this.tarefa)
          .then(
            (response) => {
              if (response.status === 200 && response.body) {
                console.log('tarefa alterada via modal')
              }
            },
            (response) => {
              console.error(response);
            }
          );
      } 
      this.$refs["rating-modal"].hide();
    },
    hideModal2() {
      console.warn("modal cancel");
      this.$refs["rating-modal"].hide();
    },
    hideModal3() {
      console.warn("modal close");
      this.$refs["rating-modal"].hide();
    },
    hideModalEsc() {
      console.warn("modal fechado");
      this.$refs["rating-modal"].hide();
    },
    onDragStart: function (e) {
      //console.log('onDragStart iniciado')
      //console.log(this.tarefa)

      e.dataTransfer.dropEffect = "move";
      this.tarefa.semanaAntiga = this.indiceSemana
      e.dataTransfer.setData("text/plain", JSON.stringify(this.tarefa));
    },
  },
};
</script>

<style scoped>
.tarefa {
  border: 0px;
  border-color: black;
  border-style: solid;
  margin: 2px;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 10px;
  padding: 1px;
  width: 100%;

  min-height: 56px;

  padding-left: 8px;
  text-align: left;

    display: flex;
    flex-direction: row;
    background-color: #badaba;
    border-radius: 3px;
    box-shadow: 0 1px 0 rgba(9,30,66,.25);
    cursor: pointer;
    margin-bottom: 8px;
    max-width: 300px;
    position: relative;
    text-decoration: none;
    z-index: 0;
    color: #172b4d;
    white-space: normal;
    font-family: -apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Noto Sans,Ubuntu,Droid Sans,Helvetica Neue,sans-serif;
}
.tarefa-detalhe {
  overflow: hidden;
  padding: 6px 4px 2px;
  position: relative;
  z-index: 10;
}
.tarefa-titulo{
  clear: both;
  display: block;
  margin: 0 0 4px;
  font-size: 14px;
  overflow: hidden;
  text-decoration: none;
  /*word-wrap: break-word;*/
  color: #172b4d;
}
.badges {
  float: left;
  max-width: 100%;
  margin-left: -2px;
}
.badge {
  color: #5e6c84;
  display: inline-block;
  margin: 0 4px 4px 0;
  max-width: 100%;
  min-height: 20px;
  overflow: hidden;
  position: relative;
  padding: 2px;
  text-decoration: none;
  text-overflow: ellipsis;
  vertical-align: top;
}
.badge-text {
  font-size: 12px;
  padding: 0 4px 0 2px;
  vertical-align: top;
  white-space: nowrap;
}
</style>