<template>
  <div draggable="true" @dragstart="onDragStart" :id="this.id">
    <b-button v-b-modal.rating-modal @click="showModal()" class="tarefa">
      {{ this.descricao }}
    </b-button>

    <b-modal
      ref="rating-modal"
      no-close-on-backdrop
      centered
      title="Tarefa"
      class="rating-modal"
      @ok="hideModal"
      @cancel="hideModal"
      @close="hideModal"
    >
      <b-form>
        <b-form-group
          id="input-group-1"
          label="Descrição:"
          label-for="input-1"
          description="descrição da tarefa"
        >
          <b-form-input
            id="input-1"
            v-model="this.descricao"
            type="email"
            required
            placeholder="Enter email"
          ></b-form-input>
        </b-form-group>
      </b-form>
    </b-modal>
  </div>
</template>

<script>
export default {
  name: "tarefa",
  props: ["descricao", "id", "data"],
  methods: {
    showModal() {
      this.$refs["rating-modal"].show();
    },
    hideModal() {
      this.$refs["rating-modal"].hide();
    },
    onDragStart: function(e) {
      //debugger;
      e.dataTransfer.dropEffect = "move";
      const objetoTransfer = {
        id: this.id,
        descricao: this.descricao,
        data: this.data
      }
      e.dataTransfer.setData('text/plain', JSON.stringify(objetoTransfer))
    }
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