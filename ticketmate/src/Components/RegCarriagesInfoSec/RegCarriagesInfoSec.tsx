import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './RegCarriagesInfoSec.css';
import BusIcon from '../../assets/BusIcon.png';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';

// Define an interface for the bus data
interface TrainCarriageData {
    carriageId: number;
    carriageNo: string;
    carriageClass: number;
    seatsCount: number;
    length: number;
    width: number;
    height: number;
    weight: number;
    deleteState : boolean;
}

function RegCarriagesInfoSec({ id }: { id: string }) { // Pass id as props

    console.log("Component mounted with id:", id);

    const [data, setData] = useState<TrainCarriageData[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        getData();
    }, []);

    const getData = () => {
        axios.get("https://localhost:7001/api/RegCarriage/user/48")
            .then((result) => {
                console.log("Data fetched successfully:", result.data);
                // Filter out carriages where deleteState is false
                const filteredData = result.data.filter((item: TrainCarriageData) => item.deleteState);
                setData(filteredData);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
                setError("Failed to fetch data.");
                setLoading(false);
            });
    }

    const handleDelete = (carriageId: number) => {
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
                axios.get(`https://localhost:7001/api/RegCarriage/${carriageId}`)
                    .then((res) => {
                        const carriageData = res.data;
                        carriageData.deleteState = false;
                        axios.put(`https://localhost:7001/api/RegCarriage/${carriageId}`, carriageData)
                            .then(() => {
                                Swal.fire({
                                    title: "Deleted!",
                                    text: "The carriage has been marked as deleted.",
                                    icon: "success"
                                });
                                getData(); // Refresh data after updating deleteState
                            })
                            .catch((error) => {
                                console.error("Error updating deleteState:", error);
                                Swal.fire({
                                    title: "Error!",
                                    text: "Failed to mark as deleted.",
                                    icon: "error"
                                });
                            });
                    })
                    .catch((error) => {
                        console.error("Error fetching carriage data:", error);
                        Swal.fire({
                            title: "Error!",
                            text: "Failed to fetch carriage data.",
                            icon: "error"
                        });
                    });
            }
        });
    }

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <>
            {
                data.length > 0 ?
                    data.map((item) => (
                        <div key={item.carriageId}>
                            <div className='row p-5 rounded-4 sec shadow m-3'>
                                <div className='col-lg-2'>
                                    <img src={BusIcon} alt="BusIcon" />
                                </div>
                                <div className='col-lg-6'>
                                    <p>
                                        <b>Carriage No : </b>  {item.carriageNo}<br />
                                        <b>Carriage Class : </b>  {item.carriageClass}<br />
                                        <b>Carriage seatsCount : </b>  {item.seatsCount}<br />
                                        <b>Carriage length : </b>  {item.length}<br />
                                        <b>Carriage width : </b>  {item.width}<br />
                                        <b>Carriage height : </b>  {item.height}<br />
                                    </p>
                                </div>
                                <div className='col-lg-4'>
                                    <Link to={`/RegisteredBusPage?busId=${item.carriageId}`}><button type="button" className="btn primary mx-1 "> See More </button></Link>
                                    <button className='btn primary mx-1 ' onClick={() => handleDelete(item.carriageId)}>Delete</button>
                                </div>
                            </div>
                        </div>
                    ))
                    :
                    <div>No carriages available.</div>
            }
        </>
    );
}

export default RegCarriagesInfoSec;
