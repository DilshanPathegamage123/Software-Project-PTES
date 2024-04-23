import React, { useState, useEffect } from 'react';
import PrimaryNavBar from '../../Components/NavBar/PrimaryNavBar';
import ProfileSection from '../../Components/ProfileSection/ProfileSection';
import SquareButton from '../../Components/Buttons/SquareButton/SquareButton';
import './BusOwnerPage.css';
import Footer from '../../Components/Footer/Footer';
import ScheduledBusInfo from '../../Components/ScheduledBusInfo/ScheduledBusInfo';
import RegisteredBusInfoSec from '../../Components/RegisteredBusInfoSec/RegisteredBusInfoSec';
import { Link } from 'react-router-dom';

function BusOwnerPage() {
  const [divWidth, setDivWidth] = useState(0);
  const [selectedComponent, setSelectedComponent] = useState('ScheduledBuses');
  const [buttonStates, setButtonStates] = useState({
    ScheduledBuses: true,
    RegisteredBuses: false,
    Reports: false
  });

  useEffect(() => {
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

  const handleButtonClick = (componentName: string) => {
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

  const renderSelectedComponent = () => {
    switch (selectedComponent) {
      case 'ScheduledBuses':
        return <ScheduledBusInfo />;
      case 'RegisteredBuses':
        return <RegisteredBusInfoSec />;
      case 'Reports':
        return <RegisteredBusInfoSec />;
      default:
        return null;
    }
  };

  return (
    <>
      <PrimaryNavBar />
      <div className='container pt-3'>
        <div>
          <ProfileSection />
        </div>
        <div className='row'>
          <div className='col-lg-2 col-sm-4 m-0' id='getWidth'>
            <div>
              <Link to='/BusRegistrationPage'><SquareButton text='Register a Bus' bwidth={divWidth} /></Link>
            </div>
            <div>
              <Link to='BusRegistrationPage'><SquareButton text='Schedule a new travel journey'bwidth={divWidth} /></Link>
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
              {/* <button className={`btn btn-primary secButton ${buttonStates.Reports ? 'active' : ''}`} onClick={() => handleButtonClick('Reports')}>
                Reports
              </button> */}
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
