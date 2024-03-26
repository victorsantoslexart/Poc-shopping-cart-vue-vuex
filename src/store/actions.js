/* eslint-disable no-unused-vars */
export default {
  async fetchProducts({ commit, _state }) {
    try {
      if (localStorage.getItem("products")) {
        const prods = JSON.parse(localStorage.getItem("products"));
        commit("setProducts", prods);
        console.log("ENTOU AQUI!!!!!!");
        return;
      }
      const response = await fetch("https://fakestoreapi.com/products");
      const products = await response.json();
      localStorage.setItem("products", JSON.stringify(products));
      commit("setProducts", products);
    } catch (error) {
      console.error("Erro ao buscar produtos:", error);
    }
  },
};
