import Footer from "../Components/Footer/footer";
import PrimaryNavBar from "../Components/NavBar/PrimaryNavBar";
import Rec4 from "./images/Rectangle 1291.png";
import train from "../Components/payment/asset/train.png";
import Minicar from "../Components/payment/asset/Minicar.png";
import Rec5 from "./images/Rectangle 1288.png";
import VehicleLocation from "../pages/MapLocationWindow/LocationWindow";
import { useLocation } from "react-router-dom";
import { useState } from "react";

interface TripData{
  id:number,
  busId: number,
  trainScheduleId: number | null,
  busScheduleId:number | null,
  type: string,
  boardingPoint: string,
  bookingDate: string,
  startTime: string,
  droppingPoint: string,
  endTime: string,
  StartLocation: string,
  EndLocation: string,
  routeNumber: string,
  passengerId: number
}
const rideId = 13;

function MapView() {
  // const TripData={
  //   id:13,
  //   busId: 15,
  //   trainScheduleId: 0,
  //   busScheduleId:6 ,
  //   type: "bus" ,
  //   boardingPoint: "string",
  //   bookingDate: "string",
  //   startTime: "string",
  //   droppingPoint: "string",
  //   endTime: "string",
  //   StartLocation: "string",
  //   EndLocation: "string",
  //   routeNumber: "string",
  //   passengerId: 56
  // }
  const [MapData,setMapData]=useState<TripData[]>([]);
  let location = useLocation();
  const state=location.state.booking || {};
  // setMapData(location.state as TripData[]);
  console.log("Booking object",state);
  console.log("Dropping Point",state.droppingPoint);
  return (
    <>
      <PrimaryNavBar />
      <div
        className="p-4 rounded-4 mt-5 mb-5 mr-5 ml-5"
        style={{
          background: `url(${Rec5}) no-repeat center center`,
          backgroundSize: "cover",
        }}
      >
        <div className="row justify-content-center">
          <div className="col-auto">
            <p className="text-success fs-6 fw-bold font-family-Poppins">
              Trip No:{state.trainScheduleId || state.busScheduleId}
              {}
            </p>
            <p className="text-success fs-6 font-family-Poppins">
              Passenger Id:{state.passengerId}
            </p>
          </div>
        </div>
        <div className="container">
          <div className="row ">
            {/* <div className="d-flex align-items-center position-relative img-fluid p-5 "> */}
            <div className="d-flex align-items-center justify-content-center position-relative img-fluid p-5">
              <img src={Rec4} alt="Rec4" className="img-fluid w-100" />
              <div className="position-absolute w-100 h-100 d-flex flex-column justify-content-center align-items-center p-3">
                <div className="container-fluid">
                  <div className="row align-items-center justify-content-center">
                    <div className="col-6 col-md-2 text-center">
                      <img src={train} alt="BusIcon" className="img-fluid" />
                    </div>
                    <div className="col-6 col-md-2 text-center mt-2 mt-md-0">
                      <h3 className="text-dark fs-6 font-family-Poppins text-uppercase m-0">
                        {state.boardingPoint}
                      </h3>
                    </div>
                    <div className="col-6 col-md-1 text-center mt-2 mt-md-0">
                      <img src={Minicar} alt="BusIcon2" className="img-fluid" />
                    </div>
                    <div className="col-6 col-md-2 text-center mt-2 mt-md-0">
                      <h3 className="text-dark fs-6 font-family-Poppins text-uppercase m-0">
                      {state.droppingPoint}
                      </h3>
                    </div>
                    <div className="col-12 col-md-2 text-center mt-2 mt-md-0">
                      <div className="bg-success-subtle rounded-3 px-2 py-0">
                      
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-2"></div>
              <div className="col-4" style={{ lineHeight: "1" }}>
                <p className="m-1">Date</p>
                <p className="m-1">Route Number</p>
                <p className="m-1">Boarding Point</p>
                <p className="m-1">Dropping Point</p>
               
              </div>
              <div className="col-4" style={{ lineHeight: "1" }}>
                <p className="date text-end m-1">{state.bookingDate}</p>
                <p className="routenumber text-end m-1">{state.routeNumber}</p>
                <p className="starttime text-end m-1">{state.boardingPoint}</p>
                <p className="endtime text-end m-1">{state.droppingPoint}</p>
                <p className="passenger text-end m-1">{state.bookedSeatCount}</p>
              </div>
              <div className="col-2"></div>
            </div>
          </div>
        </div>
        <div
          className="p-2 rounded-4 custom-height mt-5 "
          style={{ background: "#F1F1F1" }}
        >
          <VehicleLocation rideId={state.busScheduleId||state.trainScheduleId} />
        </div>
      </div>

      <Footer />
    </>
  );
};

export default MapView;
