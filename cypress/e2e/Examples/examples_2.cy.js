import spok from 'cy-spok';
  import { faker } from '@faker-js/faker';

describe('Second spec', () => {
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

  context('Sample applications for practice test automation part IV', () => {
    it('Should retrieve password', () => {
      cy.getBaseUrl('/');
      cy.getByClass('card-title').eq(12)
        .should('be.visible')
        .and('contain', 'Forgot Password Form')
        .click();

      const usuario = {
        email: faker.internet.email()
      };

      cy.getById('email').type(usuario.email);
      cy.getByClass('btn-bg').should('contain', 'Retrieve password').click();
    });

    it.only('Should make basic authentication', () => {
      cy.getBaseUrl('/');
      cy.getByClass('card-title').eq(13)
        .should('be.visible')
        .and('contain', 'Basic Authentication (user and pass: admin)')
        .click();

        cy.window().then(win => {
          // Stub the prompt to return the username and password
          cy.stub(win, 'prompt').callsFake((message) => {
            if (message === 'Nome de usuário') return 'myUsername';
            if (message === 'Senha') return 'myPassword';
            return null;
          });
      
          // Click the button to trigger the prompt
          cy.get('#prompt-button').click();
      
          // Verify the prompt interaction
          cy.get('#prompt-answer').contains('myUsername');
          cy.get('#prompt-answer').contains('myPassword');
        });
    });
  });
});
