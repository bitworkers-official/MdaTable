<template>
  <table :class="{ 'not-first-render': !firstRender }">
    <thead class="mda-table-headings">
      <tr v-if="!firstRender" class="text-green relative">
        <td>
          <filter-drop-down
            :persons="persons"
            :setFilter="setFilter"
            v-model="filter"
            filter-key="topFunction"
            text="Top Function"
          />
        </td>
        <td>
          <filter-drop-down
            :persons="persons"
            :setFilter="setFilter"
            v-model="filter"
            filter-key="function"
            text="Function"
          />
        </td>
        <td>
          <filter-drop-down
            :persons="persons"
            :setFilter="setFilter"
            v-model="filter"
            filter-key="subFunction"
            text="Sub Function"
          />
        </td>
        <td>
          <filter-drop-down
            :persons="persons"
            :setFilter="setFilter"
            v-model="filter"
            filter-key="subSubFunction"
            text="Sub Sub Function"
          />
        </td>
        <td>
          <filter-drop-down
            :persons="persons"
            :setFilter="setFilter"
            v-model="filter"
            filter-key="comments"
            text="Comments"
          />
        </td>
        <td>
          <filter-drop-down
            :persons="persons"
            :setFilter="setFilter"
            v-model="filter"
            filter-key="functionalHead"
            text="Functional Head"
          />
        </td>
        <td>
          <filter-drop-down
            :persons="persons"
            :setFilter="setFilter"
            v-model="filter"
            filter-key="functionalExpert"
            text="Functional Expert"
          />
        </td>
        <td>
          <filter-drop-down
            :persons="persons"
            :setFilter="setFilter"
            v-model="filter"
            filter-key="mda"
            text="Mda"
          />
        </td>
      </tr>
    </thead>

    <transition-group name="mda-table-row" tag="tbody">
      <tr
        v-for="person in filteredPersons"
        :key="person.mda"
        class="hover:bg-gray-200 focus-within:bg-gray-200 relative"
      >
        <mda-table-cell
          :person="person"
          @updatePerson="updatePerson"
          field="topFunction"
        >
        </mda-table-cell>
        <mda-table-cell
          :person="person"
          @updatePerson="updatePerson"
          field="function"
        >
        </mda-table-cell>
        <mda-table-cell
          :person="person"
          @updatePerson="updatePerson"
          field="subFunction"
        >
        </mda-table-cell>
        <mda-table-cell
          :person="person"
          @updatePerson="updatePerson"
          field="subSubFunction"
        >
        </mda-table-cell>
        <mda-table-cell
          :person="person"
          @updatePerson="updatePerson"
          field="comments"
        >
        </mda-table-cell>
        <mda-table-cell
          :person="person"
          @updatePerson="updatePerson"
          field="functionalHead"
        >
        </mda-table-cell>
        <mda-table-cell
          :person="person"
          @updatePerson="updatePerson"
          field="functionalExpert"
        >
        </mda-table-cell>
        <mda-table-cell
          :person="person"
          @updatePerson="updatePerson"
          field="mda"
        ></mda-table-cell>
      </tr>
    </transition-group>

    <loading-spinner :spinning="busy" />
  </table>
</template>

<script lang="ts">
import Vue from 'vue'
import LoadingSpinner from './LoadingSpinner.vue'
import IconAngleDown from './Icons/IconAngleDown.vue'
import MdaTableCell from './MdaTableCell.vue'
import FilterDropDown from './FilterDropDown.vue'
import * as api from '../api/api'

interface Data {
  persons: api.Person[]
  busy: boolean
  firstRender: boolean
  filter: {
    topFunction?: string
    function?: string
    subFunction?: string
    subSubFunction?: string
  }
}

export default Vue.extend({
  name: 'MdaTable',
  components: {
    MdaTableCell,
    LoadingSpinner,
    FilterDropDown,
  },
  data(): Data {
    return {
      filter: {},
      persons: [...Array(80)].map((_, index) => ({
        topFunction: `top function ${index}`,
        function: `function ${index}`,
        subFunction: `sub function ${index}`,
        subSubFunction: `sub sub function ${index}`,
        comments: `comment ${index}`,
        functionalHead: `functional head ${index}`,
        functionalExpert: `functional expert ${index}`,
        mda: `mda ${index}`,
      })),
      busy: false,
      firstRender: true,
    }
  },
  computed: {
    filteredPersons(): api.Person[] {
      return this.persons.filter(person => {
        for (const key in this.filter) {
          // @ts-ignore
          if (person[key] !== this.filter[key]) {
            return false
          }
        }
        return true
      })
    },
    topFunctions(): string[] {
      return this.persons.map(person => person.topFunction)
    },
    functions(): string[] {
      return this.persons.map(person => person.function)
    },
  },
  async created() {
    this.busy = true
    // await this.updatePersons()
    this.busy = false
    this.firstRender = false
  },
  methods: {
    setFilter(filter: any) {
      this.filter = filter
    },
    async updatePersons() {
      this.persons = await api.getPersons()
    },
    async updatePerson(person: api.Person, index: number) {
      this.$set(this.persons, index, person)
      this.busy = true
      await api.updatePerson(person)
      this.busy = false
      // await this.updatePersons()
    },
  },
})
</script>

<style>
/* table { */
/* border-spacing: 1.5rem 1.5rem; */
/* } */
thead tr::after,
tbody tr:not(:last-of-type)::after {
  content: '';
  display: block;
  position: absolute;
  background: rgb(231, 231, 231);
  width: 100%;
  height: 1px;
  left: 0;
  bottom: 0;
}

/* tr:focus-within {
  @apply bg-gray-200;
} */
td {
  @apply p-4;
}
</style>
