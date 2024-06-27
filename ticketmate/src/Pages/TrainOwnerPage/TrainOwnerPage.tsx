import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import PrimaryNavBar from '../../Components/NavBar/PrimaryNavBar';
import ProfileSection from '../../Components/ProfileSection/ProfileSection';
import SquareButton from '../../Components/Buttons/SquareButton/SquareButton';
import './TrainOwnerPage.css';
import Footer from '../../Components/Footer/footer';
import RegLocomotiveInfoSec from '../../Components/RegLocomotiveInfoSec/RegLocomotiveInfoSec';
import { Link } from 'react-router-dom';
import RegCarriagesInfoSec from '../../Components/RegCarriagesInfoSec/RegCarriagesInfoSec';
import ScheduledTrainInfo from '../../Components/ScheduledTrainInfo/ScheduledTrainInfo';
import BgImg from '../../assets/trainProImg.png';
import Swal from 'sweetalert2';

function TrainOwnerPage() {
  const location = useLocation();
  const storedUsername = sessionStorage.getItem('username');
  const storedPassword = sessionStorage.getItem('password');
  const locationState = location.state || { username: 'Guest', password: '' };
  const [username, setUsername] = useState(storedUsername || locationState.username);
  const [password, setPassword] = useState(storedPassword || locationState.password);
  
  const [divWidth, setDivWidth] = useState(0); // State to store div width
  const [selectedComponent, setSelectedComponent] = useState('ScheduledTrains'); // State to track selected component
  const [buttonStates, setButtonStates] = useState({ // State to track button states
    ScheduledTrains: true,
    RegLocomotives: false,
    RegCarriages: false
  });

  const [userData, setUserData] = useState({
    id: '',
    firstName: '',
    lastName: '',
    email: ''
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
          const response = await fetch(`https://localhost:7001/api/userData/authenticate?userName=${username}&password=${password}`);
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const data = await response.json();
          setUserData({
            id: data.id,
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email
          });
          setLoading(false);
          Swal.close();

          // Store username and password in session storage
          sessionStorage.setItem('username', username);
          sessionStorage.setItem('password', password);
          
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
  }else{
      setLoading(false);
      Swal.close();
  }
  }, [username, password, loading]);

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
    setButtonStates((prevState) => ({
      ...prevState,
      [componentName]: true
    }));
    // Reset other button states
    for (let key in buttonStates) {
      if (key !== componentName) {
        setButtonStates((prevState) => ({
          ...prevState,
          [key]: false
        }));
      }
    }
  };

  // Function to render selected component based on state
  const renderSelectedComponent = () => {
    switch (selectedComponent) {
      case 'ScheduledTrains':
        return <ScheduledTrainInfo id={userData.id} />;
      case 'RegLocomotives':
        return <RegLocomotiveInfoSec id={userData.id} />;
      case 'RegCarriages':
        return <RegCarriagesInfoSec id={userData.id} />;
      default:
        return null;
    }
  };


  return (
    <>
      <PrimaryNavBar />
      <div className='container pt-3'>
        <ProfileSection
          vehicleType='Train'
          id={userData.id}
          firstName={userData.firstName}
          lastName={userData.lastName}
          email={userData.email}
          backgroundImage={BgImg}
        />
        <div className='row'>
          <div className='col-lg-2 col-sm-4 m-0' id='getWidth'>
            <div>
              <Link to={`/TrainRegistrationPage?id=${userData.id}`}><SquareButton text='Register a Train' bwidth={divWidth} /></Link>                                  
            </div>
            <div>
              <Link to={`/TrainSchedulePage?id=${userData.id}`}><SquareButton text='Schedule a new Train journey' bwidth={divWidth} /></Link>
            </div>
          </div>
          <div className='col-lg-10 col-sm-8 rounded-4 p-3 px-4'>
            <div className='d-flex flex-row'>
              <button className={`btn btn-primary secButton ${buttonStates.ScheduledTrains ? 'active' : ''}`} onClick={() => handleButtonClick('ScheduledTrains')}>
                Scheduled Trains
              </button>
              <button className={`btn btn-primary secButton ${buttonStates.RegLocomotives ? 'active' : ''}`} onClick={() => handleButtonClick('RegLocomotives')}>
                Registered Locomotives
              </button>
              <button className={`btn btn-primary secButton ${buttonStates.RegCarriages ? 'active' : ''}`} onClick={() => handleButtonClick('RegCarriages')}>
                Registered Carriages
              </button>
            </div>
            <div className='p-4 rounded-4' style={{ background: '#F1F1F1' }}>
              {renderSelectedComponent()}
            </div>
          </div>
        </div>
      </div>
      <div className='pt-3'>
        <Footer />
      </div>
      
    </>
  );
}

export default TrainOwnerPage;
