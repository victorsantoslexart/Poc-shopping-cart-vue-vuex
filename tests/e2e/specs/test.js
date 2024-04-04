// https://docs.cypress.io/api/table-of-contents

const path = "/localhost:8080/";

describe("CompProducts", () => {
  it("render corretamente", () => {
    cy.visit(path);
    cy.get(".products").should("exist");
  });

  it("Alternar selecionarTodos quando o checkbox é clicado.", () => {
    cy.visit(path);
    cy.wait(1000);
    cy.get('.text-left > :nth-child(1) > .mr-2[type="checkbox"]').click();
    cy.get('input[type="checkbox"]').each(($checkbox) => {
      cy.wrap($checkbox).should("be.checked");
    });
  });

  it("Edita em todos os inputs e salva", () => {
    cy.visit(path);
    cy.wait(1000);
    cy.get(":nth-child(1) > :nth-child(6) > .flex > .w-6 > rect").click();
    cy.get("#name").clear().type("1");
    cy.get("#desc").clear().type("2");
    cy.get("#price").clear().type("3");
    cy.get("#disc").clear().type("4");
    cy.get("#salveButton").click();
    cy.get(".bg-whitesmoke > :nth-child(1) > :nth-child(2)")
      .invoke("text")
      .should("eq", "1");
    cy.get(".bg-whitesmoke > :nth-child(1) > :nth-child(3)")
      .invoke("text")
      .should("eq", " 2 ");
    cy.get(".bg-whitesmoke > :nth-child(1) > :nth-child(4)")
      .invoke("text")
      .should("eq", "3");
    cy.get(".bg-whitesmoke > :nth-child(1) > :nth-child(5)")
      .invoke("text")
      .should("eq", "4%");

    cy.get("#cancelButton").click();
    cy.get(".bg-whitesmoke > :nth-child(1) > :nth-child(2)")
      .invoke("text")
      .should("not.eq", "1");

    cy.get(".bg-whitesmoke > :nth-child(1) > :nth-child(4)")
      .invoke("text")
      .should("eq", "109.95");
    cy.get("#name").should("have.value", "");
  });
});
