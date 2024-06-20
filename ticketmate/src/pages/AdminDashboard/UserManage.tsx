import axios from "axios";
import React, { useEffect, useState } from "react";
import "./UserManage.css";
import profileIcon from "../../Components/ProfileSection/assets/iconamoon_profile-circle-fill.png";

const UserManage = () => {
  // const [userData, setUserData] = useState([]);
  type User = {
    id: number;
    firstName: string;
    lastName: string;
    nic: string;
    email: string;
    contactNo: string;
    userType: string;
    dob: string;
    ownVehicleType: string;
    drivingLicenseNo: string;
  };
  const [userData, setUserData] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);


  useEffect(() => {
  const getToken = () => {
    return sessionStorage.getItem("token");
  };
  useEffect(() => {
    axios
      .get("https://localhost:7196/api/userData",{
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      
      })
      .then((response) => {
        setUserData(response.data);
        //console.log(userData);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const deleteUser = (id: number) => {
    console.log("befor api", id);

    axios
      .put(`https://localhost:7196/api/userData/${id}`, {},{
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      
      
      })
      .then((response) => {
        console.log(response);
        setUserData(userData.filter((user) => user.id !== id));
      })
      .catch((error) => {
        console.log("error in delete userr" + error);
      });
  };

  const handleChange = (firstname: string) => {
    //console.log(firstname);

    if (firstname.trim() !== "") {
      const filteredData = userData.filter((user) =>
        user.firstName.toLowerCase().includes(firstname.toLowerCase())
      );
      setUserData(filteredData);
    } else {
      axios
        .get("https://localhost:7196/api/userData",{
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        
        
        })
        .then((response) => {
          setUserData(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  //create a popup window
  const [Model1, setModel1] = useState(false);
  const toggleModel1 = (user: User) => {
    setSelectedUser(user);
    setModel1(!Model1);
  };

  if (Model1) {
    document.body.classList.add("active-Model1");
  } else {
    document.body.classList.remove("active-Model1");
  }

  const [Model2, setModel2] = useState(false);
  const toggleModel2 = (user: User) => {
    setSelectedUser(user);
    setModel2(!Model2);
  };

  if (Model2) {
    document.body.classList.add("active-Model2");
  } else {
    document.body.classList.remove("active-Model2");
  }

  return (
    <>
      <div
        className="container shadow col-10  justify-center shadow p-3 rounded mb-5  rounded"
        style={{ backgroundColor: "#D9D9D9" }}
      >
        <div className="row">
          <div className="col-lg-8 col-12 col-md-6">
            <h4 style={{ color: "#00757C" }}>Select to Remove User</h4>
          </div>
          <div className="col-lg-3 col-12 col-md-6">
            <input
              type="text"
              placeholder="Search User"
              name="firstName"
              id="firstName"
              className="form-control border rounded-5"
              onChange={(e) => {
                handleChange(e.target.value);
              }}
            />
          </div>
        </div>
        <div className="row mt-3 table-responsive table-container">
          <table>
            <thead>
              <tr>
                <th>User Name</th>
                <th>NIC</th>
                <th>Email</th>
                <th>Contact No</th>
                <th>Type</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {userData.map((user) => (
                <tr key={user.id}>
                  <td>
                    {user.firstName} {user.lastName}
                  </td>
                  <td>{user.nic}</td>
                  <td>{user.email}</td>
                  <td>{user.contactNo}</td>
                  <td>{user.userType}</td>
                  <td>
                    <label onClick={() => toggleModel1(user)}>
                      {/* <a href="#"> */}
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <path
                            d="M21.1303 9.8531C22.2899 11.0732 22.2899 12.9268 21.1303 14.1469C19.1745 16.2047 15.8155 19 12 19C8.18448 19 4.82549 16.2047 2.86971 14.1469C1.7101 12.9268 1.7101 11.0732 2.86971 9.8531C4.82549 7.79533 8.18448 5 12 5C15.8155 5 19.1745 7.79533 21.1303 9.8531Z"
                            stroke="#16151C"
                            stroke-width="1.5"
                          />
                          <circle
                            cx="12"
                            cy="12"
                            r="3"
                            stroke="#16151C"
                            stroke-width="1.5"
                          />
                        </svg>
                      {/* </a> */}
                    </label>
                    {Model1 && (
                      <div className="Model1  ">
                        <div
                          className="overlay"
                          onClick={() => toggleModel1(user)}
                        ></div>
                        <div
                          className="Model1-content "
                          style={{ borderRadius: "20px", fontSize: "0.9em" }}
                        >
                          <div className="text-right">
                            <button
                              className="close-Model1"
                              onClick={() => toggleModel1(user)}
                              style={{
                                border: "none",
                                color: "black",
                                backgroundColor: "transparent",
                              }}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="26"
                                height="26"
                                viewBox="0 0 26 26"
                                fill="none"
                              >
                                <path
                                  d="M2.99987 22.9956L23.4155 3.42005M23.4155 3.42005L3.41992 3M23.4155 3.42005L22.9955 23.4156"
                                  stroke="white"
                                  stroke-width="4.24"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                />
                              </svg>
                            </button>
                          </div>
                          <div className="text-center">
                            <img
                              src={profileIcon}
                              alt="profileIcon"
                              className="pb-3"
                              style={{ width: "130px", height: "150px" }}
                            />
                          </div>

                          <div className="col-12" style={{ color: "white" }}>
                            <table>
                              <tr>
                                <td>First Name :</td>
                                <td>
                                  {" "}
                                  {selectedUser &&
                                    `${selectedUser.firstName}  ${selectedUser.lastName}`}
                                </td>
                              </tr>
                              <tr>
                                <td>Email :</td>
                                <td> {selectedUser && selectedUser.email}</td>
                              </tr>
                              <tr>
                                <td>Date of Birth :</td>
                                <td> {selectedUser && selectedUser.dob}</td>
                              </tr>
                              <tr>
                                <td>NIC No :</td>
                                <td>{selectedUser && selectedUser.nic}</td>
                              </tr>
                              <tr>
                                <td>Contact No :</td>
                                <td>
                                  {" "}
                                  {selectedUser && selectedUser.contactNo}
                                </td>
                              </tr>
                            </table>
                          </div>

                          <div className="row text-center">
                            {/* <button
                            className="close-Model1"
                            onClick={()=>toggleModel1(user)}
                            style={{border:"none",color:"black"}}
                          >
                            Close
                          </button> */}
                          </div>
                        </div>
                      </div>
                    )}
                    &nbsp;&nbsp;&nbsp;
                    <label onClick={() => toggleModel2(user)}>
                      {/* <a href="#"> */}
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <path
                            d="M19 9L18.2841 18.3068C18.1238 20.3908 16.386 22 14.2959 22H9.70412C7.61398 22 5.87621 20.3908 5.71591 18.3068L5 9M21 7C18.4021 5.73398 15.3137 5 12 5C8.68635 5 5.59792 5.73398 3 7M10 5V4C10 2.89543 10.8954 2 12 2C13.1046 2 14 2.89543 14 4V5M10 11V17M14 11V17"
                            stroke="#16151C"
                            stroke-width="1.5"
                            stroke-linecap="round"
                          />
                        </svg>
                      {/* </a> */}
                    </label>
                    {Model2 && (
                      <div className="Model2  ">
                        <div
                          className="overlay"
                          onClick={() => toggleModel2(user)}
                        ></div>
                        <div
                          className="Model2-content "
                          style={{ borderRadius: "20px", fontSize: "0.9em" }}
                        >
                          <div className="text-right">
                            <button
                              className="close-Model2"
                              onClick={() => toggleModel2(user)}
                              style={{
                                border: "none",
                                color: "black",
                                backgroundColor: "transparent",
                              }}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="26"
                                height="26"
                                viewBox="0 0 26 26"
                                fill="none"
                              >
                                <path
                                  d="M2.99987 22.9956L23.4155 3.42005M23.4155 3.42005L3.41992 3M23.4155 3.42005L22.9955 23.4156"
                                  stroke="white"
                                  stroke-width="4.24"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                />
                              </svg>
                            </button>
                          </div>
                          <div className="text-center">
                            <img
                              src={profileIcon}
                              alt="profileIcon"
                              className="pb-3"
                              style={{ width: "130px", height: "150px" }}
                            />
                          </div>

                          <div className="col-12" style={{ color: "white" }}>
                            <table>
                              <tr>
                                <td>First Name :</td>
                                <td>
                                  {" "}
                                  {selectedUser &&
                                    `${selectedUser.firstName}  ${selectedUser.lastName}`}
                                </td>
                              </tr>
                              <tr>
                                <td>Email :</td>
                                <td> {selectedUser && selectedUser.email}</td>
                              </tr>
                              <tr>
                                <td>Date of Birth :</td>
                                <td> {selectedUser && selectedUser.dob}</td>
                              </tr>
                              <tr>
                                <td>NIC No :</td>
                                <td>{selectedUser && selectedUser.nic}</td>
                              </tr>
                              <tr>
                                <td>Contact No :</td>
                                <td>
                                  {" "}
                                  {selectedUser && selectedUser.contactNo}
                                </td>
                              </tr>
                            </table>
                          </div>
                          <br />

                          <div className="row ">
                            <button
                              className="close-Model1 col col-6 text-right"
                              onClick={() => {
                                deleteUser(user.id);
                                toggleModel2(user);
                              }}
                              style={{
                                border: "none",
                                color: "White",
                                backgroundColor: "transparent",
                              }}
                            >
                              Remove
                            </button>

                            <button
                              className="close-Model1 col col-6 text-left"
                              onClick={() => {
                                toggleModel2(user);
                              }}
                              style={{
                                border: "none",
                                color: "white",
                                backgroundColor: "transparent",
                              }}
                            >
                              Close
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};
export default UserManage;
