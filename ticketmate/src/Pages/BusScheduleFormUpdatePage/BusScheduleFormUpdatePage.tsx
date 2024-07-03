import React, { useState, useEffect } from 'react';
import swal from 'sweetalert2';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import './BusScheduleFormUpdatePage.css';
import PrimaryNavBar from '../../Components/NavBar/PrimaryNavBar-logout';
import Footer from '../../Components/Footer/footer';
import '../../vars.css';

function BusScheduleFormUpdatePage() {
  // State variables for form data
  const [busId, setBusId] = useState('');
  const [busNo, setBusNo] = useState(''); // Added BusNo
  const [driId, setDriId] = useState('');
  const [startLoc, setStartLoc] = useState('');
  const [endLoc, setEndLoc] = useState('');
  const [routNo, setRoutNo] = useState('');
  const [depTime, setDepTime] = useState('');
  const [arrTime, setArrTime] = useState('');
  const [duration, setDuration] = useState('');
  const [comportability, setComportability] = useState('Luxury');
  const [ticketPrice, setTicketPrice] = useState('');
  const [userId, setUserId] = useState(''); // Added userId
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({
    busId: '',
    driId: '',
    startLoc: '',
    endLoc: '',
    routNo: '',
    depTime: '',
    arrTime: '',
    duration: '',
    ticketPrice: ''
  });

  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const scheduleId = searchParams.get('scheduleId');
  // const scheduleId = '9'; // Hardcoded scheduleId for testing purposes
  useEffect(() => {
    if (scheduleId) {
      fetchScheduleData(scheduleId);
    }
  }, [scheduleId]);

  const fetchScheduleData = async (scheduleId: string) => {
    try {
      const response = await axios.get(`https://localhost:7001/api/ScheduledBus/${scheduleId}`);
      const data = response.data;
      setBusId(data.registeredBusBusId);
      setBusNo(data.busNo); // Added BusNo
      setDriId(data.driverId);
      setStartLoc(data.startLocation);
      setEndLoc(data.endLocation);
      setRoutNo(data.routNo);
      setDepTime(data.departureTime);
      setArrTime(data.arrivalTime);
      setDuration(data.duration);
      setComportability(data.comfortability);
      setTicketPrice(data.ticketPrice);
      setUserId(data.userId); // Added userId
      console.log('Schedule Data ok');
    } catch (error) {
      console.error('Error fetching schedule data:', error);
    }
  };

  const validateInput = () => {
    const newErrors: any = {};
    if (!busId) newErrors.busId = 'Bus ID is required';
    if (!driId) newErrors.driId = 'Driver ID is required';
    if (!startLoc) newErrors.startLoc = 'Start Location is required';
    if (!endLoc) newErrors.endLoc = 'End Location is required';
    if (!routNo) newErrors.routNo = 'Route No is required';
    if (!depTime) newErrors.depTime = 'Departure Time is required';
    if (!arrTime) newErrors.arrTime = 'Arrival Time is required';
    if (!duration) newErrors.duration = 'Duration is required';
    if (!ticketPrice) newErrors.ticketPrice = 'Ticket Price is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const formatTime = (time: any) => {
    const [hours, minutes] = time.split(':');
    const date = new Date();
    date.setHours(parseInt(hours), parseInt(minutes));
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
  };

  const handleUpdateClick = async () => {
    if (validateInput()) {
      setIsSubmitting(true);

      const updatedBusSchedule = {
        scheduleId: scheduleId,
        registeredBusBusId: busId,
        busNo: busNo, // Added BusNo
        driverId: driId,
        routNo: routNo,
        startLocation: startLoc,
        endLocation: endLoc,
        departureTime: depTime ? formatTime(depTime) : depTime, // Conditionally format depTime
        arrivalTime: arrTime ? formatTime(arrTime) : arrTime, // Conditionally format arrTime
        comfortability: comportability,
        duration: duration,
        ticketPrice: ticketPrice,
        userId: userId // Added userId
      };

      try {
        await axios.put(`https://localhost:7001/api/ScheduledBus/${scheduleId}`, updatedBusSchedule);
        swal.fire({
          icon: 'success',
          title: 'Updated',
          text: 'The bus schedule has been updated successfully'
        }).then(() => {
          navigate('/ScheduledBusPage?scheduleId=' + scheduleId);
        });
      } catch (error) {
        swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'An error occurred while updating the schedule. Please try again.'
        });
      }
      setIsSubmitting(false);
    }
  };

  const CancelButton = () => {
    swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Go Back!"
    }).then((result) => {
      if (result.isConfirmed) {
        navigate('/ScheduledBusPage?scheduleId=' + scheduleId);
      }
    });
  };

  return (
    <>
    <PrimaryNavBar />
    <form>
      <div className='row'>
        <div className='col-12 p-3'>
          <div className='d-flex justify-content-center p-3'>
            <h3 className='h3Style text-center'>Update Bus Schedule</h3>
          </div>
          <div className='BusSheUpForm rounded-4'>
            <div className="form-group row">
              <label htmlFor="inputBusId" className="col-form-label">Bus ID</label>
              <div className="">
                <input
                  type="text"
                  className="form-control"
                  id="inputBusId"
                  name="busId"
                  placeholder="Enter Bus ID"
                  value={busId}
                  onChange={(e) => setBusId(e.target.value)}
                />
                {errors.busId && <div className='text-danger'>{errors.busId}</div>}
              </div>
            </div>

            <div className="form-group row">
              <label htmlFor="inputDriId" className="col-form-label">Driver ID</label>
              <div className="">
                <input
                  type="text"
                  className="form-control"
                  id="inputDriId"
                  name="DriId"
                  placeholder="Enter Driver ID"
                  value={driId}
                  onChange={(e) => setDriId(e.target.value)}
                />
                {errors.driId && <div className='text-danger'>{errors.driId}</div>}
              </div>
            </div>

            <div className="form-group row">
              <div className='col-sm-6'>
                <label htmlFor="inputStartLoc" className="col-form-label">Start Location</label>
                <div className="">
                  <input
                    type="text"
                    className="form-control"
                    id="inputStartLoc"
                    name="StartLoc"
                    placeholder="Enter Start Location"
                    value={startLoc}
                    onChange={(e) => setStartLoc(e.target.value)}
                  />
                  {errors.startLoc && <div className='text-danger'>{errors.startLoc}</div>}
                </div>
              </div>
              <div className='col-sm-6'>
                <label htmlFor="inputEndLoc" className="col-form-label">End Location</label>
                <div className="">
                  <input
                    type="text"
                    className="form-control"
                    id="inputEndLoc"
                    name="EndLoc"
                    placeholder="Enter End Location"
                    value={endLoc}
                    onChange={(e) => setEndLoc(e.target.value)}
                  />
                  {errors.endLoc && <div className='text-danger'>{errors.endLoc}</div>}
                </div>
              </div>
            </div>

            <div className="form-group row">
              <label htmlFor="inputRoutNo" className="col-form-label">Route No</label>
              <div className="">
                <input
                  type="text"
                  className="form-control"
                  id="inputRoutNo"
                  name="RoutNo"
                  placeholder="Enter Route No"
                  value={routNo}
                  onChange={(e) => setRoutNo(e.target.value)}
                  disabled // Disabled the input field
                />
                {errors.routNo && <div className='text-danger'>{errors.routNo}</div>}
              </div>
            </div>

            <div className="form-group row">
              <div className='col-sm-6'>
                <label htmlFor="inputDepTime" className="col-form-label">Departure Time</label>
                <div className="">
                  <input
                    type="time"
                    className="form-control"
                    id="inputDepTime"
                    name="DepTime"
                    placeholder="Enter Departure Time"
                    value={depTime}
                    onChange={(e) => setDepTime(e.target.value)}
                  />
                  {errors.depTime && <div className='text-danger'>{errors.depTime}</div>}
                </div>
              </div>
              <div className='col-sm-6'>
                <label htmlFor="inputArrTime" className="col-form-label">Arrival Time</label>
                <div className="">
                  <input
                    type="time"
                    className="form-control"
                    id="inputArrTime"
                    name="ArrTime"
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
                  name="Duration"
                  placeholder="Enter Duration"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                />
                {errors.duration && <div className='text-danger'>{errors.duration}</div>}
              </div>
            </div>

            <div className="form-group row">
              <label htmlFor="inputComportability" className="col-form-label">Comfortability</label>
              <div className="col-sm-6">
                <select
                  className="form-control custom-select"
                  id="inputComportability"
                  name="Comportability"
                  value={comportability}
                  onChange={(e) => setComportability(e.target.value)}
                >
                  <option value="Luxury">Luxury</option>
                  <option value="Semi-Lux">Semi Luxury</option>
                  <option value="Normal">Normal</option>
                </select>
              </div>
            </div>

            <div className="form-group row">
              <label htmlFor="inputTicketPrice" className="col-form-label">Ticket Price</label>
              <div className="">
                <input
                  type="text"
                  className="form-control"
                  id="inputTicketPrice"
                  name="TicketPrice"
                  placeholder="Enter Ticket Price"
                  value={ticketPrice}
                  onChange={(e) => setTicketPrice(e.target.value)}
                />
                {errors.ticketPrice && <div className='text-danger'>{errors.ticketPrice}</div>}
              </div>
            </div>

            <div className="d-flex justify-content-center">
              <button
                type="button"
                className="btn white mr-2"
                onClick={CancelButton}
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn primary"
                onClick={handleUpdateClick}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Updating...' : 'Update'}
              </button>
            </div>
          </div>
          
        </div>
      </div>
    </form>
    <Footer/>
    </>
  );
  
}

export default BusScheduleFormUpdatePage;
