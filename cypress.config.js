const { defineConfig } = require("cypress");

module.exports = defineConfig({
  allowCypressEnv: false,

  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    video:true,
    baseUrl: 'https://www.saucedemo.com/',
    viewportWidth: 1400,
    viewportHeight: 900
  },
});
