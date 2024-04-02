/* eslint-disable no-undef */
import mutations from "@/store/mutations";

const localStorageMock = (() => {
  let store = {};

  return {
    getItem: (key) => store[key],
    setItem: (key, value) => {
      store[key] = value.toString();
    },
    removeItem: (key) => {
      delete store[key];
    },
    clear: () => {
      store = {};
    },
  };
})();

global.localStorage = localStorageMock;

describe("Testes para as mutations", () => {
  let state;

  beforeEach(() => {
    state = {
      products: [],
      actualProduct: null,
    };
  });

  it("Deve setar os produtos corretamente", () => {
    const products = [
      { id: 1, name: "Product 1" },
      { id: 2, name: "Product 2" },
    ];
    mutations.setProducts(state, products);

    expect(state.products).toEqual(products);
    expect(localStorage.getItem("products")).toEqual(JSON.stringify(products));
  });

  it("Deve adicionar o produto atual corretamente", () => {
    const product = { id: 1, name: "Product 1" };
    mutations.addActualProduct(state, product);

    expect(state.actualProduct).toEqual(product);
  });

  it("Deve lidar com um array vazio ao setar os produtos", () => {
    const products = [];
    mutations.setProducts(state, products);

    expect(state.products).toEqual(products);
    expect(localStorage.getItem("products")).toEqual(JSON.stringify(products));
  });

  it("Deve lidar com um produto nulo ao adicionar o produto atual", () => {
    const product = null;
    mutations.addActualProduct(state, product);

    expect(state.actualProduct).toEqual(product);
  });
});
