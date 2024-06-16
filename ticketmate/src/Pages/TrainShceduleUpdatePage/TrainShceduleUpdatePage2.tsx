import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { useNavigate, useLocation } from 'react-router-dom';
import './TrainShceduleUpdatePage.css';
import PrimaryNavBar from '../../Components/NavBar/PrimaryNavBar';
import Footer from '../../Components/Footer/footer';

function TrainShceduleUpdatePage2() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const routId = queryParams.get('routId');
  const scheduleId = queryParams.get('scheduleId');

  const [standNames, setStandNames] = useState<string[]>([]);
  const [selectedStands, setSelectedStands] = useState<{ [key: string]: { time: string, id: number | null } }>({});
  const [allStands, setAllStands] = useState<{ [key: string]: { time: string, id: number } }>({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStandNames = async () => {
      try {
        const response = await fetch(`https://localhost:7001/api/TrainRaliwayStation/byTrainRaliwayId/${routId}`);
        if (response.ok) {
          const data = await response.json();
          const standNames = data.map((stand: { trainStationName: string }) => stand.trainStationName);
          setStandNames(standNames);
        } else {
          console.error('Failed to fetch stand names');
        }
      } catch (error) {
        console.error('Error fetching stand names:', error);
      }
    };

    const fetchSelectedStands = async () => {
      try {
        const response = await fetch(`https://localhost:7001/api/SelectedTrainStation/scheduledTrain/${scheduleId}`);
        if (response.ok) {
          const data = await response.json();
          const stands = data.reduce((acc: { [key: string]: { time: string, id: number } }, item: { trainStationName: string, trainarrivalTime: string, id: number }) => {
            acc[item.trainStationName] = { time: item.trainarrivalTime, id: item.id };
            return acc;
          }, {});
          setSelectedStands(stands);
          setAllStands(stands);
        } else {
          console.error('Failed to fetch selected stands');
        }
      } catch (error) {
        console.error('Error fetching selected stands:', error);
      }
    };

    if (routId && scheduleId) {
      fetchStandNames();
      fetchSelectedStands();
    }
  }, [routId, scheduleId]);

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    if (!checked) {
      const newSelectedStands = { ...selectedStands };
      delete newSelectedStands[name];
      setSelectedStands(newSelectedStands);
    } else {
      setSelectedStands({ ...selectedStands, [name]: { time: '', id: allStands[name]?.id || null } });
    }
  };

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>, standName: string) => {
    setSelectedStands({ ...selectedStands, [standName]: { ...selectedStands[standName], time: e.target.value } });
  };

  const handleSubmit = async () => {
    const selectedEntries = Object.entries(selectedStands);
    const allEntries = Object.entries(allStands);

    // Ensure all selected checkboxes have a corresponding time
    const missingTimes = selectedEntries.some(([, { time }]) => !time);
    if (missingTimes) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Please fill in the arrival times for all selected bus stations.',
      });
      return;
    }

    // Handle updates and additions
    for (const [trainStationName, { time, id }] of selectedEntries) {
      const data = {
        scheduledTrainSchedulId: scheduleId,
        trainStationName,
        trainarrivalTime: time,
      };

      try {
        const method = id ? 'PUT' : 'POST';
        const url = id ? `https://localhost:7001/api/SelectedTrainStation/${id}` : `https://localhost:7001/api/SelectedTrainStation`;
        const response = await fetch(url, {
          method: method,
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(method === 'PUT' ? { ...data, id } : data),
        });

        if (!response.ok) {
          console.error('Failed to update/add data', response);
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Failed to update/add data for station: ' + trainStationName,
          });
          return;
        }
      } catch (error) {
        console.error('Error updating/adding data', error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Error updating/adding data for station: ' + trainStationName,
        });
        return;
      }
    }

    // Handle deletions
    for (const [trainStationName, { id }] of allEntries) {
      if (!selectedStands.hasOwnProperty(trainStationName)) {
        try {
          const response = await fetch(`https://localhost:7001/api/SelectedTrainStation/${id}`, {
            method: 'DELETE',
          });

          if (!response.ok) {
            console.error('Failed to delete data', response);
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'Failed to delete data for station: ' + trainStationName,
            });
            return;
          }
        } catch (error) {
          console.error('Error deleting data', error);
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Error deleting data for station: ' + trainStationName,
          });
          return;
        }
      }
    }

    Swal.fire({
        icon: 'success',
        title: 'Updated',
        text: 'The bus schedule has been updated successfully'
      }).then(() => {
        navigate('/ScheduledTrainPage?schedulId=' + scheduleId);
      });
  };

  const handleCancel = () => {
    Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Go Back!"
      }).then((result) => {
        if (result.isConfirmed) {
          navigate('/ScheduledTrainPage?schedulId=' + scheduleId);
        }
      });
  };

  return (
    <>
      <PrimaryNavBar />
      <div className=''>
        <div className='BusSheUpForm my-5 rounded-3'>
          <h3 className='h3Style text-center pb-3'>Select the Train Stations and Set the Arrival Time.</h3>
          <div className='row pl-5'>
            {standNames.map((standName, index) => (
              <div key={index} className="form-group row">
                <div className='col-sm-6'>
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id={standName}
                    name={standName}
                    value={standName}
                    onChange={handleCheckboxChange}
                    checked={selectedStands.hasOwnProperty(standName)}
                  />
                  &nbsp; <label htmlFor={standName} className="col-form-label">{standName}</label>
                </div>
                <div className='col-sm-6'>
                  &nbsp;
                  <label htmlFor={`${standName}-time`}>Arrival Time: </label>
                  <input
                    type="time"
                    className="form-control"
                    id={`${standName}-time`}
                    name={`${standName}-time`}
                    value={selectedStands[standName]?.time || ''}
                    onChange={(e) => handleTimeChange(e, standName)}
                    disabled={!selectedStands.hasOwnProperty(standName)}
                  />
                  <br />
                </div>
              </div>
            ))}
          </div>

          <div className='row'>
            <div className='col-12 text-center p-3'>
              <button type='button' className='btn white mx-3' onClick={handleCancel}>Cancel</button>
              <button type='button' className='btn primary mx-3' onClick={handleSubmit}>Update</button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default TrainShceduleUpdatePage2;
