import ProfileSection from "./ProfileSection";
import PrimaryNavBar from "../Components/NavBar/PrimaryNavBar";
import Footer from "../Components/Footer/Footer1";
import TravelDetails_Ac from "./TravelDetails_Ac";
import TravelDetails_Co from "./TravelDetails_Co";
import { useState } from "react";


function Driver() {
  const [currentComponent, setCurrentComponent] = useState("TravelDetails_Ac");
  const handleClick = (component: string) => {
    setCurrentComponent(component);
  };

  const buttonStyle = {
    backgroundColor: 'rgba(217, 217, 217, 1)',
    color: 'black', // Optionally change text color to ensure readability    
    width: '15%'
  };
 


  return (
    <>
      <PrimaryNavBar />
      <div className="container-fluid pt-3">
        <div>
          <ProfileSection />
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
                <TravelDetails_Ac />
              ) : (
                <TravelDetails_Co />
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
