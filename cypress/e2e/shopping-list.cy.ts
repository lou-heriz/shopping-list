import { ShoppingListHelpers } from "../support/helpers";

describe('Shopping List App', () => {

    beforeEach(() => {
        cy.task('resetDatabase').then(() => {
            cy.visit('/')
        })
    })

    it('should display the shopping list title', () => {
        cy.contains('Shopping List').should('be.visible')
    })

    it('should show all elements on desktop or mobile', () => {
        cy.viewport(375, 667)
        cy.get('h1').should('be.visible')
        cy.get('li').should('be.visible')

        cy.viewport(1024, 768)
        cy.get('h1').should('be.visible')
        cy.get('li').should('be.visible')
    })

    it('should display the total cost of items correctly', () => {
        // Add some items with random price increments using the helper
        const items = [
            { name: 'Test Item 1', priceIncrements: Math.floor(Math.random() * 10) },
            { name: 'Test Item 2', priceIncrements: Math.floor(Math.random() * 10) },
            { name: 'Test Item 3', priceIncrements: Math.floor(Math.random() * 10) },
            { name: 'Test Item 4', priceIncrements: Math.floor(Math.random() * 10) }
        ];

        items.forEach(item => {
            ShoppingListHelpers.addItem(item.name, item.priceIncrements);
        });

        cy.get('.mb-4').contains('Total Cost: £').should('be.visible')

        cy.get('[data-testid="item-price"]').then($prices => {
            let totalFromItems = 0;
            $prices.each((index, element) => {
                const priceText = Cypress.$(element).text().replace('£', '');
                totalFromItems += parseFloat(priceText);
            });

            cy.get('.mb-4').invoke('text').then(totalText => {
                const displayedTotal = parseFloat(totalText.replace('Total Cost: £', ''));
                expect(totalFromItems).to.equal(displayedTotal);
            });
        });
    })
})
