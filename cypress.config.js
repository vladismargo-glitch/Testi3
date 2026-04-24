const { defineConfig } = require("cypress");

module.exports = defineConfig({
    e2e: {
        baseUrl: 'https://dev.profteam.su',
        setupNodeEvents(on, config) {
            config.proxy = null;
            return config;
        },
        chromeWebSecurity: false,
        defaultCommandTimeout: 10000,
        requestTimeout: 10000,
        responseTimeout: 30000,
    },
});