// cypress/support/commandsFiles/notesApi.js
import { Faker, pt_BR, en, base } from '@faker-js/faker';

// Crear una instancia de Faker con localización
const faker = new Faker({
  locale: [pt_BR, en, base],
});

// Fake data
Cypress.Commands.add('registerUser', () => {
  const user = {
    name: faker.person.fullName(),
    email: faker.internet.email().toLowerCase(),
    password: faker.internet.password(8),
    mobile: faker.phone.number({ style: 'national' }),
    company: faker.company.name(),
  };

  // Creates a new user account |
  return cy.api({
    method: 'POST',
    url: `${Cypress.env('baseApi')}/users/register`,
    statusCode: 201,
    body: user,
  }).then((response) => {
    expect(response.status).to.eq(201);
    return user;
  });
});

// Log in as an existing user |
Cypress.Commands.add('loginUser', (email, password) => {
  return cy.api({
    method: 'POST',
    url: `${Cypress.env('baseApi')}/users/login`,
    body: { email, password },
  }).then((response) => {
    expect(response.status).to.eq(200);
    const data = response.body.data;
    expect(data).to.have.property('token').and.to.be.a('string');
    return data; 
  });
});

// Retrieve user profile information
Cypress.Commands.add('getUserProfile', (token) => {
  return cy.api({
    method: 'GET',
    url: `${Cypress.env('baseApi')}/users/profile`,
    headers: {
      'x-auth-token': token,
      'Authorization': `Bearer ${token}`
    },
  }).then((response) => {
    expect(response.status).to.eq(200);
    return response;
  });
});




// //Update the user profile information
// Cypress.Commands.add('updateProfile', () => {
//     const user = Cypress.env('user');

//     return cy.api({
//         method: 'PATCH',
//         url: `${Cypress.env('baseApi')}/users/profile`,
//         statusCode: 200,
//         body: {
//             mobile: user.mobile,
//             company: user.company
//         },
//     }).then((response) => {
//         expect(response.status).to.eq(200);
//     });
// });


// //Send password reset link to user's email
// Cypress.Commands.add('forgotPassword', () => {
//     const user = Cypress.env('user');

//     return cy.api({
//         method: 'POST',
//         url: `${Cypress.env('baseApi')}/users/forgot-password`,
//         headers: {
//             'Accept': 'application/json',
//             'Content-Type': 'application/json',
//         },
//         body: {
//             email: user.email,
//         },
//     }).then((response) => {
//         expect(response.status).to.eq(200);

//         // Captura o token da resposta e armazena no ambiente do Cypress
//         const resetToken = response.body.data?.token; // Ajuste conforme a estrutura da resposta
//         expect(resetToken).to.exist; // Valida que o token existe
//         Cypress.env('resetToken', resetToken); // Armazena o token no ambiente

//         return response; // Retorna a resposta para uso adicional
//     });
// });

// Cypress.Commands.add('verifyResetPasswordToken', (token) => {
//     return cy.api({
//         method: 'POST',
//         url: `${Cypress.env('baseApi')}/users/verify-reset-password-token`,
//         headers: {
//             'Accept': 'application/json',
//             'Content-Type': 'application/json',
//         },
//         body: { token },
//     }).then((response) => {
//         expect(response.status).to.eq(200);
//         expect(response.body).to.have.property('success', true);
//         return response;
//     });
// });

