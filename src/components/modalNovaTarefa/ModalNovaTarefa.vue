<template>
    <b-modal
      ref="modal-nova-tarefa"
    >
      fooooooooo
    </b-modal>
</template>

<script>
export default {
  name: "modal-tarefa",
  data() {
    return {
    };
  },
};
</script>

<style scoped>
.tarefa-concluida {
  background-color: rgb(84, 233, 39) !important;
}
.tarefa {
  border: 0px;
  border-color: black;
  border-style: solid;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 10px;
  text-align: left;
  display: flex;
  flex-direction: row;
  background-color: #9ed6e8;
  border-radius: 5px;
  box-shadow: 0 1px 0 rgba(9,30,66,.25);
  cursor: pointer;

  margin-bottom: 8px;
  margin: 2px;
  padding: 1px;
  padding-left: 8px;

  max-width: 97%;
  width: 100%;
  min-height: 12px;
  max-height: 24px;

  position: relative;
  text-decoration: none;
  z-index: 0;
  color: #172b4d;
  white-space: normal;
}
.tarefa-detalhe {
  overflow: hidden;
  padding: 6px 4px 2px;
  position: relative;
  z-index: 10;
  width: 100%;
  white-space: nowrap;
  font-family: Roboto,Helvetica,Arial,sans-serif;
}
.tarefa-titulo{
  clear: both;
  display: block;
  margin: 0 0 4px;
  font-size: 12px;
  overflow: hidden;
  text-decoration: none;
  word-wrap: break-word;
  color: #172b4d;
  margin-top: -3px;
}
.badges {
  float: left;
  max-width: 100%;
  margin-left: -2px;
  display: contents;
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
  font-size: 10px;
  padding: 0 4px 0 2px;
  vertical-align: top;
  white-space: nowrap;
  opacity: 80%;;
}
.valor {
  text-align: left;
}
</style>