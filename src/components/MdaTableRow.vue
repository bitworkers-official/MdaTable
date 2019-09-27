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
    <div class="mda-table-cell">
      <button
        :aria-label="`delete user with cwid ${person.cwid}`"
        @click.prevent="$emit('deletePerson', person)"
        @keydown.enter="$emit('deletePerson', person)"
      >
        <icon-trash />
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import MdaTableCell from './MdaTableCell.vue'
import IconTrash from './IconTrash.vue'

export default Vue.extend({
  name: 'MdaTableRow',
  components: {
    MdaTableCell,
    IconTrash,
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
button {
  all: unset;
  cursor: pointer;
}
</style>
