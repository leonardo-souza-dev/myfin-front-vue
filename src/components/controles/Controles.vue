<template>
  <div style="margin-top: 96px;">
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
  </div>
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

</style>