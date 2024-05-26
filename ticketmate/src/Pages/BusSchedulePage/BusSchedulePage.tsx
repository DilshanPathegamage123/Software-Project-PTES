import React from 'react';
import './BusSchedulePage.css';
import PrimaryNavBar from '../../Components/NavBar/PrimaryNavBar';
import BusScheduleForm from '../../Components/BusScheduleForm/BusScheduleForm';

function BusSchedulePage() {
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
          console.log('Stand Names:', standData.map((stand: { standName: any; }) => stand.standName).join(', '));
        } else {
          console.error('Failed to fetch stand names');
        }
      } else {
        console.error('Route number is unavailable.');
      }
    } catch (error) {
      console.error('Error fetching route number:', error);
    }
  };

  return (
    <>
      <PrimaryNavBar />
      <div className='container py-4'>
        <div className='rounded-4 formSec'>
          <div className='row'>
            <h3 className='h3Style text-center'>Fill this form to Schedule a bus</h3>
          </div>

          <BusScheduleForm handleNext={handleNext} />
        </div>
      </div>
    </>
  );
}

export default BusSchedulePage;
