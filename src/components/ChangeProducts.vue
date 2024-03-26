<template>
  <form name="changer">
    <div>
      <label for="name">Name:</label>
      <input type="text" name="name" id="name" v-model="localProduct.title" />
    </div>
    <div>
      <label for="desc">Description:</label>
      <input
        type="text"
        name="desc"
        id="desc"
        v-model="localProduct.description"
      />
    </div>
    <div>
      <label for="price">Price:</label>
      <input type="text" name="price" id="price" v-model="localProduct.price" />
    </div>
    <div>
      <label for="disc">Discount:</label>
      <input
        type="text"
        name="disc"
        id="disc"
        v-model="localProduct.discount"
      />
    </div>
    <button form="changer" type="button" @click="saveChanges">Save</button>
    <button form="changer" type="button" @click="cancelChanges">Cancel</button>
  </form>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";

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
    cancelChanges() {
      this.localProduct = {};
      this.addActualProduct({});
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
