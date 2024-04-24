import React, { useEffect, useState } from 'react'
import './ScheduledBusPage.css'
import PrimaryNavBar from '../../Components/NavBar/PrimaryNavBar'
import Footer from '../../Components/Footer/Footer'
import MainImg from '../../assets/ScheduledBusPageimg.png'
import SchePageIcon from '../../assets/SchePageIcon.png'
import axios from 'axios'

function ScheduledBusPage() {

    const [data, setData] = useState([]);

    useEffect(() => {
        getData();
    }, []);

    const getData = () => {
        axios.get('https://localhost:7001/api/ScheduledBus')
        .then((result) => {
            setData(result.data);
        })
        .catch((error) => {
            console.log(error);
        });
    }

    
    return (
        <>
            <PrimaryNavBar/>
            <div className='container p-4'>
                    <div className='SchBusInfoSec rounded-5 '>
                        <div className='row'>
                            <h3 className='title1 p-4'>Bus Schedule Details</h3>
                        </div>
                        <div className='row'>
                            <div className='col d-flex justify-content-center'>
                                <img src={MainImg} alt="MainImg" width={518}/>
                            </div>
                        </div>
                        <div className='row p-3'>
                            <div className='col d-flex justify-content-center'>
                                <div className='d-flex align-items-center'>
                                    <p className='para px-4'>Colombo (startLocation)</p>
                                    <img src={SchePageIcon} alt="SchePageIcon" className='px-4'/>
                                    <p className='para px-4'>Minuwangoda (endLocation)</p>
                                </div>
                            </div>
                        </div>
                        <div className='row pt-3 pb-3 '>
                            <div className='col-6 detailSec'>
                                <p className='para'>ScheduleId : (scheduleId)</p>
                                <p className='para'>BusId : (registeredBusBusId)</p>
                                <p className='para'>BusNo : (busNo)</p>
                                <p className='para'>DriverId : (driverId)</p>
                                <p className='para'>RoutNo : (routNo)</p>
                                <p className='para'>DepartureTime : (departureTime)</p>
                                <p className='para'>ArrivalTime : (arrivalTime)</p>
                                <p className='para'>Comfortability : (comfortability)</p>
                                <p className='para'>Duration : (duration)</p>
                                <p className='para'>TicketPrice : (ticketPrice)</p>
                            </div>
                            <div className='col-6'>
                                <div className='row'>
                                    <p className='para'>BusStations :</p>
                                </div>
                                <div className='row'>
                                    <p className='para'>Dates :</p>
                                </div>
                                
                            </div>

                        </div>
                        
                    </div>
            </div>
            <Footer/>
        </>
    )
}

export default ScheduledBusPage
