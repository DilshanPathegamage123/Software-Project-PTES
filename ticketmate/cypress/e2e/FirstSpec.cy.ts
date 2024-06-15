describe('loginpage back button', () => {
  it('should navigate back when the back button is clicked', () => {
    //cy.visit('https://example.cypress.io')
    cy.visit('http://localhost:5173/login')
    cy.get(`[data-testid="black-button"]`).
    cy.url().should('eq', 'http://localhost:5173/passenger')
  })
})