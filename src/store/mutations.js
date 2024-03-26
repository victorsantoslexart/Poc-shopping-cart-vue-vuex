export default {
  setProducts(state, products) {
    state.products = products;
    localStorage.setItem("products", JSON.stringify(products));
  },
  addActualProduct(state, product) {
    state.actualProduct = product;
  },
};
