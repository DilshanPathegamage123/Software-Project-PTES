import React, { useState } from 'react';
import Wheel from '../../assets/steering-wheel (1).png';
import './SelectBusSeatStructure.css';

function SelectBusSeatStructure() {
    const [buttonStates, setButtonStates] = useState({
        '11': false, '12': false, '13': false, '14': false, '15': false, '16': false,
        '21': false, '22': false, '23': false, '24': false, '25': false, '26': false,
        '31': false, '32': false, '33': false, '34': false, '35': false, '36': false,
        '41': false, '42': false, '43': false, '44': false, '45': false, '46': false,
        '51': false, '52': false, '53': false, '54': false, '55': false, '56': false,
        '61': false, '62': false, '63': false, '64': false, '65': false, '66': false,
        '71': false, '72': false, '73': false, '74': false, '75': false, '76': false,
        '81': false, '82': false, '83': false, '84': false, '85': false, '86': false,
        '91': false, '92': false, '93': false, '94': false, '95': false, '96': false,
        '101': false, '102': false, '103': false, '104': false, '105': false, '106': false,
        '111': false, '112': false, '113': false, '114': false, '115': false, '116': false,
    });

    const handleClick = (buttonId: string) => {
        setButtonStates(prevStates => ({
            ...prevStates,
            [buttonId]: !prevStates[buttonId as keyof typeof prevStates]
        }));
    };

    return (
        <div className='col-12 col-lg-6 p-5'>
            <p>Please select the seat structure</p>
            <div className='container'>
                <div className='bg-light rounded-4 p-5'>
                    <div className='row justify-content-center pb-3'>
                        <img src={Wheel} alt="Steering-wheel-img" style={{ width: "57px" }} />
                    </div>
                    {[...Array(11)].map((_, rowIndex) => (
                        <div key={rowIndex} className="row justify-content-center">
                            {[...Array(6)].map((_, colIndex) => {
                                const buttonId = String((rowIndex + 1) * 10 + (colIndex + 1)); // Convert buttonId to a string
                                return (
                                    <button
                                        key={buttonId}
                                        id={buttonId}
                                        type="button"
                                        className={`btn btn-primary2 toggleButton ${buttonStates[buttonId as keyof typeof buttonStates] ? 'active' : ''}`}
                                        aria-pressed={buttonStates[buttonId as keyof typeof buttonStates] ? "true" : "false"} // Add index signature to allow indexing with a string
                                        onClick={() => handleClick(buttonId)}
                                    >
                                        {buttonStates[buttonId as keyof typeof buttonStates] ? "-" : "+"} 
                                    </button>
                                );
                            })}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default SelectBusSeatStructure;
