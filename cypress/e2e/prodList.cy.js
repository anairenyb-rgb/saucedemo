describe('Produtos - Listagem', () => {
    beforeEach(() => {
        cy.begin()
        cy.login()
    })

    it('Deve exibir corretamente as informações do produto', () => {
        cy.contains('[data-test="inventory-item-name"]', 'Sauce Labs Backpack')
            .closest('[data-test="inventory-item"]')
            .as('product')

        cy.get('@product').within(() => {
            //imagem
            cy.get('[data-test="inventory-item-sauce-labs-backpack-img"]')
                .should('be.visible')

            //nome
            cy.get('[data-test="inventory-item-name"]')
                .should('be.visible')
                .and('have.text', 'Sauce Labs Backpack')

            //descrição
            cy.get('[data-test="inventory-item-desc"]')
                .should('be.visible')
                .and('not.be.empty')

            //preço
            cy.get('[data-test="inventory-item-price"]')
                .should('be.visible')
                .and('contain', '$')

            //botão adicionar produto no carrinho
            cy.get('[data-test="add-to-cart-sauce-labs-backpack"]')
                .should('be.visible')
        })


    })

    function validaNameOrder(ordem) {
        cy.get('[data-test="inventory-item-name"]').then(($els) => {
            const nomes = [...$els].map(el => el.innerText.trim())

            const classifica = [...nomes].sort((a, b) =>
                ordem === 'asc'
                    ? a.localeCompare(b)
                    : b.localeCompare(a)
            )

            expect(nomes).to.deep.equal(classifica)
        })
    }

    function validaPriceOrder(ordem) {
        cy.get('[data-test="inventory-item-price"]').then(($els) => {
            const precos = [...$els].map(el => Number(el.innerText.replace('$', '')))

            const classifica = [...precos].sort((a, b) =>
                ordem === 'asc'
                    ? a - b : b - a
            )
            expect(precos).to.deep.equal(classifica)
        })
    }

    const filters = {
        az: () => validaNameOrder('asc'),
        za: () => validaNameOrder('desc'),
        lohi: () => validaPriceOrder('asc'),
        hilo: () => validaPriceOrder('desc')
    }

    it('Garantir que os filtros de nomes estão funcionando', () => {

        cy.get('[data-test="product-sort-container"]').select('az')
        cy.get('[data-test="inventory-item-name"]').should('have.length.greaterThan', 0)
        filters.az()

        cy.get('[data-test="product-sort-container"]').select('za')
        cy.get('[data-test="inventory-item-name"]').should('have.length.greaterThan', 0)
        filters.za()

    })

    it('Garantir que os filtros de preços estão funcionando', () => {
        cy.get('[data-test="product-sort-container"]').select('lohi')
        cy.get('[data-test="inventory-item-name"]').should('have.length.greaterThan', 0)
        filters.lohi()

        cy.get('[data-test="product-sort-container"]').select('hilo')
        cy.get('[data-test="inventory-item-name"]').should('have.length.greaterThan', 0)
        filters.hilo()
    })

    it('Deve resetar filtro para padrão', () => {

        cy.get('[data-test="product-sort-container"]').select('za')

        cy.get('[data-test="product-sort-container"]').select('az')

        validaNameOrder('asc')
    })

    it('Deve manter filtro após navegação', () => {
        cy.get('[data-test="product-sort-container"]').select('hilo')

        cy.get('[data-test="inventory-item-name"]')
            .first()
            .click()

        cy.get('[data-test="back-to-products"]').click()

        cy.get('[data-test="product-sort-container"]')
            .should('have.value', 'hilo')

        validaPriceOrder('desc')
    })

})

