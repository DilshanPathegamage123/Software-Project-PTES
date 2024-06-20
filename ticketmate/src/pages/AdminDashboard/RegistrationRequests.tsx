import "./RegistrationRequests.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import profileIcon from "../../Components/ProfileSection/assets/iconamoon_profile-circle-fill.png";

const RegistrationRequests = () => {
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

const getToken = () => {
    return sessionStorage.getItem("token");
  };
  useEffect(() => {
    axios
      .get("https://localhost:7196/api/userData/owner-requests", {
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
  }, []);

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

  const rejectOwner = (id: number) => {
    axios
      .put(`https://localhost:7196/api/userData/handleReject/${id}`, {},{
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      
      })
      .then((response) => {
        console.log(response.data);
        setUserData(
          userData.filter((user) => {
            return user.id !== id;
          })
        );
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const AcceptOwner = (id: number) => {
    axios
      .put(`https://localhost:7196/api/userData/handleAccept/${id}`, {},{
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      
      
      })
      .then((response) => {
        console.log(response.data);
        setUserData(
          userData.filter((user) => {
            return user.id !== id;
          })
        );
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <div
        className="container shadow col-10  justify-center shadow p-3 rounded mb-5  rounded"
        style={{ backgroundColor: "#D9D9D9" }}
      >
        <div className="row mt-3 table-responsive table-container">
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>User Name</th>
                <th>NIC</th>
                <th>Own Vehicle Type</th>
                <th>Status</th>
                <th>View</th>
              </tr>
            </thead>
            <tbody>
              {userData.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>
                    {user.firstName} {user.lastName}
                  </td>
                  <td>{user.nic}</td>
                  <td>{user.ownVehicleType}</td>
                  <td>
                    <button
                      className="btn "
                      onClick={() => AcceptOwner(user.id)}
                    >
                      Accept
                    </button>
                    &nbsp;&nbsp;
                    <button
                      className="btn "
                      onClick={() => rejectOwner(user.id)}
                    >
                      Reject
                    </button>
                    &nbsp;&nbsp;

                  </td>
                  <td>
                    {/* onClick={() => toggleModel1(user)} */}
                    <button
                      className="btn viewbutton"
                      onClick={() => toggleModel1(user)}
                    >
                      View
                    </button>
                    {Model1 && (
                      <div className="Model1  ">
                        <div
                          className="overlay "
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
                              <tr>
                                <td>Driving License No :</td>
                                <td>
                                  {selectedUser &&
                                    selectedUser.drivingLicenseNo}
                                </td>
                              </tr>
                              <tr>
                                <td>Own vehicle type : </td>
                                <td>
                                  {" "}
                                  {selectedUser && selectedUser.ownVehicleType}
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
export default RegistrationRequests;
