<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png" />
    <CompProducts />
    <ChangeProducts />
  </div>
</template>

<script>
import ChangeProducts from "./components/ChangeProducts.vue";
import CompProducts from "./components/CompProducts.vue";

export default {
  name: "App",
  components: {
    CompProducts,
    ChangeProducts,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
