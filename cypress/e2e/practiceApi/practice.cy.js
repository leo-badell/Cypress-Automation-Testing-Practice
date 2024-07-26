//Get health status of the-sut api
describe('Health status', () => {
    it('Should return 200 after running', () => {
        cy.getHealthStatus().then(response => {
            expect(response.status).to.eq(200)
        })
    })
})