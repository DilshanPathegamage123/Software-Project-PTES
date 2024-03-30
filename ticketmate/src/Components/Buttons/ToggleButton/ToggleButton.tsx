import React from 'react'
import { useState } from 'react';
import './ToggleButton.css'

interface ToggleButtonProps {
  id: number; // Define the type for the id prop
}


function ToggleButton({ id }: ToggleButtonProps) {
    const [buttonState, setButtonState] = useState(0);

    const handleButtonClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault();

      const newState = buttonState === 0 ? 1 : 0;
      setButtonState(newState);
    };
  return (
    <>
      <button id={id.toString()} className='toggleButton m-1 rounded-3' onClick={handleButtonClick} style={{ backgroundColor: buttonState === 0 ? '#D9D9D9' : '#1FBF83' }}>
          {buttonState === 0 ? '+' : '-'}
      </button>
    </>
  )
}

export default ToggleButton
