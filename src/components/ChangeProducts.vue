<template>
  <form
    name="changer"
    class="w-2/6 flex flex-col grid-cols-1 justify-left mt-8"
  >
    <div class="mb-4">
      <label for="name" class="block text-sm text-left font-semibold mb-1"
        >Name:</label
      >
      <input
        type="text"
        name="name"
        id="name"
        v-model="localProduct.title"
        class="w-full border border-gray-300 rounded px-3 py-2"
      />
    </div>
    <div class="mb-4">
      <label for="desc" class="block text-sm text-left font-semibold mb-1"
        >Description:</label
      >
      <textarea
        type="text"
        name="desc"
        id="desc"
        v-model="localProduct.description"
        class="w-full border border-gray-300 h-28 rounded px-3 py-2"
      />
    </div>
    <div class="mb-4">
      <label for="price" class="block text-sm text-left font-semibold mb-1"
        >Price:</label
      >
      <input
        type="text"
        name="price"
        id="price"
        v-model="localProduct.price"
        class="w-full border border-gray-300 rounded px-3 py-2"
      />
    </div>
    <div class="mb-4">
      <label for="disc" class="block text-sm text-left font-semibold mb-1">
        Discount:
      </label>
      <input
        type="text"
        name="disc"
        id="disc"
        v-model="localProduct.discount"
        class="w-full border border-gray-300 rounded px-3 py-2"
      />
    </div>
    <div class="flex mt-32 justify-left">
      <button
        form="changer"
        type="button"
        @click="saveChanges"
        class="mr-2 px-4 py-2 bg-black text-white rounded hover:bg-dark-600"
      >
        Save
      </button>
      <button
        form="changer"
        type="button"
        @click="cancelChanges"
        class="px-4 py-2 bg-black text-white rounded hover:bg-dark-400"
      >
        Cancel
      </button>
    </div>
  </form>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from "vuex";

export default {
  computed: {
    ...mapGetters(["getActualProduct", "getProducts"]),
    localProduct: {
      get() {
        return { ...this.getActualProduct };
      },
      // eslint-disable-next-line no-unused-vars
      set(value) {
        // this.updateActualProduct({ ...value });
      },
    },
  },
  methods: {
    ...mapMutations(["addActualProduct", "setProducts"]),
    ...mapActions(["reFetchProducts"]),
    async cancelChanges() {
      await this.reFetchProducts();
      this.localProduct = { ...this.getActualProduct };
    },
    saveChanges() {
      this.addActualProduct({ ...this.localProduct });

      const indexToUpdate = this.getProducts.findIndex(
        (p) => p.id === this.localProduct.id
      );
      if (indexToUpdate !== -1) {
        const updatedProducts = [...this.getProducts];
        updatedProducts[indexToUpdate] = { ...this.localProduct };
        this.setProducts(updatedProducts);
      }

      this.localProduct = {};
    },
  },
};
</script>

<style scoped></style>
