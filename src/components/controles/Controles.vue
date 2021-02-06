<template>
  <b-col cols="1" class="controles">
    <b-form-checkbox
      id="afazeres"
      value='{ "tipo": "afazer", "mostrar": true }'
      unchecked-value='{ "tipo": "afazer", "mostrar": false }'
      @input="mostrarEsconderTipo"
    >
      Afazeres
    </b-form-checkbox>
    <b-form-checkbox
      id="transacao"
      value='{ "tipo": "transacao", "mostrar": true }'
      unchecked-value='{ "tipo": "transacao", "mostrar": false }'
      @input="mostrarEsconderTipo"
    >
      Transações
    </b-form-checkbox>
  </b-col>
</template>

<script>

export default {
  name: "controles",
  data() {
    return {
    };
  },
  methods: {
    mostrarEsconderTipo(tipo) {
      const tipoJson = JSON.parse(tipo)
      this.$parent.mostrarEsconderTipo(tipoJson)
    }    
  },
  created() {
    
  },
};
</script>

<style scoped>
.controles {
  float: left;
  width: 10%;
  display: block;
  height: 100%;
  margin-top: 96px;
  font-size: 10px;
}

</style>