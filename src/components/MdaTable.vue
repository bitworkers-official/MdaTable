<template>
  <div class="MdaTable">
    <h1>MDAList (GitHub Version)</h1>
    <form method="POST">
      <div class="mda-table-row" aria-hidden>
        <div class="mda-table-cell mda-table-heading">
          Name
        </div>
        <div class="mda-table-cell mda-table-heading">
          Cwid
        </div>
      </div>
      <mda-table-row
        v-for="(person, index) in persons"
        :person="person"
        @updatePerson="updatePerson(person, index)"
        :key="person.cwid"
        :busy="busy"
      />

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
    }
  },
  async beforeMount() {
    this.busy = true
    await this.updatePersons()
    this.busy = false
  },
  methods: {
    async updatePersons() {
      this.persons = await api.getPersons()
    },
    async deletePerson(person: api.Person) {
      await api.deletePerson(person)
      await this.updatePersons()
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
form {
  display: inline-flex;
  flex-direction: column;
  margin: 2rem 1rem;
}

.mda-table-row {
  display: flex;
  border-bottom: 1px solid rgb(231, 231, 231);
}

.mda-table-cell {
  flex: 1;
  margin: 1rem;
  text-align: left;
}

.mda-table-heading {
  font-size: 1rem;
  font-weight: 700;
  color: #42b983;
}

input {
  border: none;
  border-bottom: 1px solid transparent;
  /* width: 3rem; */
  /* margin: 0 1rem; */
  /* padding-bottom: 1rem; */
}

/* input:focus { */
/* border-color: #42b983; */
/* } */
</style>
