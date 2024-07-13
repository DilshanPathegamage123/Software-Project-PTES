import "./ownerFormComponent.css";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import PrimaryButton from "../../Components/Buttons/PrimaryButton";
import { useFormik } from "formik";
import { ownerFormValidation } from "./ownerFormValidation";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

const initialValues = {
  firstName: "",
  lastName: "",
  nic: "",
  email: "",
  dob: "",
  contactNumber: "",
  userName: "",
  password: "",
  confirmPassword: "",
};

function ownerFormComponent() {
  const [dob, setDob] = useState<Date | null>(null);
  const [vehicleType, setVehicleType] = useState("bus");
  const history = useNavigate();


  const { values, handleBlur, handleChange, handleSubmit, errors } = useFormik({
    initialValues: initialValues,
    validationSchema: ownerFormValidation,
    onSubmit: async (values) => {
      console.log(values);
      const userData = {
        id: 0,
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        dob: dob,
        nic: values.nic,
        contactNo: values.contactNumber,
        userName: values.userName,
        password: values.password,
        userType: "Owner",
        ownVehicleType: vehicleType,
        drivingLicenseNo: "",
        isDeleted: false,
        requestStatus: false,
      };

      const authData = {
        username: values.userName,
        password: values.password,
        roles: ["Owner"],
      };

      try {
        const userResponse = await axios.post(
          `https://localhost:7196/api/userData/addOwner`,
          userData
        );

        const authResponse = await axios.post(
          `https://localhost:7196/api/Auth/register`,
          authData
        );

        if (authResponse.status === 200 && userResponse.status === 200) {
          Swal.fire({
            title: 'Registration request sent successfully!',
            text: 'Please check your mailbox for response of your request.',
            icon: 'info',
            confirmButtonText: 'OK'

        });
          history("/login");

        }
        console.log(authResponse.data);
      } catch (error) {
        console.error("Error:", error);
        Swal.fire({
          title: 'Error',
          text: 'There was a problem with your registration. Please try again.',
          icon: 'error',
          confirmButtonText: 'OK'
        });
      }

    },

    //start of the api call
    // axios
    // .post(`https://localhost:7196/api/userData`, {
    //       id:0,
    //       firstName: values.firstName,
    //       lastName: values.lastName,
    //       email: values.email,
    //       dob: dob,
    //       nic: values.nic,
    //       contactNo: values.contactNumber,
    //       userName: values.userName,
    //       password: values.password,
    //       userType: "Owner",
    //       ownVehicleType: vehicleType,
    //       drivingLicenseNo: "",
    //       isDeleted: false,
    //       requestStatus:false
    // })
    // .then((response) => {
    //   console.log(response.data);

    //   if(response.status === 200){
    //     history("/BusOwnerPage");
    //     alert(response.data);

    //   }
    // })
    // .catch((error) => {
    //   console.error("Error:", error);
    // });
  });
  return (
    <div>
      <div className="container shadow bg-white col-8  justify-center shadow p-3 rounded mb-5 bg-body rounded">
        <form className="container display-4" onSubmit={handleSubmit}>
          <div className="row  mt-3">
            <div className="col-12 col-lg-6">
              <p className="fw-regular">First Name</p>
              <input
                type="text"
                name="firstName"
                maxLength={30}
                id="firstName"
                style={{
                  borderRadius: "4px",
                  background: "#F6F6F6",
                  border: "#F6F6F6",
                }}
                placeholder="Enter your first name"
                className="col-11 p-3"
                value={values.firstName}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.firstName && (
                <small>
                  <p className="text-danger" style={{ fontSize: "13px" }}>
                    {errors.firstName}
                  </p>
                </small>
              )}
            </div>
            <div className="col-12 col-lg-6">
              <p className="fw-regular">Last Name</p>
              <input
                type="text"
                name="lastName"
                maxLength={30}
                id="lastName"
                style={{
                  borderRadius: "4px",
                  background: "#F6F6F6",
                  border: "#F6F6F6",
                }}
                placeholder="Enter your last name"
                className="col-11 p-3"
                value={values.lastName}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.lastName && (
                <small>
                  <p className="text-danger" style={{ fontSize: "13px" }}>
                    {errors.lastName}
                  </p>
                </small>
              )}
            </div>
          </div>
          <div className="row mt-4">
            <div className="col-12 col-lg-6">
              <p className="fw-regular">NIC Number</p>
              <input
                type="text"
                name="nic"
                id="nic"
                maxLength={12}
                style={{
                  borderRadius: "4px",
                  background: "#F6F6F6",
                  border: "#F6F6F6",
                }}
                placeholder="Enter your NIC number"
                className="col-11 p-3"
                value={values.nic}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.nic && (
                <small>
                  <p className="text-danger" style={{ fontSize: "13px" }}>
                    {errors.nic}
                  </p>
                </small>
              )}
            </div>
            <div className="col-12 col-lg-6">
              <p className="fw-regular ">Date of Birth</p>

              <div className="col-6 text-secondary fs-10 fw-normal  font-family-Inter m-0 px-3 py-2 p-2">
                <DatePicker
                  selected={dob}
                  onChange={(date: Date | null) => setDob(date)}
                  dateFormat="dd/MM/yyyy"
                  isClearable
                  showYearDropdown
                  scrollableMonthYearDropdown
                  placeholderText="DD/MM/YYYY "
                  className="col-12  p-3"
                />
              </div>
            </div>
          </div>
          <div className="row mt-4">
            <div className="col-12 col-lg-8">
              <p className="fw-regular">Email Address</p>
              <input
                type="email"
                name="email"
                id="email"
                style={{
                  borderRadius: "4px",
                  background: "#F6F6F6",
                  border: "#F6F6F6",
                }}
                placeholder="Enter your email address"
                className="col-lg-8  p-3"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.email && (
                <small>
                  <p className="text-danger" style={{ fontSize: "13px" }}>
                    {errors.email}
                  </p>
                </small>
              )}
            </div>
            <div className="col-12 col-lg-4">
              <p className="fw-regular">Own Vehicle Type</p>
              <label className="d-inline-flex align-items-center">
                <input
                  type="radio"
                  name="vehicleType"
                  value="bus"
                  onClick={() => setVehicleType("bus")}
                  checked={vehicleType === "bus"}

                  // onChange={handleOptionChange}
                />
                Bus
              </label>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <label className="d-inline-flex align-items-center">
                <input
                  type="radio"
                  name="vehicleType"
                  value="train"
                  onClick={() => setVehicleType("train")}
                  checked={vehicleType === "train"}

                  // onChange={handleOptionChange}
                />
                Train
              </label>
            </div>
          </div>
          <div className="row mt-4">
            <div className="col-12 col-lg-8">
              <p className="fw-regular">Contact Number</p>
              <input
                type="text"
                name="contactNumber"
                id="contactNumber"
                maxLength={10}
                style={{
                  borderRadius: "4px",
                  background: "#F6F6F6",
                  border: "#F6F6F6",
                }}
                placeholder="Enter your contact number"
                className="col-lg-8 p-3"
                value={values.contactNumber}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.contactNumber && (
                <small>
                  <p className="text-danger" style={{ fontSize: "13px" }}>
                    {errors.contactNumber}
                  </p>
                </small>
              )}
            </div>
          </div>
          <div className="row mt-4">
            <div className="col-12 col-lg-8">
              <p className="fw-regular">User Name</p>
              <input
                type="text"
                name="userName"
                id="userName"
                maxLength={20}
                style={{
                  borderRadius: "4px",
                  background: "#F6F6F6",
                  border: "#F6F6F6",
                }}
                placeholder="Enter your user name"
                className="col-lg-8 p-3"
                value={values.userName}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.userName && (
                <small>
                  <p className="text-danger" style={{ fontSize: "13px" }}>
                    {errors.userName}
                  </p>
                </small>
              )}
            </div>
          </div>
          <div className="row mt-4">
            <div className="col-12 col-lg-6">
              <p className="fw-regular">Password</p>
              <input
                type="password"
                name="password"
                id="password"
                style={{
                  borderRadius: "4px",
                  background: "#F6F6F6",
                  border: "#F6F6F6",
                }}
                placeholder="Enter your password"
                className="col-11 p-3"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.password && (
                <small>
                  <p className="text-danger" style={{ fontSize: "13px" }}>
                    {errors.password}
                  </p>
                </small>
              )}
            </div>
            <div className="col-12 col-lg-6">
              <p className="fw-regular">Confirm Password</p>
              <input
                type="password"
                name="confirmPassword"
                id="confirmPassword"
                style={{
                  borderRadius: "4px",
                  background: "#F6F6F6",
                  border: "#F6F6F6",
                }}
                placeholder="Confirm your password"
                className="col-11 p-3"
                value={values.confirmPassword}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.confirmPassword && (
                <small>
                  <p className="text-danger" style={{ fontSize: "13px" }}>
                    {errors.confirmPassword}
                  </p>
                </small>
              )}
            </div>
          </div>
          <br />
          <div className=" justify-content-center text-center">
            <button
              type="submit"
              className=" btn-primary btn"
            >
              SIGN UP
            </button>
            
          
            <br />
        
          </div>
        </form>
      </div>
    </div>
  );
}

export default ownerFormComponent;
