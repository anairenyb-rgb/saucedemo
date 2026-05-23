describe('Carrinho de compras', () => {
    beforeEach(() => {
        cy.begin()
        cy.login()
    })

    it('Deve iniciar com o carrinho vazio', () => {
        cy.get('[data-test="shopping-cart-link"]').click()

        cy.get('[data-test="inventory-item"]')
            .should('not.exist')
    })


    it('Deve alternar botão entre Add e Remove corretamente', () => {
        cy.get('[data-test="add-to-cart-sauce-labs-backpack"]')
            .should('have.text', 'Add to cart')
            .click()

        cy.get('[data-test="remove-sauce-labs-backpack"]')
            .click()

        cy.get('[data-test="add-to-cart-sauce-labs-backpack"]')
            .should('be.visible')
    })

    it('Deve adicionar um item ao carrinho', () => {
        cy.addItem('sauce-labs-backpack')

        cy.get('[data-test="shopping-cart-badge"]')
            .should('have.text', '1')
    })

    it('Deve adicionar multiplos itens ao carrinho', () => {
        cy.addItem('sauce-labs-backpack')
        cy.addItem('sauce-labs-bike-light')

        cy.get('[data-test="shopping-cart-badge"]')
            .should('have.text', '2')
            .click()
        
        cy.get('[data-test="inventory-item-name"]')
        .should('contain','Sauce Labs Backpack')

        cy.get('[data-test="inventory-item-name"]')
        .should('contain','Sauce Labs Bike Light')

         cy.get('[data-test="item-quantity"]')
        .should('have.length', 2)
    })

    it('Deve exibir item corretamente no carrinho', () => {
        cy.addItem('sauce-labs-backpack')

        cy.get('[data-test="shopping-cart-link"]').click()

        cy.get('[data-test="title"]')
            .should('have.text', 'Your Cart')
            .and('be.visible')

        cy.get('[data-test="inventory-item"]')
            .should('have.length', 1)

        cy.get('[data-test="inventory-item-name"]')
            .should('have.text', 'Sauce Labs Backpack')
            .and('be.visible')

        cy.get('[data-test="item-quantity"]')
            .should('be.visible')
            .and('have.text', '1')

        cy.get('[data-test="inventory-item-price"]')
            .should('be.visible')
    })

    it('Deve remover item pela lista de produto', () => {
        cy.addItem('sauce-labs-backpack')

        cy.get('[data-test="shopping-cart-badge"]')
            .should('have.text', '1')

        cy.removeItem('sauce-labs-backpack')

        cy.get('[data-test="shopping-cart-badge"]')
            .should('not.exist')
    })

    it('Deve remover item pela página do carrinho', () => {
        cy.addItem('sauce-labs-backpack')

        cy.get('[data-test="shopping-cart-link"]').click()

        cy.removeItem('sauce-labs-backpack')

        cy.get('[data-test="inventory-item"]').should('not.exist')
    })


    it('Deve manter o item no carrinho após reload', () => {
        cy.addItem('sauce-labs-backpack')

        cy.reload()

        cy.get('[data-test="shopping-cart-badge"]')
            .should('have.text', '1')
    })

    it('Deve retornar para a lista de produtos ao clicar em Continue Shopping', () => {
        cy.addItem('sauce-labs-backpack')
        cy.get('[data-test="shopping-cart-link"]').click()

        cy.get('[data-test="continue-shopping"]').click()

        cy.url()
            .should('include', 'inventory.html')

        cy.get('[data-test="inventory-item"]')
            .should('have.length.greaterThan', 0)

        cy.get('[data-test="shopping-cart-badge"]')
            .should('contain', '1')
    })

})

