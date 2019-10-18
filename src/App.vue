<template>
  <div id="app" class="flex flex-col relative">
    <h1
      class="text-3xl text-center my-16 font-bold sticky top-0 bg-white z-10 py-6"
    >
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
  data() {
    return {
      top: 0,
    }
  },
  mounted() {
    const handleScroll = () => {
      this.top = window.scrollY
    }
    window.addEventListener('scroll', handleScroll)
    this.$once('hook:beforeDestroy', () => {
      window.removeEventListener('scroll', handleScroll)
    })
  },
})
</script>
