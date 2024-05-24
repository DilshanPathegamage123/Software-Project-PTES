import React, { useState } from 'react';
import './BusSchedulePage.css';
import PrimaryNavBar from '../../Components/NavBar/PrimaryNavBar';

function BusSchedulePage() {
  const [routNo, setRoutNo] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [routeId, setRouteId] = useState(null);

  const handleNextClick = async () => {
    try {
      const response = await fetch(`https://localhost:7001/api/BusRoute/by-routno/${routNo}`);
      if (response.ok) {
        const data = await response.json();
        console.log('BusRouteRoutId:', data.routId);
        setErrorMessage('');
        setRouteId(data.routId);

        // Fetch stand names using the routId
        const standResponse = await fetch(`https://localhost:7001/api/BusRouteStand/byroute/${data.routId}`);
        if (standResponse.ok) {
          const standData = await standResponse.json();
          console.log('StandNames:', standData); // Log stand names to the console
        } else {
          console.error('Error fetching stand names.');
        }
      } else {
        setErrorMessage('Route number is unavailable.');
        setRouteId(null);
      }
    } catch (error) {
      console.error('Error fetching route number:', error);
      setErrorMessage('Error fetching route number. Please try again.');
      setRouteId(null);
    }
  };

  return (
    <>
      <PrimaryNavBar />
      <div className='container py-4'>
        <div className='rounded-4 formSec'>
          <div className='row'>
            <h3 className='h3Style text-center'>Fill this form to Schedule a bus</h3>
          </div>

          <form>
            <div className='row'>
              <div className='col-12 p-3'>
                <div className="form-group row">
                  <label htmlFor="inputbusNum" className="col-form-label"> Bus Number</label>
                  <div className="">
                    <input type="text" className="form-control" id="inputbusNum" name="busNum" placeholder="Enter Bus Number" />
                  </div>
                </div>

                <div className="form-group row">
                  <label htmlFor="inputDriId" className="col-form-label"> Driver ID</label>
                  <div className="">
                    <input type="text" className="form-control" id="inputDriId" name="DriId" placeholder="Enter Driver ID" />
                  </div>
                </div>

                <div className="form-group row">
                  <div className='col-sm-6'>
                    <label htmlFor="inputStartLoc" className="col-form-label">Start Location</label>
                    <div className="">
                      <input type="text" className="form-control" id="inputStartLoc" name="StartLoc" placeholder="Enter Start Location" />
                    </div>
                  </div>
                  <div className='col-sm-6'>
                    <label htmlFor="inputEndLoc" className="col-form-label">End Location</label>
                    <div className="">
                      <input type="text" className="form-control" id="inputEndLoc" name="EndLoc" placeholder="Enter End Location" />
                    </div>
                  </div>
                </div>

                <div className="form-group row">
                  <label htmlFor="inputRoutNo" className="col-form-label">Rout No</label>
                  <div className="">
                    <input
                      type="text"
                      className="form-control"
                      id="inputRoutNo"
                      name="RoutNo"
                      placeholder="Enter Rout No"
                      value={routNo}
                      onChange={(e) => setRoutNo(e.target.value)}
                    />
                  </div>
                </div>

                <div className="form-group row">
                  <div className='col-sm-6'>
                    <label htmlFor="inputDepTime" className="col-form-label">Departure Time</label>
                    <div className="">
                      <input type="text" className="form-control" id="inputDepTime" name="DepTime" placeholder="Enter Departure Time" />
                    </div>
                  </div>
                  <div className='col-sm-6'>
                    <label htmlFor="inputArrTime" className="col-form-label">Arrival Time</label>
                    <div className="">
                      <input type="text" className="form-control" id="inputArrTime" name="ArrTime" placeholder="Enter Arrival Time" />
                    </div>
                  </div>
                </div>

                <div className="form-group row">
                  <label htmlFor="inputDuration" className="col-form-label"> Duration</label>
                  <div className="">
                    <input type="text" className="form-control" id="inputDuration" name="Duration" placeholder="Enter Duration" />
                  </div>
                </div>

                <div className="form-group row">
                  <label htmlFor="inputComportability" className="col-form-label">Comportability</label>
                  <div className="col-sm-6">
                    <select className="form-control custom-select" id="inputComportability" name="Comportability">
                      <option value="Luxury">Luxury</option>
                      <option value="Semi-Lux">Semi Luxury</option>
                      <option value="Normal">Normal</option>
                    </select>
                  </div>
                </div>

                <div className="form-group row">
                  <label htmlFor="inputTicketprice" className="col-form-label">Ticket price</label>
                  <div className="">
                    <input type="text" className="form-control" id="inputTicketprice" name="Ticketprice" placeholder="Enter Ticket price" />
                  </div>
                </div>

              </div>
            </div>
            <div className='row'>
              {errorMessage && (
                <div className='col-12 text-center p-3'>
                  <span className='text-danger'>{errorMessage}</span>
                </div>
              )}
              <div className='col-12 text-center p-3'>
                <button type='button' className='btn white mx-3'>Cancel</button>
                <button type='button' className='btn primary mx-3' onClick={handleNextClick}>Next</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default BusSchedulePage;
