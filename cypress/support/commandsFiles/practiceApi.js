//Get health status of the-sut api
Cypress.Commands.add('getHealthStatus', () => {
    cy.api({
        method: 'GET',
        url: `${Cypress.env('baseUrl')}/api/health-check`,
        headers: {
            'Content-type': 'application/json; charset=utf-8'
        },
        failOnStatusCode: false
    }).then(response => {
        return response
    })
})

//Get my public ip
Cypress.Commands.add('getMyIp', () => {
    cy.api({
        method: 'GET',
        url: `${Cypress.env('baseUrl')}/api/my-ip`,
        headers: {
            'Content-type': 'application/json; charset=utf-8'
        },
        failOnStatusCode: false
    }).then(response => {
        return response
    })
})
