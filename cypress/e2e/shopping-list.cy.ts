describe('Shopping List App', () => {
    it('should display the shopping list title', () => {
        cy.visit('/')
        cy.contains('Shopping List').should('be.visible')
    })
})
