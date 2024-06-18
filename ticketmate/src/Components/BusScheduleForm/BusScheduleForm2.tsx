import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

interface BusScheduleForm2Props {
  standNames: string[];
  handleNext: () => void;
  userId: string | null;
  scheduleId: string;
}

function BusScheduleForm2({ standNames, handleNext, userId, scheduleId }: BusScheduleForm2Props) {

  const navigate = useNavigate();
  
  const [selectedStands, setSelectedStands] = useState<{ [key: string]: string }>({});

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    if (!checked) {
      const newSelectedStands = { ...selectedStands };
      delete newSelectedStands[name];
      setSelectedStands(newSelectedStands);
    } else {
      setSelectedStands({ ...selectedStands, [name]: '' });
    }
  };

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>, standName: string) => {
    const newTime = e.target.value;

    // Check if the new time is already selected for another stand
    const isTimeAlreadySelected = Object.values(selectedStands).includes(newTime);

    if (isTimeAlreadySelected) {
      Swal.fire({
        icon: 'error',
        title: 'Duplicate Time',
        text: 'You cannot enter the same arrival time for multiple stands.',
      });
    } else {
      setSelectedStands({ ...selectedStands, [standName]: newTime });
    }
  };

  const handleSubmit = async () => {
    const selectedEntries = Object.entries(selectedStands);
    if (selectedEntries.length === 0 || selectedEntries.some(([, time]) => !time)) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Please select at least one checkbox and fill in the corresponding arrival times.',
      });
      return;
    }

    const formatTimeWithAmPm = (time24:any) => {
      const [hours, minutes] = time24.split(':');
      let hours12 = parseInt(hours, 10) % 12 || 12;
      const amPm = parseInt(hours, 10) < 12 ? 'AM' : 'PM';
      return `${hours12}:${minutes} ${amPm}`;
    };

    const dataToSubmit = selectedEntries.map(([busStation, standArrivalTime]) => ({
      scheduledBusScheduleId: scheduleId,
      busStation,
      standArrivalTime: formatTimeWithAmPm(standArrivalTime),
    }));

    for (const data of dataToSubmit) {
      try {
        const response = await fetch('https://localhost:7001/api/SchBusStand', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });

        if (!response.ok) {
          console.error('Failed to submit data', response);
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Failed to submit data for station: ' + data.busStation,
          });
          return;
        }
      } catch (error) {
        console.error('Error submitting data', error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Error submitting data for station: ' + data.busStation,
        });
        return;
      }
    }

    handleNext();
  };

  const handleCancel = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Cancel it!"
    }).then(async (result) => { 
      if (result.isConfirmed) {
        try {
          const response = await fetch(`https://localhost:7001/api/ScheduledBus/${scheduleId}`, {
            method: 'DELETE',
          });
  
          if (!response.ok) {
            console.error('Failed to delete schedule', response);
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'Error Going Back',
            });
            navigate('/BusOwnerPage');
            return;
          }
  
          navigate('/BusOwnerPage');

        } catch (error) {
          console.error('Error deleting schedule', error);
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Error Going Back',
          });
        }
      }
    });
  };
  

  return (
    <>
      <p>Select the Bus Stations and Set the Arrival Time.</p>
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
                value={selectedStands[standName] || ''}
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
          <button type='button' className='btn primary mx-3' onClick={handleSubmit}>Next</button>
        </div>
      </div>
    </>
  );
}

export default BusScheduleForm2;
