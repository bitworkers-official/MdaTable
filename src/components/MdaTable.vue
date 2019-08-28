<template>
  <div class="MdaTable">
    <h1>{{ msg }}</h1>
    <p> here goes the table </p>
    
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
