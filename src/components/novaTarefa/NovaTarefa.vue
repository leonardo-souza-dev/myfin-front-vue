<template>
  <div :style="{ display: 'grid' }" >
    <input
      :style="{ 'min-width': '100px'}" 
      type="text"
      ref="nova"
      v-show="mostrarInput()"
      v-on:keydown="confirmarNovaTarefa"
      v-on:blur="clicouFora"
    />
    <button 
      :class="btnStyle" 
      @click="adicionarTarefa()" 
      @mouseover="mouseOverCriarTarefa"
      @mouseout="mouseOutCriarTarefa"
      >+ Criar tarefa</button>
  </div>
</template>

<script>
export default {
  name: 'nova-tarefa',
  props: ['dia'],
  data() {
      return {
        btnStyle: 'nova-tarefa',
        ehVisivel: false
      }
  },
  methods:{
    mostrarInput(){
      return this.ehVisivel
    },
    mouseOverCriarTarefa(){
      this.btnStyle = 'nova-tarefa-mouseover'
    },
    mouseOutCriarTarefa(){
      this.btnStyle = 'nova-tarefa'
    },
    clicouFora(e) {
      if (e.target.value){
        this.criarTarefa(e.target.value)
        this.ehVisivel = false
        this.limparDescricao()
      } else {
        this.ehVisivel = false
      }
    },
    confirmarNovaTarefa(e) {
      if (e.key == "Enter") {
        this.criarTarefa(e.target.value);
      }
    },
    adicionarTarefa() {
      this.ehVisivel = true;
      this.$nextTick(() => this.$refs.nova.focus());
    },
    limparDescricao(){
      this.$refs.nova.value = ''
    },
    criarTarefa(descricao, limparDescricao){
      const novaTarefa = {
          descricao: descricao,
          data: this.dia
      }
      this.$http
        .put("https://localhost:5001/criar", novaTarefa)
        .then(
          (response) => {
            if (response.status === 200 && response.body) {
              console.warn("tarefa criada com sucesso");
              this.$parent.adicionarTarefa(novaTarefa)
              this.limparDescricao()
              this.ehVisivel = false;
            }
          },
          (response) => {
            console.error(response);
          }
        );      
    }
  }
}
</script>

<style scoped>
.nova-tarefa {
  background-color: #eeeeee;
  border: 0px;
  border-color: black;
  border-style: solid;
  margin: 2px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  font-size: 10px;
  padding: 1px;
  width: 100%;
  height: 36px;
}
.nova-tarefa-mouseover {
  background-color: #dddddd;
  color: '#AAAAAA';
  border: 0px;
  border-color: black;
  border-style: solid;
  margin: 2px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  font-size: 10px;
  padding: 1px;
  width: 100%;
  height: 36px;
}
</style>