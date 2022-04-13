Cypress.Commands.add('fillMandatoryFieldsAndSubmit', function () {
    cy.get('#firstName').type('Ramon')
    cy.get('#lastName').type('Nunes')
    cy.get('#email').type('ramon@nunes.com')
    cy.get('#open-text-area').type('Teste Forte')
    cy.contains('.button', 'Enviar').click()
});