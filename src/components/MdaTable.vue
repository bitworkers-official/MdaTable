<template>
  <div :class="{ 'not-first-render': !firstRender }">
    <div class="mda-table-headings">
      <div
        v-if="!firstRender"
        class="mda-table-row mda-table-row-headings"
        aria-hidden
      >
        <div class="mda-table-cell mda-table-heading">
          Name
        </div>
        <div class="mda-table-cell mda-table-heading">
          Cwid
        </div>
        <div class="mda-table-cell mda-table-heading">
          &nbsp;
        </div>
      </div>
    </div>

    <br />

    <transition-group name="mda-table-row" tag="form" class="mda-table">
      <mda-table-row
        v-for="(person, index) in persons"
        :person="person"
        @updatePerson="updatePerson(person, index)"
        @deletePerson="deletePerson(person, index)"
        :key="person.cwid"
        :busy="busy"
      />
    </transition-group>

    <form method="POST">
      <!-- <td>
          <button
            @click="deletePerson(person)"
            @keydown.enter="deletePerson(person)"
          >
            Delete
          </button>
        </!-->
      <!-- <td>
          <button @click="edit(person)" @keydown.enter="edit(person)">
            Edit
          </button>
        </td>
        <td>
          {{ person.cwid }}
        </td>
        <td>
          {{ person.name }}
        </td> -->
      <!-- <li v-for="(iValue, iKey) in value" :key="iKey">
            Object # in Array: {{ key }} Key: {{ iKey }} Value: {{ iValue }} -->

      <!-- if field.edited -->
      <!-- input -->
      <!-- else -->
      <!-- td -->
      <!-- </li> -->
    </form>

    <loading-spinner :spinning="busy" />

    <br />

    <!-- eslint-disable-next-line vue-a11y/click-events-have-key-events -->
    <!-- <button v-on:click="addSomone">Add Someone</button> -->

    <!-- eslint-disable-next-line vue-a11y/click-events-have-key-events -->
    <!-- <button v-on:click="delSomone">Delete Someone</button> -->

    <!-- eslint-disable-next-line vue-a11y/click-events-have-key-events -->
    <!-- <button v-on:click="showAll">Show me all people</button> -->
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import MdaTableRow from './MdaTableRow.vue'
import * as api from '../api/api'
import LoadingSpinner from './LoadingSpinner.vue'

interface Data {
  persons: api.Person[]
  busy: boolean
  firstRender: boolean
}

export default Vue.extend({
  name: 'MdaTable',
  components: {
    MdaTableRow,
    LoadingSpinner,
  },
  data(): Data {
    return {
      persons: [],
      busy: false,
      firstRender: true,
    }
  },
  async beforeMount() {
    this.busy = true
    await this.updatePersons()
    this.busy = false
    this.firstRender = false
  },
  methods: {
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
      console.log('update')
      // await api.updatePerson(person)
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
.mda-table,
.mda-table-headings {
  display: inline-flex;
  flex-direction: column;
}

.mda-table-headings {
  margin: 2rem 1rem 0 1rem;
}

.mda-table-row {
  display: flex;
  border-bottom: 1px solid rgb(231, 231, 231);
}

.mda-table-cell {
  margin: 1rem;
  text-align: left;
  width: 6rem;
}

.mda-table-heading {
  font-size: 1rem;
  font-weight: 700;
  color: #42b983;
}

input {
  border: none;
  border-bottom: 1px solid transparent;
  width: 70px;
}

.mda-table-row {
  transition: transform 1s;
}

.mda-table-row-leave-to {
  transition: transform 1s;

  opacity: 0;
  transform: translate(-100px, 0);
}
.mda-table-row-leave-active {
  height: 0px;
}
</style>
