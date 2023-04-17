const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl : "https://www.sogeti.com/",
    setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on);
    },
  },
  env: {
    scrollToBottom : "https://www.globalsqa.com/samplepagetest/"
  },
  watchForFileChanges: false, // Save the file and stops auto execution in cypress, by default value is true
  video: true,  //video is possible if we run test cases from terminal
  viewportHeight: 720,
  viewportWidth: 1000,
  defaultCommandTimeout: 10000,
  chromeWebSecurity: false,  // to launch target link in a same window
  screenshotOnRunFailure: true, //screenshot is possible if we run test cases from terminal
  reporter: 'cypress-mochawesome-reporter',
  reporterOptions: {
    charts: true,
    reportPageTitle: 'E2E Test Automation',
    embeddedScreenshots: true,
    inlineAssets: true,
    saveAllAttempts: false,
  },
});
