import React, { useEffect, useState } from 'react';
import './ScheduledBusPage.css';
import PrimaryNavBar from '../../Components/NavBar/PrimaryNavBar';
import Footer from '../../Components/Footer/footer';
import MainImg from '../../assets/busImgBack copy.jpg';
import SchePageIcon from '../../assets/SchePageIcon.png';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import BackIcon from '../../assets/ion_arrow-back-circle.png';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

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

  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const scheduleId = searchParams.get('scheduleId');

  useEffect(() => {
    if (scheduleId) {
      getData(scheduleId);
      getBusStations(scheduleId);
      getScheduleDates(scheduleId);
    }
  }, [scheduleId]);

  const getData = async (scheduleId: string) => {
    try {
      const response = await axios.get(`https://localhost:7001/api/ScheduledBus/${scheduleId}`);
      setData(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching schedule data:', error);
      setLoading(false);
    }
  }

  const getBusStations = async (scheduleId: string) => {
    try {
      const response = await axios.get(`https://localhost:7001/api/SchBusStand/schedule/${scheduleId}`);
      setBusStations(response.data);
    } catch (error) {
      console.error('Error fetching bus station data:', error);
    }
  }

  const getScheduleDates = async (scheduleId: string) => {
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

  const handleUpdateClick = () => {
    navigate(`/BusScheduleFormUpdatePage?scheduleId=${data.scheduleId}`);
  };

  const handleUpdateClick2 = async () => {
    try {
      const response = await fetch(`https://localhost:7001/api/BusRoute/by-routno/${data.routNo}`);
      if (response.ok) {
        const data2 = await response.json();
        navigate(`/BusScheduleFormUpdatePage2?routId=${data2.routId}&scheduleId=${scheduleId}`);
      } else {
        console.error('Route number is unavailable.');
        Swal.fire({
          title: "Error!",
          text: "Error updating bus stations. Please try again.",
          icon: "error"
        });
      }
    } catch (error) {
      console.error('Error fetching route number:', error);
    }
  };

  const handleUpdateClick3 = () => {
    navigate(`/BusScheduleFormUpdatePage3?scheduleId=${data.scheduleId}`);
  };

  return (
    <>
      <PrimaryNavBar />
      <div className='container p-4'>
        {data && (
          <div className='SchBusInfoSec rounded-5 '>
            <div className='pt-2 pl-2'>
              <Link to="..\BusOwnerPage"><img src={BackIcon} alt="" /></Link>
            </div>
            <div className='row'>
              <h3 className='title1 pb-3'>Bus Schedule Details</h3>
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
                <button className='btn white m-3' onClick={handleUpdateClick}>Update</button>
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
                    <button className='btn white m-3' onClick={handleUpdateClick2}>Update</button>
                  </ul>
                </div>
                <div className='row'>
                  <p className='para'>Dates : (Departure date, Arrival date)</p>
                  <ul className='ulfont'>
                    {scheduleDates.length > 0 ? (
                      scheduleDates.map((date, index) => (
                        <li key={index}>
                          {date.departureDate} :  {date.arrivalDate}
                        </li>
                      ))
                    ) : (
                      <p className='para'>No schedule dates available.</p>
                    )}
                    <button className='btn white m-3' onClick={handleUpdateClick3}>Update</button>
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
