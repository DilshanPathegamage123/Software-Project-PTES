import React, { useState } from 'react';

function BusScheduleForm({ handleNext }: { handleNext: any }) {
  const [busId, setBusId] = useState('');
  const [driId, setDriId] = useState('');
  const [startLoc, setStartLoc] = useState('');
  const [endLoc, setEndLoc] = useState('');
  const [routNo, setRoutNo] = useState('');
  const [depTime, setDepTime] = useState('');
  const [arrTime, setArrTime] = useState('');
  const [duration, setDuration] = useState('');
  const [comportability, setComportability] = useState('Luxury');
  const [ticketPrice, setTicketPrice] = useState('');

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

  const handleNextClick = () => {
    if (validateInput()) {
      handleNext({ busId, driId, startLoc, endLoc, routNo, depTime, arrTime, duration, comportability, ticketPrice });
    }
  };

  return (
    <form>
      <div className='row'>
        <div className='col-12 p-3'>
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
              />
              {errors.routNo && <div className='text-danger'>{errors.routNo}</div>}
            </div>
          </div>

          <div className="form-group row">
            <div className='col-sm-6'>
              <label htmlFor="inputDepTime" className="col-form-label">Departure Time</label>
              <div className="">
                <input 
                  type="text" 
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
                  type="text" 
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
            <label htmlFor="inputComportability" className="col-form-label">Comportability</label>
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

        </div>
      </div>
      <div className='row'>
        <div className='col-12 text-center p-3'>
          <button type='button' className='btn white mx-3'>Cancel</button>
          <button type='button' className='btn primary mx-3' onClick={handleNextClick}>Next</button>
        </div>
      </div>
    </form>
  );
}

export default BusScheduleForm;
