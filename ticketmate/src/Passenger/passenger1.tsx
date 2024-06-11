import PrimaryNavBar from "../Components/NavBar/PrimaryNavBar";
import ProfileSection from "./ProfileSection";
import Footer from "../Components/Footer/footer";
import MyBookings from "./MyBookings";
import { useEffect, useState } from "react";
import TravelHistory from "./TravelHistory";
import Notifications from "./Notification";

function Passenger() {
  const [divWidth, setDivWidth] = useState(0);
  const [currentComponent, setCurrentComponent] = useState("My Bookings");
  const handleClick = (component: string) => {
    setCurrentComponent(component);
  };

  const buttonStyle = {
    backgroundColor: "rgba(217, 217, 217, 1)",
    color: "black", // Optionally change text color to ensure readability
    //width: "35%",
  };

  useEffect(() => {
    function handleResize() {
      const width = document.getElementById("getWidth")?.offsetWidth;
      setDivWidth(width || 0);
    }

    handleResize(); // Get initial width
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div>
      <PrimaryNavBar />
      <div className="col-lg-10 col-sm-12 m-auto pt-3">
        <div>
          <ProfileSection />
        </div>
        <div className="h-auto align-items-center justify-content-center m-auto  ">
          <div className="col-12  rounded-4 pt-3 class1">
            <div className="d-flex flex-row pb-2 ">
              <button
                className={`btn m-1  ${
                  currentComponent === "My Bookings" ? "secondary" : "grey"
                }`}
                onClick={() => handleClick("My Bookings")}
                style={
                  currentComponent === "My Bookings"
                    ? {
                        ...buttonStyle,
                        fontWeight: "semi-bold",
                        color: "white",
                      }
                    : buttonStyle
                }
              >
                My Bookings
              </button>
              <button
                className={`btn m-1 ${
                  currentComponent === "Travel History" ? "secondary" : "grey"
                }`}
                onClick={() => handleClick("Travel History")}
                style={
                  currentComponent === "Travel History"
                    ? { ...buttonStyle, fontWeight: "bold", color: "white" }
                    : buttonStyle
                }
              >
                Travel History
              </button>
              <button
                className={`btn m-1 ${
                  currentComponent === "Notifications" ? "secondary" : "grey"
                }`}
                onClick={() => handleClick("Notifications")}
                style={
                  currentComponent === "Notifications"
                    ? { ...buttonStyle, fontWeight: "bold", color: "white" }
                    : buttonStyle
                }
              >
                Notifications
              </button>
            </div>
            <div className="p-2 rounded-4 ms-auto me-auto justify-content-center align-items-center " style={{ background: "#F1F1F1" }}>
              {currentComponent === "My Bookings" ? (
                <MyBookings />
              ) : currentComponent === "Travel History" ? (
                <TravelHistory />
              ) : (
                <Notifications />
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Passenger;
