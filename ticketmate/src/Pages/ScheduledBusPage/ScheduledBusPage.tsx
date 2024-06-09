import React, { useEffect, useState } from 'react';
import './ScheduledBusPage.css';
import PrimaryNavBar from '../../Components/NavBar/PrimaryNavBar';
import Footer from '../../Components/Footer/footer';
import MainImg from '../../assets/busImgBack copy.jpg';
import SchePageIcon from '../../assets/SchePageIcon.png';
import axios from 'axios';
import { Link, useLocation } from 'react-router-dom';
import BackIcon from '../../assets/ion_arrow-back-circle.png';

interface BusStation {
  busStation: string;
  standArrivalTime: string;
}

interface ScheduleDate {
  departureDate: string;
  arrivalDate: string;
}

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
  const [busStations, setBusStations] = useState<BusStation[]>([]);
  const [scheduleDates, setScheduleDates] = useState<ScheduleDate[]>([]);
  const [loading, setLoading] = useState(true);

  // Extracting scheduleId from query parameters
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const scheduleId = searchParams.get('scheduleId');

  // Fetching data on component mount or when scheduleId changes
  useEffect(() => {
    if (scheduleId) {
      getData(scheduleId);
      getBusStations(scheduleId);
      getScheduleDates(scheduleId);
    }
  }, [scheduleId]);

  // Function to fetch bus data from API
  const getData = async (scheduleId:string) => {
    try {
      const response = await axios.get(`https://localhost:7001/api/ScheduledBus/${scheduleId}`);
      setData(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching schedule data:', error);
      setLoading(false);
    }
  }

  // Function to fetch bus station data from API
  const getBusStations = async (scheduleId:string) => {
    try {
      const response = await axios.get(`https://localhost:7001/api/SchBusStand/schedule/${scheduleId}`);
      setBusStations(response.data);
    } catch (error) {
      console.error('Error fetching bus station data:', error);
    }
  }

  // Function to fetch schedule dates from API
  const getScheduleDates = async (scheduleId:string) => {
    try {
      const response = await axios.get(`https://localhost:7001/api/ScheduledBusDate/ByScheduleId/${scheduleId}`);
      setScheduleDates(response.data);
    } catch (error) {
      console.error('Error fetching schedule dates:', error);
    }
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
                  <p className='para'>Bus Stations :</p>
                  <ul className='ulfont'>
                    {busStations.length > 0 ? (
                      busStations.map((station, index) => (
                        <li key={index}>
                          {station.busStation} - {station.standArrivalTime}
                        </li>
                      ))
                    ) : (
                      <p className='para'>No bus stations available.</p>
                    )}
                  </ul>
                </div>
                <div className='row'>
                  <p className='para'>Dates : (Departure date, Arrival date)</p>
                  <ul  className='ulfont'>
                    {scheduleDates.length > 0 ? (
                      scheduleDates.map((date, index) => (
                        <li key={index}>
                          {date.departureDate} :  {date.arrivalDate}
                        </li>
                      ))
                    ) : (
                      <p className='para'>No schedule dates available.</p>
                    )}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}

export default ScheduledBusPage;
