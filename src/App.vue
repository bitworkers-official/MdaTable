<template>
  <div id="app" class="flex flex-col">
    <h1 class="text-3xl text-center my-16 font-bold">
      MDAList (GitHub Version)
    </h1>
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
