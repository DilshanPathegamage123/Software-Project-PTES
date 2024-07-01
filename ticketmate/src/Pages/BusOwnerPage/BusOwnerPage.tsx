import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import PrimaryNavBar from '../../Components/NavBar/PrimaryNavBar-logout';

import ProfileSection from '../../Components/ProfileSection/ProfileSection';
import SquareButton from '../../Components/Buttons/SquareButton/SquareButton';
import './BusOwnerPage.css';
import Footer from '../../Components/Footer/footer';
import ScheduledBusInfo from '../../Components/ScheduledBusInfo/ScheduledBusInfo';
import RegisteredBusInfoSec from '../../Components/RegisteredBusInfoSec/RegisteredBusInfoSec';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import BgImg from '../../assets/busProImg.png';


interface OwnerData {
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


interface OwnerData {
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
function BusOwnerPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const storedUsername = sessionStorage.getItem('username');
  const storedPassword = sessionStorage.getItem('password');

  const locationState = location.state || { username: 'Guest', password: '' };
  const [username, setUsername] = useState(storedUsername || locationState.username);
  const [password, setPassword] = useState(storedPassword || locationState.password);

  const getToken = () => {
    return sessionStorage.getItem("token");
  };

  const [divWidth, setDivWidth] = useState(0); // State to store div width
  const [selectedComponent, setSelectedComponent] = useState('ScheduledBuses'); // State to track selected component
  const [buttonStates, setButtonStates] = useState({ // State to track button states
    ScheduledBuses: true,
    RegisteredBuses: false,
    Reports: false
  });

  const [userData, setUserData] = useState({
    id: '',
    firstName: '',
    lastName: '',
    email: '',
    requestStatus: true
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (loading) {
      Swal.fire({
        title: 'Loading...',
        text: 'Please wait while we fetch your data.',
        allowOutsideClick: false,
        allowEscapeKey: false,
        didOpen: () => {
          Swal.showLoading();
        }
      });
    }

    if (username !== 'Guest' && password !== '') {
      console.log(`Logged in as: ${username}`);
      console.log(`Password: ${password}`);

      // Function to fetch user data
      const fetchUserData = async () => {
        try {
          const response = await fetch(`https://localhost:7001/api/userData/authenticate?userName=${username}&password=${password}`,{
            headers: {
              Authorization: `Bearer ${getToken()}`,
            },
          
          });
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const data = await response.json();
          setUserData({
            id: data.id,
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            requestStatus: data.requestStatus
          });
          setLoading(false);
          Swal.close();

          // Store username and password in session storage
          sessionStorage.setItem('username', username);
          sessionStorage.setItem('password', password);


          // Check the requestStatus and navigate to /loginpage if it is 0
          if (data.requestStatus === 0) {
            navigate('/loginpage');
          }
        } catch (error) {
          console.error('Failed to fetch user data:', error);
          setLoading(false);
          Swal.fire({
            title: 'Error',
            text: 'Failed to fetch user data.',
            icon: 'error',
            confirmButtonText: 'OK'
          });
        }
      };

      fetchUserData();
    } else {
      setLoading(false);
      Swal.close();
    }
  }, [username, password, loading, navigate]);

  useEffect(() => {
    // Function to handle window resize
    function handleResize() {
      const width = document.getElementById('getWidth')?.offsetWidth;
      setDivWidth(width || 0);
    }

    handleResize(); // Get initial width
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Function to handle button click
  const handleButtonClick = (componentName:any) => {
    setSelectedComponent(componentName);
    // Update button states
    setButtonStates((prevState:any) => ({
      ...prevState,
      [componentName]: true
    }));
    // Reset other button states
    for (let key in buttonStates) {
      if (key !== componentName) {
        setButtonStates((prevState:any) => ({
          ...prevState,
          [key]: false
        }));
      }
    }
  };

  // Function to render selected component based on state
  const renderSelectedComponent = () => {
    switch (selectedComponent) {
      case 'ScheduledBuses':
        return <ScheduledBusInfo id={userData.id} />;
      case 'RegisteredBuses':
        return <RegisteredBusInfoSec id={userData.id} />;
      case 'Reports':
        // return <RegisteredBusInfoSec />;
      default:
        return null;
    }
  };

  return (
    <>
      <PrimaryNavBar />
      <div className='container pt-3'>
        <ProfileSection
          vehicleType='Bus'
          id={userData.id}
          firstName={userData.firstName}
          lastName={userData.lastName}
          email={userData.email}
          backgroundImage={BgImg}
        />
        <div className='row'>
          <div className='col-lg-2 col-sm-4 m-0' id='getWidth'>
            <div>
              <Link to={`/BusRegistrationPage?id=${userData.id}`}><SquareButton text='Register a Bus' bwidth={divWidth} /></Link>
            </div>
            <div>
              <Link to={`/BusSchedulePage?id=${userData.id}`}><SquareButton text='Schedule a new travel journey' bwidth={divWidth} /></Link>
            </div>
          </div>
          <div className='col-lg-10 col-sm-8 rounded-4 p-3 px-4'>
            <div className='d-flex flex-row'>
              <button className={`btn btn-primary secButton ${buttonStates.ScheduledBuses ? 'active' : ''}`} onClick={() => handleButtonClick('ScheduledBuses')}>
                Scheduled buses
              </button>
              <button className={`btn btn-primary secButton ${buttonStates.RegisteredBuses ? 'active' : ''}`} onClick={() => handleButtonClick('RegisteredBuses')}>
                Registered Buses
              </button>
              <button className={`btn btn-primary secButton ${buttonStates.Reports ? 'active' : ''}`} onClick={() => handleButtonClick('Reports')}>
                Reports
              </button>
            </div>
            <div className='p-4 rounded-4' style={{ background: '#F1F1F1' }}>
              {renderSelectedComponent()}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default BusOwnerPage;
