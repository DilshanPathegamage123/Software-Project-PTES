import React, { useState } from 'react';
import '../../vars.css';
import Swal from 'sweetalert2';

function TrainScheduleForm3({ userId, scheduleId , handleNext}: { userId: string | null, scheduleId: string, handleNext: () => void; }) {

  console.log('ScheduleId:', scheduleId);

  const [dates, setDates] = useState<{ arrivalDate: string, departureDate: string }[]>([]);
  const [arrivalDate, setArrivalDate] = useState<string>('');
  const [departureDate, setDepartureDate] = useState<string>('');

  const handleAddDate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent form submission
    if (arrivalDate && departureDate) {
      setDates([...dates, { arrivalDate, departureDate }]);
      setArrivalDate('');
      setDepartureDate('');
    }
  };

  const handleRemoveDate = (indexToRemove: number) => {
    setDates(dates.filter((_, index) => index !== indexToRemove));
  };

  const handleSubmit = async () => {
    if (dates.length === 0) {
      Swal.fire({
        icon: 'warning',
        title: 'No Dates Selected',
        text: 'Please add at least one arrival and departure date before submitting.',
      });
      return;
    }

    try {
      for (const datePair of dates) {
        const response = await fetch('https://localhost:7001/api/ScheduledTrainDate', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            scheduledTrainSchedulId: scheduleId,
            arrivalDate: datePair.arrivalDate,
            departureDate: datePair.departureDate
          })
        });

        if (!response.ok) {
          throw new Error('Failed to submit data');
        }
      }

    } catch (error) {
      console.error('Error submitting data:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Error submitting data',
      });
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
      confirmButtonText: "Yes, delete it!"
    }).then(async (result) => { 
      if (result.isConfirmed) {
        try {
          const response = await fetch(`https://localhost:7001/api/ScheduledTrain/${scheduleId}`, {
            method: 'DELETE',
          });
  
          if (!response.ok) {
            console.error('Failed to Cancel schedule', response);
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'Failed to Cancel the schedule.',
            });
            return;
          }
  
          Swal.fire({
            icon: 'success',
            title: 'Deleted',
            text: 'The schedule has been successfully Canceled.',
          });
        } catch (error) {
          console.error('Error Cancel the schedule.', error);
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Error Cancel the schedule.',
          });
        }
      }
    });
  };

  return (
    <form onSubmit={handleAddDate}>
      <div className='form-group'>
        <div className='row align-items-end'>
          <div className='col-sm-4'>
            <label htmlFor="arrivalDate">Arrival Date :</label> <br />
            <div className=''>
              <input 
                type="date" 
                className='form-control '
                id="arrivalDate" 
                name="arrivalDate"
                value={arrivalDate}
                onChange={(e) => setArrivalDate(e.target.value)}
              />
            </div>
          </div>

          <div className='col-sm-4'>
            <label htmlFor="departureDate">Departure Date :</label> <br />
            <div className=''>
              <input 
                type="date" 
                className='form-control '
                id="departureDate" 
                name="departureDate"
                value={departureDate}
                onChange={(e) => setDepartureDate(e.target.value)}
              />
            </div>
          </div>

          <div className='col-sm-4'>
            <div className=''>
              <button type="submit" className='btn primary'>Add</button>
            </div>
          </div>
        </div>

        <ul>
          {dates.map((datePair, index) => (
            <div className='p-1' key={index}>
              <li className='p-2'>
                Arrival: {datePair.arrivalDate}, &nbsp; &nbsp;  Departure: {datePair.departureDate}
                &nbsp; &nbsp; <button type="button" className='btn primary p-2' onClick={() => handleRemoveDate(index)}>Remove</button>
              </li>
            </div>
          ))}
        </ul>

        <div className='row'>
          <div className='col-12 text-center p-3'>
            <button type='button' className='btn white mx-3' onClick={handleCancel}>Cancel</button>
            <button type='button' className='btn primary mx-3' onClick={handleSubmit}>Submit</button>
          </div>
        </div>
      </div>
    </form>
  );
}

export default TrainScheduleForm3;
