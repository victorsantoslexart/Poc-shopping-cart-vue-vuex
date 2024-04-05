export default {
  setProducts(state, products) {
    state.products = products;
    localStorage.setItem("products", JSON.stringify(products));
  },
  pushProducts(state, products) {
    state.products.push({ ...products, id: state.products.length + 1 });
    localStorage.setItem("products", JSON.stringify(state.products));
  },
  addActualProduct(state, product) {
    state.actualProduct = product;
  },
};
