import React, { useState, useEffect } from 'react';
import Wheel from '../../assets/steering-wheel (1).png';
import './SelectBusSeatStructure.css';

interface SelectBusSeatStructureProps {
  setButtonStates: React.Dispatch<React.SetStateAction<{ [key: string]: boolean }>>;
}

const SelectBusSeatStructure: React.FC<SelectBusSeatStructureProps> = ({ setButtonStates }) => {
  const [buttonStates, setLocalButtonStates] = useState<{ [key: string]: boolean }>({});

  useEffect(() => {
    // Sending all button statuses to the parent component
    setButtonStates(buttonStates);
  }, [buttonStates, setButtonStates]);

  // Function to handle button click and toggle button state
  const handleClick = (buttonId: string) => {
    setLocalButtonStates((prevStates) => ({
      ...prevStates,
      [buttonId]: !prevStates[buttonId], // Toggle button state
    }));
  };

  useEffect(() => {
    // Initialize all button statuses to false when component mounts
    const initialButtonStates: { [key: string]: boolean } = {};
    for (let rowIndex = 0; rowIndex < 11; rowIndex++) {
      for (let colIndex = 0; colIndex < 6; colIndex++) {
        const buttonId = String(rowIndex * 10 + colIndex + 1);
        initialButtonStates[buttonId] = false;
      }
    }
    setLocalButtonStates(initialButtonStates);
  }, []);

  return (
    <div className='col-12 col-lg-6 p-5'>
      <p>Please select the seat structure</p>
      <div className='container'>
        <div className='bg-light rounded-4 p-5'>
          <div className='row justify-content-center pb-3'>
            <img src={Wheel} alt='Steering-wheel-img' style={{ width: '57px' }} />
          </div>
          {[...Array(11)].map((_, rowIndex) => (
            <div key={rowIndex} className='row justify-content-center'>
              {[...Array(6)].map((_, colIndex) => {
                const buttonId = String(rowIndex * 10 + colIndex + 1);
                return (
                  <button
                    key={buttonId}
                    id={buttonId}
                    type='button'
                    className={`btn btn-primary2 toggleButton ${buttonStates[buttonId] ? 'active' : ''}`}
                    aria-pressed={buttonStates[buttonId] ? 'true' : 'false'}
                    onClick={() => handleClick(buttonId)}
                  >
                    {buttonStates[buttonId] ? '-' : '+'}

                  </button>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};


export default SelectBusSeatStructure;
