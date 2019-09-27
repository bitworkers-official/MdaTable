<template>
  <div id="app">
    <h1>MDAList (GitHub Version)</h1>
    <mda-table />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import MdaTable from './components/MdaTable.vue'

export default Vue.extend({
  name: 'App',
  components: {
    MdaTable,
  },
})
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

fieldset {
  border: none;
  margin: 0;
  padding: 0;
}
</style>
