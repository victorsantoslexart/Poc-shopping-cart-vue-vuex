# Documentação do Componente CompProducts

## Descrição
O componente `CompProducts` é responsável por exibir uma lista de produtos e permitir que o usuário os selecione para edição. Ele exibe uma tabela com os detalhes dos produtos, incluindo nome, descrição, preço e desconto. O usuário pode selecionar individualmente os produtos usando caixas de seleção ou selecionar todos os produtos de uma vez.

## Estrutura do Componente
O componente é composto por três seções principais:

1. **Cabeçalho**:
   - Exibe o título "Products" e uma breve descrição.

2. **Lista de Produtos**:
   - Exibe uma tabela contendo os produtos disponíveis para edição.
   - Cada linha da tabela representa um produto e exibe seu nome, descrição, preço, desconto e uma caixa de seleção para selecionar o produto.
   - Um botão ao lado de cada produto permite adicionar o produto aos produtos atualmente em edição.

3. **Componente de Edição de Produtos**:
   - O componente `ChangeProducts` é incluído à direita da lista de produtos para permitir a edição dos produtos selecionados.

## Métodos
- `addToActualProducts(product)`: Adiciona o produto selecionado aos produtos atualmente em edição.
- `toggleAll(event)`: Alterna a seleção de todos os produtos quando o checkbox "Selecionar Todos" é clicado.
- `changeChecked(e)`: Atualiza o estado de seleção do produto quando a caixa de seleção de um produto é clicada.

## Computed Properties
- `selectAll`: Determina se todos os produtos estão selecionados.

## Dependências Externas
- Vuex é usado para o gerenciamento do estado global.
- O componente `ChangeProducts` é importado para permitir a edição dos produtos selecionados.

## Estilos
- O estilo do componente é escrito usando Tailwind com escopo local.
