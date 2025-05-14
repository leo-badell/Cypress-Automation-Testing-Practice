describe('Login y perfil de usuario', () => {
  let user;
  let loginData;
  let token;

  before(() => {
    // Create a new user account and log in to get the access token
    cy.registerUser().then((createdUser) => {
      user = createdUser;

      return cy.loginUser(user.email, user.password).then((data) => {
        loginData = data;
        token = data.token;
      });
    });
  });

  it('Returns the newly created user object', () => {
    expect(user).to.have.property('email').and.to.be.a('string');
    expect(user).to.have.property('password').and.to.be.a('string');
  });

  it('Authenticate a user and return access token', () => {
    expect(loginData).to.have.property('id').and.to.be.a('string');
    expect(loginData).to.have.property('name', user.name);
    expect(loginData).to.have.property('email', user.email);
    expect(loginData).to.have.property('token').and.to.be.a('string');
  });

  it('Returns the profile information for the logged-in current user', () => {
    cy.getUserProfile(token).then((response) => {
      expect(response.body).to.have.property('success', true);
      expect(response.body).to.have.property('message', 'Profile successful');
      const data = response.body.data;
      expect(data).to.have.property('id').and.to.be.a('string');
      expect(data).to.have.property('name', user.name);
      expect(data).to.have.property('email', user.email);
    });
  });
});



// //Update the user profile information
// describe('Should update profile information', () => {
//     it('Update the user profile information for the logged-in user', () => {
//         cy.updateProfile('Profile updated successful').then((response) => {
//             expect(response.headers['content-type']).to.equal("text/html; charset=utf-8")
//         });
//     });
// });


// //Send password reset link to user's email
// describe('Password reset link sent successfully', () => {
//     it(`Sends a password reset link to the user's email address, allowing them to reset their password`, () => {
//         cy.forgotPassword('Password reset link').then((response) => {
//             const resetToken = Cypress.env('resetToken');
//             // expect(resetToken).to.exist; // Valida que o token foi armazenado
//             expect(response.headers['content-type']).to.equal("text/html; charset=utf-8")
//         });
//     });
// });


// //Update the user profile information
// describe('Should update profile information', () => {
//     it('Update the user profile information for the logged-in user', () => {
//         cy.verifyResetPasswordToken('Profile updated successful').then((response) => {
//             expect(response.headers['content-type']).to.equal("text/html; charset=utf-8")
//             // expect(verifyResponse.body).to.have.property('message', 'Token is valid');
//         });
//     });
// });
