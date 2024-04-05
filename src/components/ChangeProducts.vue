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
        type="number"
        name="price"
        v-model="localProduct.price"
        @input="validateInput($event, 'price')"
        id="price"
        class="w-full border border-gray-300 rounded px-3 py-2"
      />
    </div>
    <div class="mb-4">
      <label for="disc" class="block text-sm text-left font-semibold mb-1">
        Discount:
      </label>
      <input
        type="number"
        name="disc"
        id="disc"
        @input="validateInput($event, 'discount')"
        v-model="localProduct.discount"
        max="100"
        min="0"
        class="w-full border border-gray-300 rounded px-3 py-2"
      />
    </div>
    <div class="flex mt-32 justify-left">
      <button
        id="salveButton"
        form="changer"
        type="button"
        @click="saveChanges"
        class="mr-2 px-4 py-2 bg-black text-white rounded hover:bg-dark-600"
      >
        Save
      </button>
      <button
        form="changer"
        id="cancelButton"
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
    ...mapMutations(["addActualProduct", "setProducts", "pushProducts"]),
    ...mapActions(["reFetchProducts"]),
    validateInput(event, inputType) {
      let inputValue = event.target.value;

      const newNum = inputValue.replace(/\D/g, "");
      if (inputType === "price") {
        this.localProduct.price = newNum;
      }

      if (inputType === "discount") {
        let numericValue = parseInt(newNum);
        if (numericValue > 100 || isNaN(numericValue)) event.target.value = 100;
        if (numericValue < 0) event.target.value = 0;
        this.localProduct.discount = event.target.value;
      }
    },
    async cancelChanges() {
      // await this.reFetchProducts();
      this.addActualProduct({});
      this.localProduct = {};
    },
    saveChanges() {
      if (!this.localProduct?.id) {
        console.log(this.localProduct);
        this.pushProducts(this.localProduct);
        this.addActualProduct({});
        this.localProduct = {};
        return;
      }
      this.addActualProduct({ ...this.localProduct });

      console.log(this.localProduct.id, "ID DE LOCALPRODUCTS");
      const indexToUpdate = this.getProducts.findIndex(
        (p) => p.id === this.localProduct.id
      );
      if (indexToUpdate !== -1) {
        const updatedProducts = [...this.getProducts];
        console.log(updatedProducts[indexToUpdate]);
        updatedProducts[indexToUpdate] = { ...this.localProduct };
        console.log(updatedProducts[indexToUpdate]);
        this.setProducts(updatedProducts);
      }
      this.addActualProduct({});
      this.localProduct = {};
    },
  },
};
</script>

<style scoped></style>
