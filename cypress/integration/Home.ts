interface Window {
  store: {
		getState: () => {}
	}
}

describe('Test Home Page', () => {
  it('exchange button and balance should be visible', function () {
		cy.visit('/');
		cy.get('.exchange').should('be.visible');
		cy.get('.amount-row').should('have.length', 3);
	})
	
	it('has expected state on load', () => {
		cy.visit('/');
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
})