// components/DriverDashboard.tsx
import React, { useState } from "react";
import axios from "axios";

interface Props {
    routNo: string | undefined; // replace 'any' with the correct type of travelDetails
    Id: number | undefined; // adjust the type according to your data
    DriverId: number | undefined;
    BusNo: string| undefined;
  }


const UpdateBreakdown: React.FC<Props> = ({routNo,Id,DriverId,BusNo}) => {
  const [message, setMessage] = useState("");
//this function is used to update the breakdown status in signalR
  const updateBreakdown = async () => {
    console.log(
        Id,
        message,
        routNo

   )
    try {
      await axios.post(
        "https://localhost:7296/Breakdown",
        {
            id: Id,
            message: message,
            routNo: routNo
          },
        // { message: message, id:Id, routNo:routNo},
         {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
     
      setMessage(""); // Clear the input after submission
    } catch (error) {
      console.error("Error sending breakdown update: ", error);
    }
  };

  const handleRadioClick= async()=>{
    try{
      await axios.post("https://localhost:7296/api/DriverBreakdown",{driverId:DriverId, busNo:BusNo});
    }catch(error){
      console.error("Error sending breakdown update using radio button: ", error);
    }
  }

return (
    <div className="container">
      <div className="d-flex justify-content-start mt-4 mb-3 font-weight-bold fs-5" style={{ color: "#0254A4", fontSize: "16px" }}>
        Update status
      </div>
      <div className="p-4 rounded-4 " style={{ background: "#FFFFFF" }}>
        <div className="d-flex flex-row">
          <textarea
            className="form-control rounded-2 mt-3 ml-3 mr-3 mb-3"
            style={{
              backgroundColor: "#D9D9D9",
              minHeight: "100px",
              resize: "vertical",
            }}
            placeholder="Message type here....."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </div>
        <div className="row mt-1 ">
          <div className="col ">
            <div className="form-check ">

              <input
                className="form-check-input"
                type="radio"
                name="inlineRadioOptions"
                id="inlineRadio1"
                value="option1"
                onClick={handleRadioClick}
              />
              <label className="form-check-label" htmlFor="inlineRadio1">
                Breakdown
              </label>
            </div>
            </div>
            <div className="col">
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="inlineRadioOptions"
                id="inlineRadio2"
                value="option2"
              />
              <label className="form-check-label" htmlFor="inlineRadio2">
                Lateness
              </label>
              </div>
            </div>
            <div className="col">
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="inlineRadioOptions"
                id="inlineRadio3"
                value="option3"
              />
              <label className="form-check-label" htmlFor="inlineRadio3">
                Others
              </label>
              </div>
            </div>
          </div>
          <div className="col d-flex justify-content-end mt-1">
            <button className="btn btn-primary" onClick={updateBreakdown}>
              Confirm
            </button>
          </div>
        </div>
      </div>
  
  );
};

export default UpdateBreakdown;
