describe('DatePicker Component', () => {
    const currentDate = new Date().toISOString().substr(0, 10);
    const pastDate = new Date(Date.now() - 86400000).toISOString().substr(0, 10); // 1 day in past
    const futureDate = new Date(Date.now() + 86400000).toISOString().substr(0, 10); // 1 day in future
  
    // beforeEach(() => {
    //   cy.visit('/'); // Adjust the URL to point to the page containing your DatePicker component
    // });
  
    it('should initialize with the current date', () => {
      cy.get('.datepicker input[type="date"]', { timeout: 10000 }).should('have.value', currentDate);
    });
  
    it('should not allow picking a past date', () => {
      cy.get('.datepicker input[type="date"]', { timeout: 10000 })
        .clear()
        .type(pastDate)
        .blur();
  
      // Check for toast error message
      cy.get('.Toastify__toast--error', { timeout: 10000 }).should('be.visible')
        .and('contain', 'The selected date is in the past.');
  
      // Check if the date has reset to the current date
      cy.get('.datepicker input[type="date"]').should('have.value', currentDate);
    });
  
    it('should allow picking today\'s date', () => {
      cy.get('.datepicker input[type="date"]', { timeout: 10000 })
        .clear()
        .type(currentDate)
        .blur();
  
      cy.get('.datepicker input[type="date"]').should('have.value', currentDate);
    });
  
    it('should allow picking a future date', () => {
      cy.get('.datepicker input[type="date"]', { timeout: 10000 })
        .clear()
        .type(futureDate)
        .blur();
  
      cy.get('.datepicker input[type="date"]').should('have.value', futureDate);
    });
  });
  