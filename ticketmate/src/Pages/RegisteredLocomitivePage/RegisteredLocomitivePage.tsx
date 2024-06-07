import React, { useEffect, useState } from 'react'
import './RegisteredLocomitivePage.css'
import Footer from '../../Components/Footer/footer'
import PrimaryNavBar from '../../Components/NavBar/PrimaryNavBar'
import TrainImg from '../../assets/Train Icon.png'
import Wheel from '../../assets/steering-wheel (1).png'
import BackIcon from '../../assets/ion_arrow-back-circle.png'
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios'
import Swal from 'sweetalert2'


function RegisteredLocomitivePage() {

    // Using react-router-dom's useLocation hook to get query parameters
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const locomotiveId = queryParams.get('locomotiveId');

    console.log(locomotiveId);

    const [data, setData] = useState({
        locomotiveId: '',
        locomotiveNumber: '',
        locomotiveType: '',
        locomotiveModel: '',
        locomotiveCapacity: '',
        locomotiveSpeed: '',
        userId: '',
        licenseImgURL: '',
      });

    // Fetching data and button states on component mount
    useEffect(() => {
        const locomotiveId = getBusIdFromQueryParams();
        getData(locomotiveId);
    }, []);
    
    // Function to extract busId from query parameters
    const getBusIdFromQueryParams = () => {
        const queryParams = new URLSearchParams(window.location.search);
        return queryParams.get('locomotiveId');
    };

    // Function to fetch bus data from API
    const getData = (busId: any) => {
        axios.get(`https://localhost:7001/api/RegLocomotive/${locomotiveId}`)
        .then((result) => {
            setData(result.data);
        })
        .catch((error) => {
            console.log(error);
        });
    }


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

  return (
    <>
        <PrimaryNavBar/>
        <div className='containerLocPage'>
            <div className='row'>
                <div className='col-lg-6'>
                    <div className='m-4 InfoSec2 rounded-4'>
                        <div className='row d-flex justify-content-left pl-5 pt-4'>
                            <Link to='/BusOwnerPage'><img src={BackIcon} alt="BackIcon" className='BackIcon'/></Link>
                        </div>
                        <div className='row d-flex justify-content-center'>
                            <img src={TrainImg} alt="BusImg" className='p-3 col-6'/>
                        </div>
                        <div className='row d-flex justify-content-center mt-2'>
                            {/* Displaying bus information */}
                            <p className='p2'>Bus Id :  {data.locomotiveId} </p>
                            <p className='p2'>Bus No :  {data.locomotiveNumber} </p>
                            <p className='p2'>License No :  {data.locomotiveType} </p>
                            <p className='p2'>Seat Count :  {data.locomotiveModel} </p>
                            <p className='p2'>AC or Non AC :  {data.locomotiveCapacity} </p>
                            <p className='p2'>AC or Non AC :  {data.locomotiveSpeed} </p>
                            <p className='p2'>License Img :  <a href={data.licenseImgURL} target="_blank">License Image</a> </p>
                        </div>
                        <div className='row p-4 justify-content-center text-center'>
                            <div className='col-6'>
                                <button className='btn white m-2'>Edit</button>
                                <button className='btn white m-2'onClick={()=>handleDelete()}>Delete</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='col-lg-6'>
                    
                </div>
            </div>
        </div>
        
        
        <Footer/>
    </>
  )
}

export default RegisteredLocomitivePage
