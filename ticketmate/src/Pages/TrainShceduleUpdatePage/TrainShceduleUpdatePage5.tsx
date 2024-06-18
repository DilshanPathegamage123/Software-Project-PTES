import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import '../../vars.css';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import PrimaryNavBar from '../../Components/NavBar/PrimaryNavBar';
import Footer from '../../Components/Footer/footer';

function TrainScheduleUpdatePage5() {
    
  const navigate = useNavigate();
  const [trainLocs, setTrainLocs] = useState<{ id: number, registeredCarriageCarriageId: string }[]>([]);
  const [newTrainLocs, setNewTrainLocs] = useState<{ carriageId: string, classType: string }[]>([]);
  const [currentTrainLoc, setCurrentTrainLoc] = useState('');

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const scheduleId = searchParams.get('scheduleId');

  useEffect(() => {
    fetchExistingLocomotives();
  }, [scheduleId]);

  const fetchExistingLocomotives = async () => {
    try {
      const response = await fetch(`https://localhost:7001/api/ScheduledCarriage/ByTrainSchedule/${scheduleId}`);
      const data = await response.json();
      setTrainLocs(data.map((loc: { id: number, registeredCarriageCarriageId: string }) => loc));
    } catch (error) {
      console.error('Failed to fetch existing locomotives', error);
    }
  };

  const handleAdd = async () => {
    if (currentTrainLoc.trim() !== '') {
      try {
        const response = await fetch(`https://localhost:7001/api/RegCarriage/${currentTrainLoc}`);
        const data = await response.json();

        if (response.ok && data.deleteState) {
          const existingLocIds = trainLocs.map(loc => loc.registeredCarriageCarriageId);
          if (!existingLocIds.includes(currentTrainLoc) && !newTrainLocs.some(loc => loc.carriageId === currentTrainLoc)) {
            const classType = data.carriageClass === 1 ? 'first' : 'second';
            setNewTrainLocs([...newTrainLocs, { carriageId: currentTrainLoc, classType }]);
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

  const handleRemove = async (id: number) => {
    try {
      const response = await fetch(`https://localhost:7001/api/ScheduledCarriage/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setTrainLocs(trainLocs.filter(loc => loc.id !== id));
      } else {
        throw new Error('Failed to delete locomotive');
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'An error occurred while deleting the locomotive ID.'
      });
    }
  };

  const handleNextButton = async () => {
    try {
      for (const loc of newTrainLocs) {
        const response = await fetch(`https://localhost:7001/api/ScheduledCarriage`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            scheduledTrainSchedulId: scheduleId,
            registeredCarriageCarriageId: loc.carriageId,
            classType: loc.classType
          })
        });

        if (!response.ok) {
          throw new Error(`Failed to save locomotive ID: ${loc.carriageId}`);
        }
      }

      navigate(`/ScheduledTrainPage?schedulId=${scheduleId}`);
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'An error occurred while saving the locomotive IDs.'
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
      confirmButtonText: "Yes, Go back it!"
    }).then(result => {
      if (result.isConfirmed) {
        navigate(`/ScheduledTrainPage?schedulId=${scheduleId}`);
      }
    });
  };
  
  return (
    <>
    <PrimaryNavBar/>
    <div className='BusSheUpForm my-5 rounded-3'>
      <div className="form-group">
      <h3 className='h3Style text-center pb-2'>Update the Scheduled Carriages</h3>
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
          {trainLocs.map((loc) => (
            <div key={loc.id} className='row justify-content-center mt-1'>
              <div className='col-sm-4 pl-5'>
                <p>{loc.registeredCarriageCarriageId}</p>
              </div>
              <div className='col-sm-2'>
                <button 
                  type="button" 
                  className="btn yellow"
                  onClick={() => handleRemove(loc.id)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
          {newTrainLocs.map((loc, index) => (
            <div key={index} className='row justify-content-center mt-1'>
              <div className='col-sm-4 pl-5'>
                <p>{loc.carriageId} ({loc.classType})</p>
              </div>
              <div className='col-sm-2'>
                <button 
                  type="button" 
                  className="btn yellow"
                  onClick={() => setNewTrainLocs(newTrainLocs.filter(id => id.carriageId !== loc.carriageId))}
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
                    Save
                </button>
            </div>
        </div>
      </div>
    </div>
    <Footer/>
    </>
  );
}

export default TrainScheduleUpdatePage5;
