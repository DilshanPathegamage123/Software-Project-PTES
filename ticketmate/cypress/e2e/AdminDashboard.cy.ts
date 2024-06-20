describe('AdminDashboard testing', () => {
    it('should display the navbar', () => {
      cy.visit('http://localhost:5173/login');
     
    cy.get(`[data-testid="username"]`).type('shanuka')
    cy.get(`[data-testid="password"]`).type('shan@123')
    cy.get(`[data-testid="login-button"]`).click()
    cy.url().should('eq', 'http://localhost:5173/AdminPage')
    cy.get(`[data-testid="navbar"]`).should('be.visible')
    cy.get(`[data-testid="profile-section-text"]`).should('contain.text','shanukalakshan922@gmail.com','0769004922')
    cy.get(`[data-testid="logo-admin"]`).should('be.visible')



    }

)
})