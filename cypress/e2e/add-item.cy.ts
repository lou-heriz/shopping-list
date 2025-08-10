import { ShoppingListHelpers } from '../support/helpers'

const closeModalIfOpen = () => {
    if (Cypress.$('.fixed.inset-0').length > 0) {
        cy.get('.fixed.inset-0').click('topLeft')
    }
}

describe('Add Item', () => {

    beforeEach(() => {
        cy.task('resetDatabase').then(() => {
            cy.visit('/')
        })
        console.log("--starting test--")
    })

    afterEach(() => {
        closeModalIfOpen()
    })

    it('should open add item form when button is clicked', () => {
        cy.get('button').contains('+ Add Item').click()
        cy.get('form').should('be.visible')
        cy.get('h2').contains('Add New Item').should('be.visible')
    })

    it('should close add item form when overlay is clicked', () => {
        cy.get('button').contains('+ Add Item').click()
        cy.get('form').should('be.visible')
        cy.get('.fixed.inset-0').click('topLeft')
        cy.get('form').should('not.exist')
    })

    it('should close add item form when cancel button is clicked', () => {
        cy.get('button').contains('+ Add Item').click()
        cy.get('form').should('be.visible')
        cy.get('button').contains('Cancel').click()
        cy.get('form').should('not.exist')
    })

    it('should show price controls with increment/decrement buttons', () => {
        cy.get('button').contains('+ Add Item').click()
        cy.contains('£1.00').should('be.visible')
        cy.get('button[id="increment-button"]').click()
        cy.contains('£1.50').should('be.visible')
        cy.get('button[id="decrement-button"]').click()
        cy.contains('£1.00').should('be.visible')
    })

    it('should disable submit button when name is empty', () => {
        cy.get('button').contains('+ Add Item').click()
        cy.get('button[type="submit"]').should('be.disabled')
        cy.get('input[name="name"]').type('Test Item')
        cy.get('button[type="submit"]').should('not.be.disabled')
    })

    it('should add a new item when form is submitted with valid data', () => {
        cy.intercept('POST', '/api/shopping-list/item').as('addItem')
        ShoppingListHelpers.addItem('Test Item', 1.5)
        cy.get('form').should('not.exist')
        cy.wait('@addItem').its('response.statusCode').should('eq', 201)
        cy.contains('Test Item').should('be.visible')
        cy.contains('£1.50').should('be.visible')
    })

    it('should clear form after successful submission', () => {
        cy.intercept('POST', '/api/shopping-list/item').as('addItem')
        ShoppingListHelpers.addItem('Test Item 2', 1.5)
        cy.get('form').should('not.exist')
        cy.wait('@addItem').its('response.statusCode').should('eq', 201)
        cy.contains('Test Item 2').should('be.visible')
        cy.get('button').contains('+ Add Item').click()
        cy.get('input[name="name"]').should('have.value', '')
        cy.get('span[id="add-item-form-price"]').should('have.text', '£1.00')
    })

    it('should focus on name input when form opens', () => {
        cy.get('button').contains('+ Add Item').click()
        cy.get('input[name="name"]').should('be.focused')
    })

    it('should rollback items when add item fails', () => {
        cy.intercept('POST', '/api/shopping-list/item', {
            statusCode: 500,
            body: { error: 'Failed to add item' }
        }).as('addItem')

        ShoppingListHelpers.addItem('Test Item 3', 1.5)
        cy.wait('@addItem')
        cy.contains('Test Item 3').should('not.exist')
    })
})

