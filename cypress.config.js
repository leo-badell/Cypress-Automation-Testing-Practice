const { defineConfig } = require("cypress");

module.exports = defineConfig({
  env: {
    baseUrl: 'https://practice.expandtesting.com/'
  },
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
