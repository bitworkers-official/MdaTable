<template>
  <data-grid-cell
    @click="handleComponentClick"
    @keydown.esc="handleComponentKeydownEscape"
    @keydown.native="handleComponentKeydownEnter"
    @focus.native="handleComponentFocus"
  >
    <template v-if="state === 'editing'">
      <!--  eslint-disable-next-line vue-a11y/form-has-label -->
      <input
        ref="input"
        :value="value"
        @blur="state = 'normal'"
        @keydown.enter="handleInputKeydownEnter"
        type="text"
      />
    </template>
    <template v-else>
      {{ value }}
    </template>
  </data-grid-cell>
</template>

<script lang="ts">
import Vue from 'vue'
import DataGridCell from './DataGridCell.vue'

interface Data {
  state: 'normal' | 'focused' | 'editing'
}

export default Vue.extend({
  components: {
    DataGridCell,
  },
  props: {
    value: {
      type: String,
      required: true,
    },
  },
  data(): Data {
    return {
      state: 'normal',
    }
  },
  watch: {
    state(value, oldValue) {
      if (value === 'editing') {
        this.$nextTick(() => {
          ;(this.$refs.input as HTMLInputElement).focus()
        })
      } else if (value === 'focused' && oldValue !== 'focused') {
        ;(this.$el as HTMLElement).focus()
      }
    },
  },
  methods: {
    handleComponentClick(event: MouseEvent) {
      this.state = 'editing'
    },
    handleComponentFocus(event: FocusEvent) {
      if (this.state === 'normal') {
        this.state = 'focused'
      }
    },
    handleComponentKeydownEscape() {
      this.state = 'focused'
    },
    handleComponentKeydownEnter(event: KeyboardEvent) {
      if (this.state === 'focused' && event.target === this.$el) {
        this.state = 'editing'
      }
    },

    handleInputKeydownEnter() {
      this.state = 'focused'
    },
  },
})
</script>

<style scoped>
input {
  all: unset;
  text-align: left;
}
</style>
