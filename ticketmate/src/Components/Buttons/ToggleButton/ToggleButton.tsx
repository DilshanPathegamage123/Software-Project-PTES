import React from 'react'
import { useState } from 'react';
import './ToggleButton.css'


function ToggleButton() {
    const [buttonState, setButtonState] = useState(0);

    const handleButtonClick = (event: any) => {
        event.preventDefault();

      const newState = buttonState === 0 ? 1 : 0;
      setButtonState(newState);
    };
  return (
    <>
      <button className='toggleButton m-1 rounded-3' onClick={handleButtonClick} style={{ backgroundColor: buttonState === 0 ? '#D9D9D9' : '#1FBF83' }}>
          {buttonState === 0 ? '+' : '-'}
      </button>
    </>
  )
}

export default ToggleButton
