import "./passengerFormComponent.css";
import { ChangeEvent, FormEvent, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import PrimaryButton from "../../Components/Buttons/PrimaryButton";
import { useFormik } from "formik";
import { passengerFormValidation } from "./passengerFormValidation";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const initialValues = {
  FirstName: "",
  LastName: "",
  NIC: "",
  Email: "",
  DOB: "",
  ContactNumber: "",
  UserName: "",
  Password: "",
  ConfirmPassword: "",
};

const PassengerFormComponent = () => {
  const history = useNavigate();
  const [dob, setDob] = useState<Date | null>(null);

  const { values, handleChange, handleBlur, handleSubmit, errors } = useFormik({
    initialValues: initialValues,
    validationSchema: passengerFormValidation,

    onSubmit: async (values) => {
      const userData = {
        id: 0,
        firstName: values.FirstName,
        lastName: values.LastName,
        email: values.Email,
        dob: dob,
        nic: values.NIC,
        contactNo: values.ContactNumber,
        userName: values.UserName,
        password: values.Password,
        userType: "Passenger",
        ownVehicleType: "",
        drivingLicenseNo: "",
        isDeleted: false,
        requestStatus: true,
      };

      const authData = {
        username: values.UserName,
        password: values.Password,
        roles: ["Passenger"],
      };

      try {
        const userResponse = await axios.post(
          `https://localhost:7196/api/userData`,
          userData
        );

        const authResponse = await axios.post(
          `https://localhost:7196/api/Auth/register`,
          authData
        );

        if (authResponse.status === 200 && userResponse.status === 200) {
          history("/passenger");
        }
        console.log(authResponse.data);
      } catch (error) {
        console.error("Error:", error);
      }
    },

    // axios
    //   .post(`https://localhost:7196/api/userData`, {
    //     id: 0,
    //     firstName: values.FirstName,
    //     lastName: values.LastName,
    //     email: values.Email,
    //     dob: dob,
    //     nic: values.NIC,
    //     contactNo: values.ContactNumber,
    //     userName: values.UserName,
    //     password: values.Password,
    //     userType: "Passenger",
    //     ownVehicleType: "",
    //     drivingLicenseNo: "",
    //     isDeleted: false,
    //     requestStatus: true,
    //   })
    //   .then((response) => {
    //     console.log(response.data);
    //     console.log("response status : ", response.status);
    //   })
    //   .catch((error) => {
    //     console.error("Error:", error);
    //   });

    // axios
    //   .post(`https://localhost:7196/api/Auth/register`, {
    //     username: values.UserName,
    //     password: values.Password,
    //     role: "Passenger",
    //   })
    //   .then((response) => {
    //     if (response.status === 200) {
    //       history("/");
    //       console.log(response.data);
    //     }
    //   })
    //   .catch((error) => {
    //     console.error("Error:", error);
    //   });

    // try {
    //   // Make POST request using Axios
    //   const response = await axios.post(
    //     "https://localhost:7196/api/userData",
    //     {
    //       firstName: formValues.FirstName,
    //       lastName: formValues.LastName,
    //       email: formValues.Email,
    //       dob: dob,
    //       nic: formValues.NIC,
    //       contactNo: formValues.ContactNumber,
    //       userName: formValues.UserName,
    //       password: formValues.Password,
    //       userType: "Passenger",
    //       ownVehicleType: "",
    //       drivingLicenseNo: "",
    //     }
    //   );

    //   // Handle response if needed
    //   console.log(response.data);
    // } catch (error) {
    //   // Handle error if request fails
    //   console.error("Error:", error);
    // }
  });

  return (
    <div>
      <div className="container shadow bg-white col-8  justify-center shadow p-3 rounded mb-5 bg-body rounded">
        <form
          className="container display-4"
          onSubmit={handleSubmit}
          method="post"
        >
          <div className="row  mt-3">
            <div className="col-12 col-lg-6">
              <p className="fw-regular">First Name</p>
              <input
                type="text"
                name="FirstName"
                id="FirstName"
                style={{
                  borderRadius: "4px",
                  background: "#F6F6F6",
                  border: "#F6F6F6",
                }}
                placeholder="Enter your first name"
                className="col-11 p-3"
                value={values.FirstName}
                onChange={handleChange}
                //onChange={e => setFirstName(e.target.value)}

                onBlur={handleBlur}
              />
              {errors.FirstName && (
                <small>
                  <p className="text-danger" style={{ fontSize: "13px" }}>
                    {errors.FirstName}
                  </p>
                </small>
              )}
            </div>
            <div className="col-12 col-lg-6">
              <p className="fw-regular">Last Name</p>
              <input
                type="text"
                name="LastName"
                id="LastName"
                style={{
                  borderRadius: "4px",
                  background: "#F6F6F6",
                  border: "#F6F6F6",
                }}
                placeholder="Enter your last name"
                className="col-11 p-3"
                value={values.LastName}
                //onChange={handleInputChange}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.LastName && (
                <small>
                  <p className="text-danger" style={{ fontSize: "13px" }}>
                    {errors.LastName}
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
                name="NIC"
                id="NIC"
                style={{
                  borderRadius: "4px",
                  background: "#F6F6F6",
                  border: "#F6F6F6",
                }}
                placeholder="Enter your NIC number"
                className="col-11 p-3"
                value={values.NIC}
                //onChange={handleInputChange}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.NIC && (
                <small>
                  <p className="text-danger" style={{ fontSize: "13px" }}>
                    {errors.NIC}
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
                  //value={values.DOB}

                  //onChange={handleChange}
                  onBlur={handleBlur}

                  // value={formik.values.DOB}
                  // // onChange={formik.handleChange}
                  // onBlur={formik.handleBlur}
                />
              </div>
            </div>
          </div>
          <div className="row mt-4">
            <div className="col-12 col-lg-8">
              <p className="fw-regular">Email Address</p>
              <input
                type="email"
                name="Email"
                id="Email"
                style={{
                  borderRadius: "4px",
                  background: "#F6F6F6",
                  border: "#F6F6F6",
                }}
                placeholder="Enter your email address"
                className="col-lg-8  p-3"
                value={values.Email}
                //onChange={handleInputChange}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.Email && (
                <small>
                  <p className="text-danger" style={{ fontSize: "13px" }}>
                    {errors.Email}
                  </p>
                </small>
              )}
            </div>
          </div>
          <div className="row mt-4">
            <div className="col-12 col-lg-8">
              <p className="fw-regular">Contact Number</p>
              <input
                type="text"
                name="ContactNumber"
                id="ContactNumber"
                style={{
                  borderRadius: "4px",
                  background: "#F6F6F6",
                  border: "#F6F6F6",
                }}
                placeholder="Enter your contact number"
                className="col-lg-8 p-3"
                value={values.ContactNumber}
                //onChange={handleInputChange}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.ContactNumber && (
                <small>
                  <p className="text-danger" style={{ fontSize: "13px" }}>
                    {errors.ContactNumber}
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
                name="UserName"
                id="UserName"
                style={{
                  borderRadius: "4px",
                  background: "#F6F6F6",
                  border: "#F6F6F6",
                }}
                placeholder="Enter your user name"
                className="col-lg-8 p-3"
                value={values.UserName}
                //onChange={handleInputChange}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.UserName && (
                <small>
                  <p className="text-danger" style={{ fontSize: "13px" }}>
                    {errors.UserName}
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
                name="Password"
                id="Password"
                style={{
                  borderRadius: "4px",
                  background: "#F6F6F6",
                  border: "#F6F6F6",
                }}
                placeholder="Enter your password"
                className="col-11 p-3"
                value={values.Password}
                //onChange={handleInputChange}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.Password && (
                <small>
                  <p className="text-danger" style={{ fontSize: "13px" }}>
                    {errors.Password}
                  </p>
                </small>
              )}
            </div>
            <div className="col-12 col-lg-6">
              <p className="fw-regular">Confirm Password</p>
              <input
                type="password"
                name="ConfirmPassword"
                id="ConfirmPassword"
                style={{
                  borderRadius: "4px",
                  background: "#F6F6F6",
                  border: "#F6F6F6",
                }}
                placeholder="Confirm your password"
                className="col-11 p-3"
                value={values.ConfirmPassword}
                //onChange={handleInputChange}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.ConfirmPassword && (
                <small>
                  <p className="text-danger" style={{ fontSize: "13px" }}>
                    {errors.ConfirmPassword}
                  </p>
                </small>
              )}
            </div>
          </div>
          <br />
          <div className="row justify-content-center text-center">
            <button
              type="submit"
              className=" btn-outline-primary btn-sm btn-width"
            >
              SIGN UP
            </button>

            {/* <button
            type="submit"
            value="SIGN UP"
            color="primary"
            >
              SIGN UP
            </button> */}
            {/* <PrimaryButton
              type="submit"
              value="SIGN UP"
              color="primary"
              IsSmall={false}
              onclick={handleSubmit}
            /> */}
            <br />
        
          </div>
        </form>
      </div>
    </div>
  );
};


export default PassengerFormComponent;
