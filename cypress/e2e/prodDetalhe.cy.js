describe('Produto - Detalhe', () => {
    beforeEach(() => {
        cy.begin()
        cy.login()
    })

    it('Deve exibir corretamente nome, descrição e preço, ao acessar o detalhe do produto', () => {
        cy.contains('[data-test="inventory-item-name"]', 'Sauce Labs Backpack')
            .closest('[data-test="inventory-item"]')
            .as('product')

        cy.get('@product').within(() => {
            cy.capturaProduto()
            cy.get('[data-test="inventory-item-sauce-labs-backpack-img"]')
                .click()
        })
        cy.url().should('include', 'inventory-item.html')
        cy.validaProdutoDetalhe()
    })

    it('Deve adicionar e remover item do carrinho pelo detalhe', () => {
        cy.get('[data-test="inventory-item-sauce-labs-backpack-img"]')
            .click()

        cy.url().should('include', 'inventory-item.html')

        cy.get('[data-test="add-to-cart"]').click()

        cy.get('[data-test="remove"]')
            .should('be.visible')

        cy.get('[data-test="shopping-cart-link"]')
            .should('be.visible')
            .and('have.text', '1')

        cy.get('[data-test="remove"]').click()

        cy.get('[data-test="add-to-cart"]').should('be.visible')
        cy.get('[data-test="shopping-cart-badge"]').should('not.exist')
    })

    it('Deve manter o estado do produto ao voltar para lista de produtos', () => {
        cy.get('[data-test="inventory-item-sauce-labs-backpack-img"]')
            .click()

        cy.url().should('include', 'inventory-item.html')

        cy.get('[data-test="add-to-cart"]').click()

        cy.get('[data-test="shopping-cart-link"]')
            .should('be.visible')
            .and('have.text', '1')

        cy.get('[data-test="back-to-products"]').click()

        cy.get('[data-test="remove-sauce-labs-backpack"]')
            .should('exist')


    })

})
