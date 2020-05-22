/// <reference types="cypress" />

context('Actions', () => {
    beforeEach(() => {
      cy.visit('http://localhost:4200/view-students')
    }) 

    it('.click() - click on edit button', () => {
        
        cy.get('.action-block')
        .get(':nth-child(1) > .text-center > .far')
        .click()

        cy.get(':nth-child(1) > :nth-child(1) > .form-control')
        .should('have.value', '04/2017/1977D')

        cy.get(':nth-child(1) > :nth-child(2) > .form-control')
        .should('have.value', 'Bright')

        cy.get(':nth-child(1) > :nth-child(3) > .form-control')
        .should('have.value', 'Amegbor')

        cy.get(':nth-child(2) > :nth-child(1) > .form-control')
        .should('have.value', 'bryt.caius@gmail.com')

        cy.get(':nth-child(2) > :nth-child(2) > .form-control')
        .type('0244715116')

        cy.get('.form-group > .btn')
        .click()

    })

    // it('.click() - click on search button', () => {
        
    //     cy.get('.custom-fa-search')
    //       .click()

    //     cy.get('input.form-control')
    //     .type('04/2017/1974D', {delay: 100})
    //     .should('have.value', '04/2017/1974D')
    //     .get('button[type=submit]').click()

    //     cy.contains('No student found!')
    // })


})