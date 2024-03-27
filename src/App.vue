<template>
  <div id="app" class="flex flex-col">
    <img alt="Vue logo" class="self-center" src="./assets/logo.png" />
    <CompProducts />
  </div>
</template>

<script>
import CompProducts from "./components/CompProducts.vue";

export default {
  name: "App",
  components: {
    CompProducts,
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
