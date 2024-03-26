/* eslint-disable no-unused-vars */
export default {
  async fetchProducts({ commit, _state }) {
    try {
      if (localStorage.getItem("products")) {
        const prods = JSON.parse(localStorage.getItem("products"));
        commit("setProducts", prods);
        return;
      }
      const response = await fetch("https://fakestoreapi.com/products");
      const products = await response.json();
      const pDiscount = products.map((e) => ({
        discount: Number((Math.random() * 100) / 3).toFixed(0),
        checked: false,
        ...e,
      }));
      localStorage.setItem("products", JSON.stringify(pDiscount));
      commit("setProducts", pDiscount);
    } catch (error) {
      console.error("Erro ao buscar produtos:", error);
    }
  },
  async reFetchProducts({ commit, _state }) {
    try {
      const response = await fetch("https://fakestoreapi.com/products");
      const products = await response.json();
      const pDiscount = products.map((e) => ({
        discount: Number((Math.random() * 100) / 3).toFixed(0),
        checked: false,
        ...e,
      }));
      localStorage.setItem("products", JSON.stringify(pDiscount));
      commit("setProducts", pDiscount);
      commit("addActualProduct", {});
    } catch (error) {
      console.error("Erro ao buscar produtos:", error);
    }
  },
};
