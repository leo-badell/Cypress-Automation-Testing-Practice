import spok from 'cy-spok';
import { faker } from '@faker-js/faker';

describe('First spec', () => {
  beforeEach(() => {
    const adUrls = [
      { url: '**/ads/**', alias: 'blockAds' },
      { url: '**/doubleclick.net/**', alias: 'blockDoubleclick' },
      { url: '**/googlesyndication.com/**', alias: 'blockGoogleAds' },
      { url: '**/adservice.google.com/**', alias: 'blockGoogleAdservice' },
      { url: '**/ad.doubleclick.net/**', alias: 'blockAdDoubleclick' },
      { url: '**/securepubads.g.doubleclick.net/**', alias: 'blockSecurepubads' },
      { url: '**/pagead2.googlesyndication.com/**', alias: 'blockPagead2' },
    ];

    adUrls.forEach(({ url, alias }) => {
      cy.intercept('GET', url, { statusCode: 204, body: {} }).as(alias);
    });
  });

  context('Sample applications for practice test automation part I', () => {
    it('Should manipulate web inputs', () => {
      cy.getBaseUrl('/');
      cy.getByClass('card-title').eq(0)
        .should('be.visible')
        .and('contain', 'Web inputs')
        .click();

      const display = {
        number: faker.string.numeric(),
        text: faker.word.words(),
        password: faker.internet.password()
      };

      cy.getById('input-number').type(display.number);
      cy.getById('input-text').type(display.text);
      cy.getById('input-password').type(display.password);

      let date = new Date();
      date.setDate(date.getDate() + 400);
      const futureYear = date.getFullYear();
      const futureMonth = ("0" + (date.getMonth() + 1)).slice(-2);
      const futureDay = ("0" + date.getDate()).slice(-2);
      const dateToAssert = `${futureYear}-${futureMonth}-${futureDay}`;

      cy.getById('input-date').type(dateToAssert);
      cy.getById('btn-display-inputs').click();
      cy.wait(500);
      cy.getByClass('btn-outline-danger').click();
    });

    it('Should log in using a dummy login form', () => {
      cy.getBaseUrl('/');
      cy.getByClass('card-title').eq(1)
        .should('be.visible')
        .and('contain', 'Login Test Page')
        .click();

      cy.getById('username').type('practice');
      cy.getById('password').type('SuperSecretPassword!');
      cy.getByClass('btn-primary').should('contain', 'Login').click();
      cy.getByClass('alert-success').should('contain', 'You logged into a secure area!');
      cy.getByClass('btn-close', { timeout: 10000 }).click();
    });

    it('Should manipulate notification messages', () => {
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

    it('Should interact with a dynamic table', () => {
      cy.getBaseUrl('/');
      cy.getByClass('card-title').eq(3)
        .should('be.visible')
        .and('contain', 'Dynamic Table')
        .click();

      cy.getByClass('row').find('#table-description')
        .should('contain', 'Task Manager');

      cy.get('thead tr').each(dynamicTable => {
        cy.wrap(dynamicTable).should(spok({ x: spok.notDefined }));

        cy.get('tbody tr').each(tableRow => {
          cy.wrap(tableRow).should(spok({ x: spok.notDefined }));

          const browsers = ['Chrome', 'Firefox', 'System', 'Internet Explorer'];
          browsers.forEach(browser => {
            cy.contains('tbody tr', browser).within(() => {
              cy.get('td').eq(0).should(spok({ browser: spok.notDefined }));
            });
          });
        });
      });
    });
  });

  context('Sample applications for practice test automation part II', () => {
    it.only('Should inspect browser information', () => {
      cy.getBaseUrl('/');
      cy.getByClass('card-title').eq(4)
        .should('be.visible')
        .and('contain', 'My Browser Information')
        .click();

      cy.getById('browser-toggle').should('contain', 'Show Browser Information').click();
      cy.get('tbody tr').find('td').then(tableColumns => {
        cy.wrap(tableColumns).get('#browser-user-agent').should('contain', 'Mozilla/5.0');
        cy.wrap(tableColumns).get('#browser-code-name').should('contain', 'Mozilla');
        cy.wrap(tableColumns).get('#browser-name').should('contain', 'Google Chrome');
        cy.wrap(tableColumns).get('#browser-version').invoke('text').should('be.oneOf',['5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36', 'Linux x86_64']);
        cy.wrap(tableColumns).get('#browser-cookie').should('contain', 'true');
        cy.wrap(tableColumns).get('#browser-platform').invoke('text').should('be.oneOf',['Win32', 'Linux x86_64']);
      })
    });

    it('Should check Radio Buttons', () => {
      cy.getBaseUrl('/');
      cy.getByClass('card-title').eq(5)
        .should('be.visible')
        .and('contain', 'Radio Buttons')
        .click();

      cy.contains('.card-custom', 'Select your favorite color:')
        .find('[type="radio"]').then(colorButtons => {
          cy.wrap(colorButtons).eq(0).check().should('be.checked');
          cy.wrap(colorButtons).eq(1).check().should('be.checked');
          cy.wrap(colorButtons).eq(2).check().should('be.checked');
          cy.wrap(colorButtons).eq(3).check().should('be.checked');
          cy.wrap(colorButtons).eq(4).should('be.disabled');
        });

      cy.contains('.card-custom', 'Select your favorite sport:')
        .find('[type="radio"]').then(sportButtons => {
          cy.wrap(sportButtons).eq(0).check().should('be.checked');
          cy.wrap(sportButtons).eq(1).should('not.be.checked');
          cy.wrap(sportButtons).eq(2).check().should('be.checked');
        });
    });

    it('Should drag and drop columns and swap headers', () => {
      cy.getBaseUrl('/');
      cy.getByClass('card-title').eq(6)
        .should('be.visible')
        .and('contain', 'Drag and Drop')
        .click();

      cy.getById('column-a').dragTo('#column-b');
      cy.wait(500);
      cy.getById('column-b').dragTo('#column-a');
    });

    it('Should drag and drop circles into the target', () => {
      cy.getBaseUrl('/');
      cy.getByClass('card-title').eq(7)
        .should('be.visible')
        .and('contain', 'Drag and Drop Circles')
        .click();

      cy.getByClass('red').as('redCircle');
      cy.getByClass('green').as('greenCircle');
      cy.getByClass('blue').as('blueCircle');

      cy.get('@redCircle').dragTo('#target');
      cy.get('@greenCircle').dragTo('#target');
      cy.get('@blueCircle').dragTo('#target');
    });
  });

  context('Sample applications for practice test automation part III', () => {
    it('Should fill out form validation', () => {
      cy.getBaseUrl('/');
      cy.getByClass('card-title').eq(8)
        .should('be.visible')
        .and('contain', 'Form Validation')
        .click();

      const form = {
        contact: faker.person.firstName(),
        number: faker.helpers.replaceSymbolWithNumber('###-#######')
      }
      cy.getById('validationCustom01').should('be.visible').clear().type(form.contact);
      cy.getById('validationCustom05').should('be.visible').type(form.number);

      let date = new Date();
      date.setDate(date.getDate() + 180);
      const futureYear = date.getFullYear();
      const futureMonth = ("0" + (date.getMonth() + 1)).slice(-2);
      const futureDay = ("0" + date.getDate()).slice(-2);
      const dateToAssert = `${futureYear}-${futureMonth}-${futureDay}`;

      cy.get('input[name="pickupdate"]').type(dateToAssert);
      cy.getById('validationCustom04').select('card').should('have.value', 'card');
      cy.getByClass('btn-primary').click()
        .get('.alert-info')
        .should('contain', 'Thank you for validating your ticket');
    });

    it('Should upload files', () => {
      cy.getBaseUrl('/');
      cy.getByClass('card-title').eq(9)
        .should('be.visible')
        .and('contain', 'File Upload')
        .click();

      cy.get('[type="file"]').selectFile('cypress/e2e/images/Postman.15.png', { force: true });
      cy.getById('fileSubmit').should('be.visible').click();
      cy.getByClass('breadcrumb-item').should('contain', 'File Uploaded!');
    });

    it('Should download a file', () => {
      cy.getBaseUrl('/');
      cy.getByClass('card-title').eq(10)
        .should('be.visible')
        .and('contain', 'File Downloader')
        .click();

      cy.get('.d-flex.mb-2').first().click();
    });

    it('Should add and remove elements', () => {
      cy.getBaseUrl('/');
      cy.getByClass('card-title').eq(11)
        .should('be.visible')
        .and('contain', 'Add/Remove Elements')
        .click();

      Cypress._.times(6, () => {
        cy.contains('button', 'Add Element').click();
      });

      Cypress._.times(6, () => {
        cy.getByClass('added-manually').first().click();
      });
    });
  });
});


