import "./TravelDetail.css";

interface BookingData {
  busBookingId: number;
  busScheduleId: number;
  busId: number;

  passengerId: string;
  routeNo: string;
  startLocation: string;
  endLocation: string;
  boardingPoint: string;
  droppingPoint: string;
  startTime: string;
  endTime: string;
  bookingDate: string;
  bookingSeatNO: string;
  bookingSeatCount: string;
  ticketPrice: number;
  totalPaymentAmount: number;
  paymentStatus: boolean;

  trainBookingId: number;
  trainScheduleId: number;
  bookingCarriageNo: number;
  bookingClass: string;
}

const TravelDetails: React.FC<BookingData> = (props) => {
  return (
    <>
      <div className="container ml-5">
        <div
          className="card ml-5 mt-1"
          style={{ border: "none", width: "25rem" }}
        >
          <div className="card-body">
            <ul className="list-inline">
              <li className="list-inline-item">
                Travel Journey Id :{" "}
                <strong style={{ marginLeft: "20px" }}>
                  {" "}
                  {props.busScheduleId
                    ? props.busScheduleId
                    : props.trainScheduleId}
                </strong>{" "}
              </li>
            </ul>
            <ul className="list-inline">
              <li className="list-inline-item">
                Rout No :{" "}
                <strong style={{ marginLeft: "20px" }}>{props.routeNo}</strong>
              </li>
              <li className="list-inline-item"></li>
            </ul>
            <ul className="list-inline">
              <li className="list-inline-item">
                Rout Name:
                <strong style={{ marginLeft: "20px", marginRight: "10px" }}>
                  {props.startLocation}
                </strong>{" "}
                <strong>to</strong>{" "}
                <strong style={{ marginLeft: "20px" }}>
                  {props.endLocation}
                </strong>
              </li>
              <li className="list-inline-item"></li>
            </ul>
            <ul className="list-inline">
              <li className="list-inline-item">
                Date:
                <strong style={{ marginLeft: "20px" }}>
                  {props.bookingDate}
                </strong>
              </li>
              <li className="list-inline-item"></li>
            </ul>
            <ul className="list-inline">
              <li className="list-inline-item">
                Start Time:
                <strong style={{ marginLeft: "20px" }}>
                  {props.startTime}
                </strong>
              </li>
              <li className="list-inline-item"></li>
            </ul>
            <ul className="list-inline">
              <li className="list-inline-item">
                End Time:{" "}
                <strong style={{ marginLeft: "20px" }}>{props.endTime}</strong>
              </li>
              <li className="list-inline-item"></li>
            </ul>
          </div>
        </div>
      </div>

    </>
  );
}
export default TravelDetails;
