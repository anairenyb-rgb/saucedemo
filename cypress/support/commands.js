// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })


Cypress.Commands.add('begin', () => {
    cy.viewport(1400, 900)
    cy.visit('https://www.saucedemo.com/')
})

Cypress.Commands.add('login', () => {
    cy.get('input[placeholder="Username"]').type('standard_user')
    cy.get('input[placeholder="Password"]').type('secret_sauce')

    cy.get('input[value="Login"]').click()

})

Cypress.Commands.add('addItem', (item) => {
    cy.get(`[data-test="add-to-cart-${item}"]`).click()
})

Cypress.Commands.add('removeItem', (item) => {
    cy.get(`[data-test="remove-${item}"]`).click()
})

Cypress.Commands.add('viewCart', () => {
    cy.get('[data-test="shopping-cart-link"]').click()
    cy.get('[data-test="checkout"]').click()
})

Cypress.Commands.add('goToCheckoutOverview', () => {
    cy.get('[data-test="firstName"]').type('Teste QA')
    cy.get('[data-test="lastName"]').type('Teste')
    cy.get('[data-test="postalCode"]').type('00000-000')
    cy.get('[data-test="continue"]').click()
})

Cypress.Commands.add('capturaProduto', () => {
    cy.get('[data-test="inventory-item-name"]')
        .invoke('text')
        .as('prodName')

    cy.get('[data-test="inventory-item-desc"]')
        .invoke('text')
        .as('prodDesc')

    cy.get('[data-test="inventory-item-price"]')
        .invoke('text')
        .as('prodPrice')
})

Cypress.Commands.add('validaProdutoDetalhe', () => {

    cy.get('@prodName').then(name => {
        cy.get('[data-test="inventory-item-name"]')
            .should('have.text', name)
    })

    cy.get('@prodDesc').then(desc => {
        cy.get('[data-test="inventory-item-desc"]')
            .should('have.text', desc)
    })

    cy.get('@prodPrice').then(price => {
        cy.get('[data-test="inventory-item-price"]')
            .should('have.text', price)
    })

})

Cypress.Commands.add('logout', () => {
    cy.get('[id="react-burger-menu-btn"]')
        .should('be.visible')
        .click()

    cy.get('[id="logout_sidebar_link"]')
        .should('be.visible')
        .click()
    
    cy.url().should('eq', 'https://www.saucedemo.com/')

    cy.get('[data-test="login-button"]')
    .should('be.visible')
    
})

