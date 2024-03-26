export default {
  setProducts(state, products) {
    state.products = products;
    console.log("aqui tambem entrou!!");
  },
  addActualProduct(state, product) {
    state.products = product;
  },
};
