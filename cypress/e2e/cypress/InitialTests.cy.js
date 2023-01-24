describe("Test", () => {
  it("Verify cypress in built assertions - Test01", () => {
    cy.visit("https://demo.nopcommerce.com/");
    cy.title().and("eq", "nopCommerce demo store"); //assertions
    cy.get(".ico-register").should("be.visible").should("exist");
    cy.get(".ico-register").click();
    cy.get("#FirstName").type("Test automation"); //css locators
    cy.xpath("//select[@name='DateOfBirthDay']//option").should(
      "have.length",
      "32"
    ); //xpath locators
    cy.xpath("//select[@name='DateOfBirthDay']")
      .xpath("./option")
      .should("have.length", 32);
    cy.url().should("contain", "nopcommerce").and("include", "nopcommerce"); //assertions (Implicit in built cy assertions)
  });

  //chai or BDD assertions (Explicit assertions) //can be declared inside user defined js function
  it("Verify BDD assertions - Test02", () => {
    cy.visit("https://demo.nopcommerce.com/");
    cy.get(".ico-register").click();
    cy.get("#FirstName").type("Test automation");
    cy.get("h1").then((value) => {
      let inputValue = value.text();
      expect(inputValue).to.equal("Register");
      expect(inputValue).to.not.equal("Testing assertion");
    });
  });

  //TDD assertions (Explicit assertions) //can be declared inside user defined js function
  it("Verify TDD assertions - Test03", () => {
    cy.visit("https://demo.nopcommerce.com/");
    cy.get(".ico-register").click();
    cy.get("#FirstName").type("Test automation");
    cy.get("h1").then((value) => {
      let inputValue = value.text();
      assert.strictEqual(
        inputValue,
        "Test",
        "FirstName not macthes with expected one"
      );
    });
  });

  //Radio button and checkboxes
  it("Verify Radio button and checkboxes - Test04", () => {
    cy.visit("https://itera-qa.azurewebsites.net/home/automation");
    cy.get("#female").check().should("be.checked");
    cy.get("#monday").check().should("be.checked");
  });

  //select from dropdown
  it("select from dropdown - Test05", () => {
    cy.visit("https://demo.nopcommerce.com/");
    cy.get(".ico-register").click();
    cy.get('[name="DateOfBirthDay"]').select("22");
    cy.get('[name="DateOfBirthMonth"]')
      .select("April")
      .should("have.value", "April");
    cy.get('[name="DateOfBirthYear"]')
      .select("1991")
      .should("have.value", "1991");
  });

  //Mouse hover and click action
  it.only("Mouse hover and click action - Test06", () => {
    cy.visit("https://www.flipkart.com/");
    cy.contains("Electronics").click();
    cy.get('._1kidPb > :nth-child(1)').trigger('mouseover');
    cy.get("a[title='Apple']").click();
  });

  //Type into text box and click enter
  it("Mouse hover and click action - Test07", () => {
    cy.visit("https://demo.nopcommerce.com/");
    cy.get(".ico-login").click();
    cy.get("input#Email").type("testautomation@gmail.com");
    cy.get("input#Password").type("testautomation@1").type("{enter}");
  });

  //Select drop dowm from list - static values list  //Ctrl + k + f to format
  it("Select drop dowm from list - Test08", () => {
    cy.visit("https://www.wikipedia.org/");
    cy.get("input#searchInput").type("India").click();
    cy.get("#typeahead-suggestions div a").contains("Indiana").click();
  });

  //Select drop dowm from list - alternate way
  it("Select drop dowm from list alternate way - Test09", () => {
    cy.visit("https://www.google.com/");
    cy.get("#L2AGLb > .QS5gu").click();
    cy.get(".gLFyf").type("playwright git");
    cy.wait(3000);
    cy.get("div.wM6W7d>span").each(($element) => {
      if ($element.text() == "playwright github") {
        cy.wrap($element).click();
      }
    });
  });

  //Handle alert and read message. By default JS handles alert by clicking confirm button
  it("Handle alert by clicking confirm button- Test10", () => {
    cy.visit("https://testpages.herokuapp.com/styled/alerts/alert-test.html");
    cy.get("input#alertexamples").click();
    cy.on("window:alert", (test) => {
      assert.equal(test, "I am an alert box!", "Alert message is in correct");
      expect(test).to.contains("I am an alert box!");
    });
  });

  //Handle alert and click cancel or confirm.
  it("Handle alert and click cancel or confirm- Test11", () => {
    cy.visit("https://testpages.herokuapp.com/styled/alerts/alert-test.html");
    cy.get("input#confirmexample").click();
    cy.on("window:confirm", (test) => {
      //store alert in test
      assert.equal(test, "I am a confirm alert", "Alert message is in correct");
      expect(test).to.contains("I am a confirm alert");
    });
    cy.on("window:confirm", () => false); //to click cancel in confirm box
  });

  //Handle multiple windows in two ways - first way
  it("Handle windows by reading href value and launch url- Test12", () => {
    cy.visit("https://www.sogeti.com/");
    cy.get(".acceptCookie").click();
    cy.get(".sprite-global-arrowdown").click();
    cy.get("#country-list-id > ul > :nth-child(1) > a").then((element) => {
      let url = element.prop("href");
      cy.visit(url);
    });
    cy.url().should("equal", "https://www.sogeti.be/"); //this can't be achieved if domain differ between parent & child window
  });

  //Handle multiple windows in two ways - second way
  it("Handle windows by remove target attribute and click on it- Test13", () => {
    cy.visit("https://www.sogeti.com/");
    cy.get(".acceptCookie").click();
    cy.get(".sprite-global-arrowdown").click();
    cy.get("#country-list-id > ul > :nth-child(1) > a")
      .invoke("removeAttr", "target")
      .click();
    cy.wait(3000);
    cy.get(".acceptCookie").click();
    cy.url().should("equal", "https://www.sogeti.be/"); //remove target work with respective to domain
    cy.go("back");
  });

  //Handle frames - one way
  it("Handle frames in first way - Test14", () => {
    cy.login1und1(); //it is declared in cypress command
    cy.get("#login-button").click();
    cy.get("#login-email").type("int_01@mail.com");
    cy.get("#login-password").type("3457576545635345");
    cy.get("#header-login-box > form > .btn > span").click();
    cy.wait(25000);
    cy.get('[data-test="third-party-frame_home"]')
      .its("0.contentDocument.body")
      .then(cy.wrap)
      .find("a.mail")
      .click();
  });

  //Handle frames - second way ---- not working
  it.only("Handle frames in second way - Test15", () => {
    cy.login1und1(); //it is declared in cypress command
    cy.get("#login-button").click();
    cy.get("#login-email").type("int_01@mail.com");
    cy.get("#login-password").type("3457576545635345");
    cy.get("#header-login-box > form > .btn > span").click({ force: true }); // to click on element even if it is hidden or not visible
    cy.frameLoaded('[data-test="third-party-frame_home"]', { timeout: 25000 });
    cy.iframe('[data-test="third-party-frame_home"]')
      .then(cy.wrap)
      .find("a.mail")
      .click();
  });

  //Scroll to bottom of the page
  it("Scroll to bottom of the page - Test16", () => {
    cy.visit("https://www.globalsqa.com/samplepagetest/");
    cy.scrollTo("bottom")
      .get("#menu-item-1919 > a")
      .invoke("removeAttr", "target")
      .click();
  });
});
