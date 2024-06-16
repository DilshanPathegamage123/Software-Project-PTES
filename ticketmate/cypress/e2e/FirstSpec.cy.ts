describe('loginpage testing', () => {
  // it('should navigate back when the back button is clicked', () => {
  //   //cy.visit('https://example.cypress.io')
  //   cy.visit('http://localhost:5173/login')
  //   cy.get(`[data-testid="black-button"]`)
  //   cy.url().should('eq', 'http://localhost:5173/passenger')
  // })

  it('should display in the login form', () => {
    cy.visit('http://localhost:5173/login')
    cy.get(`[data-testid="login-page-profile-icon"]`).should('be.visible')
    
  })

  it('can be add username and password for admin', () => {

    cy.visit('http://localhost:5173/login')
    cy.get(`[data-testid="username"]`).type('shanuka')
    cy.get(`[data-testid="password"]`).type('shan@123')
    cy.get(`[data-testid="login-button"]`).click()
    cy.url().should('eq', 'http://localhost:5173/AdminPage')
  })

  it('can be add username and password for owner', () => {

    cy.visit('http://localhost:5173/login')
    cy.get(`[data-testid="username"]`).type('rukshan')
    cy.get(`[data-testid="password"]`).type('rukshan@123')
    cy.get(`[data-testid="login-button"]`).click()
    cy.url().should('eq', 'http://localhost:5173/BusOwnerPage')

  })
  it('can be add username and password for passenger', () => {
      
      cy.visit('http://localhost:5173/login')
      cy.get(`[data-testid="username"]`).type('daham')
      cy.get(`[data-testid="password"]`).type('daham123')
      cy.get(`[data-testid="login-button"]`).click()
      cy.url().should('eq', 'http://localhost:5173/passenger')
  })
  it('invalid user name or password', () => {
    cy.visit('http://localhost:5173/login')
    cy.get(`[data-testid="username"]`).type('daham')
    cy.get(`[data-testid="password"]`).type('daham')
    cy.get(`[data-testid="login-button"]`).click()
    cy.on('window:alert', (str) => {
      expect(str).to.equal('Invalid user name or password')
    })
  })

  
  })