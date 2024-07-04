// cypress/integration/OwnerPage.spec.js
describe('OwnerPage Tests', () => {
  beforeEach(() => {
    cy.intercept('GET', 'https://localhost:7001/api/userData/authenticate?userName=NMalinga&password=aaa12345', (req) => {
      req.reply({
        statusCode: 200,
        body: {
          id: '99',
          requestStatus: 1,
          ownVehicleType: 'bus',
        },
      });
    }).as('fetchUserData');

    cy.visit('http://localhost:5173/login');
    cy.get('[data-testid="username"]').type('NMalinga');
    cy.get('[data-testid="password"]').type('aaa12345');
    cy.get('[data-testid="login-button"]').click();
    cy.url().should('eq', 'http://localhost:5173/OwnerPage');
  });

  it('should navigate to /loginpage when requestStatus is 0', () => {
    cy.intercept('GET', 'https://localhost:7001/api/userData/authenticate?userName=NMalinga&password=aaa12345', (req) => {
      req.reply({
        statusCode: 200,
        body: {
          id: '99',
          requestStatus: 0,
          ownVehicleType: 'car',
        },
      });
    }).as('fetchUserDataWithStatus0');

    cy.visit('http://localhost:5173/login');
    cy.get('[data-testid="username"]').type('NMalinga');
    cy.get('[data-testid="password"]').type('aaa12345');
    cy.get('[data-testid="login-button"]').click();
    cy.wait('@fetchUserDataWithStatus0');
    cy.url().should('eq', 'http://localhost:5173/loginpage');
  });

  it('should navigate to /BusOwnerPage when ownVehicleType is bus', () => {
    cy.wait('@fetchUserData');
    cy.url().should('eq', 'http://localhost:5173/BusOwnerPage');
  });

  it('should navigate to /TrainOwnerPage when ownVehicleType is train', () => {
    cy.intercept('GET', 'https://localhost:7001/api/userData/authenticate?userName=NMalinga&password=aaa12345', (req) => {
      req.reply({
        statusCode: 200,
        body: {
          id: '99',
          requestStatus: 1,
          ownVehicleType: 'train',
        },
      });
    }).as('fetchUserDataWithTrain');

    cy.visit('http://localhost:5173/login');
    cy.get('[data-testid="username"]').type('NMalinga');
    cy.get('[data-testid="password"]').type('aaa12345');
    cy.get('[data-testid="login-button"]').click();
    cy.wait('@fetchUserDataWithTrain');
    cy.url().should('eq', 'http://localhost:5173/TrainOwnerPage');
  });
});
