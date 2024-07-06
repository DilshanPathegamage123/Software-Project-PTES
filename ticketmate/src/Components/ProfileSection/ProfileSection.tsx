import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import profileIcon from './assets/iconamoon_profile-circle-fill.png';
import './ProfileSection.css';
import PrimaryButton from '../Buttons/PrimaryButton';

interface PassengerData {
  id: number;
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

function ProfileSection({ id, firstName, lastName, email, backgroundImage, vehicleType }: { id: string, firstName: string, lastName: string, email: string, backgroundImage: string, vehicleType:string }) {

  const getToken = () => {
    return sessionStorage.getItem("token");
  };
  
  const navigate = useNavigate();
  const [passengerdata, setPassengerdata] = useState<PassengerData | null>(null);

  const handleEditClick = async () => {
    try {
      const response = await fetch(`https://localhost:7001/api/userData/${id}`,{
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      
      });
      const data = await response.json();
      const passenger = {
        id: data.id,
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        dob: data.dob,
        nic: data.nic,
        contactNo: data.contactNo,
        userName: data.userName,
        password: data.password,
        userType: data.userType,
        ownVehicleType: data.ownVehicleType,
        drivingLicenseNo: data.drivingLicenseNo,
        isDeleted: data.isDeleted,
        requestStatus: data.requestStatus,
      };
      setPassengerdata(passenger);

      // Navigate to UpdatePassengerProfile with the retrieved data
      navigate('/UpdatePassengerProfile', { state: { passengerdata: passenger } });
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  return (
    <div className='container rounded-4 proSec' style={{ backgroundImage: `url(${backgroundImage})` }}>
      <div className='row align-items-center'>
        <div className='col-lg-3 col-sm-6 col-12 text-center'>
          <h5 className='text-white pt-4'>{vehicleType} Owner</h5>
          <img src={profileIcon} alt="profileIcon" className='pb-3' />
        </div>
        <div className='col-lg-4 col-sm-6 p-4'>
          <div>
            <p className='text-white'>
              Name: {firstName} {lastName} <br />
              ID: {id} <br />
              Email: {email} <br />
            </p>
          </div>
          <button className='btn secondary' onClick={handleEditClick}>Edit</button>
        </div>
      </div>
    </div>
  );
}

export default ProfileSection;
