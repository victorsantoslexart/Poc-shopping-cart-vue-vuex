/* eslint-disable no-undef */
import { fetchProducts, reFetchProducts } from "@/store/actions";

describe("Testes para fetchProducts", () => {
  it("Deve buscar produtos da API e armazená-los no localStorage", async () => {
    const commit = jest.fn();
    const _state = {};
    const mockProducts = [{ id: 1, title: "Product 1" }];

    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockProducts),
      })
    );

    await fetchProducts({ commit, _state });

    expect(commit).toHaveBeenCalledWith("setProducts", mockProducts);
    expect(localStorage.getItem("products")).toBeDefined();
  });

  it("Deve buscar produtos do localStorage se já estiverem armazenados", async () => {
    const commit = jest.fn();
    const _state = {};
    const mockStoredProducts = [{ id: 1, title: "Product 1" }];

    localStorage.setItem("products", JSON.stringify(mockStoredProducts));

    await fetchProducts({ commit, _state });

    expect(commit).toHaveBeenCalledWith("setProducts", mockStoredProducts);
  });

  it("Deve lidar corretamente com erros ao buscar produtos", async () => {
    const commit = jest.fn();
    const _state = {};
    const errorMessage = "Erro ao buscar produtos";

    global.fetch = jest.fn(() => Promise.reject(errorMessage));

    await fetchProducts({ commit, _state });

    expect(commit).not.toHaveBeenCalled();
    expect(console.error).toHaveBeenCalledWith(
      "Erro ao buscar produtos:",
      errorMessage
    );
  });
});

describe("Testes para reFetchProducts", () => {
  it("Deve buscar produtos originais do localStorage e atualizá-los", async () => {
    const commit = jest.fn();
    const _state = {};
    const mockOriginalProducts = [{ id: 1, title: "Product 1" }];

    localStorage.setItem(
      "originalProducts",
      JSON.stringify(mockOriginalProducts)
    );

    await reFetchProducts({ commit, _state });

    expect(commit).toHaveBeenCalledWith("setProducts", mockOriginalProducts);
    expect(commit).toHaveBeenCalledWith("addActualProduct", {});
  });

  it("Deve buscar produtos da API novamente se não houver produtos originais no localStorage", async () => {
    const commit = jest.fn();
    const _state = {};
    const mockFetchedProducts = [{ id: 1, title: "Product 1" }];

    localStorage.removeItem("originalProducts");

    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockFetchedProducts),
      })
    );

    await reFetchProducts({ commit, _state });

    expect(commit).toHaveBeenCalledWith("setProducts", mockFetchedProducts);
    expect(commit).toHaveBeenCalledWith("addActualProduct", {});
  });

  it("Deve lidar corretamente com erros ao buscar produtos novamente", async () => {
    const commit = jest.fn();
    const _state = {};
    const errorMessage = "Erro ao buscar produtos";

    global.fetch = jest.fn(() => Promise.reject(errorMessage));

    await reFetchProducts({ commit, _state });

    expect(commit).not.toHaveBeenCalled();
    expect(console.error).toHaveBeenCalledWith(
      "Erro ao buscar produtos:",
      errorMessage
    );
  });
});
