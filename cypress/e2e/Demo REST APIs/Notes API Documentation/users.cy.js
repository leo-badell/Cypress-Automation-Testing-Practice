describe('Check the health of the API Notes service', () => {
    it('Should test health of the api', () => {
        cy.api({ 
            method: 'GET',
            url: `${Cypress.env('baseUrl')}/notes/api/health-check`,
            failOnStatusCode: false,
            followRedirect: true
            // body: bodyRequest,
        }).then((response) => {
            expect(response.status).to.eql(200)
            expect(response.body.success).to.equal(true);
            expect(response.body.message).to.equal('Notes API is Running')
        })
    })
})
