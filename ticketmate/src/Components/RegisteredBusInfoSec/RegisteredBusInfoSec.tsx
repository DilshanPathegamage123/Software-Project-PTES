import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import Axios
import './RegisteredBusInfoSec.css';
import BusIcon from '../../assets/BusIcon.png';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';

function RegisteredBusInfoSec() {

    const [data, setData] = useState([]);

    useEffect(() => {
        getData();
    }, []);

    const getData = () => {
        axios.get('https://localhost:7001/api/BusReg')
        .then((result) => {
            setData(result.data);
        })
        .catch((error) => {
            console.log(error);
        });
    }

    const handleDelete = (busId: any) => {
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
              axios.delete(`https://localhost:7001/api/BusReg/${busId}`)
              .then(() => {
                Swal.fire({
                  title: "Deleted!",
                  text: "Your file has been deleted.",
                  icon: "success"
                });
                getData(); // Refresh data after deletion
              })
              .catch((error) => {
                console.log(error);
                Swal.fire({
                  title: "Error!",
                  text: "Failed to delete.",
                  icon: "error"
                });
              });
            }
          });
    }

    return (
        <>
            {
            data && data.length > 0 ?
                data.map((item, index) => {
                    return (
                        <div key={index}>
                            <div className='row p-5 rounded-4 sec shadow m-3'>
                                    <div className='col-lg-2'>
                                            <img src={BusIcon} alt="BusIcon" />
                                    </div>
                                    <div className='col-lg-6'>
                                        
                                        <p key={index}>
                                        <b>Bus No: </b>  {item.busNo}<br />
                                        <b>Licen No: </b>  {item.licenNo}<br />
                                        <b>No of Seats: </b>  {item.setsCount}<br />
                                        <b>AC or NON A/C: </b>  {item.aCorNonAC === 1 ? "AC" : "Non AC"}
                                        </p>
                                        
                                    </div>
                                    <div className='col-lg-4'>
                                    <Link to={`/RegisteredBusPage?busId=${item.busId}`}><button type="button" className="btn primary mx-1 "> See More </button></Link>
                                            <button className='btn primary mx-1 ' onClick={()=>handleDelete(item.busId)}>Delete</button>
                                    </div>
                            </div>
                        </div>
                    )
                })
                :
                'Loading...'     
            }
        </>
    )
}

export default RegisteredBusInfoSec;
