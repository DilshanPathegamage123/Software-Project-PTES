import ProfileSection from "./ProfileSection";
import PrimaryNavBar from "../Components/NavBar/PrimaryNavBar-logout";
import Footer from "../Components/Footer/Footer1";
import TravelDetails_Ac from "./TravelDetails_Ac";
import TravelDetails_Co from "./TravelDetails_Co";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import profileIcon from "../Components/ProfileSection/assets/iconamoon_profile-circle-fill.png";

interface driverData {
  Id: number;
  firstName: string;
  lastName: string;
  email: string;
  dob: string;
  nic: string;
  contactNo: string;
  userName: string;
  password: string;
  userType: string;
  ownVehicleType: string;
  drivingLicenseNo: string;
  isDeleted: boolean;
  requestStatus: boolean;
}
function Driver() {
  const [currentComponent, setCurrentComponent] = useState("TravelDetails_Ac");
  const handleClick = (component: string) => {
    setCurrentComponent(component);
  };
  const[driverid, setDriverid] = useState<number>();

  const buttonStyle = {
    backgroundColor: 'rgba(217, 217, 217, 1)',
    color: 'black', // Optionally change text color to ensure readability    
    width: '15%'
  };

  
  let location = useLocation();
  let { username, password } = location.state;
  const [driverdata, setDriverdata] = useState<driverData[]>([]);
  const history = useNavigate();
  useEffect(() => {
    axios
      .get(`https://localhost:7196/api/userData/findUser/${username}/${password}`)
      .then((response) => {
       // console.log(response.data);
        setDriverdata(
       
        (
          response.data.map((driver: any) => ({
            Id: driver.id,
            firstName: driver.firstName,
            lastName: driver.lastName,
            email: driver.email,
            dob: driver.dob,
            nic: driver.nic, 
            contactNo: driver.contactNo,
            userName: driver.userName,
            password: driver.password,
            userType: driver.userType,
            ownVehicleType: driver.ownVehicleType,
            drivingLicenseNo: driver.drivingLicenseNo,
            isDeleted: driver.isDeleted,
            requestStatus: driver.requestStatus,
          }))
        ));
        const driverId=(driverdata[0]?driverdata[0].Id:0).toString();
        sessionStorage.setItem('userId', driverId);
        //console.log(passengerdata);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
 


  return (
    <>
      <PrimaryNavBar />
      <div className="container-fluid pt-3">
        <div>
        <div className="container-fluid rounded-4 proSec">
            <div className="row align-items-center">
              <div className="col-lg-3 col-sm-6 col-12 text-center">
                <h5 className="text-white pt-4">Driver</h5>
                <img src={profileIcon} alt="profileIcon" className="pb-3" />
              </div>

              <div className="col-lg-4 col-sm-6 p-4">
                <div className="">
                  <p className="text-white">
                  {driverdata[0] ? driverdata[0].firstName : 'Loading...'}&nbsp;{driverdata[0] ? driverdata[0].lastName : 'Loading...'}
                    <br />
                   Driver Id : {driverdata[0]?driverdata[0].Id:'Loading...'} <br />
                  {driverdata[0] ? driverdata[0].email : 'Loading...'}
                    <br />
                    
                  </p>
                </div>
                {/* <PrimaryButton type="button" value="Update" color="third" /> */}
                <button
                  className="btn btn-primary btn-sm"
                  onClick={() => {
                    history("/UpdatePassengerProfile", {
                      state: { passengerdata: driverdata[0] },
                    });
                  }}
                >
                  Update
                </button>

              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-lg-12 col-sm-10 rounded-4 p-3 px-4">
            <div className="d-flex flex-row">
              <div></div>
              <button
                className={`btn ${
                  currentComponent === "TravelDetails_Ac"
                    ? "secondary"
                    : "Yellow"
                }`}
                onClick={() => handleClick("TravelDetails_Ac")}
                style={buttonStyle}
              >
                Active
              </button>
              <button
                className={`btn ${
                  currentComponent === "TravelDetails_Co"
                    ? "secondary"
                    : "Yellow"
                }`}
                onClick={() => handleClick("TravelDetails_Co")}            
                style={buttonStyle}
              >
                Completed
              </button>
            </div>
            <div className="p-4 rounded-4 mb-4" style={{ background: "#F1F1F1" }}>
              {currentComponent === "TravelDetails_Ac" ? (
                <TravelDetails_Ac DriverId={driverdata[0]?driverdata[0].Id:0} DrivingLicenceNum={driverdata[0]?driverdata[0].drivingLicenseNo:""}/>
              ) : (
                <TravelDetails_Co DriverId={driverdata[0]?driverdata[0].Id:0} DrivingLicenceNum={driverdata[0]?driverdata[0].drivingLicenseNo:""}/>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Driver;
