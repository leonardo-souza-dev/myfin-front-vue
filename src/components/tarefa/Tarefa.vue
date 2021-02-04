<template>
  <div draggable="true" @dragstart="onDragStart" :id="this.tarefa.id">
    <a @click="showModal()" class="tarefa" :class="concluidoEstilo" >
      <div class="tarefa-detalhe">
        <span class="tarefa-titulo">
          {{ this.tarefa.descricao }}
        </span>
        <span class="tarefa-tipo">
          {{ this.tarefa.tipo }}
        </span>
        <div class="badges">
          <div class="badge-text">Pontos: {{ this.tarefa.pontosRealizados }}de{{ this.tarefa.pontosPrevistos }}</div>
        </div>
        <div v-if="this.tarefa.tipo == 2" class="badges">
          <div class="badge-text valor">{{ this.tarefa.valor }}</div>
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
        <b-container>
          <b-row>
            <b-col>
              <b-form-group id="input-group-descricao" label="Descrição:" label-for="input-descricao">
                <b-form-input id="input-descricao" v-model="tarefa.descricao" type="text" required placeholder="Descrição" />
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col>
              <b-form-group id="input-group-pontosRealizados" label="Pontos realizados:" label-for="input-pontosRealizados">
                <b-form-input id="input-pontosRealizados" v-model="tarefa.pontosRealizados" type="number" />
              </b-form-group>
            </b-col>
            <b-col>
              <b-form-group id="input-group-pontosPrevistos" label="Pontos previstos:" label-for="input-pontosPrevistos">
                <b-form-input id="input-pontosPrevistos" v-model="tarefa.pontosPrevistos" type="number" placeholder="Pontos previstos" />
              </b-form-group>
            </b-col>
          </b-row>
          <b-form-group id="input-group-concluido" label="Concluído:" label-for="input-concluido" >
            <b-form-checkbox id="input-concluido" v-model="tarefa.concluido"  />
          </b-form-group>
          <b-row>
            <b-col>
              <b-form-group id="input-group-valor" prepend="R$" label="Valor:" label-for="input-valor">
                <b-form-input id="input-valor" v-model="tarefa.valor" type="number" placeholder="0.00" ></b-form-input>
              </b-form-group>
              <b-form-group id="input-group-conta" label="Conta:" label-for="input-conta">
                <b-form-select v-model="tarefa.conta" :options="contas"></b-form-select>
              </b-form-group>
            </b-col>
          </b-row>
          <b-form-group id="input-group-dataVcto" label="Vencimento:" label-for="input-dataVcto">
            <b-form-datepicker id="input-dataVcto" v-model="tarefa.dataVcto" />
          </b-form-group>
          <b-form-group id="input-group-dataPgto" label="Pagamento:" label-for="input-dataPgto">
            <b-form-datepicker id="input-dataPgto" v-model="tarefa.dataPgto" />
          </b-form-group>
        </b-container>
      </b-form>
    </b-modal>
  </div>
</template>

<script>
export default {
  name: "tarefa",
  props: [ "tarefa", "indiceSemana" ],
  data() {
    return {
      contaSelecionada: null,
      tarefaAntesAbrirModal: {},
      concluido: this.tarefa.concluido,
      contas: [{ text: 'Selecione', value: null }]
    };
  },
  created() {
    const contasLocalStorage = JSON.parse(localStorage.getItem("contas"))

    for(let i = 0; i < contasLocalStorage.length; i++){
      this.contas.push({ 
        value: 
        {
          id: contasLocalStorage[i].value
        }, 
        text: contasLocalStorage[i].text })
    }
  },
  computed: {
    concluidoEstilo: function(){
      if (this.tarefa.concluido === true){
        return "tarefa-concluida"
      } else {
        return ""
      }
    },
    ehTransacao: function(){
      if (this.tarefa.valor && this.tarefa.valor > 0) {
        return true
      }
      return false
    }
  },
  methods: {
    showModal() {
      this.$refs["rating-modal"].show();

      //guarda valores iniciais
      this.tarefaAntesAbrirModal.id = this.tarefa.id
      this.tarefaAntesAbrirModal.descricao = this.tarefa.descricao
      this.tarefaAntesAbrirModal.pontosPrevistos = this.tarefa.pontosPrevistos
      this.tarefaAntesAbrirModal.pontosRealizados = this.tarefa.pontosRealizados
      //if (this.tarefaAntesAbrirModal.conta && this.tarefa.conta)
      this.tarefaAntesAbrirModal.conta = this.tarefa.conta
    },
    hideModal1() {
      if (this._tarefaAlterada()) {
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
    _tarefaAlterada(){
      return this.tarefaAntesAbrirModal.descricao !== this.tarefa.descricao ||
        this.tarefaAntesAbrirModal.pontosPrevistos !== this.tarefa.pontosPrevistos ||
        this.tarefaAntesAbrirModal.pontosRealizados !== this.tarefa.pontosRealizados ||
        this.tarefaAntesAbrirModal.concluido !== this.tarefa.concluido 
        // || this.tarefaAntesAbrirModal.conta !== this.tarefa.conta;
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
      this.$refs["rating-modal"].hide();
    },
    onDragStart: function (e) {
      e.dataTransfer.dropEffect = "move";
      this.tarefa.semanaAntiga = this.indiceSemana
      e.dataTransfer.setData("text/plain", JSON.stringify(this.tarefa));
    },
  },
};
</script>

<style scoped>
.tarefa-concluida {
  background-color: greenyellow !important;
}
.tarefa {
  border: 0px;
  border-color: black;
  border-style: solid;
  margin: 2px;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 10px;
  padding: 1px;
  padding-left: 8px;
  text-align: left;
  display: flex;
  flex-direction: row;
  background-color: #9ed6e8;
  border-radius: 3px;
  box-shadow: 0 1px 0 rgba(9,30,66,.25);
  cursor: pointer;
  margin-bottom: 8px;
  max-width: 300px;
  width: 100%;
  min-height: 84px;
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
  width: 100%;
}
.tarefa-titulo{
  clear: both;
  display: block;
  margin: 0 0 4px;
  font-size: 10px;
  overflow: hidden;
  text-decoration: none;
  word-wrap: break-word;
  color: #172b4d;
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
  text-align: right;
}
</style>