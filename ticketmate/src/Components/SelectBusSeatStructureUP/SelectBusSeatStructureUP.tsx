import React from 'react';
import './SelectBusSeatStructureUP.css';

interface ButtonState {
  availability: boolean;
  id: number;
}

interface SelectBusSeatStructureProps {
  buttonStates: { [key: string]: ButtonState };
  setButtonStates: React.Dispatch<React.SetStateAction<{ [key: string]: ButtonState }>>;
}

const SelectBusSeatStructureUP: React.FC<SelectBusSeatStructureProps> = ({ buttonStates, setButtonStates }) => {

  const handleButtonClick = (seatId: string) => {
    setButtonStates(prevState => ({
      ...prevState,
      [seatId]: {
        ...prevState[seatId],
        availability: !prevState[seatId].availability
      }
    }));
  };

  const renderSeatStructure = () => {
    const seatStructure = [];
    for (let rowIndex = 0; rowIndex < 11; rowIndex++) {
      const row = (
        <div key={rowIndex} className="row justify-content-center">
          {[...Array(6)].map((_, colIndex) => {
            const buttonId = String(rowIndex * 10 + colIndex + 1);
            return (
              <button
                key={buttonId}
                type="button"
                className={`btn btn-primary2 toggleButton ${buttonStates[buttonId]?.availability ? 'active' : ''}`}
                aria-pressed={buttonStates[buttonId]?.availability ? 'true' : 'false'}
                onClick={() => handleButtonClick(buttonId)}
              >
                {buttonStates[buttonId]?.availability ? '-' : '+'}
              </button>
            );
          })}
        </div>
      );
      seatStructure.push(row);
    }
    return seatStructure;
  };

  return (
    <div className="seat-structure">
      {renderSeatStructure()}
    </div>
  );
};

export default SelectBusSeatStructureUP;
