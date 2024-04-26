import React, { useEffect, useState } from 'react';
import './ScheduledBusPage.css';
import PrimaryNavBar from '../../Components/NavBar/PrimaryNavBar';
import Footer from '../../Components/Footer/Footer';
import MainImg from '../../assets/ScheduledBusPageimg.png';
import SchePageIcon from '../../assets/SchePageIcon.png';
import axios from 'axios';
import { Link, useLocation } from 'react-router-dom';
import BackIcon from '../../assets/ion_arrow-back-circle.png';

function ScheduledBusPage() {

    const [data, setData] = useState({
        startLocation: '',
        endLocation: '',
        scheduleId: '',
        registeredBusBusId: '',
        busNo: '',
        driverId: '',
        routNo: '',
        departureTime: '',
        arrivalTime: '',
        comfortability: '',
        duration: '',
        ticketPrice: ''
      });


  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const scheduleId = searchParams.get('scheduleId');

  //const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (scheduleId) {
      getData(scheduleId);
    }
  }, [scheduleId]);

const getData = (scheduleId: string) => {
    axios.get(`https://localhost:7001/api/ScheduledBus/${scheduleId}`)
        .then((response) => {
            setData(response.data);
            setLoading(false);
        })
        .catch((error) => {
            console.log(error);
            setLoading(false);
        });
}

if (loading) {
    return <div>Loading...</div>;
}

  return (
    <>
      <PrimaryNavBar />
      <div className='container p-4'>
        {data && (
          <div className='SchBusInfoSec rounded-5 '>
            <div className='row pl-4 pt-4'>
                <Link to='/'><img src={BackIcon} alt="BackIcon" className='BackIcon'/></Link>
            </div>
            <div className='row'>
              <h3 className='title1 p-4'>Bus Schedule Details</h3>
            </div>
            <div className='row'>
              <div className='col d-flex justify-content-center'>
                <img src={MainImg} alt="MainImg" width={518} className='MainImage px-2'/>
              </div>
            </div>
            <div className='row p-3'>
              <div className='col d-flex justify-content-center'>
                <div className='d-sm-flex align-items-sm-center'>
                  <p className='para px-4'>{data.startLocation}</p>
                  <img src={SchePageIcon} alt="SchePageIcon" className='px-4' />
                  <p className='para px-4'>{data.endLocation}</p>
                </div>
              </div>
            </div>
            <div className='row pt-3 pb-3 '>
              <div className='col-lg-6 detailSec'>
                <p className='para'>ScheduleId  : {data.scheduleId}</p>
                <p className='para'>BusId  : {data.registeredBusBusId}</p>
                <p className='para'>BusNo  : {data.busNo}</p>
                <p className='para'>DriverId  : {data.driverId}</p>
                <p className='para'>RoutNo  : {data.routNo}</p>
                <p className='para'>DepartureTime  : {data.departureTime}</p>
                <p className='para'>ArrivalTime  : {data.arrivalTime}</p>
                <p className='para'>Comfortability  : {data.comfortability}</p>
                <p className='para'>Duration  : {data.duration}</p>
                <p className='para'>TicketPrice  : {data.ticketPrice}</p>
              </div>
              <div className='col-lg-6 detailSec'>
                <div className='row'>
                  <p className='para'>BusStations :</p>
                </div>
                <div className='row'>
                  <p className='para'>Dates :</p>
                </div>

              </div>

            </div>

          </div>
        )}
      </div>
      <Footer />
    </>
  )
}

export default ScheduledBusPage;
