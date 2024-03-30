import React, { useState } from 'react';
import './BusRegistrationPage.css';
import PrimaryNavBar from '../../Components/NavBar/PrimaryNavBar';
import Wheel from './assets/steering-wheel (1).png';
import ToggleButton from '../../Components/Buttons/ToggleButton/ToggleButton';
import Footer from '../../Components/Footer/footer';
import { ToastContainer, toast } from 'react-toastify'; // Import 'toast' from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'; // Import toastify CSS
import axios from 'axios';
import PrimaryButton from '../../Components/Buttons/PrimaryButton';

function BusRegistrationPage() {

  const [formData, setFormData] = useState({
    busNum: '',
    licenceNum: '',
    seatCount: '',
    selectedFile1: null,
    selectedFile2: null,
    acOption: ''
  });

  const [errors, setErrors] = useState({
    busNum: '',
    licenceNum: '',
    seatCount: '',
    selectedFile1: '',
    selectedFile2: '',
    acOption: ''
  });

  //---- input fiels validation ----
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  //---- file upload validation ----
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (files && files.length > 0) {
      setFormData({
        ...formData,
        [name]: files[0]
      });
    }
  };

  //---- radio button validation ----
  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setFormData({
      ...formData,
      acOption: value
    });
  };

  //---- form submit ----
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let formValid = true;
    const newErrors = { ...errors };

    // Check if fields are filled
    for (const key in formData) {
      if (formData.hasOwnProperty(key)) {
        if ((formData as any)[key] === '') {
          newErrors[key as keyof typeof newErrors] = `${key} is required`;
          formValid = false;
        } else {
          newErrors[key as keyof typeof newErrors] = '';
        }
      }
    }

    // Check if files are selected
    if (formData.selectedFile1 === null) {
      newErrors.selectedFile1 = 'Attach vehicle licence image is required';
      formValid = false;
    } else {
      newErrors.selectedFile1 = '';
    }

    if (formData.selectedFile2 === null) {
      newErrors.selectedFile2 = 'Attach vehicle insurance image is required';
      formValid = false;
    } else {
      newErrors.selectedFile2 = '';
    }

    // Check if radio button is selected
    if (formData.acOption === '') {
      newErrors.acOption = 'Select AC or Non AC option';
      formValid = false;
    } else {
      newErrors.acOption = '';
    }

    setErrors(newErrors);

    if (formValid) {
      // Submit the form
      // Example: You can make an axios request here
      toast.success('Form submitted successfully');
    } else {
      // Display error message
      toast.error('Form submission failed');
    }
  };
  
  return (
    <>
      {/* // nav bar */}
      <PrimaryNavBar/>

      <div className='container-fluid py-4'>
        <div className='col-12 rounded-4 formSec'>
          <div className='row'>
            <h3 className='h3Style text-center'>Fill this form to register a new bus</h3>
          </div>
          <form onSubmit={handleSubmit}>
            {/* input fields */}
          <div className='row'>
              <div className='col-12 col-md-6 p-3'>
                <div className="form-group row">
                    <label htmlFor="inputbusNum" className="col-form-label">Enter Bus Number</label>
                    <div className="">
                      <input type="text" className="form-control" id="inputbusNum" name="busNum" placeholder="Bus Number" onChange={handleInputChange} />
                      {errors.busNum && <div className="text-danger">{errors.busNum}</div>}
                    </div>
                </div>
                <div className="form-group row">
                    <label htmlFor="inputLicencenum" className="col-form-label">Enter Licence Number</label>
                    <div className="">
                    <input type="text" className="form-control" id="inputLicencenum" name="licenceNum" placeholder="Licence Number" onChange={handleInputChange} />
                    {errors.licenceNum && <div className="text-danger">{errors.licenceNum}</div>}
                    </div>
                </div>

                <div className="form-group row">
                    <label htmlFor="exampleFormControlFile1">Attach vehicle licence image</label>
                    <input type="file" className="form-control-file" id="exampleFormControlFile1" name="selectedFile1" onChange={handleFileChange} />
                    {errors.selectedFile1 && <div className="text-danger">{errors.selectedFile1}</div>}
                </div>

                <div className="form-group row">
                    <label htmlFor="exampleFormControlFile2">Attach vehicle Insuarance image</label>
                    <input type="file" className="form-control-file" id="exampleFormControlFile2" name="selectedFile2" onChange={handleFileChange} />
                    {errors.selectedFile2 && <div className="text-danger">{errors.selectedFile2}</div>}
                </div>

                <div className="form-group row">
                    <label htmlFor="inputSeatNo" className="col-form-label">Enter seat Count</label>
                    <div className="">
                      <input type="text" className="form-control" id="inputSeatNo" name="seatCount" placeholder="seat Count" onChange={handleInputChange} />
                      {errors.seatCount && <div className="text-danger">{errors.seatCount}</div>}
                    </div>
                </div>
                <div className="row">
                  <fieldset className="form-group">
                      <legend className="col-form-label pt-0">AC or NoN AC</legend>
                      <div className="">
                        <div className="form-check">
                        <input className="form-check-input" type="radio" name="acOption" id="gridRadios1" value="AC" onChange={handleRadioChange} />
                        <label className="form-check-label" htmlFor="gridRadios1">
                            AC
                          </label>
                        </div>
                        <div className="form-check">
                        <input className="form-check-input" type="radio" name="acOption" id="gridRadios2" value="Non AC" onChange={handleRadioChange} />
                        <label className="form-check-label" htmlFor="gridRadios2">
                            Non AC
                          </label>
                        </div>
                      </div>
                    
                  </fieldset>
                </div>
              </div>
              {/* Bus seat structure */}
              {/* <div className='col-12 col-md-6 p-6'>
              <p>Please select the seat structure</p>

              <div className='container'>
                <div className='bg-light rounded-4'>
                    <div className='row justify-content-center p-3'>
                      <img src={Wheel} alt="Steering-wheel-img" style={{width : "57px"}}/>
                    </div>
                    <div className='row justify-content-center'>

                      <div className="col p-4">
                        <div className="row justify-content-center">
                          <ToggleButton id={11}/>
                          <ToggleButton id={12}/>
                          <ToggleButton id={13}/>
                          <ToggleButton id={14}/>
                          <ToggleButton id={15}/>
                          <ToggleButton id={16}/>
                        </div>
                        <div className="row justify-content-center">
                          <ToggleButton id={21}/>
                          <ToggleButton id={22}/>
                          <ToggleButton id={23}/>
                          <ToggleButton id={24}/>
                          <ToggleButton id={25}/>
                          <ToggleButton id={26}/>
                        </div>
                        <div className="row justify-content-center">
                          <ToggleButton id={31}/>
                          <ToggleButton id={32}/>
                          <ToggleButton id={33}/>
                          <ToggleButton id={34}/>
                          <ToggleButton id={35}/>
                          <ToggleButton id={36}/>
                        </div>
                        <div className="row justify-content-center">
                          <ToggleButton id={41}/>
                          <ToggleButton id={42}/>
                          <ToggleButton id={43}/>
                          <ToggleButton id={44}/>
                          <ToggleButton id={45}/>
                          <ToggleButton id={46}/>
                        </div>
                        <div className="row justify-content-center">
                          <ToggleButton id={51}/>
                          <ToggleButton id={52}/>
                          <ToggleButton id={53}/>
                          <ToggleButton id={54}/>
                          <ToggleButton id={55}/>
                          <ToggleButton id={56}/>
                        </div>
                        <div className="row justify-content-center">
                          <ToggleButton id={61}/>
                          <ToggleButton id={62}/>
                          <ToggleButton id={63}/>
                          <ToggleButton id={64}/>
                          <ToggleButton id={65}/>
                          <ToggleButton id={66}/>
                        </div>
                        <div className="row justify-content-center">
                          <ToggleButton id={71}/>
                          <ToggleButton id={72}/>
                          <ToggleButton id={73}/>
                          <ToggleButton id={74}/>
                          <ToggleButton id={75}/>
                          <ToggleButton id={76}/>
                        </div>
                        <div className="row justify-content-center">
                          <ToggleButton id={81}/>
                          <ToggleButton id={82}/>
                          <ToggleButton id={83}/>
                          <ToggleButton id={84}/>
                          <ToggleButton id={85}/>
                          <ToggleButton id={86}/>
                        </div>
                        <div className="row justify-content-center">
                          <ToggleButton id={91}/>
                          <ToggleButton id={92}/>
                          <ToggleButton id={93}/>
                          <ToggleButton id={94}/>
                          <ToggleButton id={95}/>
                          <ToggleButton id={96}/>
                        </div>
                        <div className="row justify-content-center">
                          <ToggleButton id={101}/>
                          <ToggleButton id={102}/>
                          <ToggleButton id={103}/>
                          <ToggleButton id={104}/>
                          <ToggleButton id={105}/>
                          <ToggleButton id={106}/>
                        </div>
                        <div className="row justify-content-center">
                          <ToggleButton id={111}/>
                          <ToggleButton id={112}/>
                          <ToggleButton id={113}/>
                          <ToggleButton id={114}/>
                          <ToggleButton id={115}/>
                          <ToggleButton id={116}/>
                      </div>

                      </div>

                    </div>
                  </div>
                </div>
              </div> */}
            
          </div>
            <div className='row'>
              <div className='col-12 text-center p-3'>
                <button type='submit' className='btn btn-primary'>Register</button>
              </div>
            </div>
          </form>

        </div>
        
      </div>
      <ToastContainer /> {/* Add ToastContainer here to display toast messages */}
      <Footer/>
    </>
  )
}


export default BusRegistrationPage
