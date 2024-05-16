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

  it('Should Add and remove Elements', () => {

    cy.intercept({method:'GET', path: 'add-remove-elements'})
    cy.getBaseUrl('/add-remove-elements')

    cy.getByClass('card-title').eq(1)
    .should('be.visible')
    .and('contain', 'Add/Remove Elements')
    .click()

    Cypress._.times(8, () => {
      cy.contains('button', 'Add Element').click()
  })

    Cypress._.times(8, () => {
      cy.getByClass('added-manually').first().click()
  })
 
  })

  it('Should manipulate the notification message', () => {

    cy.intercept({method:'GET', path: 'notification-message-rendered'})
    cy.getBaseUrl('/notification-message-rendered')

    cy.getByClass('card-title').eq(2)
    .should('be.visible')
    .and('contain', 'Notification Message')
    .click()

    cy.contains('a', 'Click here').click()
    cy.get('.alert', { timeout: 10000 }).then(($alert) => {
      if ($alert.hasClass('alert-success')) {
        expect($alert.text().trim()).to.equal('Action successful')
        cy.log('Successful message!')
      } else if ($alert.hasClass('alert-info')) {
        expect($alert.text().trim()).to.equal('Action unsuccessful, please try again')
        cy.log('Unsuccessful message!')
      }
    })
  })

  it.skip('Should interact with Dynamic Table', () => {

    cy.fixture('response.json').then((responseData) => {
      cy.intercept({
        method: 'GET',
        url: 'https://practice.expandtesting.com/socket.io/?EIO=4&transport=polling&t=Oz-qtsM',
      }, responseData).as('apiCheck')
    })
    
    cy.getBaseUrl('/dynamic-table')
    
    // cy.wait('@apiCheck')
    
    // .then((interception) => {
    //   // Make assertions about the request and response
    // })
    
  })
})