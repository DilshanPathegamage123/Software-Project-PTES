import React, { useState } from 'react';
import './BusSchedulePage.css';
import PrimaryNavBar from '../../Components/NavBar/PrimaryNavBar';
import BusScheduleForm from '../../Components/BusScheduleForm/BusScheduleForm';
import BusScheduleForm2 from '../../Components/BusScheduleForm/BusScheduleForm2';
import BusScheduleForm3 from '../../Components/BusScheduleForm/BusScheduleForm3';
import { useLocation } from 'react-router-dom';
import Swal from 'sweetalert2';
import backgroundImage from '../../assets/busschedupageBG.jpg';
import Footer from '../../Components/Footer/footer';

function BusSchedulePage() {
  const [showForm2, setShowForm2] = useState(false);
  const [showForm3, setShowForm3] = useState(false);
  const [standNames, setStandNames] = useState<string[]>([]);
  const [scheduleId, setScheduleId] = useState<string>('');

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const userId = queryParams.get('id');

  const handleNext = async (formData: any, scheduleId: any) => {
    const { routNo } = formData;
    setScheduleId(scheduleId);

    try {
      const response = await fetch(`https://localhost:7001/api/BusRoute/by-routno/${routNo}`);
      if (response.ok) {
        const data = await response.json();
        console.log('BusRouteRoutId:', data.routId);

        // Fetch stand names by routeId
        const standResponse = await fetch(`https://localhost:7001/api/BusRouteStand/byroute/${data.routId}`);
        if (standResponse.ok) {
          const standData = await standResponse.json();
          const standNames = standData.map((stand: { standName: string }) => stand.standName);

          // Store stand names and show the second form
          setStandNames(standNames);
          setShowForm2(true);
        } else {
          console.error('Failed to fetch stand names');
        }
      } else {
        console.error('Route number is unavailable.');
        Swal.fire({
          title: "Route number Not Found",
          text: "The entered Route number is not available. Please check and try again.",
          icon: "error"
        });
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
      <div className="BusSchPaBG d-flex flex-column min-vh-100">
      <PrimaryNavBar />
        <div className='container py-4 flex-grow-1'>
          <div className='rounded-4 formSec2'>
          <div className='row'>
            <h3 className='h3Style text-center'>Fill this form to Schedule a bus</h3>
          </div>

            {showForm3 ? (
              <BusScheduleForm3 userId={userId} scheduleId={scheduleId} />
            ) : showForm2 ? (
              <BusScheduleForm2 standNames={standNames} handleNext={handleForm2Next} userId={userId} scheduleId={scheduleId} />
            ) : (
              <BusScheduleForm handleNext={handleNext} userId={userId} />
            )}
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}

export default BusSchedulePage;
