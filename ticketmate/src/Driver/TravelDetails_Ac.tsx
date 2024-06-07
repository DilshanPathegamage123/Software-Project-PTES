import React, { useEffect, useState } from "react";
import "./TravelDetails.css";
import PrimaryButton from "../Components/Buttons/PrimaryButton";
import axios from "axios";

function TravelDetails() {
    interface travel {
        id: number;
        routNo: string;
        startLocation: string;
        endLocation: string;
        arrivalTime: string;
        departureTime: string;
        arrivalDate: string;
       
    }
  const [travelDetails, setTravelDetails] = useState<travel[]>([]);
  const DriverId: string | null = null;
  const DrivingLicenceNum: string | null = "b1234566";
  // useEffect(() => {
  //   axios
  //     .get(`https://localhost:7296/api/ScheduledBus/details?isCompleted=0&Id=${DriverId}`)
  //     .then((response) => {
  //       setTravelDetails(response.data);
  //     })
  //     .catch((error) => {
  //       console.error("There was an error fetching the travel details!", error);
  //       alert("There was an error fetching the travel details!");
  //     });
  // }, []);
  useEffect(() => {
    let url : string| null = null;

    if (DrivingLicenceNum && DrivingLicenceNum.startsWith('t')) {
      url = `https://localhost:7296/api/Scheduledtrain/details?isCompleted=false&Id=${DriverId}`;
    } else if (DrivingLicenceNum === 'b') {
      url = `https://localhost:7296/api/ScheduledBus/details?isCompleted=0&Id=${DriverId}`;
    }
    if (url) {
    axios
      .get(url)
      .then((response) => {
        setTravelDetails(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the travel details!", error);
        alert("There was an error fetching the travel details!");
      });
    }
  }, []);

  return (
    <>
    {travelDetails.map((detail, index) => (
      <div className="row p-5 rounded-4 sec shadow m-4 bg-grey" key={index}>
        <div className="col-lg-10">
          <p>
            <span className="text-dark fs-6 fw-bold font-family-Inter">
              Travel Journey Id:{" "}
            </span>
            <span className="text-dark fs-6 fw-normal font-family-Inter">
              {detail.id}
              <br />
            </span>
            <span className="text-dark fs-6 fw-bold font-family-Inter">
              Rout No:
            </span>
            <span className="text-dark fs-6 fw-normal font-family-Inter">
              {detail.routNo}
              <br />
            </span>
            <span className="text-dark fs-6 fw-bold font-family-Inter">
              Rout Name:
            </span>
            <span className="text-dark fs-6 fw-normal font-family-Inter">
              {" "}
              {detail.startLocation} - {detail.endLocation}
              <br />
            </span>
            <span className="text-dark fs-6 fw-bold font-family-Inter">
              Date:
            </span>
            <span className="text-dark fs-6 fw-normal font-family-Inter">
              {detail.arrivalDate}
              <br />
            </span>
            <span className="text-dark fs-6 fw-bold font-family-Inter">
              Start Time:
            </span>
            <span className="text-dark fs-6 fw-normal font-family-Inter">
              {detail.departureTime}
              <br />
            </span>
            <span className="text-dark fs-6 fw-bold font-family-Inter">
              End Time:
            </span>
            <span className="text-dark fs-6 fw-normal font-family-Inter">
              {" "}
              {detail.arrivalTime}
              <br />
            </span>
          </p>
        </div>

        <div className="col-lg-2">
          <PrimaryButton value="View" type="button" color="third" />
        </div>
      </div>
    ))}
    </>
  );
}

export default TravelDetails;
