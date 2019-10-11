<template>
  <div id="app">
    <h1>MDAList (GitHub Version)</h1>
    <mda-table />
    <!-- <example /> -->
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import MdaTable from './components/MdaTable.vue'
// import Example from './components/DataGrid/Example.vue'

export default Vue.extend({
  name: 'App',
  components: {
    MdaTable,
    // Example,
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
  display: flex;
  flex-direction: column;
}

.screenreader-only {
  position: absolute;
  left: -9999px;
}
</style>
