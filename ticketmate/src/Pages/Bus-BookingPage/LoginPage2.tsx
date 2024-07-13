import PrimaryNavBar from "../../Components/NavBar/PrimaryNavBar";
import "./LoginPage2.css";
import loginimage from "../../assets/Ellipse 628.svg";
import Footer from "../../Components/Footer/footer";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import Swal from "sweetalert2";

interface userData {
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

const LoginPage2 = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [userData, setUserData] = useState<userData | null>(null);
  const navigate = useNavigate();
  const location = useLocation();
  //const bookingDetails = location.state;
  //console.log("bookingDetails", bookingDetails);

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    Swal.fire({
      title: "Logging in",
      text: "Please wait...",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });


    try {
      const response = await axios.post(
        "https://localhost:7196/api/Auth/login",
        {
          username,
          password,
        }
      );

      const token = response.data.jwtToken;
      console.log("token", token);

      if (token) {
        sessionStorage.setItem("token", token);

        try {
          const response2 = await axios.get(
            `https://localhost:7196/api/userData/findUser/${username}/${password}`
          );
          console.log(response2.data);
          

          const user = response2.data[0];
          setUserData(user);

          console.log(user.id);

          // Decode the token
          const tokenParts = token.split(".");
          const encodedPayload = tokenParts[1];
          const decodedPayload = JSON.parse(atob(encodedPayload));
          const userRole =
            decodedPayload[
              "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
            ];

            Swal.close();

          // Navigate to the paymentmain page and pass bookingDetails and userId
          if (user && location.state) {
            navigate("/paymentmain", {
              state: { BusScheduleId : location.state.BusScheduleId,
        TrainScheduleId : location.state.TrainScheduleId,
        VehicleId : location.state.VehicleId,
        RouteNo : location.state.RouteNo,
        StartLocation : location.state.StartLocation,
        EndLocation : location.state.EndLocation,
        BoardingPoint : location.state.BoardingPoint,
        DroppingPoint : location.state.DroppingPoint,
        StartTime : location.state.StartTime,
        EndTime : location.state.EndTime,
        BookingSeatNO : location.state.BookingSeatNO,
        BookingSeatCount : location.state.BookingSeatCount,
        TicketPrice : location.state.TicketPrice,
        TotalPaymentAmount : location.state.TotalPaymentAmount,
        departureDate : location.state.departureDate,
        BookingClass : location.state.BookingClass,
        BookingCarriageNo : location.state.BookingCarriageNo,
         userId: user.id },
            });
          } else {
            alert("Invalid username or password");
          }
        } catch (error) {
          console.error("Error fetching user data", error);
          //alert("Error fetching user data");
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Error fetching user data",
          });
        }
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Invalid username or password",
        });
      }
    } catch (error) {
      console.error("Login error", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Invalid username or password",
      });
    }
  };

  return (
    <div className="loginpage-body ">
      <PrimaryNavBar />
      <div className="content-wrapper2">
      <a href="http://localhost:5173/">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="30"
          height="30"
          fill="#042F40"
          className="bi bi-arrow-left-circle col-1 my-3 mx-5"
          viewBox="0 0 16 16"
          data-testid="back-button"
        >
          <path
            fillRule="evenodd"
            d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8m15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-4.5-.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5z"
          />
        </svg>
      </a>

      <form onSubmit={handleSubmit} method="post">
        <div className=" d-flex justify-content-center ">
          <div
            className="shadow p-3 mb-5 bg-white col-5 row-2 justify-center "
            id="login-form"
          >
            <div className="text-center">
              <img
                src={loginimage}
                alt="loginimage"
                className=""
                data-testid="login-page-profile-icon"
              />
            </div>
            <input
              className="form-control col-8 mx-auto m-4 custom-bg-color"
              type="text"
              placeholder="username"
              name="username"
              required
              onChange={(e) => setUsername(e.target.value)}
              style={{ paddingLeft: "30px" }}
              data-testid="username"
            ></input>

            <input
              type="password"
              name="password"
              onChange={(e) => setPassword(e.target.value)}
              className="form-control col-8 mx-auto m-4 custom-bg-color"
              placeholder="    password"
              value={password}
              required
              data-testid="password"
            ></input>
            <div className=" justify-content-center text-center">
              <input
                type="submit"
                value="LOG IN"
                className=" btn-primary btn"
                data-testid="login-button"
              />
              <br />
              <br />
              <small>
                Don't have an account? <a href="/register">sign up</a>
              </small>
            </div>
          </div>
        </div>
      </form>
      </div>
      <Footer />
    </div>
  );
};

export default LoginPage2;
