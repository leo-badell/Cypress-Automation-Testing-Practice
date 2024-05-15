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

    let date = new Date()
    date.setDate(date.getDate() + 400)
    let futureYear = date.getFullYear()
    let futureMonth = ("0" + (date.getMonth() + 1)).slice(-2)
    let futureDay = date.getDate()
    let dateToAssert = `${futureYear}-${futureMonth}-${futureDay}`

    cy.get('#input-date').type(dateToAssert)
    cy.get('#btn-display-inputs').click()
    cy.wait(1000)
    cy.getByClass('btn-outline-danger').click()
   
  })
})