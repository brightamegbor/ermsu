/// <reference types="cypress" />

context('Actions', () => {
  


    beforeEach(() => {
      cy.visit('http://localhost:4200/register-student')
    }) 
    for (var i=0; i<=100; i++) {

    it('.click() - click on edit button', () => {
        
        cy.get(':nth-child(1) > :nth-child(1) > .form-control')
        .type('04/2018/1247D');

        cy.get(':nth-child(1) > :nth-child(2) > .form-control')
        .type('Fante');

        cy.get(':nth-child(1) > :nth-child(3) > .form-control')
        .type('Vandam');

        cy.get(':nth-child(2) > :nth-child(1) > .form-control')
        .type('HND Computer Science');


        cy.get(':nth-child(2) > :nth-child(2) > .form-control')
        .type('300');

        cy.get(':nth-child(2) > :nth-child(3) > .form-control')
        .type('Morning');

        cy.get(':nth-child(3) > :nth-child(1) > .form-control')
        .type('abenabarima@gmail.com');

        cy.get(':nth-child(3) > :nth-child(2) > .form-control')
        .type('0241558967');

        cy.get(':nth-child(3) > :nth-child(3) > .form-control')
        .type('https://wiki.wmtransfer.com/files/2018/10/181006152350_PhotoID-.png');

        cy.get('.btn-success')
        .click();

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

  }
})