// Importe as funções a serem testadas
import { fetchProducts, reFetchProducts } from "@/store/actions";

describe("Testes para fetchProducts", () => {
  it("Deve buscar produtos da API e armazená-los no localStorage", async () => {
    const commit = jest.fn();
    const _state = {};
    const mockProducts = [{ id: 1, title: "Product 1" }];

    // Mock da função fetch
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockProducts),
      })
    );

    // Chame a função fetchProducts com o mock do commit e _state
    await fetchProducts({ commit, _state });

    // Verifique se commit foi chamado corretamente
    expect(commit).toHaveBeenCalledWith("setProducts", mockProducts);
    expect(localStorage.getItem("products")).toBeDefined();
  });

  it("Deve buscar produtos do localStorage se já estiverem armazenados", async () => {
    const commit = jest.fn();
    const _state = {};
    const mockStoredProducts = [{ id: 1, title: "Product 1" }];

    // Simule que há produtos armazenados no localStorage
    localStorage.setItem("products", JSON.stringify(mockStoredProducts));

    // Chame a função fetchProducts com o mock do commit e _state
    await fetchProducts({ commit, _state });

    // Verifique se commit foi chamado corretamente
    expect(commit).toHaveBeenCalledWith("setProducts", mockStoredProducts);
  });

  it("Deve lidar corretamente com erros ao buscar produtos", async () => {
    const commit = jest.fn();
    const _state = {};
    const errorMessage = "Erro ao buscar produtos";

    // Mock da função fetch para retornar erro
    global.fetch = jest.fn(() => Promise.reject(errorMessage));

    // Chame a função fetchProducts com o mock do commit e _state
    await fetchProducts({ commit, _state });

    // Verifique se commit não foi chamado e se o console.error foi chamado com a mensagem de erro
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

    // Simule que há produtos originais no localStorage
    localStorage.setItem(
      "originalProducts",
      JSON.stringify(mockOriginalProducts)
    );

    // Chame a função reFetchProducts com o mock do commit e _state
    await reFetchProducts({ commit, _state });

    // Verifique se commit foi chamado corretamente
    expect(commit).toHaveBeenCalledWith("setProducts", mockOriginalProducts);
    expect(commit).toHaveBeenCalledWith("addActualProduct", {});
  });

  it("Deve buscar produtos da API novamente se não houver produtos originais no localStorage", async () => {
    const commit = jest.fn();
    const _state = {};
    const mockFetchedProducts = [{ id: 1, title: "Product 1" }];

    // Simule que não há produtos originais no localStorage
    localStorage.removeItem("originalProducts");

    // Mock da função fetch
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockFetchedProducts),
      })
    );

    // Chame a função reFetchProducts com o mock do commit e _state
    await reFetchProducts({ commit, _state });

    // Verifique se commit foi chamado corretamente
    expect(commit).toHaveBeenCalledWith("setProducts", mockFetchedProducts);
    expect(commit).toHaveBeenCalledWith("addActualProduct", {});
  });

  it("Deve lidar corretamente com erros ao buscar produtos novamente", async () => {
    const commit = jest.fn();
    const _state = {};
    const errorMessage = "Erro ao buscar produtos";

    // Mock da função fetch para retornar erro
    global.fetch = jest.fn(() => Promise.reject(errorMessage));

    // Chame a função reFetchProducts com o mock do commit e _state
    await reFetchProducts({ commit, _state });

    // Verifique se commit não foi chamado e se o console.error foi chamado com a mensagem de erro
    expect(commit).not.toHaveBeenCalled();
    expect(console.error).toHaveBeenCalledWith(
      "Erro ao buscar produtos:",
      errorMessage
    );
  });
});
