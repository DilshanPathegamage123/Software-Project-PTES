import React, { useEffect, useState } from 'react'
import './ScheduledBusInfo.css'
import BusIcon from '../../assets/fa6-solid_bus.png'
import BusIcon2 from '../../assets/Group 391.png'
import axios from 'axios'
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom'

function ScheduledBusInfo() {

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
            {data.map((busInfo, index) => (
                <div key={index} className='row p-5 rounded-4 sec shadow m-4'>
                    <div className='col-lg-2'>
                        <img src={BusIcon} alt="BusIcon" />
                    </div>
                    <div className='col-lg-2'>
                        <h5>{busInfo.startLocation}</h5>
                        <p>{busInfo.departureTime}</p>
                    </div>
                    <div className='col-lg-2'>
                        <img src={BusIcon2} alt="BusIcon2" />
                    </div>
                    <div className='col-lg-2'>
                        <h5>{busInfo.endLocation}</h5>
                        <p>{busInfo.arrivalTime}</p>
                    </div>
                    <div className='col-lg-4'>
                        <Link to={`/ScheduledBusPage?scheduleId=${busInfo.scheduleId}`}><button className='btn primary mx-1'>See More</button></Link>
                        <button className='btn primary mx-1'onClick={()=>handleDelete()}>Delete</button>
                    </div>
                </div>
            ))}
        </>
    )
}

export default ScheduledBusInfo
