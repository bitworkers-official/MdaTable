<template>
  <mda-table id="app" />
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
/* #app {
  max-height: 100vh;
  overflow-y: scroll;
  scroll-snap-type: y mandatory;
}

tr {
  scroll-snap-align: start;
  scroll-padding-top: 8rem;
} */
</style>
