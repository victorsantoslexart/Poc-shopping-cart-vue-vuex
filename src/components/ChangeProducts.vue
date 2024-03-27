<template>
  <form name="changer" class="max-w-sm mt-8">
    <div class="mb-4">
      <label for="name" class="block text-sm font-semibold mb-1">Name:</label>
      <input
        type="text"
        name="name"
        id="name"
        v-model="localProduct.title"
        class="w-full border border-gray-300 rounded px-3 py-2"
      />
    </div>
    <div class="mb-4">
      <label for="desc" class="block text-sm font-semibold mb-1"
        >Description:</label
      >
      <input
        type="text"
        name="desc"
        id="desc"
        v-model="localProduct.description"
        class="w-full border border-gray-300 rounded px-3 py-2"
      />
    </div>
    <div class="mb-4">
      <label for="price" class="block text-sm font-semibold mb-1">Price:</label>
      <input
        type="text"
        name="price"
        id="price"
        v-model="localProduct.price"
        class="w-full border border-gray-300 rounded px-3 py-2"
      />
    </div>
    <div class="mb-4">
      <label for="disc" class="block text-sm font-semibold mb-1"
        >Discount:</label
      >
      <input
        type="text"
        name="disc"
        id="disc"
        v-model="localProduct.discount"
        class="w-full border border-gray-300 rounded px-3 py-2"
      />
    </div>
    <div class="flex justify-center">
      <button
        form="changer"
        type="button"
        @click="saveChanges"
        class="mr-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Save
      </button>
      <button
        form="changer"
        type="button"
        @click="cancelChanges"
        class="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
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
      set(value) {
        this.updateActualProduct(value);
      },
    },
  },
  methods: {
    ...mapMutations(["addActualProduct", "setProducts"]),
    ...mapActions(["reFetchProducts"]),
    async cancelChanges() {
      await this.reFetchProducts();
      this.localProduct = {};
      // this.addActualProduct({});
    },
    saveChanges() {
      this.addActualProduct(this.localProduct);
      const newProducts = this.getProducts.map((p) => {
        if (p.id === this.localProduct.id) return this.localProduct;
        return p;
      });
      this.setProducts(newProducts);
      this.localProduct = {};
    },
  },
};
</script>

<style scoped></style>
