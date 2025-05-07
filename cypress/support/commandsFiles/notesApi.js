import { Faker, pt_BR, en, base } from '@faker-js/faker';

// Create a custom Faker instance with locale fallbacks
const faker = new Faker({
    locale: [pt_BR, en, base], 
});

Cypress.Commands.add('usersRegister', () => {
    const user = {
        name: faker.person.fullName(),
        email: faker.internet.email(),
        password: faker.internet.password(8),
    };

// Creates a new user account
Cypress.env('user', user);

    return cy.api({
        method: 'POST',
        url: `${Cypress.env('baseApi')}/users/register`,
        statusCode: 200,
        headers: {
            'Accept': 'application/json', // Indica que esperas una respuesta en JSON
            'Content-Type': 'application/x-www-form-urlencoded', // Tipo de contenido esperado
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/136.0.0.0 Safari/537.36', // Simula el User-Agent de Swagger
            'Origin': 'https://practice.expandtesting.com', // Indica el origen de la solicitud
            'Referer': 'https://practice.expandtesting.com/notes/api/api-docs/', // Referencia de la solicitud
        },
        body: user,
    }).then((response) => {
        expect(response.status).to.eq(200);
        console.log(response.body)
    });
});

// Log in as an existing user
Cypress.Commands.add('usersLogin', () => {
    const user = Cypress.env('user');

    return cy.api({
        method: 'POST',
        url: `${Cypress.env('baseApi')}/users/login`,
        statusCode: 200,
        body: {
            email: user.email,
            password: user.password,
        },
    }).then((response) => {
        expect(response.status).to.eq(200);
    });
});

//Retrieve user profile information
Cypress.Commands.add('usersProfile', () => {
    const user = Cypress.env('user');

    return cy.api({
        method: 'GET',
        url: `${Cypress.env('baseApi')}/users/profile`,
        statusCode: 200,
        body: {
            email: user.email,
            password: user.password,
        },
    }).then((response) => {
        expect(response.status).to.eq(200);
    });
});

