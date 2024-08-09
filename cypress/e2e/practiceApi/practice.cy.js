//Get health status of the-sut api
describe('Health status', () => {
    it('Should return 200 after running', () => {
        cy.getHealthStatus().then(response => {
            expect(response.status).to.eql(200)
            expect(response.body.success).to.be.true
            expect(response.body.status).to.eql('UP')
            expect(response.body.message).to.eql('API is up!')
        })
    })
})

//Get health status of the-sut api
describe('Get my public ip', () => {
    it('Should return 200 after running', () => {
        cy.getMyIp().then(response => {
            expect(response.status).to.eql(200)
            expect(response.body.city).to.be.oneOf(['Florianópolis', 'Chicago', 'Boydton', 'San Francisco'])
            expect(response.body.country).to.be.oneOf(['Brazil', 'United States'])
            expect(response.body.timezone).to.be.oneOf(['America/Sao_Paulo', 'America/Chicago', 'America/New_York', 'America/Los_Angeles'])
        })
    })
})



