<template>
  <div class="MdaTable">
    <h1>{{ msg }}</h1>
    <p>MDAList (GitHub Version)</p>

    <div v-for="(value, key) in peoples" v-bind:key="key">
      <li v-for="(iValue, iKey) in value" v-bind:key="iKey">
        Object # in Array: {{ key }} Key: {{ iKey }} Value: {{ iValue }}
      </li>
    </div>

    <br />

    <!-- eslint-disable-next-line vue-a11y/click-events-have-key-events -->
    <button v-on:click="addSomone">Add Someone</button>

    <!-- eslint-disable-next-line vue-a11y/click-events-have-key-events -->
    <button v-on:click="delSomone">Delete Someone</button>

    <!-- eslint-disable-next-line vue-a11y/click-events-have-key-events -->
    <button v-on:click="showAll">Show me all people</button>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import * as api from "../api/api";

export default Vue.extend({
  name: "MdaTable",
  props: {
    msg: String
  },
  // why is that different anon. function then props => having multiple instances of this container
  data: function() {
    return {
      petersData:
        "hello my very own data from the view model aka vue data object",
      peoples: [
        { name: "Hans", cwid: "ezhoz" },
        { name: "Heinz", cwid: "abcde" },
        { name: "Herrmann", cwid: "fghij" }
      ]
    };
  },
  methods: {
    //So everything should be handlet immeadiatly (no save button)

    addSomone: function() {
      this.peoples.push({ name: "newGuy", cwid: "xyzab" });
      //webservice.addUser();
    },
    delSomone: function() {
      this.peoples.splice(0, 1);
      //webservice.delUser();
    },
    showAll: async function() {
      alert("please refere to your console.");
      //webservice.getPeoples();
      // Initialfall
      this.peoples = await api.getAllPeople();

      for (let i of this.peoples) {
        // eslint-disable-next-line no-console
        console.log(i);
      }
    }
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
