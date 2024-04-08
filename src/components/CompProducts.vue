<template>
  <div class="products">
    <div class="flex justify-left gap-x-10 ml-10 items-start">
      <div class="max-h-[500px] w-[50%] flex flex-col justify-start">
        <h1 class="text-2xl text-left font-bold mb-4">Products</h1>
        <h3 class="text-lg text-left mt-0 mb-4">
          Select the products you want to edit and make changes below
        </h3>
        <div
          class="overflow-y-auto border-collapse border-slate-200 border-2 table-auto rounded-xl group"
        >
          <table class="min-w-full overflow-y-auto h-72">
            <thead class="border-b border-neutral-200 font-medium">
              <tr class="text-left text-slate-400">
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
            <tbody class="text-left text-black">
              <tr
                v-for="(product, index) in getProducts"
                :key="product.id"
                class="border-b"
                :class="index % 2 === 0 ? 'bg-gray-100' : 'bg-white'"
              >
                <td class="p-2">
                  <input
                    v-model="product.checked"
                    @change="changeChecked"
                    type="checkbox"
                    class="mr-2"
                  />
                </td>
                <td class="p-2 max-w-32">{{ product.title }}</td>
                <td
                  class="p-2 whitespace-nowrap overflow-hidden overflow-ellipsis max-w-[20ch]"
                >
                  {{ product.description }}
                </td>
                <td class="p-2">$ {{ Number(product.price).toFixed(2) }}</td>
                <td class="p-2">{{ product.discount }}%</td>
                <td class="p-2">
                  <button
                    @click="addToActualProducts(product)"
                    type="button"
                    class="flex items-center justify-center px-4 py-2 bg-transparent text-white text-16 cursor-pointer"
                  >
                    <svg
                      class="w-6 h-6 mr-2"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect width="24" height="24" fill="bg-transparent" />
                      <path
                        d="M9.5 7L14.5 12L9.5 17"
                        stroke="#000000"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </button>
                </td>
                <td class="p-2">
                  <button
                    class="rounded-md bg-auto text-white p-1 hover:bg-red-600 transition duration-900"
                    type="button"
                    @click="deletedActual(product)"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="w-6 h-6 mr-2"
                      viewBox="0 0 35 50"
                    >
                      <path
                        d="M 21 0 C 19.354545 0 18 1.3545455 18 3 L 18 5 L 10.15625 5 A 1.0001 1.0001 0 0 0 9.8378906 5 L 8 5 A 1.0001 1.0001 0 1 0 8 7 L 9.0859375 7 L 12.705078 47.5 L 12.707031 47.509766 C 12.857262 48.862232 13.981872 50 15.400391 50 L 34.599609 50 C 36.018128 50 37.142691 48.862266 37.292969 47.509766 L 37.294922 47.5 L 40.914062 7 L 42 7 A 1.0001 1.0001 0 1 0 42 5 L 40.173828 5 A 1.0001 1.0001 0 0 0 39.841797 5 L 32 5 L 32 3 C 32 1.3545455 30.645455 0 29 0 L 21 0 z M 21 2 L 29 2 C 29.554545 2 30 2.4454545 30 3 L 30 5 L 20 5 L 20 3 C 20 2.4454545 20.445455 2 21 2 z M 11.09375 7 L 18.832031 7 A 1.0001 1.0001 0 0 0 19.158203 7 L 30.832031 7 A 1.0001 1.0001 0 0 0 31.158203 7 L 38.90625 7 L 35.306641 47.289062 C 35.256918 47.736563 34.981091 48 34.599609 48 L 15.400391 48 C 15.018909 48 14.743082 47.736563 14.693359 47.289062 L 11.09375 7 z M 18.984375 9.9863281 A 1.0001 1.0001 0 0 0 18 11 L 18 44 A 1.0001 1.0001 0 1 0 20 44 L 20 11 A 1.0001 1.0001 0 0 0 18.984375 9.9863281 z M 24.984375 9.9863281 A 1.0001 1.0001 0 0 0 24 11 L 24 44 A 1.0001 1.0001 0 1 0 26 44 L 26 11 A 1.0001 1.0001 0 0 0 24.984375 9.9863281 z M 30.984375 9.9863281 A 1.0001 1.0001 0 0 0 30 11 L 30 44 A 1.0001 1.0001 0 1 0 32 44 L 32 11 A 1.0001 1.0001 0 0 0 30.984375 9.9863281 z"
                      />
                    </svg>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <button
          class="self-start rounded-md text-white p-1 bg-red-600 text-white transition duration-900 mt-3 hover:bg-red-700"
          @click="deleteSelecteds()"
          type="button"
        >
          Delete selected
        </button>
      </div>
      <ChangeProducts class="ml-4" />
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import ChangeProducts from "./ChangeProducts.vue";

export default {
  name: "CompProducts",
  computed: {
    ...mapGetters(["getProducts"]),
    selectAll: {
      get() {
        return this.getProducts.every((product) => product.checked);
      },
      set(value) {
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
    deletedActual(product) {
      const newProds = this.getProducts.filter((e) => e.id !== product.id);
      this.setProducts(newProds);
    },
    deleteSelecteds() {
      const checkeds = this.getProducts.filter((e) => !e.checked);
      this.setProducts(checkeds);
    },
    toggleAll(event) {
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
