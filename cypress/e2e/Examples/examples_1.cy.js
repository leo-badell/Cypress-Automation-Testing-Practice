describe('First spec', () => {

beforeEach(() => {

  cy.intercept({method:'GET', path: 'inputs'})
  cy.getBaseUrl('/')
  
})

  it('Should manipulate web inputs', () => {
    
    cy.getByClass('card-title').eq(0)
    .should('be.visible')
    .and('contain', 'Web inputs')
    .click()

    cy.get('#input-number').type('951')
    cy.get('#input-text').type('Another test')
    cy.get('#input-password').type('Cypress/e2e')


   
  })
})