import React, { useState, useEffect } from 'react';
import './RegisteredBusInfoSec.css'
import BusIcon from '../../assets/BusIcon.png'
import PrimaryButton from '../Buttons/PrimaryButton'

function RegisteredBusInfoSec() {

        const busDetails = [
            {
                BusId : 1,
                BusNo : "KJ-1234",
                SeatCount : 50,
                ACorNonAC : true
            },
            {
                BusId : 2,
                BusNo : "KJ-2234",
                SeatCount : 50,
                ACorNonAC : false
            },
            {
                BusId : 3,
                BusNo : "KJ-2234",
                SeatCount : 50,
                ACorNonAC : true
            },
        ]

        const [data, setData] = useState<{ BusId: number; BusNo: string; SeatCount: number; ACorNonAC: boolean; }[]>([]);

        useEffect(() => {
            setData(busDetails);
        }, []);

        const handleEdit = (id: number) => {
            alert(id);
        }
        const handleDelete = (id: number) => {
            alert(id);
        }
        
  return (
    <>
        {
            data && data.length > 0 ?
                data.map((item, index) => {
                    return (
                        <div key={index}>
                            import React from 'react';

                            declare module 'react' {
                                interface JSX.IntrinsicElements {
                                    div: React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;
                                }
                            }

                            <div className='row p-5 rounded-4 sec shadow m-4'>
                                    <div className='col-lg-2'>
                                            <img src={BusIcon} alt="BusIcon" />
                                    </div>
                                    <div className='col-lg-6'>
                                            <p>{item.BusId}</p>
                                            <p>{item.BusNo}</p>
                                            <p>{item.SeatCount}</p>
                                            <p>{item.ACorNonAC ? "AC" : "Non AC"}</p>
                                    </div>
                                    <div className='col-lg-4'>
                                            <button className='btn btn-primary' onClick={()=>handleEdit(item.BusId)}>Edit</button>
                                            <button className='btn btn-primary' onClick={()=>handleDelete(item.BusId)}>Delete</button>
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

export default RegisteredBusInfoSec
