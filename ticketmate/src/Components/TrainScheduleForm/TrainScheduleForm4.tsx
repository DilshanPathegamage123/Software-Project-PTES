import React, { useState } from 'react';
import Swal from 'sweetalert2';
import '../../vars.css';

function TrainScheduleForm4({ scheduleId, handleNext }: { scheduleId: string, handleNext: () => void;}) {
  const [trainLocs, setTrainLocs] = useState<string[]>([]);
  const [currentTrainLoc, setCurrentTrainLoc] = useState('');

  const handleAdd = async () => {
    if (currentTrainLoc.trim() !== '') {
      try {
        const response = await fetch(`https://localhost:7001/api/RegLocomotive/${currentTrainLoc}`);
        const data = await response.json();

        if (response.ok && data.deleteState) {
          if (!trainLocs.includes(currentTrainLoc)) {
            setTrainLocs([...trainLocs, currentTrainLoc]);
            setCurrentTrainLoc('');
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Duplicate Entry',
              text: 'This locomotive ID is already added.'
            });
          }
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Invalid Locomotive ID',
            text: 'The locomotive ID is not valid or deleteState is false.'
          });
        }
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'An error occurred while validating the locomotive ID.'
        });
      }
    }
  };

  const handleRemove = (index: number) => {
    setTrainLocs(trainLocs.filter((_, i) => i !== index));
  };

  const handleNextButton = async () => {
    try {
      for (const loc of trainLocs) {
        const response = await fetch(`https://localhost:7001/api/ScheduledLocomotive`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            scheduledTrainSchedulId: scheduleId,
            registeredLocomotiveLocomotiveId: loc
          })
        });

        if (!response.ok) {
          throw new Error(`Failed to save locomotive ID: ${loc}`);
        }
      }

    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'An error occurred while saving the locomotive IDs.'
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
    <>
      <div className="form-group">
        <div className='row justify-content-center'>
            <div className='col-sm-6'>
                <label htmlFor="inputTrainLocomotive" className="col-form-label">Train Locomotive Id</label>
            </div>
        </div>
        <div className='row justify-content-center'>
          <div className="col-sm-4">
            <input 
              type="text" 
              className="form-control" 
              id="inputTrainLocomotive" 
              name="trainLoc" 
              placeholder="Enter Train Locomotive ID" 
              value={currentTrainLoc}
              onChange={(e) => setCurrentTrainLoc(e.target.value)}
            />
          </div>
          <div className='col-sm-2'>
            <button 
              type="button" 
              className="btn primary"
              onClick={handleAdd}
            >
              ADD
            </button>
          </div>      
        </div>
        <div className='mt-3'>
          {trainLocs.map((loc, index) => (
            <div key={index} className='row justify-content-center mt-1'>
              <div className='col-sm-4 pl-5'>
                <p>{loc}</p>
              </div>
              <div className='col-sm-2'>
                <button 
                  type="button" 
                  className="btn yellow"
                  onClick={() => handleRemove(index)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className='row'>
            <div className='col-12 text-center p-3'>
                <button type="button" className="btn white mx-2" onClick={handleCancel}>Cancel</button>
                <button 
                    type="button" 
                    className='btn primary mx-2'
                    onClick={handleNextButton}
                >
                    Next
                </button>
            </div>
        </div>
        
      </div>
    </>
  );
}

export default TrainScheduleForm4;
