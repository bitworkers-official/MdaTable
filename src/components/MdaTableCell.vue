<template>
  <td>{{ person[field] }}</td>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'MdaTableCell',
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
  computed: {
    id(): string {
      return `${this.person.mda}-${this.field}`
    },
  },
})
</script>

<style scoped>
td {
  color: #6f7981;
}
</style>
