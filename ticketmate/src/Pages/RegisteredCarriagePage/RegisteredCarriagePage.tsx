import React, { useEffect, useState } from 'react'
import './RegisteredCarriagePage.css'
import Footer from '../../Components/Footer/footer'
import PrimaryNavBar from '../../Components/NavBar/PrimaryNavBar'
import BusImg from '../../assets/RegBusImg.png'
import Wheel from '../../assets/steering-wheel (1).png'
import BackIcon from '../../assets/ion_arrow-back-circle.png'
import '../../vars.css'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios'
import Swal from 'sweetalert2'


function RegisteredCarriagePage() {

    // Using react-router-dom's useLocation hook to get query parameters
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const carriageId = queryParams.get('carriageId');
    const navigate = useNavigate();

    console.log(carriageId);

    const [data, setData] = useState({
        carriageId: '',
        carriageNo: '',
        carriageClass: '',
        seatsCount: '',
        length: '',
        width: '',
        height: '',
        weight: '',
        userId: '',
      });

    const [buttonStates, setButtonStates] = useState({});
    

    // Fetching data and button states on component mount
    useEffect(() => {
        const busId = getBusIdFromQueryParams();
        getData(busId);
        getButtonStates(busId);
    }, []);
    
    // Function to extract busId from query parameters
    const getBusIdFromQueryParams = () => {
        const queryParams = new URLSearchParams(window.location.search);
        return queryParams.get('carriageId');
    };

    // Function to fetch bus data from API
    const getData = (carriageId: any) => {
        axios.get(`https://localhost:7001/api/RegCarriage/${carriageId}`)
        .then((result) => {
            setData(result.data);
        })
        .catch((error) => {
            console.log(error);
        });
    }


    // Function to fetch button states from API
    const getButtonStates = (carriageId: any) => {
            axios
                .get(`https://localhost:7001/api/SelCarriageSeatStru/ByCarriageId/${carriageId}`)
                .then((result) => {
                    const fetchedButtonStates: { [key: string]: boolean } = {}; // Provide type annotation for fetchedButtonStates
                    result.data.forEach((seat: any) => {
                        fetchedButtonStates[seat.seatId] = seat.avalability;
                    });
                    setButtonStates(fetchedButtonStates);
                    console.log("Button states fetched successfully");
                })
                .catch((error) => {
                    console.log(error);
                });
        };
    
        // Function to render seat structure
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
        // can add logic to handle button clicks here if needed
    };

    // Function to handle delete action
    const handleDelete = () => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#00757C",
            confirmButtonText: "Yes, delete it!"
          }).then((result) => {
            if (result.isConfirmed) {
              Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success"
              });
            }
          });
    }
    const handleEdit = () => {
        navigate(`/UpdateCarriageRegInfoPage?carriageId=${data.carriageId}`)
    }

  return (
    <>
        <PrimaryNavBar/>
        <div className='containerCarrPage'>
            <div className='container'>
                <div className='row'>
                    <div className='col-lg-6'>
                        <div className='m-4 InfoSec rounded-4'>
                            <div className='row d-flex justify-content-left pl-5 pt-4'>
                                <Link to='/TrainOwnerPage'><img src={BackIcon} alt="BackIcon" className='BackIcon'/></Link>
                            </div>
                            <div className='row d-flex justify-content-center'>
                                <img src={BusImg} alt="BusImg" className='p-3 col-6 custom-width'/>
                            </div>
                            <div className='row d-flex justify-content-center mt-2'>
                                {/* Displaying bus information */}
                                <p className='p2'>Carriage Id:  {data.carriageId} </p>
                                <p className='p2'>Carriage No:  {data.carriageNo} </p>
                                <p className='p2'>Carriage Class:  {data.carriageClass} </p>
                                <p className='p2'>Seat Count:  {data.seatsCount} </p>
                                <p className='p2'>Carriage Length:  {data.length} </p>
                                <p className='p2'>Carriage Width:  {data.width} </p>
                                <p className='p2'>Carriage Height:  {data.height} </p>
                                <p className='p2'>Carriage Weight:  {data.weight} </p>
                            </div>
                            <div className='row p-4 justify-content-center text-center'>
                                <div className='col-6'>
                                    <button className='btn yellow m-2'onClick={()=>handleDelete()}>Delete</button>
                                    <button className='btn white m-2' onClick={()=>handleEdit()}>Edit</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='col-lg-6'>
                        <div className='container m-4'>
                            <div className='bg-light2 rounded-4 p-5'>
                                <div className='row justify-content-center pb-3'>
                                <img src={Wheel} alt='Steering-wheel-img' style={{ width: '57px' }} />
                                </div>
                                {renderSeatStructure()} {/* Render seat structure */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <Footer/>
    </>
  )
}

export default RegisteredCarriagePage
