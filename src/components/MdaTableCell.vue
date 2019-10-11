<template>
  <td :class="field" class="mda-table-cell">
    <!-- eslint-disable-next-line -->
    <input
      :id="id"
      :value="person[field]"
      @input="handleInput"
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
  name: 'MdaTableCell',
  model: {
    prop: 'person',
    event: 'updatePerson',
  },
  props: {
    field: {
      type: String,
      required: true,
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
  computed: {
    id(): string {
      return `${this.person.cwid}-${this.field}`
    },
  },
  methods: {
    handleInput(event: any) {
      this.$emit('updatePerson', {
        ...this.person,
        [this.field]: event.target!.value,
      })
    },
    // handleInput() {
    //   this.dirty = true
    // },
    // handleBlur() {
    //   if (this.dirty) {
    //     this.$emit('update')
    //   }
    // }
  },
})
</script>
