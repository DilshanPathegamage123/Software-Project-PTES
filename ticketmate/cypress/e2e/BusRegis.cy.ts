describe('Bus Registration Page', () => {
  before(() => {
    // Step to login before any test
    cy.visit('http://localhost:5173/login');
    
    cy.get(`[data-testid="username"]`).type('supun');
    cy.get(`[data-testid="password"]`).type('supun123');
    cy.get(`[data-testid="login-button"]`).click();
    
    // After successful login, visit the Bus Registration Page
    cy.url().should('include', '/BusOwnerPage');
    cy.visit('http://localhost:5173/BusRegistrationPage?id=108');
  });

  beforeEach(() => {
    // Ensure the form is reset before each test
    cy.visit('http://localhost:5173/BusRegistrationPage?id=108');
  });

  it('should display the form with all fields', () => {
    cy.get('#inputbusNum').should('be.visible');
    cy.get('#inputBusName').should('be.visible');
    cy.get('#inputLicencenum').should('be.visible');
    cy.get('#exampleFormControlFile1').should('be.visible');
    cy.get('#exampleFormControlFile2').should('be.visible');
    cy.get('#inputSeatNo').should('be.visible');
    cy.get('input[name="acOption"]').should('have.length', 2);
  });

  it('should show validation errors for required fields', () => {
    cy.get('form').submit();
    cy.get('.text-danger').should('have.length', 5); // 5 error messages for the required fields
  });

  it('should validate seat count as a number', () => {
    cy.get('#inputSeatNo').type('abc');
    cy.get('form').submit();
    cy.contains('Only numbers are allowed for seat count').should('be.visible');
  });

  it('should only allow specific file types for upload', () => {
    const invalidFile = 'invalidFile.txt'; // Add a sample invalid file in cypress/fixtures
    const validFile = 'validImage.jpg';   // Add a sample valid image in cypress/fixtures

    cy.get('#exampleFormControlFile1').attachFile(invalidFile);
    cy.on('window:alert', (str) => {
      expect(str).to.equal('Only JPG, JPEG, PNG, and PDF files are allowed.');
    });

    cy.get('#exampleFormControlFile1').attachFile(validFile);
    cy.get('#exampleFormControlFile1').then(($input) => {
      const input = $input[0] as HTMLInputElement;
      expect(input.files![0].name).to.equal('validImage.jpg');
    });
  });

  it('should select AC or Non AC option', () => {
    cy.get('input[value="AC"]').check();
    cy.get('input[value="AC"]').should('be.checked');

    cy.get('input[value="Non AC"]').check();
    cy.get('input[value="Non AC"]').should('be.checked');
  });

  it('should show success message on valid form submission', () => {
    cy.get('#inputbusNum').type('123');
    cy.get('#inputBusName').type('Bus Test');
    cy.get('#inputLicencenum').type('LIC123');
    cy.get('#exampleFormControlFile1').attachFile('validImage.jpg');
    cy.get('#exampleFormControlFile2').attachFile('validImage.jpg');
    cy.get('#inputSeatNo').type('40');
    cy.get('input[value="AC"]').check();

    // Select a seat (this might need adjustment based on your seat structure component)
    cy.get('button[seat-id="1"]').click();

    cy.get('form').submit();
    cy.contains('Your Bus Successfully Registered').should('be.visible');
  });

  it('should cancel form submission and navigate back', () => {
    cy.get('button').contains('Cancel').click();
    cy.on('window:confirm', (str) => {
      expect(str).to.equal("Are you sure?\nYou won't be able to revert this!");
    });
    cy.url().should('eq', 'http://localhost:5173/BusOwnerPage');
  });
});
