describe('Delete Item', () => {

    beforeEach(() => {
        cy.task('resetDatabase').then(() => {
            cy.visit('/')
        })
    })

    it('should display delete buttons for default item', () => {
        cy.get('li').first().find('button[id^="delete-button-"]').should('be.visible')
        cy.get('li').first().find('img[alt="Delete"]').should('be.visible')
    })

    it('should remove item when delete button is clicked', () => {
        cy.get('li').first().find('span.font-semibold').invoke('text').then((itemName) => {
            cy.get('li').first().find('button[id^="delete-button-"]').click()
            cy.contains(itemName).should('not.exist')
        })
    })

    it('should be focusable', () => {
        cy.get('li').first().find('button[id^="delete-button-"]').focus()
        cy.focused().children().first().should('have.attr', 'alt', 'Delete')
    })
})
