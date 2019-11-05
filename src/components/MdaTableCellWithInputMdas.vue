<template>
  <td>
    <!-- eslint-disable-next-line -->
    <input
      v-for="(mda, index) in person.mdas"
      :value="mda"
      :key="index"
      @input="handleInput($event.target.value, index)"
      :disabled="disabled"
      type="text"
      autocomplete="off"
      spellcheck="false"
      class="w-full bg-transparent"
    />
  </td>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'MdaTableCellWithInput',
  model: {
    prop: 'person',
    event: 'updatePerson',
  },
  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
    person: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      dirty: false,
    }
  },
  methods: {
    handleInput(event: any) {
      // this.$emit('updatePerson', {
      //   ...this.person,
      //   mdas: event.target!.value,
      // })
    },
  },
})
</script>
