describe('CheckOut - Your Information', () => {
    beforeEach(() => {
        cy.begin()
        cy.login()

        cy.addItem('sauce-labs-backpack')
        cy.viewCart()
    })

    it('Cadastrando informações no formulário e enviando', () => {
        cy.get('[data-test="firstName"]').type('Teste QA')
        cy.get('[data-test="lastName"]').type('Teste')
        cy.get('[data-test="postalCode"]').type('00000-000')

        cy.get('[data-test="continue"]').click()

        cy.get('[data-test ="secondary-header"]')
            .should('contain', 'Overview')
    })

     it('Enviando formulário sem o campo First Name', () => {
        cy.get('[data-test="lastName"]').type('Teste')
        cy.get('[data-test="postalCode"]').type('00000-000')

        cy.get('[data-test="continue"]').click()

        cy.get('[data-test="error"]')
            .should('contain', 'Error: First Name is required')
            .and('be.visible')
    })

     it('Enviando formulário sem o campo Last Name', () => {
        cy.get('[data-test="firstName"]').type('Teste QA')
        cy.get('[data-test="postalCode"]').type('00000-000')

        cy.get('[data-test="continue"]').click()

        cy.get('[data-test="error"]')
            .should('contain', 'Error: Last Name is required')
            .and('be.visible')
    })

    it('Enviando formulário sem informação de Zip/Postal Code', () => {
        cy.get('[data-test="firstName"]').type('Teste QA')
        cy.get('[data-test="lastName"]').type('Teste')

        cy.get('[data-test="continue"]').click()

        cy.get('[data-test="error"]')
            .should('contain', 'Error: Postal Code is required')
            .and('be.visible')
    })

    it('Deve manter dados do carrinho ao clicar no botão cancelar', ()=>{
        cy.get('[data-test="cancel"]').click()

        cy.url()
        .should('include', 'cart')

        cy.get('[data-test="cart-list"]')
        .should('exist')

    })
})
