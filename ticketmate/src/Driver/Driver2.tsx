import PrimaryNavBar from "../Components/NavBar/PrimaryNavBar-logout";
import Footer from "../Components/Footer/Footer1";
import UpdateBreakdown from "./UpdateBreakDown";
import { useLocation } from "react-router-dom";
import Notification from "../Passenger/Notification";
import TravelDetails from "./TravelDetails_Ac";
import { useEffect, useState } from "react";
import VehicleLocation from "../pages/MapLocationWindow/LocationWindow";
import StartRideButton from "../Components/Buttons/MapButton/StartRideButton";
import EndRideButton from "../Components/Buttons/MapButton/EndRideButton";
import axios from "axios";
import { head } from "cypress/types/lodash";
import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';

const MySwal = withReactContent(Swal);

const getToken = () => {
  return sessionStorage.getItem("token");
}
function Driver2() {
  let location = useLocation();
  let { travelDetails, DriverId } = location.state || {};


  const handleend = () => {
    if(travelDetails.routNo){
      axios.put(`https://localhost:7296/api/ScheduledBus/endbustrip/${travelDetails.id}`,
          {
            headers: {
              Authorization: `Bearer ${getToken()}`,
            },
          }
        
      )
      .then((response) => {
        if(response.status === 200){
          alert("Bus trip ended")
        }
      })


    }else{
      axios.put(`https://localhost:7296/api/Scheduledtrain/endtraintrip/${travelDetails.id}`,
          {
            headers: {
              Authorization: `Bearer ${getToken()}`,
            },
          }
      )
      .then((response) => {
        if(response.status === 200){
          alert("Train trip ended")
        }
      })
    }
    
  }

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    MySwal.fire({
      title: 'Loading...',
      text: 'Please wait while we load your data',
      allowOutsideClick: false,
      didOpen: () => {
        MySwal.showLoading();
      },
    });

    // Simulating data fetching, you should replace this with actual data fetching logic
    setTimeout(() => {
      setLoading(false);
      MySwal.close();
    }, 2000); // Adjust the timeout as needed
  }, []);
  if (loading) {
    return null; // Return null or a loader component while data is loading
  }



  if (!travelDetails) {
    return <div>Travel details not found.</div>;
  }

    
  

  
  return (
    <>
      <PrimaryNavBar />

      <div
        className="p-4 rounded-4 mt-5 mb-5 mr-5 ml-5"
        style={{ background: "#F1F1F1" }}
      >
        <div className="container">
          {travelDetails.routNo ? (
            <div className="d-flex flex-row justify-content-center align-items-center font-weight-bold font-family-Inter fs-2">
              {travelDetails.startLocation} TO {travelDetails.endLocation}
            </div>
          ) : (
            <div className="d-flex flex-row justify-content-center align-items-center font-weight-bold fs-2">
              {travelDetails.startStation} TO {travelDetails.endStation}
            </div>
          )}

          <div className="d-flex flex-row justify-content-center align-items-center fs-3 ">
            Travel Journey Id : {travelDetails.id}
          </div>
          {travelDetails.routNo ? (
            <div className="row fs-5 mt-2">Vehicle No: {travelDetails.busNo}</div>
          ) : (
            <div className="row fs-5 mt-2">Train Name: {travelDetails.trainName}</div>
          )}

          {travelDetails.routNo ? (
            <div className="row fs-5 mt-2">
              Vehicle reg no :{travelDetails.registeredBusBusId}{" "}
            </div>
          ) : (
            <div className="row fs-5 mt-2"></div>
          )}

          <div className="row mb-5 fs-5 mt-2">Driver Id:{DriverId} </div>

          <div className="row">
            <div></div>
          </div>
          {/* <div className="row">Booked Seat</div> */}
          <div className="p-5 rounded-4 custom-height" style={{ background: "#FFFFFF"}}>
          <StartRideButton rideId={travelDetails.id} />&nbsp;&nbsp;
          <span onClick={handleend}><EndRideButton rideId={travelDetails.id} connectionId=""/></span>
            <VehicleLocation rideId={travelDetails.id} />

            </div>

        </div>
        <UpdateBreakdown routNo={travelDetails.routNo} Id={travelDetails.id} DriverId={DriverId} BusNo={travelDetails.busNo}/>
      </div>
      <Footer />
      <div className="d-none">
      <Notification/>
      </div>

    </>
  );
}
export default Driver2;
