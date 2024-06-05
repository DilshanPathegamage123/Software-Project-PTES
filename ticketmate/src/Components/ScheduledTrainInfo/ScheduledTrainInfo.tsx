import React, { useEffect, useState } from 'react';
import './ScheduledTrainInfo.css';
import BusIcon from '../../assets/fa6-solid_bus.png';
import BusIcon2 from '../../assets/Group 391.png';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';

interface BusInfo {
    startLocation: string;
    departureTime: string;
    endLocation: string;
    arrivalTime: string;
    scheduleId: string;
    deleteState: boolean;
}

function ScheduledTrainInfo({ id }: { id: string }) {
    const [data, setData] = useState<BusInfo[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        if (id) {
            getData();
        }
    }, [id]);

    const getData = () => {
        setLoading(true);
        axios.get(`https://localhost:7001/api/ScheduledBus/user/${id}`)
            .then((result) => {
                const filteredData = result.data.filter((busInfo: BusInfo) => busInfo.deleteState === true);
                setData(filteredData);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
            });
    }

    const handleDelete = (scheduleId: string) => {
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
                // Fetch the current bus info
                const busInfo = data.find(bus => bus.scheduleId === scheduleId);
                if (busInfo) {
                    const updatedBusInfo = { ...busInfo, deleteState: false };
                    axios.put(`https://localhost:7001/api/ScheduledBus/${scheduleId}`, updatedBusInfo)
                        .then(() => {
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your file has been deleted.",
                                icon: "success"
                            });
                            setData(prevData => prevData.filter(bus => bus.scheduleId !== scheduleId));
                        })
                        .catch(error => {
                            console.error("There was an error updating the delete state!", error);
                        });
                }
            }
        });
    }

    if (loading) {
        return <div>Loading...</div>;
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
                        <button className='btn primary mx-1' onClick={() => handleDelete(busInfo.scheduleId)}>Delete</button>
                    </div>
                </div>
            ))}
        </>
    );
}

export default ScheduledTrainInfo;
