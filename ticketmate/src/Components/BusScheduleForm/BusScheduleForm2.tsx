import React from 'react';

interface BusScheduleForm2Props {
  standNames: string[];
  handleNext: () => void;
}

function BusScheduleForm2({ standNames, handleNext, userId }: { standNames: string[], handleNext: any, userId: string | null }){
  return (
    <>
      <p>Select the Bus Stations.</p>
      <div className='row pl-5'>
        {standNames.map((standName, index) => (
          <div key={index}>
            <input 
              type="checkbox" 
              id={standName} 
              name={standName} 
              value={standName} 
            />
            &nbsp; <label htmlFor={standName}>{standName}</label><br />
          </div>
        ))}
      </div>

      <div className='row'>
        <div className='col-12 text-center p-3'>
          <button type='button' className='btn white mx-3'>Back</button>
          <button type='button' className='btn primary mx-3' onClick={handleNext}>Next</button>
        </div>
      </div>
    </>
  );
}

export default BusScheduleForm2;
