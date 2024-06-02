import React, { useState } from 'react';
import './BusSchedulePage.css';
import PrimaryNavBar from '../../Components/NavBar/PrimaryNavBar';
import BusScheduleForm from '../../Components/BusScheduleForm/BusScheduleForm';
import BusScheduleForm2 from '../../Components/BusScheduleForm/BusScheduleForm2';
import BusScheduleForm3 from '../../Components/BusScheduleForm/BusScheduleForm3';
import { useLocation } from 'react-router-dom';

function BusSchedulePage() {
  const [showForm2, setShowForm2] = useState(false);
  const [showForm3, setShowForm3] = useState(false);
  const [standNames, setStandNames] = useState<string[]>([]);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const userId = queryParams.get('id');
  console.log("user id " + userId);

  const handleNext = async (formData: any) => {
    const { routNo } = formData;

    try {
      const response = await fetch(`https://localhost:7001/api/BusRoute/by-routno/${routNo}`);
      if (response.ok) {
        const data = await response.json();
        console.log('BusRouteRoutId:', data.routId);

        // Fetch stand names by routeId
        const standResponse = await fetch(`https://localhost:7001/api/BusRouteStand/byroute/${data.routId}`);
        if (standResponse.ok) {
          const standData = await standResponse.json();
          const standNames = standData.map((stand: { standName: any; }) => stand.standName);
          console.log('Stand Names:', standNames.join(', '));

          // After fetching and logging the data, store stand names and show the second form
          setStandNames(standNames);
          setShowForm2(true);
        } else {
          console.error('Failed to fetch stand names');
        }
      } else {
        console.error('Route number is unavailable.');
        alert('Route number is unavailable.');
      }
    } catch (error) {
      console.error('Error fetching route number:', error);
    }
  };

  const handleForm2Next = () => {
    setShowForm3(true);
  };

  return (
    <>
      <PrimaryNavBar />
      <div className='container py-4'>
        <div className='rounded-4 formSec2'>
          <div className='row'>
            <h3 className='h3Style text-center'>Fill this form to Schedule a bus</h3>
          </div>

          {showForm3 ? (
            <BusScheduleForm3 />
          ) : showForm2 ? (
            <BusScheduleForm2 standNames={standNames} handleNext={handleForm2Next} />
          ) : (
            <BusScheduleForm handleNext={handleNext} />
          )}
        </div>
      </div>
    </>
  );
}

export default BusSchedulePage;
