describe('CheckOut - Overview', () => {
    beforeEach(() => {
        cy.begin()
        cy.login()
    })

    it('Deve validar subTotal, Taxa e Total no overview', () => {
        cy.addItem('sauce-labs-backpack')
        cy.viewCart()
        cy.goToCheckoutOverview()

        cy.get('[data-test="cart-list"]')
            .should('exist')

        cy.get('[data-test="payment-info-value"]')
            .should('be.visible')

        cy.get('[data-test="shipping-info-value"]')
            .should('be.visible')

        let subTotal
        let tax
        let total

        cy.get('[data-test="subtotal-label"]').then(($el) => {
            subTotal = parseFloat($el.text().replace('Item total: $', ''))
            cy.log(subTotal)
        })

        cy.get('[data-test="tax-label"]').then(($el) => {
            tax = parseFloat($el.text().replace('Tax: $', ''))
            cy.log(tax)
        })

        cy.get('[data-test="total-label"]').then(($el) => {
            total = parseFloat($el.text().replace('Total: $', ''))
            expect(total).to.eq(subTotal + tax)
        })

        cy.get('[data-test="finish"]').click()
        cy.get('[data-test="complete-header"]')
            .should('have.text', 'Thank you for your order!')
    })

    it('Deve validar multiplos produto no overview', () => {
        cy.addItem('sauce-labs-backpack')
        cy.addItem('sauce-labs-bike-light')
        cy.viewCart()
        cy.goToCheckoutOverview()

        cy.get('[data-test="cart-list"]')
            .should('exist')

        cy.get('[data-test="payment-info-value"]')
            .should('be.visible')

        cy.get('[data-test="shipping-info-value"]')
            .should('be.visible')

        let subTotal
        let tax
        let total

        cy.get('[data-test="subtotal-label"]').then(($el) => {
            subTotal = parseFloat($el.text().replace('Item total: $', ''))
            cy.log(subTotal)
        })

        cy.get('[data-test="tax-label"]').then(($el) => {
            tax = parseFloat($el.text().replace('Tax: $', ''))
            cy.log(tax)
        })

        cy.get('[data-test="total-label"]').then(($el) => {
            total = parseFloat($el.text().replace('Total: $', ''))
            expect(total).to.eq(subTotal + tax)
        })

        cy.get('[data-test="finish"]').click()
        cy.get('[data-test="complete-header"]')
            .should('have.text', 'Thank you for your order!')
    })
})

