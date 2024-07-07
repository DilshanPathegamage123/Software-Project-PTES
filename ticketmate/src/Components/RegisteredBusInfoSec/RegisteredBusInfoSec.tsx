import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './RegisteredBusInfoSec.css';
import BusIcon from '../../assets/BusIcon.png';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';

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

function RegisteredBusInfoSec({ id }: { id: string }) {
    const [data, setData] = useState<BusData[]>([]);

    useEffect(() => {
        getData();
    }, []);

    const getData = () => {
        axios.get(`https://localhost:7001/api/BusReg/byUser/${id}`)
            .then((result) => {
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
                axios.get(`https://localhost:7001/api/BusReg/${busId}`)
                    .then((res) => {
                        const busData = res.data;
                        busData.deleteState = false;
                        axios.put(`https://localhost:7001/api/BusReg/${busId}`, busData)
                            .then(() => {
                                Swal.fire({
                                    title: "Deleted!",
                                    text: "The bus has been marked as deleted.",
                                    icon: "success"
                                });
                                getData();
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
                                <div className='row p-5 rounded-4 sec shadow m-3' data-testid="bus-info">
                                    <div className='col-lg-2'>
                                        <img src={BusIcon} alt="BusIcon" />
                                    </div>
                                    <div className='col-lg-6'>
                                        <p>
                                            <b>Bus No: </b>  <span data-testid="bus-no">{item.busNo}</span><br />
                                            <b>Licen No: </b>  <span data-testid="licen-no">{item.licenNo}</span><br />
                                            <b>No of Seats: </b>  <span data-testid="sets-count">{item.setsCount}</span><br />
                                            <b>AC or NON A/C: </b>  <span data-testid="ac-nonac">{item.aCorNonAC ? "AC" : "Non AC"}</span>
                                        </p>
                                    </div>
                                    <div className='col-lg-4'>
                                        <Link to={`/RegisteredBusPage?busId=${item.busId}`}>
                                            <button type="button" className="btn primary mx-1" data-testid="see-more-button"> See More </button>
                                        </Link>
                                        <button className='btn primary mx-1' onClick={() => handleDelete(item.busId)} data-testid="delete-button">Delete</button>
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
