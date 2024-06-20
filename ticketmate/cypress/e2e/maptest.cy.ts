// describe('Start Ride Button Test', () => {
//     it('should start the ride and display real-time tracking on the map', () => {
//         // Visit the home page
//         cy.visit('http://localhost:5173/');

//         // Click the Start Ride button
//         cy.get('button:contains("Start Ride >>")').click();
//         cy.wait(2000); // wait for the ride to start and the connection to establish

//         // Mock the geolocation and update location API
//         cy.window().then(win => {
//             cy.stub(win.navigator.geolocation, 'watchPosition').callsFake((successCallback, errorCallback, options) => {
//                 const position = {
//                     coords: {
//                         latitude: 37.7749, // example latitude
//                         longitude: -122.4194, // example longitude
//                     }
//                 };
//                 successCallback(position);
//             });
//         });

//         // Mock the SignalR connection and location update
//         cy.intercept('POST', '**/api/Location/UpdateLocation', { statusCode: 200 }).as('updateLocation');
//         cy.wait('@updateLocation');

//         // Verify the map shows the updated location
//         cy.get('.gm-style').should('be.visible');
//         cy.get('.gm-style img').should('have.attr', 'src').and('include', 'google');
//     });
// });


describe('Start Ride Button and Real-Time Tracking', () => {
    beforeEach(() => {
      // Visit the application
      cy.visit('http://localhost:5173');
  
     
    });
  
    it('should start the ride and update the location on the map', () => {
      // Mock the SignalR connection and location update
      cy.intercept('POST', '**/api/Location/UpdateLocation', { statusCode: 200 }).as('updateLocation');
  
      // Click the Start Ride button
      cy.get('button').contains('Start Ride >>').click();
  
      // Wait for the UpdateLocation request
      cy.wait('@updateLocation', { timeout: 10000 }); // Increase the timeout if necessary
  
      // Verify the map shows the updated location
      cy.get('.gm-style').should('be.visible');
      cy.get('.gm-style img').should('have.attr', 'src').and('include', 'google');
    });
  });
  