/// <reference types="cypress" />

context('Actions', () => {
    beforeEach(() => {
      cy.visit('http://localhost:4200/view-students')
    }) 

    it('.click() - click on search button', () => {
        
        cy.get('.custom-fa-search')
          .click()

        cy.get('input.form-control')
        .type('04/2017/1977D', {delay: 100})
        .should('have.value', '04/2017/1977D')
        .get('button[type=submit]').click()

        cy.contains('Programme:')
    })

    it('.click() - click on search button', () => {
        
        cy.get('.custom-fa-search')
          .click()

        cy.get('input.form-control')
        .type('04/2017/1974D', {delay: 100})
        .should('have.value', '04/2017/1974D')
        .get('button[type=submit]').click()

        cy.contains('No student found!')
    })


})