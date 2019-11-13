interface Window {
  store: {
		getState: () => {}
	}
}

describe('Test Exchange Page', () => {
  it('exchange button and balance should be visible', function () {
		cy.visit('/');
		cy.get('.exchange').click();
		cy.get('.header > :nth-child(2)').should('be.visible');
		cy.get('.header > :nth-child(1)').should('be.visible');
		cy.get('.inputDiv').should('have.length', 6);
		cy.get('.amount-row').should('have.length', 6);
	})
	
	it('has expected state on load', () => {
		cy.visit('/');
		cy.get('.exchange').click();
		cy.window().its('store').invoke('getState').should('deep.equal', {
			balance: [
				{
					"currencyCode": "USD",
					"amount": 25.51
				},
				{
					"currencyCode": "EUR",
					"amount": 116.12
				},
				{
					"currencyCode": "GBP",
					"amount": 58.33
				}
			],
			rates: {
				"base": "USD",
				"rates": {
					"USD": 1,
					"EUR": 0.907528,
					"GBP": 0.782779
				}
			},
		})
	})

	it('should show right exchange values', () => {
		cy.visit('/');
		cy.get('.exchange').click();
		cy.get('.inputDiv input').first().type('1');
		cy.get('.inputDiv input').eq(4).should('be', -1);
		cy.get('.control-next').first().click();
		cy.get('.inputDiv input').eq(2).type('1');
		cy.get('.inputDiv input').eq(4).should('be', -1.1);
		cy.get('.header > :nth-child(2)').click();
		cy.get('.amount-row').should('be', '$25.51');
	})
})