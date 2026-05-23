describe('Validando logout da pagina saucedemo', () => {
    beforeEach(() => {
        cy.begin()
        cy.login()
    })

    it('Usuário deve conseguir fazer logout na página de produtos', () => {
        cy.logout()
    })

    it('Usuário deve conseguir fazer logout dentro do carrinho', () => {
        cy.addItem('sauce-labs-backpack')

        cy.get('[data-test="shopping-cart-link"]').click()

        cy.get('[data-test="inventory-item"]')
            .should('be.visible')

        cy.logout()
    })

    it('Usuário deve conseguir fazer logout dentro do checkout: Your information', () => {
        cy.addItem('sauce-labs-backpack')

        cy.viewCart()

        cy.logout()
    })

    it('Usuário deve conseguir fazer logout dentro do checkout:Overview', () => {
        cy.addItem('sauce-labs-backpack')

        cy.viewCart()
        cy.goToCheckoutOverview()

        cy.logout()
    })

    it('Usuário deve conseguir realizar logout após finalizar compra', () => {
        cy.addItem('sauce-labs-backpack')

        cy.viewCart()
        cy.goToCheckoutOverview()

        cy.get('[data-test="finish"]').click()

        cy.logout()
    })

    /*  it('Carrinho deve ser limpo após logout', ()=>{
      Não vou registrar o teste pois não consigo identificar se na regra de negocio se o
      carrinho precisa ser limpo ao fazer logou
     }) */

    it('Usuário deve permanecer deslogado ao navegar para página anterior', () => {
        cy.logout()
        cy.go('back')

        cy.location('pathname').should('eq', '/')

        cy.get('[data-test="login-button"]')
            .should('be.visible')

        cy.contains('Products')
            .should('not.exist')
    })

    it('Usuário deve ser redirecionado para login ao tentar acessar área interna após logout', () => {
        cy.logout()

        cy.visit('https://www.saucedemo.com/inventory.html', {
            failOnStatusCode:false
        })

        cy.get('[data-test="login-button"]')
            .should('be.visible')
    })
})