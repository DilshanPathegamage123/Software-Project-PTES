import React, { useEffect, useState } from 'react';
import './ScheduledTrainPage.css';
import PrimaryNavBar from '../../Components/NavBar/PrimaryNavBar';
import Footer from '../../Components/Footer/footer';
import MainImg from '../../assets/trainImgBack.jpg';
import SchePageIcon from '../../assets/SchePageIcon.png';
import axios from 'axios';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import BackIcon from '../../assets/ion_arrow-back-circle.png';
import Swal from 'sweetalert2';

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
    const navigate = useNavigate();


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
                                        <button className='btn secondary'>Edit</button>
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
                                        <button className='btn secondary'>Edit</button>
                                    </ul>
                                </div>
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
