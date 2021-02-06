<template>
  <div :style="{ display: 'grid' }" >
    <input
      class="input-descricao"
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
      //debugger;
      if (e.target.value){
        this.criarTarefa(e.target.value)
        this.ehVisivel = false
        this.limparDescricao()
      } else {
        this.ehVisivel = false
      }
    },
    confirmarNovaTarefa(e) {
      if (e.key === "Enter") {
        this.criarTarefa(e.target.value);
      } else if (e.key === "Escape") {
      this.ehVisivel = false;
      }
    },
    adicionarTarefa() {
      this.ehVisivel = true;
      this.$nextTick(() => this.$refs.nova.focus());
    },
    limparDescricao(){
      this.$refs.nova.value = ''
    },
    criarTarefa(descricao){
      let pontosPrevistos = 0;
      if (descricao.indexOf(';') > 0 && !isNaN(parseInt(descricao.split(';')[1])) ){
        pontosPrevistos = descricao.split(';')[1]
        descricao = descricao.split(';')[0]
      }
      const novaTarefa = {
          descricao: descricao,
          data: this.dia,
          pontosPrevistos: pontosPrevistos
      }
      this.$http
        .put("https://localhost:5001/criar", novaTarefa)
        .then(
          (response) => {
            if (response.status === 200 && response.body) {
              console.warn("tarefa criada com sucesso");
              debugger
              this.$parent.adicionarTarefa(response.body)
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
.input-descricao {
  min-width: 100px;
  font-size: 12px;
}
.nova-tarefa {
  background-color: #d9e6df;
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
  background-color: #c3d3cb;
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