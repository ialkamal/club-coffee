describe("Form Test", () => {
  it("Validate form fields", () => {
    cy.visit("localhost:3000");
    cy.get("[data-cy=HMOButton]").click().url().should("include","/order/coffee")
    cy.get("[data-cy=name]").type("Ismail AlKamal").should("have.value","Ismail AlKamal")
    cy.get("[data-cy=tel]").type("00966544304308").should("have.value","00966544304308")
    cy.get("[data-cy=coffeeType]").select("Espresso").should("have.value","Espresso")
    cy.get("[data-cy=temperature]").select("Iced").should("have.value","Iced")
    cy.get("[data-cy=milkChoice]").select("Skim").should("have.value","Skim")
    cy.get("[data-cy=cinnamon]").check().should("be.checked")
    cy.get("[data-cy=special]").type("Need it in 15 minutes").should("have.value","Need it in 15 minutes")
    cy.get("[data-cy=submit]").should("not.be.disabled").click()
  });
});
