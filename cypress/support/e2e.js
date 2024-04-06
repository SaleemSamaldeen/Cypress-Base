// ***********************************************************
// This example support/e2e.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import "./commands";
import 'cypress-mochawesome-reporter/register';

// Alternatively you can use CommonJS syntax:
// require('./commands')
require("cypress-xpath"); //to use xpath locators, as this file load before e2e tests

//code to handle an uncaught exception for all tests
Cypress.on( "uncaught:exception", (error, runnable) => {
    return false;
});

//debug the application code or update your test case by adding the below code to handle errors.
cy.on('fail', (err, runnable) => {
    console.log("error message", err.message);
    console.log("runnable", runnable.message);
    return false;
});

