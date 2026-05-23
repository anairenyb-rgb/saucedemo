import pagLogin from '../pages/pagLogin'

describe('Validar login do SauceDemo', () => {
  beforeEach(() => {
    cy.begin()
  })

  it('Deve logar com sucesso', () => {
    pagLogin.login('standard_user', 'secret_sauce')

    cy.get('[data-test="title"]')
      .should('be.visible')
      .and('have.text', 'Products')
  })

  it('Deve exibir erro ao tentar logar com usuário inválido', () => {
    pagLogin.login('testeQA', 'teste123')

    cy.get('[data-test="error"]')
      .should('be.visible')
      .and('contain', 'Username and password do not match any user in this service')
  })

  it('Deve exibir erro ao tentar logar com senha inválida', () => {
    pagLogin.login('standard_user', 'teste123')

    cy.get('[data-test="error"]')
      .should('be.visible')
      .and('contain', 'Username and password do not match any user in this service')
  })

  it('Deve exibir erro ao tentar logar com campos vazios', () => {
    cy.get('[data-test="login-button"]').click()

    cy.get('[data-test="error"]')
      .should('be.visible')
      .and('contain', 'Epic sadface: Username is required')
  })

  it('Deve exibir erro ao logar com usuário bloqueado', () => {
    pagLogin.login('locked_out_user', 'secret_sauce')
    cy.get('[data-test="error"]')
      .should('be.visible')
      .and('contain', 'Sorry, this user has been locked out.')
  })

})