import React, { useState, useEffect } from 'react';
import './LocomotiveRegistrationForm.css';
import PrimaryNavBar from '../../Components/NavBar/PrimaryNavBar';
import Footer from '../../Components/Footer/footer';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { FirStorage } from './FirebaseConfig';
import { v4 } from 'uuid';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import Swal from 'sweetalert2';
import { Link, useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

interface ApiResponse {
  locomotiveId: number;
}

function LocomotiveRegistrationForm() {

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const userId = queryParams.get('id');
  console.log("user id " + userId);

  const [formData, setFormData] = useState({
    locomotiveNum: '',
    locomotiveType: '',
    locomotiveModel: '',
    locomotiveCapacity: '',
    locomotiveSpeed: '',
    selectedFile: null
  });

  const [errors, setErrors] = useState({
    locomotiveNum: '',
    locomotiveType: '',
    locomotiveModel: '',
    locomotiveCapacity: '',
    locomotiveSpeed: '',
    selectedFile: ''
  });

  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if ((name === 'locomotiveSpeed' || name === 'locomotiveCapacity') && !/^\d+$/.test(value)) {
      setErrors({
        ...errors,
        [name]: 'Only numbers are allowed'
      });
    } 
    else {
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

    if (formData.selectedFile === null) {
      newErrors.selectedFile = 'Attach vehicle licence image is required';
      formValid = false;
    } else {
      newErrors.selectedFile = '';
    }

    setErrors(newErrors);

    if (formValid) {
      Swal.fire({
        title: 'Uploading...',
        allowOutsideClick: false,
        showConfirmButton: false
      });
      Swal.showLoading();

      const licenseUrl = await (formData.selectedFile ? uploadFileAndGetUrl(formData.selectedFile) : Promise.resolve(null));

      try {
        const response = await axios.post<ApiResponse>('https://localhost:7001/api/RegLocomotive', {
            locomotiveNumber: formData.locomotiveNum,
            locomotiveType: formData.locomotiveType,
            locomotiveModel: formData.locomotiveModel,
            locomotiveCapacity: formData.locomotiveCapacity,
            locomotiveSpeed: formData.locomotiveSpeed,
            licenseImgURL: licenseUrl,
            userId: userId
        });

        const locomotiveId = response.data.locomotiveId;
        console.log("Newly generated LocomotiveId:", locomotiveId );

        Swal.close();

        Swal.fire({
          icon: "success",
          title: "Your Locomotive Successfully Registered",
          showConfirmButton: false,
          timer: 3500
        });
        // setTimeout(() => {
        //     window.location.reload();
        // }, 4000);

        navigate('/TrainOwnerPage');
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

  const uploadFileAndGetUrl = async (file: File) => {
    if (file) {
      const fileRef = ref(FirStorage, `TrainLicenImage/${v4()}`);
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
        navigate('/TrainOwnerPage');
      }
    });
  };

  return (
    <>
      <div className='container'>
        <div className='col-12 rounded-4 formSec'>
          <div className='row py-4'>
            <h3 className='h3Style text-center'>Fill this form to register a new Locomotive</h3>
          </div>

          <form onSubmit={handleSubmit}>
            <div className='row'>
              <div className='col-12 col-lg-6 img-sec p-3'>
              </div>

              <div className='col-12 col-lg-6 pl-5'>
                <div className="form-group row">
                  <label htmlFor="inputLocomotiveNum" className="col-form-label">Enter Locomotive Number</label>
                  <div className="">
                    <input type="text" className="form-control" id="inputLocomotiveNum" name="locomotiveNum" placeholder="Locomotive Number" onChange={handleInputChange} />
                    {errors.locomotiveNum && <div className="text-danger"><small>{errors.locomotiveNum}</small></div>}
                  </div>
                </div>
                <div className="form-group row">
                  <label htmlFor="inputLocomotiveType" className="col-form-label">Enter Locomotive Type</label>
                  <div className="">
                    <input type="text" className="form-control" id="inputLocomotiveType" name="locomotiveType" placeholder="Locomotive Type" onChange={handleInputChange} />
                    {errors.locomotiveType && <div className="text-danger"><small>{errors.locomotiveType}</small></div>}
                  </div>
                </div>
                <div className="form-group row">
                  <label htmlFor="inputLocomotiveModel" className="col-form-label">Enter Locomotive Model</label>
                  <div className="">
                    <input type="text" className="form-control" id="inputLocomotiveModel" name="locomotiveModel" placeholder="Locomotive Model" onChange={handleInputChange} />
                    {errors.locomotiveModel && <div className="text-danger"><small>{errors.locomotiveModel}</small></div>}
                  </div>
                </div>
                <div className="form-group row">
                  <label htmlFor="inputLocomotiveCapacity" className="col-form-label">Enter Locomotive Capacity</label>
                  <div className="">
                    <input type="text" className="form-control" id="inputLocomotiveCapacity" name="locomotiveCapacity" placeholder="Locomotive Capacity (No of Passengers)" onChange={handleInputChange} />
                    {errors.locomotiveCapacity && <div className="text-danger"><small>{errors.locomotiveCapacity}</small></div>}
                  </div>
                </div>
                <div className="form-group row">
                  <label htmlFor="inputLocomotiveSpeed" className="col-form-label">Enter Locomotive Speed</label>
                  <div className="">
                    <input type="text" className="form-control" id="inputLocomotiveSpeed" name="locomotiveSpeed" placeholder="Locomotive Speed (km\h)" onChange={handleInputChange} />
                    {errors.locomotiveSpeed && <div className="text-danger"><small>{errors.locomotiveSpeed}</small></div>}
                  </div>
                </div>
                <div className="form-group row">
                  <label htmlFor="exampleFormControlFile1">Attach vehicle licence image</label>
                  <i><p className="mb-2" style={{ fontSize: '14px', color: 'rgba(0, 0, 0, 0.5)' }}>* Only jpg, jpeg, png, and pdf are allowed. *</p></i>
                  <input type="file" className="form-control-file" id="exampleFormControlFile1" name="selectedFile" onChange={handleFileChange} />
                  {errors.selectedFile && <div className="text-danger"><small>{errors.selectedFile}</small></div>}
                </div>
              </div>
            </div>
            <div className='row py-5'>
              <div className='col-12 text-center p-3'>

                <button type='button' className='btn white mx-3 ' onClick={CancelButton}>Cancel</button>
                <button type='submit' className='btn primary mx-3 '>Register</button>
                
              </div>
            </div>
          </form>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}

export default LocomotiveRegistrationForm;
