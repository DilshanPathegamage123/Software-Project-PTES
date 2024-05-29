import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './RegisteredBusInfoSec.css';
import BusIcon from '../../assets/BusIcon.png';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';

// Define an interface for the bus data
interface BusData {
    busId: number;
    busNo: string;
    busName: string;
    licenNo: string;
    setsCount: number;
    aCorNonAC: boolean;
    licenseImgURL: string;
    insuranceImgURL: string;
    userId: string;
    deleteState: boolean;
}

function RegisteredBusInfoSec({ id }: { id: string }) { // Pass id as props

    const [data, setData] = useState<BusData[]>([]);

    useEffect(() => {
        getData();
    }, []);

    const getData = () => {
        axios.get(`https://localhost:7001/api/BusReg/byUser/${id}`)
            .then((result) => {
                // Filter out buses where deleteState is false
                const filteredData = result.data.filter((item: BusData) => item.deleteState);
                setData(filteredData);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    const handleDelete = (busId: number) => {
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
                axios.get(`https://localhost:7001/api/BusReg/${busId}`)
                    .then((res) => {
                        const busData = res.data;
                        // Update deleteState to false
                        busData.deleteState = false;
                        // Send the updated data back to the server
                        axios.put(`https://localhost:7001/api/BusReg/${busId}`, busData)
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
                            <div key={item.busId}>
                                <div className='row p-5 rounded-4 sec shadow m-3'>
                                    <div className='col-lg-2'>
                                        <img src={BusIcon} alt="BusIcon" />
                                    </div>
                                    <div className='col-lg-6'>
                                        <p>
                                            <b>Bus No: </b>  {item.busNo}<br />
                                            <b>Licen No: </b>  {item.licenNo}<br />
                                            <b>No of Seats: </b>  {item.setsCount}<br />
                                            <b>AC or NON A/C: </b>  {item.aCorNonAC ? "AC" : "Non AC"}
                                        </p>
                                    </div>
                                    <div className='col-lg-4'>
                                        <Link to={`/RegisteredBusPage?busId=${item.busId}`}><button type="button" className="btn primary mx-1 "> See More </button></Link>
                                        <button className='btn primary mx-1 ' onClick={() => handleDelete(item.busId)}>Delete</button>
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
