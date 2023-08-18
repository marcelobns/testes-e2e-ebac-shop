import { faker, fakerPT_BR } from '@faker-js/faker';

class Checkout {

    login({ username, password }) {
        cy.get('#username').type(username)
        cy.get('#password').type(password, { log: false })
        cy.get('.woocommerce-button').click()
    }

    dadosPessoais() {
        cy.get('#billing_first_name').clear().type(fakerPT_BR.person.firstName())
        cy.get('#billing_last_name').clear().type(fakerPT_BR.person.lastName())
        cy.get('#select2-billing_country-container').click().type('Brasil').get('[aria-selected="true"]').click()
        cy.get('#billing_address_1').clear().type(fakerPT_BR.location.street())
        cy.get('#billing_address_2').clear().type(fakerPT_BR.number.bigInt({ min: 1n, max: 9n }) + ' ')
        cy.get('#billing_city').clear().type(fakerPT_BR.location.city())
        cy.get('#select2-billing_state-container').click().type(fakerPT_BR.location.state()).get('[aria-selected="true"]').click()
        cy.get('#billing_postcode').clear().type(fakerPT_BR.location.zipCode('#####-###'))
        cy.get('#billing_phone').clear().type(fakerPT_BR.phone.number('###########'))
        cy.get('#billing_email').clear().type(fakerPT_BR.internet.email().toLowerCase())
    }
}

export default new Checkout()