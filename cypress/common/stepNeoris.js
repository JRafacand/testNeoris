import { Given, When, Then, And } from "@badeball/cypress-cucumber-preprocessor";


Given('I am on the Neoris home page', () => {
    cy.visit('https://www.saucedemo.com/');
    cy.get('title').invoke('text').should('eq', 'Swag Labs');
})

When('I login with the following credentials', (dataTable) => {
    const data = dataTable.hashes()[0];
    if (data.username == 'standard_user') {
        cy.get('#user-name').type(data.username);
    } else if (data.username != 'standard_user') {
        assert.fail('Invalid username, review your data table');
    };
    if (data.password == 'secret_sauce') {
        cy.get('#password').type(data.password);
    }
    else if (data.password != 'secret_sauce') {
        assert.fail('Invalid password, review your data table');
    }
    cy.get('[data-test="error"]').should('not.exist').then(() => {
        cy.get('#login-button').click();
        cy.log('Login successful');
    });
});

Then('Choose below different products', (dataTable1) => {
    dataTable1.hashes().forEach(row => {
        if (row.product_name == 'Sauce Labs Backpack') {
            cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').should('be.visible').click();
        } else if (row.product_name == 'Sauce Labs Bike Light') {
            cy.get('[data-test="add-to-cart-sauce-labs-bike-light"]').should('be.visible').click();
        } else if (row.product_name == 'Sauce Labs Bolt T-Shirt') {
            cy.get('[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]').should('be.visible').click();
        } else if (row.product_name == 'Sauce Labs Fleece Jacket') {
            cy.get('[data-test="add-to-cart-sauce-labs-fleece-jacket"]').should('be.visible').click();
        } else if (row.product_name == 'Sauce Labs Onesie') {
            cy.get('[data-test="add-to-cart-sauce-labs-onesie"]').should('be.visible').click();
        } else if (row.product_name == 'Test.allTheThings() T-Shirt (Red)') {
            cy.get('[data-test="add-to-cart-test.allthethings()-t-shirt-(red)"]').should('be.visible').click();
        } else {
            assert.fail(`Product ${row.product_name} not found`);
        }

    })
});

Then('I click on the shopping cart and click on the checkout button', ()=>{
    cy.get('[data-test="shopping-cart-link"]').should('be.visible').click();
        cy.get('[data-test="checkout"]').should('be.visible').click();
   

});

Then('I fill out the form with the following information', (dataTable3)=>{
    const data = dataTable3.hashes()[0];
    cy.get('[data-test="firstName"]').should('be.visible').type(data.first_name);
    cy.get('[data-test="lastName"]').should('be.visible').type(data.last_name);
    cy.get('[data-test="postalCode"]').should('be.visible').type(data.zip_code);
});

Then('I click on the continue button and finish button', ()=>{
    cy.get('[data-test="continue"]').should('be.visible').click();
    cy.get('[data-test="finish"]').should('be.visible').click();
    
});

Then('I should see Thank you for your order',()=>{
    cy.get('[data-test="complete-header"]').invoke('text').should('eq', 'Thank you for your order!');
});    