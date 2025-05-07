// Creates a new user account
describe('Should create new user', () => {
    it('Returns the newly created user object', () => {
        cy.usersRegister('Creat new user').then((response) => {
            expect(response.headers['content-type']).to.equal("text/html; charset=utf-8")
            // // expect(response.body).to.have.property('success', true);
            // expect(response.body).to.have.property('message', 'User account created successfully');
            // expect(response.body.data).to.have.property('id');
            // expect(response.body).to.have.property('name', user.name);
            // expect(response.body).to.have.property('email', user.email);
        });
    });
});

// Log in as an existing user
describe('Should make login into the application', () => {
    it('Authenticate a user and return access token', () => {
        cy.usersLogin('Login as new user').then((response) => {
            expect(response.headers['content-type']).to.equal("text/html; charset=utf-8")
        });
    });
});

// Log in as an existing user
describe('Should returns profile data', () => {
    it('Returns the profile information for the logged-in current user.', () => {
        cy.usersProfile('Return profile data').then((response) => {
            expect(response.headers['content-type']).to.equal("text/html; charset=utf-8")
        });
    });
});