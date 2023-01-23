context("UI test automation", () => {

  describe("First cypress test automation", () => {
    
    let testData;

    beforeEach(() => {
      cy.fixture("application").then((data) => {
        testData = data;
        cy.visit(testData.url);
      });
    });

    it("Fill Global SQA application form", () => {
      cy.fixture("application.json").then(() => {
        cy.get("#g2599-name").type(testData.name);
        cy.get("#g2599-email").type(testData.email);
        cy.get("#g2599-website").type(testData.website);
        cy.get("#g2599-experienceinyears").select("7-10");
      });
    });

  });
});
