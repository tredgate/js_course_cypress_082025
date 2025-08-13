describe("Operování se Cypress", () => {
  it("Přihlášení a odhlášení Pmtool", () => {
    cy.visit("https://tredgate.com/pmtool");
    cy.get("#username").type("cypress_zima_2024");
    cy.get("#password").type("Zima2024Cypress");
    cy.get(".btn").click();
    cy.get("#user_dropdown > .dropdown-toggle").click();
    cy.get("#logout > a").click();
  });
});
