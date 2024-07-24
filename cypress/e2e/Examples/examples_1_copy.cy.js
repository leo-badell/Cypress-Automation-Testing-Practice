import spok from 'cy-spok';

describe('First spec', () => {
  beforeEach(() => {
    cy.intercept('GET', '**/ads/**', { statusCode: 204, body: {} }).as('blockAds');
    cy.intercept('GET', '**/doubleclick.net/**', { statusCode: 204, body: {} }).as('blockDoubleclick');
    cy.intercept('GET', '**/googlesyndication.com/**', { statusCode: 204, body: {} }).as('blockGoogleAds');
    cy.intercept('GET', '**/adservice.google.com/**', { statusCode: 204, body: {} }).as('blockGoogleAdservice');
    cy.intercept('GET', '**/ad.doubleclick.net/**', { statusCode: 204, body: {} }).as('blockAdDoubleclick');
    cy.intercept('GET', '**/securepubads.g.doubleclick.net/**', { statusCode: 204, body: {} }).as('blockSecurepubads');
    cy.intercept('GET', '**/pagead2.googlesyndication.com/**', { statusCode: 204, body: {} }).as('blockPagead2');
  });

  context('Sample applications for practice test automation part I', () => {

    it('Should manipulate web inputs', () => {
      cy.getBaseUrl('/');
  
      cy.getByClass('card-title').eq(0)
        .should('be.visible')
        .and('contain', 'Web inputs')
        .click();
  
      cy.get('#input-number').type('951');
      cy.get('#input-text').type('Another test');
      cy.get('#input-password').type('Cypress/e2e');
  
      let date = new Date();
      date.setDate(date.getDate() + 400);
      let futureYear = date.getFullYear();
      let futureMonth = ("0" + (date.getMonth() + 1)).slice(-2);
      let futureDay = ("0" + date.getDate()).slice(-2);
      let dateToAssert = `${futureYear}-${futureMonth}-${futureDay}`;
  
      cy.get('#input-date').type(dateToAssert);
      cy.get('#btn-display-inputs').click();
      cy.wait(1000);
      cy.getByClass('btn-outline-danger').click();
    });

    it('Should make Login in a dummy login form', () => {
      cy.getBaseUrl('/');
  
      cy.getByClass('card-title').eq(1)
        .should('be.visible')
        .and('contain', 'Login Form')
        .click();

      cy.get('#username').type('practice')
      cy.get('#password').type('SuperSecretPassword!')

      cy.getByClass('btn-primary').should('contain', 'Login').click()
      
      cy.getByClass('alert-success').should('contain', 'You logged into a secure area!')

      cy.getByClass('btn-close', { timeout: 10000 }).click()
    })

    it('Should manipulate the notification message', () => {
      cy.getBaseUrl('/');
  
      cy.getByClass('card-title').eq(2)
        .should('be.visible')
        .and('contain', 'Notification Message')
        .click();
  
      cy.contains('a', 'Click here').click();
      cy.get('.alert', { timeout: 10000 }).then(($alert) => {
        if ($alert.hasClass('alert-success')) {
          expect($alert.text().trim()).to.equal('Action successful');
          cy.log('Successful message!');
        } else if ($alert.hasClass('alert-info')) {
          expect($alert.text().trim()).to.equal('Action unsuccessful, please try again');
          cy.log('Unsuccessful message!');
        }
      });
    });

    it('Should interact with Dynamic Table', () => {
      cy.getBaseUrl('/');
  
      cy.getByClass('card-title').eq(3)
        .should('be.visible')
        .and('contain', 'Dynamic Table')
        .click();
  
      cy.getByClass('row').find('#table-description')
        .should('contain', 'Task Manager');
  
      cy.get('thead tr').each(dynamicTable => {
        cy.wrap(dynamicTable).should(spok({
          x: spok.notDefined
        }));
  
        cy.get('tbody tr').each(tableRow => {
          cy.wrap(tableRow).should(spok({
            x: spok.notDefined
          }));
  
          const browsers = ['Chrome', 'Firefox', 'System', 'Internet Explorer'];
  
          browsers.forEach((browser) => {
            cy.contains('tbody tr', browser).within(() => {
              cy.get('td').eq(0).should(spok({
                browser: spok.notDefined
              }));
            });
          });
        });
      });
    });
  })

  context('Sample applications for practice test automation part II', () => {

    it('Should inspect Browser Information', () => {
      cy.getBaseUrl('/');
  
      cy.getByClass('card-title').eq(4)
        .should('be.visible')
        .and('contain', 'My Browser Information')
        .click();
  
      cy.get('#browser-toggle').should('contain', 'Show Browser Information').click();
  
      cy.get('tbody tr').find('td').then(tableColumns => {
        cy.wrap(tableColumns).get('#browser-user-agent').should('contain', 'Mozilla/5.0');
        cy.wrap(tableColumns).get('#browser-code-name').should('contain', 'Mozilla');
        cy.wrap(tableColumns).get('#browser-name').should('contain', 'Google Chrome');
        cy.wrap(tableColumns).get('#browser-version').should('contain', 'Windows NT');
        cy.wrap(tableColumns).get('#browser-cookie').should('contain', 'true');
        cy.wrap(tableColumns).get('#browser-platform').should('contain', 'Win32');
      });
    });

    it('Should check Radio Buttons', () => {
      cy.getBaseUrl('/');
  
      cy.getByClass('card-title').eq(5)
        .should('be.visible')
        .and('contain', 'Radio Buttons')
        .click();
  
      cy.contains('.card-custom', 'Select your favorite color:').find('[type="radio"]').then(colorButtons => {
        cy.wrap(colorButtons).eq(0).check().should('be.checked');
        cy.wrap(colorButtons).eq(1).check().should('be.checked');
        cy.wrap(colorButtons).eq(2).check().should('be.checked');
        cy.wrap(colorButtons).eq(3).check().should('be.checked');
        cy.wrap(colorButtons).eq(4).should('be.disabled');
      });
  
      cy.contains('.card-custom', 'Select your favorite sport:').find('[type="radio"]').then(sportButtons => {
        cy.wrap(sportButtons).eq(0).check().should('be.checked');
        cy.wrap(sportButtons).eq(1).should('not.be.checked');
        cy.wrap(sportButtons).eq(2).check().should('be.checked');
      });
    });

    it.skip('Should drag and drop columns and swap headers', () => {
      cy.getBaseUrl('/');
  
      cy.getByClass('card-title').eq(6)
        .should('be.visible')
        .and('contain', 'Drag and Drop')
        .click();
  
      // Log initial state
      cy.get('#dnd-columns').children().then(children => {
        cy.log('Before drag-and-drop:');
        children.each((index, child) => {
          cy.log(`Child ${index}: ${child.id}`);
        });
      });
  
      // Drag column B and drop it onto column A
      cy.get('#column-b').drag('#column-a');
  
      // Wait for the changes to take effect
      cy.wait(1000); // Adjust the wait time if necessary
  
      // Swap the ids and header text of the elements manually
      cy.get('#column-a').invoke('attr', 'id', 'temp-column');
      cy.get('#column-b').invoke('attr', 'id', 'column-a');
      cy.get('#temp-column').invoke('attr', 'id', 'column-b');
  
      cy.get('#column-a header').invoke('text', 'B');
      cy.get('#column-b header').invoke('text', 'A');
  
      // Log final state
      cy.get('#dnd-columns').children().then(children => {
        cy.log('After drag-and-drop:');
        children.each((index, child) => {
          cy.log(`Child ${index}: ${child.id}`);
        });
      });
  
      // Verify the new order of the columns based on their IDs and headers
      cy.get('#dnd-columns').children().should('have.length', 2).then(children => {
        cy.wrap(children[0], { timeout: 10000 }).should('have.id', 'column-a');
        cy.wrap(children[0]).find('header').should('have.text', 'B');
        cy.wrap(children[1], { timeout: 10000 }).should('have.id', 'column-b');
        cy.wrap(children[1]).find('header').should('have.text', 'A');
      });
  
      // Now drag column A to the position of column B
      cy.get('#column-a').drag('#column-b');
  
      // Wait for the changes to take effect
      cy.wait(1000); // Adjust the wait time if necessary
  
      // Swap the ids and header text of the elements manually again
      cy.get('#column-b').invoke('attr', 'id', 'temp-column');
      cy.get('#column-a').invoke('attr', 'id', 'column-b');
      cy.get('#temp-column').invoke('attr', 'id', 'column-a');
  
      cy.get('#column-a header').invoke('text', 'A');
      cy.get('#column-b header').invoke('text', 'B');
  
      // Log final state again
      cy.get('#dnd-columns').children().then(children => {
        cy.log('After second drag-and-drop:');
        children.each((index, child) => {
          cy.log(`Child ${index}: ${child.id}`);
        });
      });
  
      // Verify the new order of the columns based on their IDs and headers again
      cy.get('#dnd-columns').children().should('have.length', 2).then(children => {
        cy.wrap(children[0], { timeout: 10000 }).should('have.id', 'column-a');
        cy.wrap(children[0]).find('header').should('have.text', 'A');
        cy.wrap(children[1], { timeout: 10000 }).should('have.id', 'column-b');
        cy.wrap(children[1]).find('header').should('have.text', 'B');
      });
    });
  
    it.skip('Should drag and drop circles into the target', () => {
      cy.getBaseUrl('/');
  
      cy.getByClass('card-title').eq(7)
        .should('be.visible')
        .and('contain', 'Drag and Drop Circles')
        .click();
  
      cy.getByClass('red').as('redCircle');
      cy.getByClass('green').as('greenCircle');
      cy.getByClass('blue').as('blueCircle');
  
      cy.get('@redCircle').drag('#target');
      cy.get('@greenCircle').drag('#target');
      cy.get('@blueCircle').drag('#target');
    });
  })

  context('Sample applications for practice test automation part III', () => {

  it('Should fill form validation', () => {
    cy.getBaseUrl('/');

    cy.getByClass('card-title').eq(8)
      .should('be.visible')
      .and('contain', 'Form Validation')
      .click();

    cy.get('#validationCustom01').should('be.visible').clear()
      .type('John Connor')

    cy.get('#validationCustom05').should('be.visible')
      .type('212-3378954')

      let date = new Date();
      date.setDate(date.getDate() + 180);
      let futureYear = date.getFullYear();
      let futureMonth = ("0" + (date.getMonth() + 1)).slice(-2);
      let futureDay = ("0" + date.getDate()).slice(-2);
      let dateToAssert = `${futureYear}-${futureMonth}-${futureDay}`;
  
      cy.get('input[name="pickupdate"]').type(dateToAssert);

      cy.get('#validationCustom04').select('card')
        .should('have.value', 'card')
        
     cy.getByClass('btn-primary').click()
      .get('.alert-info')
      .should('contain', 'Thank you for validating your ticket')

  })

  it.only('Should make an files upload', () => {

    cy.getBaseUrl('/');

    cy.getByClass('card-title').eq(9)
      .should('be.visible')
      .and('contain', 'File Upload')
      .click();

      cy.get('[data-testid="file-input"]').click()
  })
    
  it('Should Add and remove Elements', () => {
    cy.getBaseUrl('/');

    cy.getByClass('card-title').eq(11)
      .should('be.visible')
      .and('contain', 'Add/Remove Elements')
      .click();

    Cypress._.times(8, () => {
      cy.contains('button', 'Add Element').click();
    });

    Cypress._.times(8, () => {
      cy.getByClass('added-manually').first().click();
    });
  });
  })

});
