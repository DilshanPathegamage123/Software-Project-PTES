// import React, { useEffect, useState } from "react";
// import "./TravelDetails.css";
// import PrimaryButton from "../Components/Buttons/PrimaryButton";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { color } from "html2canvas/dist/types/css/types/color";


// function TravelDetails() {
//     interface travel {
//         id: number;
//         arrivalDate: string;

//         routNo: string;
//         startLocation: string;
//         endLocation: string;
//         arrivalTime: string;
//         departureTime: string;
//         busNo: string;
//         registeredBusBusId: number;

//         trainRoutNo: string;
//         startStation: string;
//         endStation: string;
//         trainDepartureTime: string;
//         trainArrivalTime: string;
//         trainName: string;

//     }
 
//   const [travelDetails, setTravelDetails] = useState<travel[]>([]);
//   const DriverId: number | null = 79;
//   const DrivingLicenceNum: string | null = "t1234566";


//   const history = useNavigate();


//     const handleClick = (detail: travel) => {
//       history("/Driver2", { state: { travelDetails:detail,DriverId} });
//     }
  
//   useEffect(() => {
//     let url : string| null = null;

//     if (DrivingLicenceNum && DrivingLicenceNum.startsWith("t")) {
//       url = `https://localhost:7296/api/Scheduledtrain/details?isCompleted=false&Id=${DriverId}`;
//     } else if (DrivingLicenceNum && DrivingLicenceNum.startsWith("b")) {
//       url = `https://localhost:7296/api/ScheduledBus/details?isCompleted=0&Id=${DriverId}`;
//     }
    
//     if (url) {
//       console.log(url);
//     axios
//       .get(url)
//       .then((response) => {
//         setTravelDetails(response.data);
//       })
//       .catch((error) => {
//         console.error("There was an error fetching the travel details!", error);
//         alert("There was an error fetching the travel details!");
//       });
//     }
//   }, []);

//   return (
//     <>
//       {travelDetails.length === 0 ? (
//                 <div className="row p-5 rounded-4 sec shadow  bg-grey mt-5 mb-5 ml-4 mr-4">
//                     <div className="col-lg-12 mt-5 mb-5">
//                         <p className="text-danger fs-10 fw-bold font-family-Inter">No travel details available at the moment. Please check back later.</p>
                       
//                     </div>
//                 </div>
//             ) : (
//     travelDetails.map((detail, index) => (
//       <div className="row p-5 rounded-4 sec shadow m-4 bg-grey" key={index}>
//         <div className="col-lg-10">
//         {detail.routNo ? (
//           <p>
//             <span className="text-dark fs-6 fw-bold font-family-Inter">
//               Travel Journey Id:{" "}
//             </span>
//             <span className="text-dark fs-6 fw-normal font-family-Inter">
//               {detail.id}
//               <br />
//             </span>
//             <span className="text-dark fs-6 fw-bold font-family-Inter">
//               Rout No:
//             </span>
//             <span className="text-dark fs-6 fw-normal font-family-Inter">
//               {detail.routNo}
//               <br />
//             </span>
//             <span className="text-dark fs-6 fw-bold font-family-Inter">
//               Rout Name:
//             </span>
//             <span className="text-dark fs-6 fw-normal font-family-Inter">
//               {" "}
//               {detail.startLocation} - {detail.endLocation}
//               <br />
//             </span>
//             <span className="text-dark fs-6 fw-bold font-family-Inter">
//               Date:
//             </span>
//             <span className="text-dark fs-6 fw-normal font-family-Inter">
//               {detail.arrivalDate}
//               <br />
//             </span>
//             <span className="text-dark fs-6 fw-bold font-family-Inter">
//               Start Time:
//             </span>
//             <span className="text-dark fs-6 fw-normal font-family-Inter">
//               {detail.departureTime}
//               <br />
//             </span>
//             <span className="text-dark fs-6 fw-bold font-family-Inter">
//               End Time:
//             </span>
//             <span className="text-dark fs-6 fw-normal font-family-Inter">
//               {" "}
//               {detail.arrivalTime}
//               <br />
//             </span>
//           </p>
//           ):(
//             <p>
//             <span className="text-dark fs-6 fw-bold font-family-Inter">
//               Travel Journey Id:{" "}
//             </span>
//             <span className="text-dark fs-6 fw-normal font-family-Inter">
//               {detail.id}
//               <br />
//             </span>
//             <span className="text-dark fs-6 fw-bold font-family-Inter">
//               Rout No:
//             </span>
//             <span className="text-dark fs-6 fw-normal font-family-Inter">
//               {detail.trainRoutNo}
//               <br />
//             </span>
//             <span className="text-dark fs-6 fw-bold font-family-Inter">
//               Rout Name:
//             </span>
//             <span className="text-dark fs-6 fw-normal font-family-Inter">
//               {" "}
//               {detail.startStation} - {detail.endStation}
//               <br />
//             </span>
//             <span className="text-dark fs-6 fw-bold font-family-Inter">
//               Date:
//             </span>
//             <span className="text-dark fs-6 fw-normal font-family-Inter">
//               {detail.arrivalDate}
//               <br />
//             </span>
//             <span className="text-dark fs-6 fw-bold font-family-Inter">
//               Start Time:
//             </span>
//             <span className="text-dark fs-6 fw-normal font-family-Inter">
//               {detail.trainDepartureTime}
//               <br />
//             </span>
//             <span className="text-dark fs-6 fw-bold font-family-Inter">
//               End Time:
//             </span>
//             <span className="text-dark fs-6 fw-normal font-family-Inter">
//               {" "}
//               {detail.trainArrivalTime}
//               <br />
//             </span>
//           </p>
//           )}
//         </div>

//         <div className="col-lg-2">
//           <button value="View" className="btn btn-primary btn-sm" type="button" color="bg" onClick={() => handleClick(detail)}  >view</button>
//         </div>
//       </div>
//         ))
//       )}
//     </>
//   );
// }

// export default TravelDetails;



import React, { useEffect, useState } from "react";
import "./TravelDetails.css";
import PrimaryButton from "../Components/Buttons/PrimaryButton";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function TravelDetails() {
    interface Travel {
        id: number;
        arrivalDate: string;
        routNo: string;
        startLocation: string;
        endLocation: string;
        arrivalTime: string;
        departureTime: string;
        busNo: string;
        registeredBusBusId: number;
        trainRoutNo: string;
        startStation: string;
        endStation: string;
        trainDepartureTime: string;
        trainArrivalTime: string;
        trainName: string;
    }
 
    const [travelDetails, setTravelDetails] = useState<Travel[]>([]);
    const DriverId: number | null = 79;
    const DrivingLicenceNum: string | null = "t1234566";
    const history = useNavigate();

    const handleClick = (detail: Travel) => {
      history("/Driver2", { state: { travelDetails: detail, DriverId } });
    }
  
    useEffect(() => {
        let url: string | null = null;
    
        if (DrivingLicenceNum && DrivingLicenceNum.startsWith("t")) {
            url = `https://localhost:7296/api/Scheduledtrain/details?isCompleted=false&Id=${DriverId}`;
        } else if (DrivingLicenceNum && DrivingLicenceNum.startsWith("b")) {
            url = `https://localhost:7296/api/ScheduledBus/details?isCompleted=0&Id=${DriverId}`;
        }
        
        if (url) {
            console.log(url);
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
            {travelDetails.length === 0 ? (
                <div className="row p-5 rounded-4 sec shadow bg-grey mt-5 mb-5 ml-4 mr-4">
                    <div className="col-lg-12 mt-5 mb-5">
                        <p className="text-danger fs-10 fw-bold font-family-Inter">
                            No travel details available at the moment. Please check back later.
                        </p>
                    </div>
                </div>
            ) : (
                <div className="scroll-container">
                    {travelDetails.map((detail, index) => (
                        <div className="row p-5 rounded-4 sec shadow m-4 bg-grey travel-detail" key={index}>
                            <div className="col-lg-10">
                                {detail.routNo ? (
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
                                ) : (
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
                                            {detail.trainRoutNo}
                                            <br />
                                        </span>
                                        <span className="text-dark fs-6 fw-bold font-family-Inter">
                                            Rout Name:
                                        </span>
                                        <span className="text-dark fs-6 fw-normal font-family-Inter">
                                            {" "}
                                            {detail.startStation} - {detail.endStation}
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
                                            {detail.trainDepartureTime}
                                            <br />
                                        </span>
                                        <span className="text-dark fs-6 fw-bold font-family-Inter">
                                            End Time:
                                        </span>
                                        <span className="text-dark fs-6 fw-normal font-family-Inter">
                                            {" "}
                                            {detail.trainArrivalTime}
                                            <br />
                                        </span>
                                    </p>
                                )}
                            </div>

                            <div className="col-lg-2">
                                <button 
                                    value="View" 
                                    className="btn btn-primary btn-sm" 
                                    type="button" 
                                    onClick={() => handleClick(detail)}>
                                    View
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </>
    );
}

export default TravelDetails;

