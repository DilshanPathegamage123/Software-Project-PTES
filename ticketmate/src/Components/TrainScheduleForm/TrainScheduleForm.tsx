import React, { useState } from 'react';
import swal from 'sweetalert2';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

function TrainScheduleForm({ handleNext, userId }: { handleNext: any, userId: string | null }) {

  const getToken = () => {
    return sessionStorage.getItem("token");
  };

  const [trainName, setTrainName] = useState('');
  const [driId, setDriId] = useState('');
  const [startStation, setStartStation] = useState('');
  const [endStation, setEndStation] = useState('');
  const [routNo, setRoutNo] = useState('');
  const [depTime, setDepTime] = useState('');
  const [arrTime, setArrTime] = useState('');
  const [duration, setDuration] = useState('');
  const [trainType, setTrainType] = useState('Express');
  const [firstClassTicketPrice, setFirstClassTicketPrice] = useState('');
  const [secondClassTicketPrice, setSecondClassTicketPrice] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [schedulId, setScheduleId] = useState('');

  const [errors, setErrors] = useState({
    trainName: '',
    driId: '',
    startStation: '',
    endStation: '',
    routNo: '',
    depTime: '',
    arrTime: '',
    duration: '',
    firstClassTicketPrice: '',
    secondClassTicketPrice: ''
  });

  const validateInput = () => {
    const newErrors: any = {};
    if (!trainName) newErrors.trainName = 'Train Name is required';
    if (!driId) newErrors.driId = 'Driver ID is required';
    if (!startStation) newErrors.startStation = 'Start Station is required';
    if (!endStation) newErrors.endStation = 'End Station is required';
    if (!routNo) newErrors.routNo = 'Route No is required';
    if (!depTime) newErrors.depTime = 'Departure Time is required';
    if (!arrTime) newErrors.arrTime = 'Arrival Time is required';
    if (!duration) newErrors.duration = 'Duration is required';
    if (!firstClassTicketPrice) newErrors.firstClassTicketPrice = 'First Class Ticket Price is required';
    if (!secondClassTicketPrice) newErrors.secondClassTicketPrice = 'Second Class Ticket Price is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const checkDriverIdAvailability = async () => {
    try {
      const response = await axios.get(`https://localhost:7001/api/userData/${driId}`,{
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      
      });
      if (response.data && response.data.userType === 'Driver') {
        return true;
      } else {
        swal.fire({
          icon: 'error',
          title: 'Invalid Driver ID',
          text: 'The entered Driver ID is not available or the user is not a Driver. Please check and try again.'
        });
        return false;
      }
    } catch (error) {
      swal.fire({
        icon: 'error',
        title: 'Driver ID Not Found',
        text: 'The entered Driver ID is not available. Please check and try again.'
      });
      return false;
    }
  };

  const checkRoutNoAvailability = async () => {
    try {
      const response = await axios.get(`https://localhost:7001/api/TrainRaliway/byRailwayNo/${routNo}`,{
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      
      });
      if (response.status === 200) {
        const data = response.data;
        return data.id;
      } else {
        swal.fire({
          icon: 'error',
          title: 'Invalid Route Number',
          text: 'The entered Route Number is not available. Please check and try again.'
        });
        return null;
      }
    } catch (error) {
      swal.fire({
        icon: 'error',
        title: 'Invalid Route Number',
        text: 'An error occurred while checking the Route Number. Please try again.'
      });
      return null;
    }
  };

  // Function to format time to AM/PM format
  const formatTime = (time:any) => {
    const [hours, minutes] = time.split(':');
    const date = new Date();
    date.setHours(parseInt(hours), parseInt(minutes));
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
  };

  const handleNextClick = async () => {
    if (validateInput()) {
      if (depTime === arrTime) {
        swal.fire({
          icon: 'error',
          title: 'Invalid Time Selection',
          text: 'Departure Time and Arrival Time cannot be the same. Please select different times.'
        });
        return;
      }
      
      setIsSubmitting(true);
      
      const isDriverIdAvailable = await checkDriverIdAvailability();
      if (!isDriverIdAvailable) {
        setIsSubmitting(false);
        //alert('Driver ID is not available');
        return;
      }
      
      const routeId = await checkRoutNoAvailability();
      if (!routeId) {
        setIsSubmitting(false);
        return;
      }

      const newTrainSchedule = {
        trainName: trainName,
        //trainNo: trainNo,
        trainDriverId: driId,
        trainRoutNo: routNo,
        startStation: startStation,
        endStation: endStation,
        trainDepartureTime: formatTime(depTime),
        trainArrivalTime: formatTime(arrTime),
        trainType: trainType,
        duration: duration,
        firstClassTicketPrice: firstClassTicketPrice,
        secondClassTicketPrice: secondClassTicketPrice,
        userId: userId
      };

      try {
        const response = await axios.post('https://localhost:7001/api/ScheduledTrain', newTrainSchedule,{
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        
        });
        const { schedulId } = response.data; // Extract scheduleId from response
        setScheduleId(schedulId); // Set scheduleId state
        console.log('Schedule ID: ', schedulId);
        handleNext(newTrainSchedule ,schedulId);

      } catch (error) {
        swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'An error occurred while saving the schedule. Please try again.'
        });
      }
      setIsSubmitting(false);
    }
  };

  const navigate = useNavigate();

  const handleCancel = () => {
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
        navigate('/TrainOwnerPage');
      }
    });
  }

  return (
    <form>
      <div className='row'>
        <div className='col-12 p-3'>
          <div className="form-group row">
            <label htmlFor="inputTrainName" className="col-form-label">Train Name</label>
            <div className="">
              <input 
                type="text" 
                className="form-control" 
                id="inputTrainName" 
                name="trainName" 
                placeholder="Enter Train Name" 
                value={trainName} 
                onChange={(e) => setTrainName(e.target.value)} 
              />
              {errors.trainName && <div className='text-danger'>{errors.trainName}</div>}
            </div>
          </div>

          <div className="form-group row">
            <label htmlFor="inputDriId" className="col-form-label">Train Driver ID</label>
            <div className="">
              <input 
                type="text" 
                className="form-control" 
                id="inputDriId" 
                name="driId" 
                placeholder="Enter Driver ID" 
                value={driId} 
                onChange={(e) => setDriId(e.target.value)} 
              />
              {errors.driId && <div className='text-danger'>{errors.driId}</div>}
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
                value={startStation} 
                onChange={(e) => setStartStation(e.target.value)} 
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
                value={endStation} 
                onChange={(e) => setEndStation(e.target.value)} 
              />
              {errors.endStation && <div className='text-danger'>{errors.endStation}</div>}
            </div>
          </div>

          <div className="form-group row">
            <label htmlFor="inputRoutNo" className="col-form-label">Train Route No</label>
            <div className="">
              <input 
                type="text" 
                className="form-control" 
                id="inputRoutNo" 
                name="routNo" 
                placeholder="Enter Route No" 
                value={routNo} 
                onChange={(e) => setRoutNo(e.target.value)} 
              />
              {errors.routNo && <div className='text-danger'>{errors.routNo}</div>}
            </div>
          </div>

          <div className="form-group row">
            <div className='col-sm-6'>
              <label htmlFor="inputDepTime" className="col-form-label">Train Departure Time</label>
              <div className="">
                <input 
                  type="time" 
                  className="form-control" 
                  id="inputDepTime" 
                  name="depTime" 
                  placeholder="Enter Departure Time" 
                  value={depTime} 
                  onChange={(e) => setDepTime(e.target.value)} 
                />
                {errors.depTime && <div className='text-danger'>{errors.depTime}</div>}
              </div>
            </div>
            <div className='col-sm-6'>
              <label htmlFor="inputArrTime" className="col-form-label">Train Arrival Time</label>
              <div className="">
                <input 
                  type="time" 
                  className="form-control" 
                  id="inputArrTime" 
                  name="arrTime" 
                  placeholder="Enter Arrival Time" 
                  value={arrTime} 
                  onChange={(e) => setArrTime(e.target.value)} 
                />
                {errors.arrTime && <div className='text-danger'>{errors.arrTime}</div>}
              </div>
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
                placeholder="Enter Duration : Ex: 2h 30m" 
                value={duration} 
                onChange={(e) => setDuration(e.target.value)} 
              />
              {errors.duration && <div className='text-danger'>{errors.duration}</div>}
            </div>
          </div>

          <div className="form-group row">
            <label htmlFor="inputTrainType" className="col-form-label">Train Type</label>
            <div className="col-sm-6">
              <div className="form-check">
                <input 
                  className="form-check-input" 
                  type="radio" 
                  name="trainType" 
                  id="expressTrain" 
                  value="Express" 
                  checked={trainType === 'Express'} 
                  onChange={(e) => setTrainType(e.target.value)} 
                />
                <label className="form-check-label" htmlFor="expressTrain">
                  Express
                </label>
              </div>
              <div className="form-check">
                <input 
                  className="form-check-input" 
                  type="radio" 
                  name="trainType" 
                  id="slowTrain" 
                  value="Slow" 
                  checked={trainType === 'Slow'} 
                  onChange={(e) => setTrainType(e.target.value)} 
                />
                <label className="form-check-label" htmlFor="slowTrain">
                  Slow
                </label>
              </div>
            </div>
          </div>

          <div className="form-group row">
            <label htmlFor="inputFirstClassTicketPrice" className="col-form-label">First Class Ticket Price</label>
            <div className="">
              <input 
                type="number" 
                className="form-control" 
                id="inputFirstClassTicketPrice" 
                name="firstClassTicketPrice" 
                placeholder="Enter First Class Ticket Price" 
                value={firstClassTicketPrice} 
                onChange={(e) => setFirstClassTicketPrice(e.target.value)} 
              />
              {errors.firstClassTicketPrice && <div className='text-danger'>{errors.firstClassTicketPrice}</div>}
            </div>
          </div>

          <div className="form-group row">
            <label htmlFor="inputSecondClassTicketPrice" className="col-form-label">Second Class Ticket Price</label>
            <div className="">
              <input 
                type="number" 
                className="form-control" 
                id="inputSecondClassTicketPrice" 
                name="secondClassTicketPrice" 
                placeholder="Enter Second Class Ticket Price" 
                value={secondClassTicketPrice} 
                onChange={(e) => setSecondClassTicketPrice(e.target.value)} 
              />
              {errors.secondClassTicketPrice && <div className='text-danger'>{errors.secondClassTicketPrice}</div>}
            </div>
          </div>

        </div>
      </div>
      <div className='row'>
        <div className='col-12 text-center p-3'>
          <button type='button' className='btn white mx-3' onClick={handleCancel}>Cancel</button>
          <button type='button' className='btn primary mx-3' onClick={handleNextClick} disabled={isSubmitting}>Next</button>
        </div>
      </div>
    </form>
  );
}

export default TrainScheduleForm;
