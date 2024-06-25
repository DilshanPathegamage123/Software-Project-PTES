import React, { useState, useEffect } from 'react';
import swal from 'sweetalert2';
import axios from 'axios';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import './TrainShceduleUpdatePage.css';
import PrimaryNavBar from '../../Components/NavBar/PrimaryNavBar';
import Swal from 'sweetalert2';

// Define the TrainSchedule interface
interface TrainSchedule {
  trainName: string;
  trainDriverId: string;
  startStation: string;
  endStation: string;
  trainRoutNo: string;
  trainDepartureTime: string;
  trainArrivalTime: string;
  duration: string;
  trainType: string;
  firstClassTicketPrice: string;
  secondClassTicketPrice: string;
}

function TrainScheduleUpdatePage() {

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const schedulId = queryParams.get('schedulId');
  console.log("locomotive id " + schedulId);


  const [trainSchedule, setTrainSchedule] = useState<Partial<TrainSchedule>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof TrainSchedule, string>>>({});
  //const { schedulId } = useParams<{ schedulId: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    axios.get<TrainSchedule>(`https://localhost:7001/api/ScheduledTrain/${schedulId}`)
      .then((response) => {
        setTrainSchedule(response.data);
      })
      .catch((error) => {
        console.error('Error fetching train schedule:', error);
      });
  }, [schedulId]);

  const validateInput = () => {
    const newErrors: Partial<Record<keyof TrainSchedule, string>> = {};
    if (!trainSchedule.trainName) newErrors.trainName = 'Train Name is required';
    if (!trainSchedule.trainDriverId) newErrors.trainDriverId = 'Driver ID is required';
    if (!trainSchedule.startStation) newErrors.startStation = 'Start Station is required';
    if (!trainSchedule.endStation) newErrors.endStation = 'End Station is required';
    if (!trainSchedule.trainRoutNo) newErrors.trainRoutNo = 'Route No is required';
    if (!trainSchedule.trainDepartureTime) newErrors.trainDepartureTime = 'Departure Time is required';
    if (!trainSchedule.trainArrivalTime) newErrors.trainArrivalTime = 'Arrival Time is required';
    if (!trainSchedule.duration) newErrors.duration = 'Duration is required';
    if (!trainSchedule.firstClassTicketPrice) newErrors.firstClassTicketPrice = 'First Class Ticket Price is required';
    if (!trainSchedule.secondClassTicketPrice) newErrors.secondClassTicketPrice = 'Second Class Ticket Price is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleUpdateClick = async () => {
    if (validateInput()) {
      setIsSubmitting(true);

      try {
        await axios.put(`https://localhost:7001/api/ScheduledTrain/${schedulId}`, trainSchedule);
        swal.fire('Success', 'Train schedule updated successfully!', 'success').then(() => {
          navigate(`/ScheduledTrainPage?schedulId=${schedulId}`);
        });
      } catch (error) {
        swal.fire('Error', 'An error occurred while updating the schedule. Please try again.', 'error');
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const CancelButton = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Go Back!"
    }).then((result) => {
      if (result.isConfirmed) {
        navigate(`/ScheduledTrainPage?schedulId=${schedulId}`)
      }
    });
  };

  return (
    <div>
        <PrimaryNavBar/>
      <h3 className='h3Style text-center pt-4'>Edit Train Schedule</h3>
      <form>
        <div className='row'>
          <div className='col-12 p-3'>
            <div className='infoSecTrainSch rounded-4'>
                <div className="form-group row">
                <label htmlFor="inputTrainName" className="col-form-label">Train Name</label>
                <div className="">
                    <input
                    type="text"
                    className="form-control"
                    id="inputTrainName"
                    name="trainName"
                    placeholder="Enter Train Name"
                    value={trainSchedule.trainName || ''}
                    onChange={(e) => setTrainSchedule({ ...trainSchedule, trainName: e.target.value })}
                    />
                    {errors.trainName && <div className='text-danger'>{errors.trainName}</div>}
                </div>
                </div>

                <div className="form-group row">
                <label htmlFor="inputTrainDriverId" className="col-form-label">Train Driver ID</label>
                <div className="">
                    <input
                    type="text"
                    className="form-control"
                    id="inputTrainDriverId"
                    name="trainDriverId"
                    placeholder="Enter Train Driver ID"
                    value={trainSchedule.trainDriverId || ''}
                    onChange={(e) => setTrainSchedule({ ...trainSchedule, trainDriverId: e.target.value })}
                    />
                    {errors.trainDriverId && <div className='text-danger'>{errors.trainDriverId}</div>}
                </div>
                </div>

                <div className="form-group row">
                <label htmlFor="inputStartStation" className="col-form-label">Start Station</label>
                <div className="">
                    <input
                    type="text"
                    className="form-control"
                    id="inputStartStation"
                    name="startStation"
                    placeholder="Enter Start Station"
                    value={trainSchedule.startStation || ''}
                    onChange={(e) => setTrainSchedule({ ...trainSchedule, startStation: e.target.value })}
                    />
                    {errors.startStation && <div className='text-danger'>{errors.startStation}</div>}
                </div>
                </div>

                <div className="form-group row">
                <label htmlFor="inputEndStation" className="col-form-label">End Station</label>
                <div className="">
                    <input
                    type="text"
                    className="form-control"
                    id="inputEndStation"
                    name="endStation"
                    placeholder="Enter End Station"
                    value={trainSchedule.endStation || ''}
                    onChange={(e) => setTrainSchedule({ ...trainSchedule, endStation: e.target.value })}
                    />
                    {errors.endStation && <div className='text-danger'>{errors.endStation}</div>}
                </div>
                </div>

                <div className="form-group row">
                <label htmlFor="inputTrainRoutNo" className="col-form-label">Train Route No</label>
                <div className="">
                    <input
                    type="text"
                    className="form-control"
                    id="inputTrainRoutNo"
                    name="trainRoutNo"
                    placeholder="Enter Train Route No"
                    value={trainSchedule.trainRoutNo || ''}
                    onChange={(e) => setTrainSchedule({ ...trainSchedule, trainRoutNo: e.target.value })}
                    disabled
                    />
                    {errors.trainRoutNo && <div className='text-danger'>{errors.trainRoutNo}</div>}
                </div>
                </div>

                <div className="form-group row">
                <label htmlFor="inputTrainDepartureTime" className="col-form-label">Train Departure Time</label>
                <div className="">
                    <input
                    type="text"
                    className="form-control"
                    id="inputTrainDepartureTime"
                    name="trainDepartureTime"
                    placeholder="Enter Train Departure Time"
                    value={trainSchedule.trainDepartureTime || ''}
                    onChange={(e) => setTrainSchedule({ ...trainSchedule, trainDepartureTime: e.target.value })}
                    />
                    {errors.trainDepartureTime && <div className='text-danger'>{errors.trainDepartureTime}</div>}
                </div>
                </div>

                <div className="form-group row">
                <label htmlFor="inputTrainArrivalTime" className="col-form-label">Train Arrival Time</label>
                <div className="">
                    <input
                    type="text"
                    className="form-control"
                    id="inputTrainArrivalTime"
                    name="trainArrivalTime"
                    placeholder="Enter Train Arrival Time"
                    value={trainSchedule.trainArrivalTime || ''}
                    onChange={(e) => setTrainSchedule({ ...trainSchedule, trainArrivalTime: e.target.value })}
                    />
                    {errors.trainArrivalTime && <div className='text-danger'>{errors.trainArrivalTime}</div>}
                </div>
                </div>

                <div className="form-group row">
                <label htmlFor="inputDuration" className="col-form-label">Duration</label>
                <div className="">
                    <input
                    type="text"
                    className="form-control"
                    id="inputDuration"
                    name="duration"
                    placeholder="Enter Duration"
                    value={trainSchedule.duration || ''}
                    onChange={(e) => setTrainSchedule({ ...trainSchedule, duration: e.target.value })}
                    />
                    {errors.duration && <div className='text-danger'>{errors.duration}</div>}
                </div>
                </div>

                <div className="form-group row">
                <label htmlFor="inputFirstClassTicketPrice" className="col-form-label">First Class Ticket Price</label>
                <div className="">
                    <input
                    type="text"
                    className="form-control"
                    id="inputFirstClassTicketPrice"
                    name="firstClassTicketPrice"
                    placeholder="Enter First Class Ticket Price"
                    value={trainSchedule.firstClassTicketPrice || ''}
                    onChange={(e) => setTrainSchedule({ ...trainSchedule, firstClassTicketPrice: e.target.value })}
                    />
                    {errors.firstClassTicketPrice && <div className='text-danger'>{errors.firstClassTicketPrice}</div>}
                </div>
                </div>

                <div className="form-group row">
                <label htmlFor="inputSecondClassTicketPrice" className="col-form-label">Second Class Ticket Price</label>
                <div className="">
                    <input
                    type="text"
                    className="form-control"
                    id="inputSecondClassTicketPrice"
                    name="secondClassTicketPrice"
                    placeholder="Enter Second Class Ticket Price"
                    value={trainSchedule.secondClassTicketPrice || ''}
                    onChange={(e) => setTrainSchedule({ ...trainSchedule, secondClassTicketPrice: e.target.value })}
                    />
                    {errors.secondClassTicketPrice && <div className='text-danger'>{errors.secondClassTicketPrice}</div>}
                </div>
                </div>

                <div className='row'>
              <div className='col-12 text-center p-3'>
                <button type='button' className='btn white mx-3' onClick={CancelButton}>Cancel</button>
                <button type='button' className='btn primary mx-3' onClick={handleUpdateClick} disabled={isSubmitting}>Update</button>
              </div>
            </div>
            </div>
            
          </div>
        </div>
      </form>
    </div>
  );
}

export default TrainScheduleUpdatePage;
