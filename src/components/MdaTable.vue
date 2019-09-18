<template>
  <div class="MdaTable">
    <h1>{{ msg }}</h1>
    <h2>{{ petersData }}</h2>
    <p>{{ peoples }}</p>
    <p>here goes the tabletest</p>

    <div id="example1">
      <button v-on:click="addSomone">Add Someone</button>
    </div>

    <!--

      tabelle mit v-for

    -->
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  el: "#example1",
  name: "MdaTable",
  props: {
    msg: String
  },
  // why is that different anon. function then props ??
  data: function() {
    return {
      petersData:
        "hello my very own data from the view model aka vue data object",
      peoples: [
        { name: "peter", cwid: "ezhoz" },
        { name: "paul", cwid: "abcde" },
        { name: "marry", cwid: "fghij" }
      ],
      // actually doing something is probably not best practice to locate here ??
      addSomone: function() {
        this.peoples.push({ name: "newGuy", cwid: "xyzab" });
      }
    };
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
