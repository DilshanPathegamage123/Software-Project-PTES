import React, { useState, useEffect } from 'react';
import './BusRegistrationPage.css';
import PrimaryNavBar from '../../Components/NavBar/PrimaryNavBar';
import Footer from '../../Components/Footer/Footer';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import SelectBusSeatStructure from '../../Components/SelectBusSeatStructure/SelectBusSeatStructure';
import {FirStorage} from './FirebaseConfig';
import { v4 } from 'uuid';
import { getDownloadURL, listAll, ref, uploadBytes } from 'firebase/storage';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

interface ApiResponse {
  busId: number;
}

function BusRegistrationPage() {
  const [formData, setFormData] = useState({
    busNum: '',
    busName: '',
    licenceNum: '',
    seatCount: '',
    selectedFile1: null,
    selectedFile2: null,
    acOption: ''
  });

  const [errors, setErrors] = useState({
    busNum: '',
    busName: '',
    licenceNum: '',
    seatCount: '',
    selectedFile1: '',
    selectedFile2: '',
    acOption: ''
  });

  const [buttonStates, setButtonStates] = useState<{ [key: string]: boolean }>({});

  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === 'seatCount' && !/^\d+$/.test(value)) {
      setErrors({
        ...errors,
        [name]: 'Only numbers are allowed for seat count'
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (files && files.length > 0) {
      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'application/pdf'];
      const fileType = files[0].type;
      if (allowedTypes.includes(fileType)) {
        const updatedFormData = { ...formData, [name]: files[0] };
        setFormData(updatedFormData);
      } else {
        alert('Only JPG, JPEG, PNG, and PDF files are allowed.');
        e.target.value = '';
      }
    }
  };

  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setFormData({
      ...formData,
      acOption: value
    });
    setErrors({
      ...errors,
      acOption: ''
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let formValid = true;
    const newErrors = { ...errors };

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

    if (formData.acOption === '') {
      newErrors.acOption = 'Select AC or Non AC option';
      formValid = false;
    } else {
      newErrors.acOption = '';
    }

    setErrors(newErrors);

    if (formValid) {
      Swal.fire({
        title: 'Uploading...',
        allowOutsideClick: false,
        showConfirmButton: false
      });
      Swal.showLoading();

      const [licenseUrl, insuranceUrl] = await Promise.all([
        formData.selectedFile1 ? uploadFileAndGetUrl(formData.selectedFile1) : Promise.resolve(null),
        formData.selectedFile2 ? uploadFileAndGetUrl(formData.selectedFile2) : Promise.resolve(null)
      ]);

      try {
        const acOptionValue = formData.acOption === 'AC' ? true : false;
        const response = await axios.post<ApiResponse>('https://localhost:7001/api/BusReg', {
          BusNo: formData.busNum,
          LicenNo: formData.licenceNum,
          SetsCount: formData.seatCount,
          ACorNONAC: acOptionValue,
          LicenseImgURL: licenseUrl,
          InsuranceImgURL: insuranceUrl,
          BusName: formData.busName
        });

        const busId = response.data.busId;
        console.log("Newly generated BusId:", busId );

        await storeButtonData(busId);

        Swal.close();

        Swal.fire({
          icon: "success",
          title: "Your Bus Successfully Registered",
          showConfirmButton: false,
          timer: 3500
        })
        setTimeout(() => {
            window.location.reload();
        }, 4000);

        navigate('/');
        //toast.success('Form submitted successfully');
      } catch (error) {
        Swal.fire({
          icon: "error",  
          title: "Form submission failed",
          showConfirmButton: false,
          timer: 2500
        });
      }
    } else {
      Swal.fire({
        icon: "error",  
        title: "Form submission failed",
        showConfirmButton: false,
        timer: 2500
      });
    }
  };

  const storeButtonData = async (busId: number) => {
    try {
      for (const [seatId, availability] of Object.entries(buttonStates)) {
        const buttonData = {
          seatId: seatId,
          seatAvailability: !!availability, // Convert to boolean
          registeredBusBusId: busId,
        };
  
        console.log("Button Data:", buttonData); // Log button data before sending the request
  
        await axios.post(`https://localhost:7001/api/SelectedSeatStr`, buttonData);
  
        console.log("Button data stored successfully for BusId:", busId); // Log success message for each seat
      }
    } catch (error) {
      console.error('Error storing button data:', error);
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

  const CancelButton = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Go Back!"
    }).then((result) => {
      if (result.isConfirmed) {
        navigate('/');
      }
    });
  }


  return (
    <>
      <PrimaryNavBar />
      <div className='container py-4'>
        <div className='col-12 rounded-4 formSec'>
          <div className='row'>
            <h3 className='h3Style text-center'>Fill this form to register a new bus</h3>
          </div>

          <form onSubmit={handleSubmit}>
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
                  <label htmlFor="inputBusName" className="col-form-label">Enter Bus Name</label>
                  <div className="">
                    <input type="text" className="form-control" id="inputBusName" name="busName" placeholder="Bus Name" onChange={handleInputChange} />
                    {errors.busName && <div className="text-danger">{errors.busName}</div>}
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
              <SelectBusSeatStructure setButtonStates={setButtonStates} />
            </div>
            <div className='row'>
              <div className='col-12 text-center p-3'>
                <button type='submit' className='btn primary mx-3 '>Register</button>
                <button type='button' className='btn white mx-3 ' onClick={() => CancelButton()}>Cancel</button>
              </div>
            </div>
          </form>
        </div>
      </div>
      <ToastContainer />
      <Footer />
    </>
  );
}

export default BusRegistrationPage;
