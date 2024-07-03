
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, useLocation } from "react-router-dom";
//import PrimaryNavBar from "../../Components/NavBar/PrimaryNavBar";
import PrimaryNavBar_logout from "../../Components/NavBar/PrimaryNavBar-logout";
import ProfileSection from "../../Components/ProfileSection/ProfileSection";
import SquareButton from "../../Components/Buttons/SquareButton/SquareButton";
import PrimaryButton from "../../Components/Buttons/PrimaryButton";
import "./AdminPage.css";
import Footer from "../../Components/Footer/footer";
import profileIcon from "../../../src/Components/ProfileSection/assets/iconamoon_profile-circle-fill.png";
import { BiFontColor } from "react-icons/bi";
import UserManage from "./UserManage";
import RegistrationRequests from "./RegistrationRequests";
import ReportAnlysis from "./ReportingAnalysisBus";
import ReportTable from "./ReportingAnalysisBus";
import Swal from "sweetalert2";


function AdminPage() {
let location = useLocation();
let { username, password } = location.state;
//   const location = useLocation();
//   const username = new URLSearchParams(location.search).get("username");
//  const password = new URLSearchParams(location.search).get("password");

  const [selectedOption, setSelectedOption] = useState("option1");

  const [loading, setLoading] = useState(true);
  


  
  useEffect(() => {
      Swal.fire({
        title: 'Loading...',
        text: 'Please wait while we load your data',
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });
  
      // Simulating data fetching, you should replace this with actual data fetching logic
      setTimeout(() => {
        setLoading(false);
        Swal.close();
      }, 2000); // Adjust the timeout as needed
    }, []);
  if (loading) {
    return null; // Return null or a loader component while data is loading
  }

  return (
    <div className="adminpage">
 <span data-testid="navbar"><PrimaryNavBar_logout /></span>

      <div className="container-fluid pt-3 ">
        <div className="container-fluid rounded-4 proSec">
          <div className="row align-items-center">
            <div className="col-lg-3 col-sm-6 col-12 text-center">
              <h5 className="text-white pt-4">Admin</h5>
              <img src={profileIcon} alt="profileIcon" className="pb-3" 
              data-testid="logo-admin"/>
            </div>

            <div className="col-lg-4 col-sm-6 p-4" data-testid="profile-section-text">
              <div className="">
                <p className="text-white">
                  {username}
                  <br />
                  shanukalakshan922@gmail.com
                  <br />
                  0769004922
                </p>
              </div>
              {/* <PrimaryButton type="button" value="Update" color="third"/> */}
            </div>
          </div>
        </div>
      </div>
      <br />
      <br />
      <div className="row" style={{ marginLeft: "8%", marginRight: "8%" }}>
        <div
          className="col-xl-4 col-md-6 col-12 rounded-top-4 border border-3 border-white p-2 text-center"
          style={{ backgroundColor: selectedOption==="option1"?"#00757C":"#D9D9D9"}}
        >
          <div>
          
            <button
              style={{ border: "none", background: "none" , color:selectedOption==="option1"? "#D9D9D9":"#00757C" ,fontWeight:"bold"}}
              value="option1"
              onClick={() => setSelectedOption("option1")}
            >
              Registration Requests
            </button>
          </div>
        </div>
        <div
          className="col-xl-4 col-md-6 col-12 rounded-top-4 border border-3 border-white p-2 text-center"
          style={{ backgroundColor:selectedOption==="option2"?"#00757C":"#D9D9D9" }}
        >
          <button
              style={{ border: "none", background: "none" , color: selectedOption==="option2"? "#D9D9D9":"#00757C",fontWeight:"bold"}}
              value="option2"
              onClick={() => setSelectedOption("option2")}
            >
              User Management
            </button>
        </div>
        <div
          className=" col-xl-4 col-md-6 col-12 rounded-top-4 border border-3 border-white p-2 text-center "
          style={{ backgroundColor:selectedOption==="option3"?"#00757C":"#D9D9D9"}}
        >
          <button
              style={{ border: "none", background: "none", color: selectedOption==="option3"? "#D9D9D9":"#00757C",fontWeight:"bold" }}
              value="option1"
              onClick={() => setSelectedOption("option3")}
            >
              Reporting & Analysis
            </button>
        </div>
      </div>

      {/* <div className="container-fluid pt-3 ">
        <div className=" rounded-bottom--5 rounded-bottom--5">
          <div className="row align-items-center">
            <p>lskdfjflskdfjlsdkfsdlkfj</p>
          </div>
        </div>
      </div> */}

<div className="row">
        {selectedOption === "option1" && <RegistrationRequests />}
        {selectedOption === "option2" && <UserManage />}
        {selectedOption === "option3" && < ReportTable/>}
      </div>




      <Footer />
    </div>
  );
}

export default AdminPage;


