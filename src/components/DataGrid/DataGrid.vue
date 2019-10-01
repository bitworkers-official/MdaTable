<template>
  <table role="grid">
    <tbody>
      <slot />
    </tbody>
  </table>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  data() {
    return {
      focusedNode: null,
    }
  },
  mounted() {
    // window.addEventListener('focusin', event => {
    //   console.log(event.target)
    //   // if (!this.$el.contains(event.target as HTMLElement)) {
    //   //   return
    //   // }
    //   console.log('fff')
    // })
    // TODO: when data is ready, focus first node
    this.$el.addEventListener('focusin', event => {
      const $$cells = Array.from(
        this.$el.querySelectorAll('.data-grid-cell')
      ) as HTMLElement[]

      for (const $cell of $$cells) {
        if ($cell.contains(event.target as HTMLElement)) {
          $cell.classList.add('focused')
        } else {
          $cell.classList.remove('focused')
        }
      }
    })
  },
})
</script>

<style>
.data-grid,
.data-grid-row,
.data-grid-cell {
  box-sizing: border-box;
}

.data-grid-row {
  display: flex;
}
.data-grid-cell {
  display: flex;
  border: 1px solid transparent;
  cursor: text;
}
.data-grid-cell.focused,
.data-grid-cell:focus {
  border-color: orange;
  outline: none;
}
.data-grid-cell::-moz-focus-inner {
  display: none !important;
}
</style>
