import { defineConfig } from 'cypress'

export default defineConfig({
    e2e: {
        setupNodeEvents(on, config) {
            require('@cypress/code-coverage/task')(on, config);
            return config;
        },
        baseUrl: 'http://localhost:3000',
        specPattern: 'cypress/**/*.cy.{js,jsx,ts,tsx}',
        supportFile: 'cypress/support/e2e.ts',
    },
})
