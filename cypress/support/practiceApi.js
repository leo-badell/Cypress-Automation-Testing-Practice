//Get health status of the-sut api
Cypress.Commands.add('getHealthStatus', () => {
    cy.api({
        method: 'GET',
        url: `${Cypress.env('baseUrl')}/api/health-check`,
        failOnStatusCode: false
    }).then(response => {
        return response
    })
})