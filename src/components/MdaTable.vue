<template>
  <div class="MdaTable">
    <h1>{{ msg }}</h1>
    <h2>{{ petersData }}</h2>
    <p>{{ peoples[2] }}</p>
    <p>here goes the tabletest</p>

    <!-- eslint-disable-next-line vue-a11y/click-events-have-key-events -->
    <button v-on:click="addSomone">Add Someone</button>

    <!--

      tabelle mit v-for

    -->
  </div>
</template>

<script lang="ts">
import Vue from "vue";

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
        { name: "peter", cwid: "ezhoz" },
        { name: "paul", cwid: "abcde" },
        { name: "marry", cwid: "fghij" }
      ]
    };
  },
  methods: {
    addSomone: function() {
      this.peoples.push({ name: "newGuy", cwid: "xyzab" });
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
