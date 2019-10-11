<template>
  <table :class="{ 'not-first-render': !firstRender }" class="mda-table">
    <thead class="mda-table-headings">
      <tr
        v-if="!firstRender"
        class="mda-table-row mda-table-row-headings"
        aria-hidden
      >
        <td class="mda-table-cell mda-table-heading topFunction">
          <span
            @click="filterTopFunction = !filterTopFunction"
            @keydown.enter="filterTopFunction = !filterTopFunction"
          >
            Top&nbsp;Function <icon-angle-down />
          </span>
          <div v-if="filterTopFunction" class="filter">
            Filter by Top Function
            <ul>
              <li v-for="topFunction in topFunctions" :key="topFunction">
                <button
                  @click="setFilter({ topFunction })"
                  @keydown.enter="setFilter({ topFunction })"
                >
                  {{ topFunction }}
                </button>
              </li>
            </ul>
          </div>
        </td>
        <td class="mda-table-cell mda-table-heading function">
          <span>Function <icon-angle-down /> </span>
        </td>
        <td class="mda-table-cell mda-table-heading subFunction">
          <span> Sub&nbsp;Function <icon-angle-down /> </span>
        </td>
        <td class="mda-table-cell mda-table-heading subSubFunction">
          <span> Sub&nbsp;Sub&nbsp;Function <icon-angle-down /> </span>
        </td>
        <td class="mda-table-cell mda-table-heading comments">
          <span> Comments <icon-angle-down /> </span>
        </td>
        <td class="mda-table-cell mda-table-heading functionalHead">
          <span> Functional&nbsp;Head <icon-angle-down /> </span>
        </td>
        <td class="mda-table-cell mda-table-heading functionalExpert">
          <span> Functional&nbsp;Expert <icon-angle-down /> </span>
        </td>
        <td class="mda-table-cell mda-table-heading mda">
          <span> Mda <icon-angle-down /> </span>
        </td>
      </tr>
    </thead>

    <transition-group
      @submit.prevent=""
      name="mda-table-row"
      tag="tbody"
      class="mda-table"
    >
      <tr
        v-for="person in filteredPersons"
        :key="person.mda"
        class="mda-table-row"
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
import * as api from '../api/api'

interface Data {
  persons: api.Person[]
  busy: boolean
  firstRender: boolean
  filterTopFunction: boolean
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
    IconAngleDown,
  },
  data(): Data {
    return {
      filterTopFunction: false,
      filter: {},
      persons: [...Array(10)].map((_, index) => ({
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
      return this.persons.map(person => person['function'])
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
      this.filterTopFunction = false
    },
    async updatePersons() {
      this.persons = await api.getPersons()
    },
    async deletePerson(person: api.Person, index: number) {
      this.persons.splice(index, 1)
      this.busy = true
      await api.deletePerson(person)
      this.busy = false
    },
    async updatePerson(person: api.Person, index: number) {
      this.$set(this.persons, index, person)
      this.busy = true
      await api.updatePerson(person)
      this.busy = false
      // await this.updatePersons()
    },
    //So everything should be handlet immeadiatly (no save button)

    //All Operations that are changing the representation of the Data (Filter, Order) can be done on the vue-model alone (array-operations)

    // addSomone() {
    //   this.peoples.push({ name: "newGuy", cwid: "xyzab" });
    //   //webservice.addUser();
    // },
    // delSomone() {
    //   this.peoples.splice(0, 1);
    //   //webservice.delUser();
    // },
    // async showAll() {
    //   alert("please refere to your console.");
    //   //webservice.getPeoples();
    //   // Initialfall

    //   for (let i of this.peoples) {
    //     // eslint-disable-next-line no-console
    //     console.log(i);
    //   }
    // },
    /**
     * @param {any} value
     */
    // async edit(value) {
    //   alert("edit your dataset");
    // }
  },
})
</script>

<style>
.mda-table {
  border-spacing: 2.5rem 2rem;
  margin: 0 auto;
  flex: 0;
}

.mda-table-row {
  position: relative;
}

.mda-table-row::after {
  content: '';
  display: block;
  position: absolute;
  background: rgb(231, 231, 231);
  width: 100%;
  height: 1px;
  bottom: -1rem; /* half of border-spacing */
  left: 0;
}

.mda-table-cell {
  margin: 1rem;
  text-align: left;
}

.mda-table-cell span {
  display: flex;
}

.mda-table-cell svg {
  height: 0.8em;
  margin-left: 0.2rem;
  margin-top: 0.15em;
}

.mda-table-heading {
  font-size: 1rem;
  color: #42b983;
  text-overflow: ellipsis;
  overflow: hidden;
  cursor: pointer;
}

.mda-table-heading.selected {
  font-weight: 700;
}

input {
  border: none;
  border-bottom: 1px solid transparent;
  width: 70px;
}

.mda-table-row {
  transition: transform 0.3s;
}

.mda-table-row-leave-to {
  opacity: 0;
  transform: translate(-100px, 0);
}
.mda-table-row-leave-active {
  height: 0px;
}

/* filter */

ul {
  all: unset;
  list-style: none;
}
button {
  all: unset;
}
.filter {
  color: black;
  position: absolute;
  background: white;
  z-index: 2;
}
</style>
