<template>
  <div class="products">
    <h1>Products</h1>
    <h3>Select the products you want to edit and make changes below</h3>
    <table>
      <thead>
        <tr>
          <th><input type="checkbox" /></th>
          <th>Name</th>
          <th>Description</th>
          <th>Price</th>
          <th>Category</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="product in getProducts" :key="product.id">
          <input type="checkbox" />
          <td>{{ product.title }}</td>
          <td class="description">{{ product.description }}</td>
          <td>{{ product.price }}</td>
          <td>{{ product.category }}</td>
          <button type="button" class="button-with-svg">
            <svg
              class="icon"
              width="800px"
              height="800px"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect width="24" height="24" fill="whitesmoke" />
              <path
                d="M9.5 7L14.5 12L9.5 17"
                stroke="#000000"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </button>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

// console.log(this.$store.products);
export default {
  // mounted() {
  //   this.getProducts();
  // },
  // computed: mapGetters([
  //   'getProducts'
  // ]),
  computed: mapGetters(["getProducts"]),
  name: "CompProducts",
};
</script>

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

.description > {
  width: 50%;
}

.description {
  width: 10ch;
  overflow: hidden;
  text-overflow: ellipsis;
  /* white-space: nowrap; */
}

tbody {
  background-color: whitesmoke;
  color: black;
  width: 50%;
}

.button-with-svg {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px 20px;
  border: none;
  background-color: whitesmoke;
  color: #fff;
  font-size: 16px;
  cursor: pointer;
}

.icon {
  width: 24px;
  height: 24px;
  margin-right: 8px;
}
</style>
