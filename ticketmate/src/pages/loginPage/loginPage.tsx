import PrimaryNavBar from "../../Components/NavBar/PrimaryNavBar";
import React, { useState } from "react";
import "./loginPage.css";
// import vars from '../../vars'
import loginimage from "../../assets/Ellipse 628.svg";
import PrimaryButton from "../../Components/Buttons/PrimaryButton";
import Footer from "../../Components/Footer/Footer";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const history = useNavigate();

  const handlesubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    try {
      // console.log("username: " + username + " password: " + password);
      const response = await axios.post(
        "https://localhost:7196/api/Auth/login",
        {
          username,
          password,
        }
      );

      // if (!response.data.token) {
      //   console.error("Token not found in response:", response.data);
      //   alert("Token not found in response. Please check your credentials.");
      //   return;
      // }

      const token = response.data.jwtToken;
      //Fconsole.log("token", token);

      if (token) {
        localStorage.setItem("token", token);

        //decode the token
        const tokenParts = token.split(".");
        const encodedPayload = tokenParts[1];
        // console.log("encodedPayload", encodedPayload); // Log the encoded payload

        const decodedPayload = JSON.parse(atob(encodedPayload));
        const userRole =
          decodedPayload[
            "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
          ];
        //console.log("userRole" , userRole);

        switch (userRole) {
          case "Admin":
            // history("/AdminPage");
            history(`/AdminPage?username=${username}&password=${password}`);

            break;
          case "Owner":
            history("#");
            break;
          case "Passenger":
            history("/#");
            break;
          case "Driver":
            history("/#");
            break;
          default:
            //alert("Invalid user name or password");
            break;
        }
      } else {
        alert("Invalid user name or password");
      }
    } catch (error) {
      alert("Invalid user name or password");

      console.error("There was an error!", error);
      // Handle error (e.g., show error message to user)
    }

  };


  return (
    <div>
      {/* <PrimaryNavBar /> */}
      <a href="#">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="30"
          height="30"
          fill="#042F40"
          className="bi bi-arrow-left-circle col-1 my-3 mx-5"
          viewBox="0 0 16 16"
        >
          <path
            fillRule="evenodd"
            d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8m15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-4.5-.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5z"
          />
        </svg>
      </a>

      <form onSubmit={handlesubmit}>

        <div className=" d-flex justify-content-center ">
          <div
            className="shadow p-3 mb-5 bg-white col-5 row-2 justify-center "
            id="login-form"

          >
            <div className="text-center">
              <img src={loginimage} alt="loginimage" className="" />
            </div>

            {/* <input
              className="form-control col-8 mx-auto m-4 custom-bg-color"
              type="text"
              placeholder=" <><BsFillPersonFill />    username"
              required
            ></input> */}
            <input
              className="form-control col-8 mx-auto m-4 custom-bg-color"
              type="text"
              placeholder="username"
              name="username"
              required
              onChange={(e) => setUsername(e.target.value)}
              style={{ paddingLeft: "30px" }}
              // Add padding for the icon

            ></input>

            <input
              type="password"
              name="password"
              onChange={(e) => setPassword(e.target.value)}
              className="form-control col-8 mx-auto m-4 custom-bg-color"
              placeholder="      password"

              required
            ></input>
            <div className="d-flex justify-content-center ">
              {/* <PrimaryButton
                type="submit"
                value="LOG IN"
                color="primary"
                IsSmall={false}
              /> */}
              <input type="submit" value="LOG IN" className="btn btn-primary" />
            </div>
          </div>
        </div>
      </form>
      <Footer />
    </div>

  );
};
export default LoginPage;
