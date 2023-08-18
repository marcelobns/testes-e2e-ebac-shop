/// <reference types="cypress" />
import { faker } from '@faker-js/faker';

import usuario from '../fixtures/usuario.json';
import produtos from '../fixtures/produtos.json';
import checkoutPage from '../support/pages/checkout.page';

describe('Exercicio - Testes End-to-end - Fluxo de pedido', () => {
    let carrinho = 0
    /*  Como cliente 
        Quero acessar a Loja EBAC 
        Para fazer um pedido de 4 produtos 
        Fazendo a escolha dos produtos
        Adicionando ao carrinho
        Preenchendo todas opções no checkout
        E validando minha compra ao final */

    beforeEach(() => {
        cy.viewport(1280, 720)
        cy.visit('produtos')
    });

    afterEach(() => {
        cy.screenshot()
    });

    it('Deve fazer um pedido na loja Ebac Shop de ponta a ponta', () => {
        
        produtos.forEach(produto => {
            
            cy.produtoAddCart({...produto})
            carrinho += produto.quantidade;

            cy.get('.woocommerce-message').should('contain', produto.nome);
            cy.get('.dropdown-toggle > .mini-cart-items').should('contain', carrinho);
        });

        cy.get('.dropdown-toggle > .text-skin > .icon-basket').click().click();
        cy.get('#cart .buttons > .checkout').click();
        cy.get('.showlogin').click();

        checkoutPage.login({...usuario});
        cy.get('.page-title').should('contain', 'Checkout');

        checkoutPage.dadosPessoais();
        cy.get('#terms').click()
        cy.get('#terms').should('be.checked')
        cy.get('#place_order').click()
        cy.get('.woocommerce-notice').should('contain', 'Obrigado. Seu pedido foi recebido.')
    });
})
