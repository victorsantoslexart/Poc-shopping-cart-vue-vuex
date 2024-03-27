<template>
  <div class="products">
    <h1 class="text-2xl font-bold mb-4">Products</h1>
    <h3 class="text-lg mt-0 mb-4">
      Select the products you want to edit and make changes below
    </h3>
    <div class="flex justify-evenly items-start overflow-x-auto">
      <div
        class="overflow-auto max-h-[300px] w-[50%] mt-[60px] flex self-center justify-center"
      >
        <table class="w-full border-collapse table-auto overflow-scroll">
          <thead>
            <tr>
              <th class="p-2">
                <input
                  type="checkbox"
                  v-model="selectAll"
                  @change="toggleAll"
                  class="mr-2"
                />
              </th>
              <th class="p-2">Name</th>
              <th class="p-2">Description</th>
              <th class="p-2">Price</th>
              <th class="p-2">Discount</th>
            </tr>
          </thead>
          <tbody
            class="bg-whitesmoke text-black max-h-[160px] overflow-y-auto custom-scroll"
          >
            <tr
              v-for="product in getProducts"
              :key="product.id"
              class="border-b"
            >
              <td class="p-2">
                <input
                  v-model="product.checked"
                  @change="changeChecked"
                  type="checkbox"
                  class="mr-2"
                />
              </td>
              <td class="p-2">{{ product.title }}</td>
              <td
                class="p-2 whitespace-nowrap overflow-hidden overflow-ellipsis max-w-44"
              >
                {{ product.description }}
              </td>
              <td class="p-2">{{ product.price }}</td>
              <td class="p-2">{{ product.discount }}%</td>
              <td class="p-2">
                <button
                  @click="addToActualProducts(product)"
                  type="button"
                  class="flex items-center justify-center px-4 py-2 bg-whitesmoke text-white text-16 cursor-pointer"
                >
                  <svg
                    class="w-6 h-6 mr-2"
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
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <ChangeProducts class="ml-4" />
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import ChangeProducts from "./ChangeProducts.vue";

// console.log(this.$store.products);
export default {
  // mounted() {
  //   this.getProducts();
  // },
  // computed: mapGetters([
  //   'getProducts'
  // ]),
  name: "CompProducts",
  computed: {
    ...mapGetters(["getProducts"]),
    selectAll: {
      get() {
        // Verificar se todos os produtos estão selecionados
        return this.getProducts.every((product) => product.checked);
      },
      set(value) {
        // Marcar ou desmarcar todos os produtos com base na checkbox "Select All"
        this.getProducts.forEach((product) => {
          product.checked = value;
        });
        this.setProducts(this.getProducts);
      },
    },
  },
  methods: {
    ...mapMutations(["addActualProduct", "setProducts"]),
    addToActualProducts(product) {
      this.addActualProduct(product);
    },
    toggleAll(event) {
      // Marcar ou desmarcar todos os produtos com base na checkbox "Select All"
      this.selectAll = event.target.checked;
    },
    changeChecked(e) {
      const newProds = this.getProducts.map((p) => ({
        checked: e.target.checked,
        ...p,
      }));
      this.setProducts(newProds);
    },
  },
  components: {
    ChangeProducts,
  },
};
</script>

<style scoped>
.custom-scroll {
  max-height: 160px;
  overflow-y: auto;
}
</style>
