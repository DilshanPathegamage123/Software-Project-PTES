
import React, { useEffect, useState } from 'react';
import './BusRegistrationPage.css';
import PrimaryNavBar from '../../Components/NavBar/PrimaryNavBar';
import Footer from '../../Components/Footer/Footer';
import { ToastContainer, toast } from 'react-toastify'; // Import 'toast' from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'; // Import toastify CSS
import axios from 'axios';
import SelectBusSeatStructure from '../../Components/SelectBusSeatStructure/SelectBusSeatStructure';
import {FirStorage} from './FirebaseConfig';
import { v4 } from 'uuid';
import { getDownloadURL, listAll, ref, uploadBytes } from 'firebase/storage';

interface ApiResponse {
  busId: number;
}

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

  //---- input fields validation ----
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
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'application/pdf']; // Allowed file types
    const fileType = files[0].type;
    if (allowedTypes.includes(fileType)) {
      const updatedFormData = { ...formData, [name]: files[0] };
      setFormData(updatedFormData);
    } else {
      // Display alert for invalid file type
      alert('Only JPG, JPEG, PNG, and PDF files are allowed.');
      // Clear the file input
      e.target.value = '';
    }
  }
};


  //---- radio button validation ----
  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setFormData({
      ...formData,
      acOption: value
    });

    // Clear validation error for acOption when a radio button is selected
    setErrors({
      ...errors,
      acOption: ''
    });
  };

  //---- form submit ----
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
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
        // Upload files and retrieve download URLs
        const [licenseUrl, insuranceUrl] = await Promise.all([
          formData.selectedFile1 ? uploadFileAndGetUrl(formData.selectedFile1) : Promise.resolve(null),
          formData.selectedFile2 ? uploadFileAndGetUrl(formData.selectedFile2) : Promise.resolve(null)
        ]);
       
        try {
            const acOptionValue = formData.acOption === 'AC' ? true : false; // Convert radio button value to boolean
            const response = await axios.post<ApiResponse>('https://localhost:7001/api/BusReg', { // Specify the response type
              BusNo: formData.busNum,
              LicenNo: formData.licenceNum,
              SetsCount: formData.seatCount,
              ACorNONAC: acOptionValue,
              LicenseImgURL: licenseUrl,
              InsuranceImgURL: insuranceUrl
            });

            // Access the BusId from the response data
            const BusId  = response.data.busId;
            console.log("Newly generated BusId:", BusId );

            console.log("Response data:", response.data);

            
            toast.success('Form submitted successfully');

          // setTimeout(() => {
          //   window.location.reload();
          // }, 4000);

        } catch (error) {
          toast.error('Form submission failed2');
        }
      } else {
        toast.error('Form submission failed3');
      }
  };

  const uploadFileAndGetUrl = async (file: File) => {
    if (file) {
      const fileRef = ref(FirStorage, `Files/${v4()}`);
      await uploadBytes(fileRef, file);
      return getDownloadURL(fileRef);
    }
    return '';
  };

  return (
    <>
      {/* // nav bar */}
      <PrimaryNavBar />
      <div className='container-fluid py-4'>
        <div className='col-12 rounded-4 formSec'>
          <div className='row'>
            <h3 className='h3Style text-center'>Fill this form to register a new bus</h3>
          </div>

          <form onSubmit={handleSubmit}>
            {/* input fields */}
            <div className='row'>
              <div className='col-12 col-lg-6 p-3'>
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
                  <i><p className="mb-2" style={{ fontSize: '14px', color: 'rgba(0, 0, 0, 0.5)' }}>* Only jpg, jpeg, png, and pdf are allowed. *</p></i>
                  <input type="file" className="form-control-file" id="exampleFormControlFile1" name="selectedFile1" onChange={handleFileChange} />
                  {errors.selectedFile1 && <div className="text-danger">{errors.selectedFile1}</div>}
                </div>

                <div className="form-group row">
                  <label htmlFor="exampleFormControlFile2">Attach vehicle Insuarance image</label>
                  <i><p className="mb-2" style={{ fontSize: '14px', color: 'rgba(0, 0, 0, 0.5)' }}>* Only jpg, jpeg, png, and pdf are allowed. *</p></i>
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
                    {errors.acOption && <div className="text-danger">{errors.acOption}</div>}
                  </fieldset>
                </div>
              </div>
              {/* Bus seat structure */}
              <SelectBusSeatStructure />

            </div>
            <div className='row'>
              <div className='col-12 text-center p-3'>
                <button type='submit' className='btn btn-primary mx-3 '>Register</button>
                <button type='button' className='btn btn-outline-primary mx-3 '>Cancel</button>
              </div>
            </div>
          </form>

        </div>

      </div>
      <ToastContainer />
      <Footer />
    </>
  )
}



export default BusRegistrationPage
