// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
 
/// <reference types="cypress-xpath" />
/// <reference types="cypress" />
/// <reference types="cypress-iframe" />

Cypress.Commands.add('login1und1', () => {
  return cy.visit("https://www.mail.com/", {timeout : 10000});
});

Cypress.Commands.add('frame', () => {
    return cy.visit("https://www.mail.com/").wait(10000);
});

Cypress.Commands.add('loginMail', (username,password) => {
  cy.visit("https://www.mail.com/", {timeout : 10000});
  cy.get("#login-button").click();
  cy.get("#login-email").type(username);
  cy.get("#login-password").type(password);
});

