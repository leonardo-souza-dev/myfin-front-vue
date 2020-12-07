<template>
    <li class="quinze-minutos">{{ this.inicio }}</li>
</template>

<script>
export default {
    name: 'minuto',
    props: ['inicio']
}
</script>

<style>
    .quinze-minutos {
        margin: -5px;
        padding: 0px;        
        list-style-type: none;
    }
</style>