import React, { useState, useEffect } from 'react';
import './UpdateLocomotiveRegInfoPage.css';
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

function UpdateLocomotiveRegInfoPage() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const locomotiveId = queryParams.get('locomotiveId');
  console.log("locomotive id " + locomotiveId);

  const [formData, setFormData] = useState({
    locomotiveNum: '',
    locomotiveType: '',
    locomotiveModel: '',
    locomotiveCapacity: '',
    locomotiveSpeed: '',
    userId: '',
    licenseImgURL: '', // Add this to store the existing image URL
    selectedFile: null
  });

  const [errors, setErrors] = useState({
    locomotiveNum: '',
    locomotiveType: '',
    locomotiveModel: '',
    locomotiveCapacity: '',
    locomotiveSpeed: '',
    userId: '',
    selectedFile: ''
  });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://localhost:7001/api/RegLocomotive/${locomotiveId}`);
        const data = response.data;
        setFormData({
          locomotiveNum: data.locomotiveNumber,
          locomotiveType: data.locomotiveType,
          locomotiveModel: data.locomotiveModel,
          locomotiveCapacity: data.locomotiveCapacity,
          locomotiveSpeed: data.locomotiveSpeed,
          userId: data.userId,
          licenseImgURL: data.licenseImgURL, // Set existing image URL
          selectedFile: null
        });
      } catch (error) {
        console.error('Error fetching locomotive data:', error);
      }
    };
    fetchData();
  }, [locomotiveId]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === 'locomotiveSpeed' && !/^\d+$/.test(value)) {
      setErrors({
        ...errors,
        [name]: 'Only numbers are allowed for locomotive speed'
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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let formValid = true;
    const newErrors = { ...errors };

    for (const key in formData) {
      if (formData.hasOwnProperty(key)) {
        if ((formData as any)[key] === '' && key !== 'selectedFile') { // Exclude 'selectedFile' from being required
          newErrors[key as keyof typeof newErrors] = `${key} is required`;
          formValid = false;
        } else {
          newErrors[key as keyof typeof newErrors] = '';
        }
      }
    }

    setErrors(newErrors);

    if (formValid) {
      Swal.fire({
        title: 'Uploading...',
        allowOutsideClick: false,
        showConfirmButton: false
      });
      Swal.showLoading();

      const licenseUrl = await (formData.selectedFile ? uploadFileAndGetUrl(formData.selectedFile) : Promise.resolve(formData.licenseImgURL)); // Use existing URL if no new file is uploaded

      try {
        const response = await axios.put(`https://localhost:7001/api/RegLocomotive/${locomotiveId}`, {
          locomotiveId: locomotiveId,
          locomotiveNumber: formData.locomotiveNum,
          locomotiveType: formData.locomotiveType,
          locomotiveModel: formData.locomotiveModel,
          locomotiveCapacity: formData.locomotiveCapacity,
          locomotiveSpeed: formData.locomotiveSpeed,
          userId: formData.userId,
          licenseImgURL: licenseUrl // Use existing URL if no new file is uploaded
        });

        Swal.close();

        Swal.fire({
          icon: "success",
          title: "Your Locomotive Successfully Updated",
          showConfirmButton: false,
          timer: 3500
        });
        // setTimeout(() => {
        //   window.location.reload();
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
            <h3 className='h3Style text-center'>Update Locomotive Information</h3>
          </div>

          <form onSubmit={handleSubmit}>
            <div className='row'>
              <div className='col-12 col-lg-6 img-sec p-3'>
              </div>

              <div className='col-12 col-lg-6 pl-5'>
                <div className="form-group row">
                  <label htmlFor="inputLocomotiveNum" className="col-form-label">Enter Locomotive Number</label>
                  <div className="">
                    <input type="text" className="form-control" id="inputLocomotiveNum" name="locomotiveNum" placeholder="Locomotive Number" value={formData.locomotiveNum} onChange={handleInputChange} />
                    {errors.locomotiveNum && <div className="text-danger">{errors.locomotiveNum}</div>}
                  </div>
                </div>
                <div className="form-group row">
                  <label htmlFor="inputLocomotiveType" className="col-form-label">Enter Locomotive Type</label>
                  <div className="">
                    <input type="text" className="form-control" id="inputLocomotiveType" name="locomotiveType" placeholder="Locomotive Type" value={formData.locomotiveType} onChange={handleInputChange} />
                    {errors.locomotiveType && <div className="text-danger">{errors.locomotiveType}</div>}
                  </div>
                </div>
                <div className="form-group row">
                  <label htmlFor="inputLocomotiveModel" className="col-form-label">Enter Locomotive Model</label>
                  <div className="">
                    <input type="text" className="form-control" id="inputLocomotiveModel" name="locomotiveModel" placeholder="Locomotive Model" value={formData.locomotiveModel} onChange={handleInputChange} />
                    {errors.locomotiveModel && <div className="text-danger">{errors.locomotiveModel}</div>}
                  </div>
                </div>
                <div className="form-group row">
                  <label htmlFor="inputLocomotiveCapacity" className="col-form-label">Enter Locomotive Capacity</label>
                  <div className="">
                    <input type="text" className="form-control" id="inputLocomotiveCapacity" name="locomotiveCapacity" placeholder="Locomotive Capacity" value={formData.locomotiveCapacity} onChange={handleInputChange} />
                    {errors.locomotiveCapacity && <div className="text-danger">{errors.locomotiveCapacity}</div>}
                  </div>
                </div>
                <div className="form-group row">
                  <label htmlFor="inputLocomotiveSpeed" className="col-form-label">Enter Locomotive Speed</label>
                  <div className="">
                    <input type="text" className="form-control" id="inputLocomotiveSpeed" name="locomotiveSpeed" placeholder="Locomotive Speed" value={formData.locomotiveSpeed} onChange={handleInputChange} />
                    {errors.locomotiveSpeed && <div className="text-danger">{errors.locomotiveSpeed}</div>}
                  </div>
                </div>
                <div className="form-group row">
                  <label htmlFor="inputLocomotiveImage" className="col-form-label">Upload Locomotive Image</label>
                  <div className="">
                    <input type="file" className="form-control-file" id="inputLocomotiveImage" name="selectedFile" onChange={handleFileChange} />
                    {errors.selectedFile && <div className="text-danger">{errors.selectedFile}</div>}
                  </div>
                </div>
                <div className="form-group row">
                  <div className="col-sm-12">
                    <button type="submit" className="btn primary">Update</button>
                    <button type="button" className="btn yellow ml-2" onClick={CancelButton}>Cancel</button>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
      <Footer />
      <ToastContainer />
    </>
  );
}

export default UpdateLocomotiveRegInfoPage;
