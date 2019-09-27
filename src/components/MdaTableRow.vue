<template>
  <div class="mda-table-row">
    <legend>User {{ person.cwid }}</legend>
    <MdaTableCell
      :person="person"
      @updatePerson="$emit('updatePerson', $event)"
      field="name"
    />
    <MdaTableCell
      :person="person"
      @updatePerson="$emit('updatePerson', $event)"
      field="cwid"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import MdaTableCell from './MdaTableCell.vue'

export default Vue.extend({
  name: 'MdaTableRow',
  components: {
    MdaTableCell,
  },
  model: {
    prop: 'person',
    event: 'updatePerson',
  },
  props: {
    busy: {
      type: Boolean,
      required: true,
    },
    person: {
      type: Object,
      required: true,
    },
  },
})
</script>

<style scoped>
legend {
  display: none;
}
</style>
