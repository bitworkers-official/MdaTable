<template>
  <div id="app">
    <h1>MDAList (GitHub Version)</h1>
    <!-- <mda-table /> -->
    <!-- <example /> -->

    <list-box>
      <list-box-button> Select</list-box-button>

      <list-box-options :options="['a', 'b', 'c']"> </list-box-options>
    </list-box>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
// import MdaTable from './components/MdaTable.vue'
// import Example from './components/DataGrid/Example.vue'

import ListBox from './components/ListBox/ListBox.vue'
import ListBoxButton from './components/ListBox/ListBoxButton.vue'
import ListBoxOptions from './components/ListBox/ListBoxOptions.vue'

export default Vue.extend({
  name: 'App',
  components: {
    // MdaTable,
    ListBox,
    ListBoxButton,
    ListBoxOptions,

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
