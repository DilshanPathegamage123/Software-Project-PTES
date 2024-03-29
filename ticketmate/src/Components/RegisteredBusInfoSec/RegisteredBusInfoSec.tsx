import React, { useState, useEffect } from 'react';
import './RegisteredBusInfoSec.css'
import BusIcon from '../../assets/BusIcon.png'
import PrimaryButton from '../Buttons/PrimaryButton'
import axios from 'axios';

function RegisteredBusInfoSec() {
        

        const [data, setData] = useState([]);

        useEffect(() => {
            getData();
        }, []);

        const getData = () => {
                axios.get('https://localhost:7241/api/BusReg')
                .then((result) => {
                    setData(result.data);
                })
                .catch((error) => {
                    console.log(error);
                });
            }

            const [showModal, setShowModal] = useState(false);

            const handleModalToggle = () => {
                setShowModal(!showModal);
            };


        const handleDelete = () => {
            
        }
        
  return (
    <>
        

        {
            data && data.length > 0 ?
                data.map((item, index) => {
                    return (
                        <div key={index}>
                            <div className='row p-5 rounded-4 sec shadow m-4'>
                                    <div className='col-lg-2'>
                                            <img src={BusIcon} alt="BusIcon" />
                                    </div>
                                    <div className='col-lg-6'>
                                        
                                                <p key={index}>
                                                <b>Bus No:</b>  {item.busNo}<br />
                                                <b>Licen No:</b>  {item.licenNo}<br />
                                                <b>No of Seats:</b>  {item.setsCount}<br />
                                                <b>AC or NON A/C:</b>  {item.aCorNonAC ? "AC" : "Non AC"}
                                            </p>
                                        
                                    </div>
                                    <div className='col-lg-4'>
                                            <button type="button" className="btn btn-primary" onClick={handleModalToggle}>
                                                Delete
                                            </button> <span></span><span></span>
                                            <button className='btn btn-primary' onClick={()=>handleDelete()}>
                                                Edit
                                            </button>
                                    </div>
                            </div>
                        </div>
                    )
                })
                :
                'Loading...'     
        }
        
        {showModal && (
                <div className="modal fade show" tabIndex={-1} role="dialog" style={{ display: 'block' }}>
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">
                        Do you want to Delete the Bus Details?
                        </h5>
                        <button type="button" className="close" onClick={handleModalToggle}>
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">...</div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" onClick={handleModalToggle}>
                        No
                        </button>
                        <button type="button" className="btn btn-primary" onClick={handleModalToggle}>
                        Yes
                        </button>
                    </div>
                    </div>
                </div>
                </div>
            )}
    
    </>
  )
}

export default RegisteredBusInfoSec
