<template>
  <div>
    <table :class="{ 'not-first-render': !firstRender }">
      <thead class="mda-table-headings sticky z-10 bg-white">
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
          @contextmenu.prevent="$refs.menu.open($event, person)"
          :data-top-function="person.topFunction"
          :data-function="person.function"
          :data-sub-function="person.subFunction"
          :data-sub-sub-function="person.subSubFunction"
          class="hover:bg-gray-200 focus-within:bg-gray-200 relative"
        >
          <mda-table-cell
            :person="person"
            @updatePerson="updatePerson"
            field="topFunction"
          />
          <mda-table-cell
            :person="person"
            @updatePerson="updatePerson"
            field="function"
          />
          <mda-table-cell
            :person="person"
            @updatePerson="updatePerson"
            field="subFunction"
          />
          <mda-table-cell
            :person="person"
            @updatePerson="updatePerson"
            field="subSubFunction"
          />
          <mda-table-cell-with-input
            :person="person"
            @updatePerson="updatePerson"
            field="comments"
          />

          <mda-table-cell-with-input
            :person="person"
            @updatePerson="updatePerson"
            field="functionalHead"
          />
          <mda-table-cell-with-input
            :person="person"
            @updatePerson="updatePerson"
            field="functionalExpert"
          />
          <mda-table-cell-with-input
            :person="person"
            @updatePerson="updatePerson"
            field="mda"
          />
        </tr>
      </transition-group>

      <loading-spinner :spinning="busy" />
    </table>
    <vue-context ref="menu">
      <template slot-scope="child">
        <li>
          <a @click.prevent="focusRow(child.data)" href="#">
            Focus on this row
          </a>
        </li>
      </template>
    </vue-context>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import LoadingSpinner from './LoadingSpinner.vue'
import MdaTableCell from './MdaTableCell.vue'
import MdaTableCellWithInput from './MdaTableCellWithInput.vue'
import FilterDropDown from './FilterDropDown.vue'
import { VueContext } from 'vue-context'
// import 'vue-context/dist/css/vue-context.css'
import * as api from '../api/api'
import copyToClipBoard from 'copy-to-clipboard'

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

const copyRowUrlToClipBoard = (person: api.Person) => {
  const baseUrl = location.protocol + '//' + location.host + location.pathname
  const queryString = new URLSearchParams({
    topFunction: person.topFunction,
    function: person.function,
    subFunction: person.subFunction,
    subSubFunction: person.subSubFunction,
  }).toString()
  copyToClipBoard(baseUrl + '?' + queryString)
}

const updateQueryString = (person: api.Person) => {
  const queryString = new URLSearchParams({
    topFunction: person.topFunction,
    function: person.function,
    subFunction: person.subFunction,
    subSubFunction: person.subSubFunction,
  }).toString()
  window.history.replaceState({}, '', `${location.pathname}?${queryString}`)
}

let $activeRow: HTMLElement | undefined
const setActive = ($row: HTMLElement) => {
  if ($activeRow) {
    $activeRow.classList.remove('active')
  }
  $activeRow = $row
  $activeRow.classList.add('active')
}

const selectByFilter = (filter: object) => {
  for (let key in filter) {
    // @ts-ignore
    if (!filter[key]) {
      // @ts-ignore
      delete filter[key]
    }
  }
  if (Object.keys(filter).length === 0) {
    return
  }
  const selector = Object.entries(filter)
    .map(([key, value]) => `[data-${key}="${value}"]`)
    .join('')
  const $row = document.querySelector(selector) as HTMLElement
  return $row || undefined
}

const focusOnSearchParamsRow = () => {
  const queryString = location.search
  const queryObject = new URLSearchParams(queryString)
  const filter = {
    'top-function': queryObject.get('topFunction'),
    function: queryObject.get('function'),
    'sub-function': queryObject.get('subFunction'),
    'sub-sub-function': queryObject.get('subSubFunction'),
  }
  const $row = selectByFilter(filter)
  if (!$row) {
    return
  }
  window.scrollTo({ top: $row.offsetTop - 250 })
  setActive($row)
}

export default Vue.extend({
  name: 'MdaTable',
  components: {
    MdaTableCell,
    LoadingSpinner,
    FilterDropDown,
    MdaTableCellWithInput,
    VueContext,
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
  async mounted() {
    focusOnSearchParamsRow()
  },
  methods: {
    // copyRowUrlToClipBoard,
    focusRow(person: api.Person) {
      const filter = {
        'top-function': person.topFunction,
        function: person.function,
        'sub-function': person.subFunction,
        'sub-sub-function': person.subSubFunction,
      }
      const $row = selectByFilter(filter) as HTMLElement
      setActive($row)
      updateQueryString(person)
    },
    setFilter(filter: any) {
      this.filter = filter
    },
    async updatePersons() {
      try {
        this.persons = await api.getPersons()
      } catch (error) {
        console.error(error)
        this.$toasted.error('failed to fetch persons')
      }
    },
    async updatePerson(person: api.Person, index: number) {
      this.$set(this.persons, index, person)
      this.busy = true
      try {
        await api.updatePerson(person)
      } catch (error) {
        console.error(error)
        this.$toasted.error('failed to update person')
      } finally {
        this.busy = false
      }
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

tr.active,
tr.active:hover {
  @apply bg-gray-400;
}

thead {
  /* font size and padding of h1 */
  top: calc(1.875rem + 3rem);
}
</style>
