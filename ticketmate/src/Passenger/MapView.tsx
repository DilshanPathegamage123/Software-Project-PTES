import Footer from "../Components/Footer/footer";
import PrimaryNavBar from "../Components/NavBar/PrimaryNavBar";
import Rec4 from "./images/Rectangle 1291.png";
import train from "../Components/payment/asset/train.png";
import Minicar from "../Components/payment/asset/Minicar.png";
import Rec5 from "./images/Rectangle 1288.png";
import VehicleLocation from "../pages/MapLocationWindow/LocationWindow";

interface TripData {
  id: number;
  busId: number;
  trainScheduleId: number | null;
  busScheduleId: number | null;
  type: "bus" | "train";
  boardingPoint: string;
  bookingDate: string;
  startTime: string;
  droppingPoint: string;
  endTime: string;
  StartLocation: string;
  EndLocation: string;
  routeNumber: string;
  passengerId: number;
}
const rideId = 54;

const MapView: React.FC<TripData> = (props) => {
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
              Trip No:{" "}
              {props.busId ? props.busScheduleId : props.trainScheduleId}
            </p>
            <p className="text-success fs-6 font-family-Poppins">
              Passenger Id:{props.passengerId}
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
                        Katunayaka
                      </h3>
                    </div>
                    <div className="col-6 col-md-1 text-center mt-2 mt-md-0">
                      <img src={Minicar} alt="BusIcon2" className="img-fluid" />
                    </div>
                    <div className="col-6 col-md-2 text-center mt-2 mt-md-0">
                      <h3 className="text-dark fs-6 font-family-Poppins text-uppercase m-0">
                        Colombo
                      </h3>
                    </div>
                    <div className="col-12 col-md-2 text-center mt-2 mt-md-0">
                      <div className="bg-success-subtle rounded-3 px-2 py-0">
                        <p className="text-black fs-6 fw-bold font-family-Poppins m-0">
                          {/* Any additional text or content */}
                        </p>
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
                <p className="m-1">No of Passengers</p>
              </div>
              <div className="col-4" style={{ lineHeight: "1" }}>
                <p className="date text-end m-1">{props.bookingDate}</p>
                <p className="routenumber text-end m-1">{props.routeNumber}</p>
                <p className="starttime text-end m-1">{props.boardingPoint}</p>
                <p className="endtime text-end m-1">{props.droppingPoint}</p>
                <p className="passenger text-end m-1">{props.EndLocation}</p>
              </div>
              <div className="col-2"></div>
            </div>
          </div>
        </div>
        <div
          className="p-2 rounded-4 custom-height mt-5 "
          style={{ background: "#F1F1F1" }}
        >
          <VehicleLocation rideId={rideId} />
        </div>
      </div>

      <Footer />
    </>
  );
};

export default MapView;
