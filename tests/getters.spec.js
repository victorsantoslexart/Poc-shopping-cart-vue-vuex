/* eslint-disable no-undef */
import getters from "@/store/getters";
import { createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";

const localVue = createLocalVue();
localVue.use(Vuex);

describe("getProducts", () => {
  let store;

  beforeEach(() => {
    store = new Vuex.Store({
      state: {
        products: ["Produto A", "Produto B", "Produto C"],
        actualProduct: "Produto A",
      },
      getters: getters,
    });
  });
  test("Deve retornar a lista de produtos corretamente", () => {
    expect(store.getters.getProducts).toEqual([
      "Produto A",
      "Produto B",
      "Produto C",
    ]);
  });

  test("Deve lidar com um estado vazio", () => {
    expect(store.getters.getProducts).not.toEqual([]);
  });
});

describe("getActualProduct", () => {
  let store;

  beforeEach(() => {
    store = new Vuex.Store({
      state: {
        products: ["Produto A", "Produto B", "Produto C"],
        actualProduct: "Produto A",
      },
      getters: getters,
    });
  });
  test("Deve retornar o produto atual corretamente", () => {
    expect(store.getters.getActualProduct).toEqual("Produto A");
  });

  test("Deve lidar com um produto atual ausente", () => {
    expect(store.getters.getActualProduct).not.toEqual("");
  });
});
