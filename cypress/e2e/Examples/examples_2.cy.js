import spok from 'cy-spok';

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
        })
    })
})