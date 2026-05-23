class pagLogin{
    fillUsername(username){
        cy.get('input[placeholder="Username"]').type(username)
    }
    fillPassword(password){
        cy.get('input[placeholder="Password"]').type(password)
    }

    submit(){
        cy.get('input[value="Login"]').click()
    }

    login(username, password){
        this.fillUsername(username),
        this.fillPassword(password),
        this.submit()
    }
}

export default new pagLogin()