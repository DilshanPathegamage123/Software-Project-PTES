import React, { useEffect, useState } from 'react';
import './ScheduledTrainPage.css';
import PrimaryNavBar from '../../Components/NavBar/PrimaryNavBar';
import Footer from '../../Components/Footer/footer';
import MainImg from '../../assets/trainImgBack.jpg';
import SchePageIcon from '../../assets/SchePageIcon.png';
import axios from 'axios';
import { Link, useLocation } from 'react-router-dom';
import BackIcon from '../../assets/ion_arrow-back-circle.png';

// Interfaces
interface TrainData {
    schedulId: string;
    trainDriverId: string;
    trainRoutNo: string;
    trainName: string;
    startStation: string;
    endStation: string;
    trainDepartureTime: string;
    trainArrivalTime: string;
    duration: string;
    trainType: string;
    firstClassTicketPrice: string;
    secondClassTicketPrice: string;
    userId: string;
}

interface StationData {
    trainStationName: string;
    trainarrivalTime: string;
    trainDepartureTime: string;
}

interface ScheduleDate {
    arrivalDate: string;
    departureDate: string;
}

interface LocomotiveData {
    registeredLocomotiveLocomotiveId: string;
}

interface CarriageData {
    registeredCarriageCarriageId: string;
}

function ScheduledTrainPage() {
    const [data, setData] = useState<TrainData>({
        schedulId: '',
        trainDriverId: '',
        trainRoutNo: '',
        trainName: '',
        startStation: '',
        endStation: '',
        trainDepartureTime: '',
        trainArrivalTime: '',
        duration: '',
        trainType: '',
        firstClassTicketPrice: '',
        secondClassTicketPrice: '',
        userId: '',
    });

    const [stations, setStations] = useState<StationData[]>([]);
    const [scheduledDates, setScheduledDates] = useState<ScheduleDate[]>([]);
    const [locomotives, setLocomotives] = useState<LocomotiveData[]>([]);
    const [carriages, setCarriages] = useState<CarriageData[]>([]);
    const [loading, setLoading] = useState(true);

    // Extracting scheduleId from query parameters
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const schedulId = searchParams.get('schedulId');

    // Fetching data on component mount or when scheduleId changes
    useEffect(() => {
        if (schedulId) {
            getData(schedulId);
            getStationData(schedulId);
            getScheduledDates(schedulId);
            getLocomotiveData(schedulId);
            getCarriageData(schedulId);
        }
    }, [schedulId]);

    // Function to fetch train schedule data from API
    const getData = (schedulId: string) => {
        axios.get(`https://localhost:7001/api/ScheduledTrain/${schedulId}`)
            .then((response) => {
                setData(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
            });
    }

    // Function to fetch train station data from API
    const getStationData = (schedulId: string) => {
        axios.get(`https://localhost:7001/api/SelectedTrainStation/scheduledTrain/${schedulId}`)
            .then((response) => {
                setStations(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    // Function to fetch scheduled dates data from API
    const getScheduledDates = (schedulId: string) => {
        axios.get(`https://localhost:7001/api/ScheduledTrainDate/ByScheduledTrainSchedulId/${schedulId}`)
            .then((response) => {
                setScheduledDates(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    // Function to fetch locomotive data from API
    const getLocomotiveData = (schedulId: string) => {
        axios.get(`https://localhost:7001/api/ScheduledLocomotive/by-train-schedule/${schedulId}`)
            .then((response) => {
                setLocomotives(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    // Function to fetch carriage data from API
    const getCarriageData = (schedulId: string) => {
        axios.get(`https://localhost:7001/api/ScheduledCarriage/ByTrainSchedule/${schedulId}`)
            .then((response) => {
                setCarriages(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <PrimaryNavBar />
            <div className='pageBack'>
                <div className='container p-4'>
                    {data && (
                        <div className='SchBusInfoSec rounded-5 '>
                            {/* <div className='row pl-3 pt-3'>
                                <Link to='/'><img src={BackIcon} alt="BackIcon" className='BackIcon'/></Link>
                            </div> */}
                            <div className='row'>
                                <h3 className='title1 p-4'>Train Schedule Details</h3>
                            </div>
                            <div className='row'>
                                <div className='col d-flex justify-content-center'>
                                    <img src={MainImg} alt="MainImg" className='MainImage' />
                                </div>
                            </div>
                            <div className='row p-3'>
                                <div className='col d-flex justify-content-center'>
                                    <div className='d-sm-flex align-items-sm-center'>
                                        <p className='para px-4'>{data.startStation}</p>
                                        <img src={SchePageIcon} alt="SchePageIcon" className='px-4' />
                                        <p className='para px-4'>{data.endStation}</p>
                                    </div>
                                </div>
                            </div>
                            <div className='row pt-3 pb-3 '>
                                <div className='col-lg-6 detailSec'>
                                    <p className='para'>ScheduleId  : {data.schedulId}</p>
                                    <p className='para'>Train DriverId  : {data.trainDriverId}</p>
                                    <p className='para'>Train RoutNo  : {data.trainRoutNo}</p>
                                    <p className='para'>Train Name  : {data.trainName}</p>
                                    <p className='para'>Train DepartureTime  : {data.trainDepartureTime}</p>
                                    <p className='para'>Train ArrivalTime  : {data.trainArrivalTime}</p>
                                    <p className='para'>Duration  : {data.duration}</p>
                                    <p className='para'>Train Type  : {data.trainType}</p>
                                    <p className='para'>First Class Ticket Price  : {data.firstClassTicketPrice}</p>
                                    <p className='para'>Second Class Ticket Price  : {data.secondClassTicketPrice}</p>
                                </div>
                                <div className='col-lg-6 detailSec'>
                                    <div className='row'>
                                        <p className='para'>Train Stations :</p>
                                        <ul className='pl-5'>
                                            {stations.map((station, index) => (
                                                <li key={index} className='station-info'>
                                                    <p className='para'>
                                                        {station.trainStationName} - {station.trainarrivalTime} - {station.trainDepartureTime}
                                                    </p>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div className='row'>
                                        <p className='para'>Scheduled Dates :</p>
                                        <ul className='pl-5'>
                                            {scheduledDates.map((date, index) => (
                                                <li key={index} className='date-info'>
                                                    <p className='para'>
                                                        - {date.arrivalDate}   - {date.departureDate}
                                                    </p>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className='row bg-light m-3 pb-3 rounded-4'>
                                <div className='col-sm-6 detailSec'>
                                    <p>Selected Locomotive IDs</p>
                                    <ul>
                                        {locomotives.map((locomotive, index) => (
                                            <li key={index} className='locomotive-info'>
                                                <p className=''>
                                                    {locomotive.registeredLocomotiveLocomotiveId}
                                                </p>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div className='col-sm-6 detailSec'>
                                    <p>Selected Carriages IDs</p>
                                    <ul>
                                        {carriages.map((carriage, index) => (
                                            <li key={index} className='carriage-info'>
                                                <p className=''>
                                                    {carriage.registeredCarriageCarriageId}
                                                </p>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                            <div className='row p-1'>

                            </div>
                        </div>
                    )}
                </div>
            </div>
            <Footer />
        </>
    )
}

export default ScheduledTrainPage;
