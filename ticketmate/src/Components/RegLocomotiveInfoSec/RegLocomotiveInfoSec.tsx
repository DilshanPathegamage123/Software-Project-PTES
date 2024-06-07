import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './RegLocomotiveInfoSec.css';
import BusIcon from '../../assets/LocomotiveIcon.png';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';

// Define an interface for the bus data
interface TrainData {
    locomotiveId: number;
    locomotiveNumber: string;
    locomotiveType: string;
    locomotiveModel: string;
    locomotiveCapacity: string;
    locomotiveSpeed: string;
    userId: string;
    deleteState: boolean;
}

function RegLocomotiveInfoSec({ id }: { id: string }) { // Pass id as props

    const [data, setData] = useState<TrainData[]>([]);

    useEffect(() => {
        getData();
    }, []);

    const getData = () => {
        axios.get(`https://localhost:7001/api/RegLocomotive/user/${id}`)
            .then((result) => {
                // Filter out buses where deleteState is false
                const filteredData = result.data.filter((item: TrainData) => item.deleteState);
                setData(filteredData);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    const handleDelete = (locomotiveId: number) => {
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
                // Fetch the current data for the bus
                axios.get(`https://localhost:7001/api/RegLocomotive/${locomotiveId}`)
                    .then((res) => {
                        const busData = res.data;
                        // Update deleteState to false
                        busData.deleteState = false;
                        // Send the updated data back to the server
                        axios.put(`https://localhost:7001/api/RegLocomotive/${locomotiveId}`, busData)
                            .then(() => {
                                Swal.fire({
                                    title: "Deleted!",
                                    text: "The bus has been marked as deleted.",
                                    icon: "success"
                                });
                                getData(); // Refresh data after updating deleteState
                            })
                            .catch((error) => {
                                console.log(error);
                                Swal.fire({
                                    title: "Error!",
                                    text: "Failed to mark as deleted.",
                                    icon: "error"
                                });
                            });
                    })
                    .catch((error) => {
                        console.log(error);
                        Swal.fire({
                            title: "Error!",
                            text: "Failed to fetch bus data.",
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
                    data.map((item) => {
                        return (
                            <div key={item.locomotiveId}>
                                <div className='row p-4 rounded-4 sec shadow m-3'>
                                    <div className='col-lg-3 d-flex justify-content-end align-items-center'>
                                        <img src={BusIcon} alt="BusIcon" />
                                    </div>
                                    <div className='col-lg-5 d-flex justify-content-center align-items-center'>
                                        <p style={{ margin: 0 }}>
                                            <b>Locomotive No : </b>  {item.locomotiveNumber}<br />
                                            <b>Locomotive Type : </b>  {item.locomotiveType}<br />
                                            <b>Locomotive Model : </b>  {item.locomotiveModel}<br />
                                            {/* <b>Locomotive Capacity : </b>  {item.locomotiveCapacity}<br />
                                            <b>Locomotive Speed : </b>  {item.locomotiveSpeed}<br /> */}
                                        </p>
                                    </div>
                                    <div className='col-lg-4 d-flex justify-content-center align-items-center'>
                                        <Link to={`/RegisteredLocomitivePage?locomotiveId=${item.locomotiveId}`}><button type="button" className="btn primary mx-1 "> See More </button></Link>
                                        <button className='btn primary mx-1 ' onClick={() => handleDelete(item.locomotiveId)}>Delete</button>
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

export default RegLocomotiveInfoSec;
