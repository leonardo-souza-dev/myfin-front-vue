<template>
  <b-col cols="1" class="controles">
    <!-- <b-form-checkbox switch
      id="afazeres"
      checked
      value='{ "tipo": "afazer", "mostrar": true }'
      unchecked-value='{ "tipo": "afazer", "mostrar": false }'
      @input="mostrarEsconderTipo"
    >
      Afazeres
    </b-form-checkbox>
    <b-form-checkbox switch
      id="transacao"
      v-model="checado"
      value='{ "tipo": "transacao", "mostrar": true }'
      unchecked-value='{ "tipo": "transacao", "mostrar": false }'
      @input="mostrarEsconderTipo"
    >
      Transações
    </b-form-checkbox> -->
    <b-form-checkbox-group
      v-model="selected"
      :options="options"
      class="mb-3"
      value-field="item"
      text-field="name"
      disabled-field="notEnabled"
      @input="mostrarTipo"
    ></b-form-checkbox-group>
  </b-col>
</template>

<script>

export default {
  name: "controles",
  data() {
    return {
      selected: [ "afazer", "transacao"],
        options: [
          { 
            item: 'afazer', 
            name: 'Afazer'
          },
          { 
            item: 'transacao', 
            name: 'Modo finanças'
          }
        ]
    };
  },
  methods: {
    avisarTipoChecados() {
      debugger;
      return this.selected
    },
    mostrarTipo(tipo) {
      this.$parent.mostrarTipos(tipo)
    }    
  },
  created() {
    this.$emit('foo', this.selected)
  },
};
</script>

<style scoped>
.controles {
  float: left;
  deletarwidth: 10%;
  display: block;
  height: 100%;
  font-size: 10px;
}

</style>