export class ShoppingListHelpers {

    static addItem(name: string, priceIncrements: number = 0) {
        cy.get('button').contains('+ Add Item').click();
        cy.get('form').should('be.visible');
        cy.get('input[name="name"]').should('be.visible');

        cy.get('input[name="name"]').type(name);

        for (let i = 0; i < priceIncrements; i++) {
            cy.get('button[id="increment-button"]').click();
        }

        cy.get('button[type="submit"]').click();
        cy.get('form').should('not.exist');
        cy.contains(name).should('be.visible');
    }
}
