import React, { useState } from 'react';
import '../../vars.css';

function Test() {
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
              <button type="submit" className='btn btn-primary'>Add</button>
            </div>
          </div>
        </div>
        
        
        <ul>
          {dates.map((datePair, index) => (
            <div className='p-1' key={index}>
              <li className='p-2'>
                Arrival: {datePair.arrivalDate}, &nbsp; &nbsp; Departure: {datePair.departureDate}
                &nbsp; &nbsp; <button className='btn primary p-2' onClick={() => handleRemoveDate(index)}>Remove</button>
              </li>
            </div>
          ))}
        </ul>

        <div className='row'>
          <div className='col-12 text-center p-3'>
            <button type='button' className='btn white mx-3'>Back</button>
            <button type='button' className='btn primary mx-3'>Submit</button>
          </div>
        </div>
      </div>
    </form>
  );
}

export default Test;
