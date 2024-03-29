import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import './BusRegistrationPage.css'
import PrimaryNavBar from '../../Components/NavBar/PrimaryNavBar'
import Wheel from './assets/steering-wheel (1).png'
import ToggleButton from '../../Components/Buttons/ToggleButton/ToggleButton'
import Footer from '../../Components/Footer/footer'
import axios from 'axios';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function BusRegistrationPage() {


  //---------from REgistered bus info sec-----------

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

    const [showModal, setShowModal] = useState(false);

    const handleModalToggle = () => {
        setShowModal(!showModal);
    };
//---------from REgistered bus info sec----------- close

  const [BusNo, setBusNo] = useState('');
  const [LicenceNo, setLicenceNo] = useState('');
  const [SeatCount, setSeatCount] = useState('');
  const [ACorNonAC, setACorNonAC] = useState(0);

  const handleACorNonACChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value === 'option1' ? 1 : 0;
    setACorNonAC(value);
  };

  const [EditBusNo, setEditBusNo] = useState('');
  const [EditLicenceNo, setEditLicenceNo] = useState('');
  const [EditSeatCount, setEditSeatCount] = useState('');
  const [EditACorNonAC, setEditACorNonAC] = useState(0);

  const handleSave = () => {
    const url = 'https://localhost:7001/api/BusReg';
    const data = {
      "busNo": BusNo,
      "licenNo": LicenceNo,
      "setsCount": SeatCount,
      "aCorNONAC": ACorNonAC
    }
    // alert('Bus registered successfully');
    toast.success('Bus registered successfully');
    clear();
    // axios.post(url, data)
    // .then((result) =>{
      
    //   clear();
    //   toast.success('Bus registered successfully');
    // })
  }

  const clear = () => {
    setBusNo('');
    setLicenceNo('');
    setSeatCount('');
    setACorNonAC(0);
    setEditBusNo('');
    setEditLicenceNo('');
    setEditSeatCount('');
    setEditACorNonAC(0);
  }

  return (
    <>
      
      <PrimaryNavBar/>
      <div className='container-fluid py-4'>
        <div className='col-12 rounded-4 formSec'>
          <div className='row'>
            <h3 className='h3Style text-center'>Fill this form to register a new bus</h3>
          </div>
          <form action="">
          <div className='row'>
          <ToastContainer />
              <div className='col-12 col-md-6 p-3'>
                <div className="form-group row">
                    <label htmlFor="inputbusNum" className="col-form-label">Enter Bus Number</label>
                    <div className="">
                    <input type="text" className="form-control" id="inputbusNum" placeholder="Bus Number" value={BusNo} onChange={(e)=>setBusNo(e.target.value)}/>
                    </div>
                </div>
                <div className="form-group row">
                    <label htmlFor="inputLicencenum" className="col-form-label">Enter Licence Number</label>
                    <div className="">
                      <input type="text" className="form-control" id="inputLicencenum" placeholder="Licence Number" value={LicenceNo} onChange={(e)=>setLicenceNo(e.target.value)}/>
                    </div>
                </div>

                <div className="form-group row">
                    <label htmlFor="exampleFormControlFile1">Attach vehicle licence image</label>
                    <input type="file" className="form-control-file" id="exampleFormControlFile1"/>
                </div>

                <div className="form-group row">
                    <label htmlFor="exampleFormControlFile2">Attach vehicle Insuarance image</label>
                    <input type="file" className="form-control-file" id="exampleFormControlFile2"/>
                </div>

                <div className="form-group row">
                    <label htmlFor="inputSeatNo" className="col-form-label">Enter seat Count</label>
                    <div className="">
                      <input type="text" className="form-control" id="inputSeatNo" placeholder="seat Count" value={SeatCount} onChange={(e)=> setSeatCount(e.target.value)}/>
                    </div>
                </div>
                <div className="row">
                  <fieldset className="form-group">
                      <legend className="col-form-label pt-0">AC or NoN AC</legend>
                      <div className="">
                        <div className="form-check">
                          <input className="form-check-input" type="radio" name="gridRadios" id="gridRadios1" value="option1" checked={ACorNonAC === 1} onChange={handleACorNonACChange}/>
                          <label className="form-check-label" htmlFor="gridRadios1">
                            AC
                          </label>
                        </div>
                        <div className="form-check">
                          <input className="form-check-input" type="radio" name="gridRadios" id="gridRadios2" value="option2" checked={ACorNonAC === 0} onChange={handleACorNonACChange}/>
                          <label className="form-check-label" htmlFor="gridRadios2">
                            Non AC
                          </label>
                        </div>
                      </div>
                    
                  </fieldset>
                </div>

              </div>
              <div className='col-12 col-md-6 p-6'>
              <p>Please select the seat structure</p>

              <div className='container'>
                <div className='bg-light rounded-4'>
                    <div className='row justify-content-center p-3'>
                      <img src={Wheel} alt="Steering-wheel-img" style={{width : "57px"}}/>
                    </div>
                    <div className='row justify-content-center'>

                      <div className="col p-4">
                        <div className="row justify-content-center">
                          <ToggleButton />
                          <ToggleButton />
                          <ToggleButton />
                          <ToggleButton />
                          <ToggleButton />
                          <ToggleButton />
                        </div>
                        <div className="row justify-content-center">
                        <ToggleButton />
                          <ToggleButton />
                          <ToggleButton />
                          <ToggleButton />
                          <ToggleButton />
                          <ToggleButton />
                        </div>
                        <div className="row justify-content-center">
                          <ToggleButton />
                          <ToggleButton />
                          <ToggleButton />
                          <ToggleButton />
                          <ToggleButton />
                          <ToggleButton />
                        </div>
                        <div className="row justify-content-center">
                          <ToggleButton />
                          <ToggleButton />
                          <ToggleButton />
                          <ToggleButton />
                          <ToggleButton />
                          <ToggleButton />
                        </div>
                        <div className="row justify-content-center">
                          <ToggleButton />
                          <ToggleButton />
                          <ToggleButton />
                          <ToggleButton />
                          <ToggleButton />
                          <ToggleButton />
                        </div>
                        <div className="row justify-content-center">
                          <ToggleButton />
                          <ToggleButton />
                          <ToggleButton />
                          <ToggleButton />
                          <ToggleButton />
                          <ToggleButton />
                        </div>
                        <div className="row justify-content-center">
                          <ToggleButton />
                          <ToggleButton />
                          <ToggleButton />
                          <ToggleButton />
                          <ToggleButton />
                          <ToggleButton />
                        </div>
                        <div className="row justify-content-center">
                          <ToggleButton />
                          <ToggleButton />
                          <ToggleButton />
                          <ToggleButton />
                          <ToggleButton />
                          <ToggleButton />
                        </div>
                        <div className="row justify-content-center">
                          <ToggleButton />
                          <ToggleButton />
                          <ToggleButton />
                          <ToggleButton />
                          <ToggleButton />
                          <ToggleButton />
                        </div>
                        <div className="row justify-content-center">
                          <ToggleButton />
                          <ToggleButton />
                          <ToggleButton />
                          <ToggleButton />
                          <ToggleButton />
                          <ToggleButton />
                        </div>
                        <div className="row justify-content-center">
                          <ToggleButton />
                          <ToggleButton />
                          <ToggleButton />
                          <ToggleButton />
                          <ToggleButton />
                          <ToggleButton />
                      </div>

                      </div>

                    </div>
                  </div>
                </div>
              </div>
            
          </div>
          <div className='row'>
            <div className='col-12 text-center p-3'>
              <button type='button' className="btn btn-primary" onClick={()=>handleSave()}>Register</button>
            </div>
          </div>
          </form>

        </div>
        
      </div>
      
      <Footer/>
    </>
  )
}

export default BusRegistrationPage
