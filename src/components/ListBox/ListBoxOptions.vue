<template>
  <ul
    :id="listBox.listId"
    :aria-labelledby="listBox.buttonId"
    :aria-activedescendant="`option-${options[activeIndex]}`"
    @keydown="handleKeyDown"
    tabindex="-1"
    role="listbox"
    style="display:none"
  >
    <!-- eslint-disable-next-line -->
      <li
      v-for="(option, index) in options"
      :key="option"
      :aria-selected="index === activeIndex"
      @click="selectOption(index)"
      :id="`option-${option}`"
      role="option"
    >
      {{ option }}
    </li>
  </ul>
</template>

<script>
// @ts-nocheck
export default {
  props: {
    options: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      activeIndex: 0,
    }
  },
  methods: {
    selectOption(index) {
      this.$el.style.display = 'none'
      this.activeIndex = index
      this.$emit('selectOption', this.options[index])
    },
    handleKeyDown(event) {
      switch (event.key) {
        case 'Escape':
        case 'Enter':
        case 'Return':
          this.selectOption(this.activeIndex)
          break
        case 'ArrowUp':
          if (this.activeIndex !== 0) {
            this.activeIndex--
          }
          break
        case 'ArrowDown':
          if (this.activeIndex !== this.options.length - 1) {
            this.activeIndex++
          }
          break
        case 'Home':
          event.preventDefault()
          this.activeIndex = 0
          break
        case 'End':
          event.preventDefault()
          this.activeIndex = this.options.length - 1
          break
        default:
          break
      }
    },
  },
  inject: ['listBox'],
}
</script>

<style scoped>
li[aria-selected='true'] {
  background: red;
}
</style>
