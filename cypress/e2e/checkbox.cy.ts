describe('Shopping List Checkbox', () => {

    beforeEach(() => {
        cy.visit('/')
    })

    it('should display checkbox for shopping item', () => {
        cy.get('li').first().find('input[type="checkbox"]').should('be.visible')
    })

    it('should toggle item purchased state when checkbox is clicked', () => {
        cy.get('li').first().find('input[type="checkbox"]').click()
        cy.get('li').first().find('input[type="checkbox"]').should('be.checked')
        cy.get('li').first().find('span').eq(1).should('have.class', 'line-through')
        cy.get('li').first().find('span').eq(1).should('have.class', 'text-gray-500')

        cy.get('li').first().find('input[type="checkbox"]').click()
        cy.get('li').first().find('input[type="checkbox"]').should('not.be.checked')
        cy.get('li').first().find('span').eq(1).should('not.have.class', 'line-through')
        cy.get('li').first().find('span').eq(1).should('not.have.class', 'text-gray-500')
    })

    it('should be focusable and checkable with space', () => {
        cy.get('li').first().find('input[type="checkbox"]').focus()
        cy.focused().should('have.attr', 'type', 'checkbox')
        cy.focused().type(' ')
        cy.get('li').first().find('input[type="checkbox"]').should('be.checked')
    })
})
