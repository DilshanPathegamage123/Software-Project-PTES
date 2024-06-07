import React, { useEffect, useState } from 'react';
import './ScheduledTrainInfo.css';
import BusIcon from '../../assets/trainIcon.png';
import BusIcon2 from '../../assets/Group 391.png';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';

interface BusInfo {
    schedulId: number;
    trainDepartureTime: string;
    trainArrivalTime: string;
    startStation: string;
    endStation: string;
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
        axios.get(`https://localhost:7001/api/ScheduledTrain/user/${id}`)
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

    const handleDelete = (schedulId: number) => {
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
                const busInfo = data.find(bus => bus.schedulId === schedulId);
                if (busInfo) {
                    const updatedBusInfo = { ...busInfo, deleteState: false };
                    axios.put(`https://localhost:7001/api/ScheduledTrain/${schedulId}`, updatedBusInfo)
                        .then(() => {
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your file has been deleted.",
                                icon: "success"
                            });
                            setData(prevData => prevData.filter(bus => bus.schedulId !== schedulId));
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
                        <h5>{busInfo.startStation}</h5>
                        <p>{busInfo.trainDepartureTime}</p>
                    </div>
                    <div className='col-lg-2'>
                        <img src={BusIcon2} alt="BusIcon2" />
                    </div>
                    <div className='col-lg-2'>
                        <h5>{busInfo.endStation}</h5>
                        <p>{busInfo.trainArrivalTime}</p>
                    </div>
                    <div className='col-lg-4'>
                        <Link to={`/ScheduledTrainPage?schedulId=${busInfo.schedulId}`}><button className='btn primary mx-1'>See More</button></Link>
                        <button className='btn primary mx-1' onClick={() => handleDelete(busInfo.schedulId)}>Delete</button>
                    </div>
                </div>
            ))}
        </>
    );
}

export default ScheduledTrainInfo;
