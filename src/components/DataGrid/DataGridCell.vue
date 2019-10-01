<template>
  <!-- eslint-disable-next-line vue/require-component-is-->
  <component
    :is="heading ? 'th' : 'td'"
    v-on="{
      ...$listeners,
    }"
    :class="{ 'data-grid-cell-heading': heading }"
    tabindex="-1"
    class="data-grid-cell"
  >
    <slot />
  </component>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  props: {
    heading: {
      type: Boolean,
      default: false,
    },
  },
})
</script>

<style></style>
