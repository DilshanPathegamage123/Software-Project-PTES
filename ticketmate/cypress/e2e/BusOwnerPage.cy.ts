describe('BusOwnerPage Tests', () => {
  it('should display the navbar and profile information', () => {
    cy.visit('http://localhost:5173/login');

    cy.get(`[data-testid="username"]`).type('supun');
    cy.get(`[data-testid="password"]`).type('supun123');
    cy.get(`[data-testid="login-button"]`).click();
    cy.url().should('eq', 'http://localhost:5173/BusOwnerPage');

    // Check if the navbar is displayed
    cy.get('.navbar').should('be.visible');

    
  });
  it('profile section details should be Display', () => {
      cy.visit('http://localhost:5173/BusOwnerPage');
      cy.get('.proSec').within(() => {
      cy.contains('Bus Owner').should('be.visible');
      cy.contains('Name:').should('be.visible');
      cy.contains('ID:').should('be.visible');
      cy.contains('Email:').should('be.visible');
    });
  });

  it('should display registered bus details', () => {
    cy.get('button').contains('Registered Buses').click();

    cy.visit('http://localhost:5173/BusOwnerPage');

    cy.get('[data-testid="bus-info"]').should('have.length.greaterThan', 0);

    cy.get('[data-testid="bus-info"]').first().within(() => {
      cy.get('[data-testid="bus-no"]').should('be.visible').and('not.be.empty');
      cy.get('[data-testid="licen-no"]').should('be.visible').and('not.be.empty');
      cy.get('[data-testid="sets-count"]').should('be.visible').and('not.be.empty');
      cy.get('[data-testid="ac-nonac"]').should('be.visible').and('not.be.empty');
      cy.get('[data-testid="see-more-button"]').should('be.visible');
      cy.get('[data-testid="delete-button"]').should('be.visible');
    });
  });
});
