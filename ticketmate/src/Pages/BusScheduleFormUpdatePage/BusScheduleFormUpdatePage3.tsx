import React, { useState, useEffect } from 'react';
import '../../vars.css';
import Swal from 'sweetalert2';
import { useNavigate, useLocation } from 'react-router-dom';

interface ScheduleDate {
  id: number;
  scheduledBusScheduleId: number;
  arrivalDate: string;
  departureDate: string;
  isCompleted: boolean;
}

function BusScheduleFormUpdatePage3() {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const scheduleId = searchParams.get('scheduleId');

  const [dates, setDates] = useState<ScheduleDate[]>([]);
  const [newDates, setNewDates] = useState<{ arrivalDate: string; departureDate: string }[]>([]);
  const [arrivalDate, setArrivalDate] = useState<string>('');
  const [departureDate, setDepartureDate] = useState<string>('');

  useEffect(() => {
    fetchExistingDates();
  }, []);

  const fetchExistingDates = async () => {
    try {
      const response = await fetch(`https://localhost:7001/api/ScheduledBusDate/ByScheduleId/${scheduleId}`);
      if (response.ok) {
        const data = await response.json();
        setDates(data);
      } else {
        throw new Error('Failed to fetch existing dates');
      }
    } catch (error) {
      console.error('Error fetching existing dates:', error);
    }
  };

  const handleAddDate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent form submission

    // Check for duplicate dates
    if (
      dates.some(date => date.arrivalDate === arrivalDate && date.departureDate === departureDate) ||
      newDates.some(date => date.arrivalDate === arrivalDate && date.departureDate === departureDate)
    ) {
      Swal.fire({
        icon: 'error',
        title: 'Duplicate Dates',
        text: 'The same arrival and departure dates cannot be added more than once.',
      });
      return;
    }

    if (arrivalDate && departureDate) {
      setNewDates([...newDates, { arrivalDate, departureDate }]);
      setArrivalDate('');
      setDepartureDate('');
    }
  };

  const handleRemoveDate = (indexToRemove: number, isExisting: boolean) => {
    if (isExisting) {
      const dateToRemove = dates[indexToRemove];
      try {
        fetch(`https://localhost:7001/api/ScheduledBusDate/${dateToRemove.id}`, {
          method: 'DELETE',
        })
          .then(response => {
            if (response.ok) {
              setDates(dates.filter((_, index) => index !== indexToRemove));
            } else {
              throw new Error('Failed to delete the date');
            }
          })
          .catch(error => {
            console.error('Error deleting date:', error);
          });
      } catch (error) {
        console.error('Error deleting date:', error);
      }
    } else {
      setNewDates(newDates.filter((_, index) => index !== indexToRemove));
    }
  };

  const handleSubmit = async () => {
    if (newDates.length === 0) {
      Swal.fire({
        icon: 'warning',
        title: 'No New Dates',
        text: 'Please add at least one new arrival and departure date before submitting.',
      });
      return;
    }

    try {
      for (const datePair of newDates) {
        const response = await fetch('https://localhost:7001/api/ScheduledBusDate', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            scheduledBusScheduleId: scheduleId,
            arrivalDate: datePair.arrivalDate,
            departureDate: datePair.departureDate
          })
        });

        if (!response.ok) {
          throw new Error('Failed to submit data');
        }
      }
      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Data submitted successfully',
        timer: 2500,
      });

      navigate(`/ScheduledBusPage?scheduleId=${scheduleId}`);
    } catch (error) {
      console.error('Error submitting data:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Error submitting data',
      });
    }
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
    }).then(result => {
      if (result.isConfirmed) {
        navigate(`/ScheduledBusPage?scheduleId=${scheduleId}`);
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
                &nbsp; &nbsp; <button type="button" className='btn primary p-2' onClick={() => handleRemoveDate(index, true)}>Remove</button>
              </li>
            </div>
          ))}
          {newDates.map((datePair, index) => (
            <div className='p-1' key={index + dates.length}>
              <li className='p-2'>
                Arrival: {datePair.arrivalDate}, &nbsp; &nbsp;  Departure: {datePair.departureDate}
                &nbsp; &nbsp; <button type="button" className='btn primary p-2' onClick={() => handleRemoveDate(index, false)}>Remove</button>
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

export default BusScheduleFormUpdatePage3;
