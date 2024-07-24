// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

import '@4tw/cypress-drag-drop'

// Cypress.Commands.add('getBaseUrl', () => {
//     cy.visit(Cypress.env('baseUrl'))
// })

// Cypress.Commands.add('getByClass', (className) => {
//     return cy.get(`.${className}`)
// })

// cypress/support/index.js

// cypress/support/index.js

Cypress.Commands.add('getBaseUrl', (path = '') => {
    cy.visit(`${Cypress.config('baseUrl')}${path}`);
  });
  
  Cypress.Commands.add('getByClass', (className) => {
    return cy.get(`.${className}`);
  });
  
  Cypress.on('window:before:load', (win) => {
    const originalFetch = win.fetch;
    win.fetch = function (...args) {
      if (args[0].includes('/ads/') || 
          args[0].includes('doubleclick.net') ||
          args[0].includes('googlesyndication.com') ||
          args[0].includes('adservice.google.com') ||
          args[0].includes('ad.doubleclick.net') ||
          args[0].includes('securepubads.g.doubleclick.net') ||
          args[0].includes('pagead2.googlesyndication.com')) {
        return new Promise((resolve) => {
          resolve(new Response(JSON.stringify({}), {
            status: 204,
            headers: { 'Content-type': 'application/json' }
          }));
        });
      }
      return originalFetch.apply(this, args);
    };
  });
  
  
