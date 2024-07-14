import React, { useState } from 'react';
import './TrainSchedulePage.css';
import PrimaryNavBar from '../../Components/NavBar/PrimaryNavBar-logout';
import { useLocation } from 'react-router-dom';
import Swal from 'sweetalert2';
import TrainScheduleForm from '../../Components/TrainScheduleForm/TrainScheduleForm';
import TrainScheduleForm2 from '../../Components/TrainScheduleForm/TrainScheduleForm2';
import TrainScheduleForm3 from '../../Components/TrainScheduleForm/TrainScheduleForm3';
import TrainScheduleForm4 from '../../Components/TrainScheduleForm/TrainScheduleForm4';
import TrainScheduleForm5 from '../../Components/TrainScheduleForm/TrainScheduleForm5';
import Footer from '../../Components/Footer/footer';

function TrainSchedulePage() {

  
  const getToken = () => {
    return sessionStorage.getItem("token");
  };

  const [showForm2, setShowForm2] = useState(false);
  const [showForm3, setShowForm3] = useState(false);
  const [showForm4, setShowForm4] = useState(false);
  const [showForm5, setShowForm5] = useState(false);
  const [standNames, setStandNames] = useState<string[]>([]);
  const [scheduleId, setScheduleId] = useState<string>('');

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const userId = queryParams.get('id');
  console.log("user id " + userId);

  const handleNext = async (formData: any, scheduleId: any) => {
    const { trainRoutNo } = formData;
    setScheduleId(scheduleId);
    console.log('ScheduleId:', scheduleId);

    try {
      const response = await fetch(`https://localhost:7001/api/TrainRaliway/byRailwayNo/${trainRoutNo}`,{
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      
      });
      if (response.ok) {
        const data = await response.json();
        console.log('TrainRouteRoutId:', data.id);

        // Fetch stand names by routeId
        const standResponse = await fetch(`https://localhost:7001/api/TrainRaliwayStation/byTrainRaliwayId/${data.id}`,{
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        
        });
        if (standResponse.ok) {
          const standData = await standResponse.json();
          const standNames = standData.map((stand: { trainStationName: string; }) => stand.trainStationName);
          console.log('Stand Names:', standNames.join(', '));

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

  const handleForm3Next = () => {
    setShowForm4(true);
  }

  const handleForm4Next = () => {
    setShowForm5(true);
  }

  return (
    <div className="TrainSchPaBG d-flex flex-column min-vh-100">
      <PrimaryNavBar />
      <div className='flex-grow-1'>
        <div className='container py-4'>
          <div className='rounded-4 formSec2'>
            <div className='row'>
              <h3 className='h3Style text-center'>Schedule Train Journey</h3>
            </div>

            {showForm5 ? (
              <TrainScheduleForm5 scheduleId={scheduleId} />
            ) :
              showForm4 ? (
                <TrainScheduleForm4 handleNext={handleForm4Next} scheduleId={scheduleId} />
              ) :
                showForm3 ? (
                  <TrainScheduleForm3 userId={userId} handleNext={handleForm3Next} scheduleId={scheduleId} />
                ) :
                  showForm2 ? (
                    <TrainScheduleForm2 standNames={standNames} handleNext={handleForm2Next} userId={userId} scheduleId={scheduleId} />
                  ) : (
                    <TrainScheduleForm handleNext={handleNext} userId={userId} />
                  )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default TrainSchedulePage;
