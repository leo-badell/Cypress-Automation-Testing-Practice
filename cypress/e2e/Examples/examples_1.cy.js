import spok from 'cy-spok'

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

  it('Should interact with Dynamic Table', () => {

    cy.intercept({method:'GET', path: 'dynamic-table'}).as('getDynamicTable')
    cy.getBaseUrl('/dynamic-table')

    cy.getByClass('card-title').eq(3)
    .should('be.visible')
    .and('contain', 'Dynamic Table')
    .click()
    
    cy.intercept({ method: 'GET', path: 'socket.io/*' }).as('getPlayground');
    
    cy.getByClass('row').find('#table-description')
    .should('contain', 'Task Manager')

    cy.get('thead tr').each( dynamicTable => {
      cy.wrap(dynamicTable).should(spok({
        x: spok.notDefined
      }))

      cy.get('tbody tr').each( tableRow => {
        cy.wrap(tableRow).should(spok({
          x: spok.notDefined
        }))

      const browsers = ['Chrome', 'Firefox', 'System', 'Internet Explorer'];

      browsers.forEach((browser) => {
        cy.contains('tbody tr', browser).within(() => {
          cy.get('td').eq(0).should(spok({
            browser: spok.notDefined
          }));
            
          })
        })
      })
    })
  })

  it('Should inspect Browser Information', () => {


    cy.intercept({method:'GET', path: 'my-browser'})
    cy.getBaseUrl('/my-browser')

    cy.getByClass('card-title').eq(4)
    .should('be.visible')
    .and('contain', 'My Browser Information')
    .click()

    cy.get('#browser-toggle').should('contain', 'Show Browser Information').click()

    cy.get('tbody tr').find('td').then( tableColumns => {
      cy.wrap(tableColumns).get('#browser-user-agent').should('contain', 'Mozilla/5.0');
      cy.wrap(tableColumns).get('#browser-code-name').should('contain', 'Mozilla');
      cy.wrap(tableColumns).get('#browser-name').should('contain', 'Google Chrome');
      cy.wrap(tableColumns).get('#browser-version').should('contain', 'Windows NT');
      cy.wrap(tableColumns).get('#browser-cookie').should('contain', 'true');
      cy.wrap(tableColumns).get('#browser-platform').should('contain', 'Win32');
    })
    })

    it('Should check Radio Buttons', () => {


      cy.intercept({method:'GET', path: 'radio-buttons'})
      cy.getBaseUrl('/radio-buttons')
  
      cy.getByClass('card-title').eq(5)
      .should('be.visible')
      .and('contain', 'Radio Buttons')
      .click()

      cy.getByClass('card-body').find('[type="radio"]').then( radioButtons => {
        cy.wrap(radioButtons).eq(0).check().should('be.checked')
      
      })
    })
  })



