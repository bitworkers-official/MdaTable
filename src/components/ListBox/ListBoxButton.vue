<template>
  <button :id="listBox.buttonId" aria-haspopup="listbox">
    <slot />
  </button>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  inject: ['listBox'],
})
</script>
