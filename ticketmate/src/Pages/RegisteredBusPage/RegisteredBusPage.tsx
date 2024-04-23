import React, { useEffect, useState } from 'react'
import './RegisteredBusPage.css'
import Footer from '../../Components/Footer/Footer'
import PrimaryNavBar from '../../Components/NavBar/PrimaryNavBar'
import BusImg from '../../assets/RegBusImg.png'
import Wheel from '../../assets/steering-wheel (1).png'
import { useLocation } from 'react-router-dom';
import axios from 'axios'

function RegisteredBusPage() {

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const busId = queryParams.get('busId');

    console.log(busId);

    const [data, setData] = useState([]);
    const [buttonStates, setButtonStates] = useState({});
    

    useEffect(() => {
        const busId = getBusIdFromQueryParams();
        getData(busId);
        getButtonStates(busId);
    }, []);
    
    const getBusIdFromQueryParams = () => {
        const queryParams = new URLSearchParams(window.location.search);
        return queryParams.get('busId');
    };

    const getData = (busId: any) => {
        axios.get(`https://localhost:7001/api/BusReg/${busId}`)
        .then((result) => {
            setData(result.data);
        })
        .catch((error) => {
            console.log(error);
        });
    }


    const getButtonStates = (busId: any) => {
            axios
                .get(`https://localhost:7001/api/SelectedSeatStr/bus/${busId}`)
                .then((result) => {
                    const fetchedButtonStates: { [key: string]: boolean } = {}; // Provide type annotation for fetchedButtonStates
                    result.data.forEach((seat: any) => {
                        fetchedButtonStates[seat.seatId] = seat.seatAvailability;
                    });
                    setButtonStates(fetchedButtonStates);
                })
                .catch((error) => {
                    console.log(error);
                });
        };
    
      const renderSeatStructure = () => {
        const seatStructure = [];
        for (let rowIndex = 0; rowIndex < 11; rowIndex++) {
          const row = (
            <div key={rowIndex} className='row justify-content-center'>
            {[...Array(6)].map((_, colIndex) => {
                const buttonId = String(rowIndex * 10 + colIndex + 1);
                return (
                    <button
                        key={buttonId}
                        type='button'
                        className={`btn btn-primary2 toggleButton ${buttonStates[buttonId as keyof typeof buttonStates] ? 'active' : ''}`}
                        aria-pressed={buttonStates[buttonId as keyof typeof buttonStates] ? 'true' : 'false'}
                        onClick={() => handleClick()} // Remove the argument from handleClick function call
                    >
                        {buttonStates[buttonId as keyof typeof buttonStates] ? '-' : '+'}
                    </button>
                );
            })}
            </div>
          );
          seatStructure.push(row);
        }
        return seatStructure;
      };

    const handleClick = () => {
        // You can add logic to handle button clicks here if needed
    };

  return (
    <>
        <PrimaryNavBar/>
        <div className='container'>
            <div className='row'>
                <div className='col-md-6'>
                    <div className='m-4 InfoSec rounded-4'>
                        <div className='row d-flex justify-content-center'>
                            <img src={BusImg} alt="BusImg" className='p-5 col-6'/>
                        </div>
                        <div className='row d-flex justify-content-center'>
                            <p className='p2'>Bus Id:  {data.busId} </p>
                            <p className='p2'>Bus No:  {data.busNo} </p>
                            <p className='p2'>License No:  {data.licenNo} </p>
                            <p className='p2'>Seat Count:  {data.setsCount} </p>
                            <p className='p2'>AC or Non AC:  {data.aCorNONAC ? 'AC' : 'Non AC'} </p>
                            <p className='p2'>License Img:  <a href={data.licenseImgURL} target="_blank">License Image</a> </p>
                            <p className='p2'>Insurance Img:  <a href={data.insuranceImgURL} target="_blank">Insurance Image</a> </p>
                        </div>
                        <div className='row p-4 justify-content-center text-center'>
                            <div className='col-6'>
                                <button className='btn white mx-3'>Edit</button>
                                <button className='btn white mx-3'>Delete</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='col-md-6'>
                    <div className='container m-4'>
                        <div className='bg-light rounded-4 p-5'>
                            <div className='row justify-content-center pb-3'>
                            <img src={Wheel} alt='Steering-wheel-img' style={{ width: '57px' }} />
                            </div>
                            {renderSeatStructure()}
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        
        <Footer/>
    </>
  )
}

export default RegisteredBusPage
