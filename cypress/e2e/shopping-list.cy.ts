describe('Shopping List App', () => {

    beforeEach(() => {
        cy.visit('/')
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
})
