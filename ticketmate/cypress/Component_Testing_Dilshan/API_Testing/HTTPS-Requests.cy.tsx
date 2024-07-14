/// <reference types="cypress" />

describe("HTTPS Requsets", () => {
  it("GET call for get all bus stands - validate response structure", () => {
    cy.request("GET", "https://localhost:7048/api/GetBusStands").then(
      (response) => {
        //Validate response status and structure
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property("$id");
        expect(response.body).to.have.property("$values").and.to.be.an("array");
        //Validate each bus stand object structure
        response.body.$values.forEach((busStand) => {
          expect(busStand).to.have.property("id").and.to.be.a("number");
          expect(busStand).to.have.property("standName").and.to.be.a("string");
          expect(busStand)
            .to.have.property("busRouteRoutId")
            .and.to.be.a("number");
          //Validate bus stand name is not empty
          expect(busStand.standName).to.be.a("string").and.not.to.be.empty;
        });

        //Validate specific bus stand object
        const busStand = response.body.$values.find(
          (stand) => stand.standName === "Colombo"
        );
        expect(busStand).to.exist;
        expect(busStand).to.have.property("id").and.to.eq(0);
        expect(busStand).to.have.property("busRouteRoutId").and.to.eq(0);
      }
    );
  });

  it("POST call for search travel", () => {
    cy.request({
      method: "POST",
      url: "https://localhost:7048/api/TravelSearch",
      body: {
        id: 0,
        vehicleType: "Bus",
        startLocation: "Minuwangoda",
        endLocation: "Gampaha",
        travelDate: "2024-06-30",
      },
    })
      .its("status")
      .should("equal", 200);
  });

  it("POST call for save bus feedback", () => {
    cy.request({
      method: "POST",
      url: "https://localhost:7048/api/SaveBusFeedBack",
      body: {
        busId: 9,
        bookingId: 10,
        passengerId: "1",
        rate: 10,
        feedBack: "Very Good Servie",
        givenDate: "2024-05-13",
      },
    })
      .its("status")
      .should("equal", 200);
  });

//   it("PUT call for save bus feedback", () => {
//     cy.request({
//       method: "PUT",
//       url: "https://localhost:7048/api/UpdateBusFeedBack/1",
//       body: {
//         feedback: "Superb!",
//         rate: 9,
//       },
//     })
//       .its("status")
//       .should("equal", 200);
//   });
//   it("DELETE call for Delete bus feedback", () => {
//     cy.request({
//       method: "DELETE",
//       url: "https://localhost:7048/api/DeleteBusFeedBack/14",
//     })
//       .its("status")
//       .should("equal", 200);
//   });
});
