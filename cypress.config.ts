import { defineConfig } from 'cypress'
import path from 'path'

export default defineConfig({
    e2e: {
        setupNodeEvents(on, config) {
            require('@cypress/code-coverage/task')(on, config);
            on('task', {
                resetDatabase() {
                    const fs = require('fs');
                    const testDbPath = path.join(process.cwd(), process.env.LOWDB_PATH || 'test-db.json');
                    const initialData = {
                        items: [
                            { id: "0", name: "Milk", price: 1, purchased: false },
                            { id: "1", name: "Eggs", price: 3, purchased: false },
                            { id: "2", name: "Self-Raising Flour", price: 1.5, purchased: false },
                            { id: "3", name: "Butter", price: 3, purchased: false },
                            { id: "4", name: "Sugar", price: 1, purchased: false },
                            { id: "5", name: "Blueberries", price: 2, purchased: false },
                            { id: "6", name: "Maple Syrup", price: 2, purchased: false },
                        ]
                    };
                    if (!fs.existsSync(testDbPath)) {
                        fs.mkdirSync(path.dirname(testDbPath), { recursive: true });
                    }
                    fs.writeFileSync(testDbPath, JSON.stringify(initialData, null, 2));
                    return null;
                }
            });
            return config;
        },

        baseUrl: 'http://localhost:3000',
        specPattern: 'cypress/**/*.cy.{js,jsx,ts,tsx}',
        supportFile: 'cypress/support/e2e.ts',
    },
})
