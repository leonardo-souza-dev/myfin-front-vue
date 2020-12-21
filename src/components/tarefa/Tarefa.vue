<template>
  <div draggable="true" @dragstart="onDragStart" :id="this.tarefa.id">
    <b-button v-b-modal.rating-modal @click="showModal()" class="tarefa">
      {{ this.tarefa.descricao }}
    </b-button>

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
        <b-form-group
          id="input-group-descricao"
          label="Descrição:"
          label-for="input-descricao"
        >
          <b-form-input
            id="input-descricao"
            v-model="tarefa.descricao"
            type="text"
            required
            placeholder="Descrição"
          ></b-form-input>
        </b-form-group>
        <b-form-group
          id="input-group-pontos"
          label="Pontos:"
          label-for="input-pontos"
        >
          <b-form-input
            id="input-pontos"
            v-model="tarefa.pontos"
            type="number"
            placeholder="Pontos"
          ></b-form-input>
        </b-form-group>
      </b-form>
    </b-modal>
  </div>
</template>

<script>
export default {
  name: "tarefa",
  props: ["tarefa"],
  data() {
    return {
      tarefaAntesAbrirModal: {},
    };
  },
  methods: {
    showModal() {
      this.$refs["rating-modal"].show();
      console.warn("showww");

      //guarda valores iniciais
      this.tarefaAntesAbrirModal.id = this.tarefa.id;
      this.tarefaAntesAbrirModal.descricao = this.tarefa.descricao;
      this.tarefaAntesAbrirModal.pontos = this.tarefa.pontos;
    },
    hideModal1() {
      console.warn("modal ok");
      //console.warn(this.tarefaAntesAbrirModal)
      //alert('ok')

      if (
        this.tarefaAntesAbrirModal.descricao !== this.tarefa.descricao ||
        this.tarefaAntesAbrirModal.pontos !== this.tarefa.pontos
      ) {
        this.$http
          .post("https://localhost:5001/alterar", {
            id: this.tarefa.id,
            descricao: this.tarefa.descricao,
            data: this.tarefa.data,
            pontos: Number(this.tarefa.pontos)
          })
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
      } else {
        alert("nao mudou nada");
      }
      this.$refs["rating-modal"].hide();
    },
    hideModal2() {
      console.warn("modal cancel");
      this.$refs["rating-modal"].hide();
    },
    hideModal3() {
      console.warn("modal close ");
      this.$refs["rating-modal"].hide();
    },
    hideModalEsc() {
      console.warn("modal fechado com esc");
      //alert('esc')
      this.$refs["rating-modal"].hide();
    },
    onDragStart: function (e) {
      //debugger;
      e.dataTransfer.dropEffect = "move";
      const objetoTransfer = {
        id: this.tarefa.id,
        descricao: this.tarefa.descricao,
        data: this.tarefa.data,
        pontos: this.tarefa.pontos
      };
      console.warn('a tarefa que esta sendo arrastada é:')
      console.warn(objetoTransfer)
      e.dataTransfer.setData("text/plain", JSON.stringify(objetoTransfer));
    },
  },
};
</script>

<style>
.tarefa {
  border: 1px;
  border-color: black;
  border-style: solid;
  margin: 6px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  font-size: 12px;
  padding: 3px;
  width: 90%;
  height: 40px;
}
</style>