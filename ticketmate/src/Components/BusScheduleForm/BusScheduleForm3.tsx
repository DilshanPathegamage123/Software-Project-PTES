import React, { useState } from 'react';

function BusScheduleForm3({ userId }: { userId: string | null }) {
  const [dates, setDates] = useState<string[]>([]);
  const [currentDate, setCurrentDate] = useState<string>('');

  const handleAddDate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent form submission
    if (currentDate) {
      setDates([...dates, currentDate]);
      setCurrentDate('');
    }
  };

  const handleRemoveDate = (dateToRemove: string) => {
    setDates(dates.filter(date => date !== dateToRemove));
  };

  return (
    <form onSubmit={handleAddDate}>
      <div className='form-group'>
        <div className='row'><label htmlFor="scheduleDate">Schedule Date :</label> <br /></div>
 
        <div className='row'>
          <div className='col-sm-6'>
            <input 
              type="date" 
              className='form-control '
              id="scheduleDate" 
              name="scheduleDate"
              value={currentDate}
              onChange={(e) => setCurrentDate(e.target.value)}
            />
          </div>

          <div className='col'>
            <button type="submit" className='btn btn-primary'>Add</button>
          </div>
        </div>
        
        <ul>
          {dates.map((date, index) => (
            <div className='p-1' key={index}>
              <li className='p-2'>
                {date}
                &nbsp; &nbsp; <button className='btn btn-primary p-2' onClick={() => handleRemoveDate(date)}>Remove</button>
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

export default BusScheduleForm3;
