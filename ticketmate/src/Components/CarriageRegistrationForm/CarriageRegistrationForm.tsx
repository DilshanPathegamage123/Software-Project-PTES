import React, { useState, useEffect } from 'react';
import './CarriageRegistrationForm.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import SelectBusSeatStructure from '../../Components/SelectBusSeatStructure/SelectBusSeatStructure';
import { FirStorage } from './FirebaseConfig';
import { v4 } from 'uuid';
import { getDownloadURL, listAll, ref, uploadBytes } from 'firebase/storage';
import Swal from 'sweetalert2';
import { Link, useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

interface ApiResponse {
  carriageId: number;
}

function CarriageRegistrationForm() {

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const userId = queryParams.get('id');
  console.log("user id " + userId);

  const [formData, setFormData] = useState({
    carriageNum: '',
    seatsCount: '',
    length: '',
    width: '',
    height: '',
    weight: '',
    carriageClass: '',
  });

  const [errors, setErrors] = useState({
    carriageNum: '',
    seatsCount: '',
    length: '',
    width: '',
    height: '',
    weight: '',
    carriageClass: '',
  });

  const [buttonStates, setButtonStates] = useState<{ [key: string]: boolean }>({});

  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (['seatsCount', 'length', 'width', 'height', 'weight', 'carriageClass'].includes(name) && !/^\d+$/.test(value)) {
      setErrors({
        ...errors,
        [name]: 'Only numbers are allowed'
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


    setErrors(newErrors);

    if (formValid) {
      Swal.fire({
        title: 'Uploading...',
        allowOutsideClick: false,
        showConfirmButton: false
      });
      Swal.showLoading();

      try {
        const response = await axios.post<ApiResponse>('https://localhost:7001/api/RegCarriage', {
          carriageNo: formData.carriageNum,
          seatsCount: formData.seatsCount,
          length: formData.length,
          width: formData.width,
          height: formData.height,
          weight: formData.weight,
          carriageClass: formData.carriageClass,
          userId: userId
        });

        const carriageId = response.data.carriageId;
        console.log("Newly generated CarriageId:", carriageId);

        await storeButtonData(carriageId);

        Swal.close();

        Swal.fire({
          icon: "success",
          title: "Your Carriage Successfully Registered",
          showConfirmButton: false,
          timer: 3500
        });
        setTimeout(() => {
          window.location.reload();
        }, 4000);

        //navigate('/CarriageOwnerPage');
      } catch (error) {
        console.log("Error:", error);
        Swal.fire({
          icon: "error",
          title: "Form submission failed2",
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

  const storeButtonData = async (carriageId: number) => {
    try {
      for (const [seatId, availability] of Object.entries(buttonStates)) {
        const buttonData = {
          seatId: seatId,
          avalability: !!availability, // Convert to boolean
          registeredCarriageCarriageId: carriageId,
        };

        console.log("Button Data:", buttonData); // Log button data before sending the request

        await axios.post(`https://localhost:7001/api/SelCarriageSeatStru`, buttonData);

        console.log("Button data stored successfully for CarriageId:", carriageId); // Log success message for each seat
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
        //navigate('/CarriageOwnerPage');
      }
    });
  };

  return (
    <>
      <div className='container py-4'>
        <div className='col-12 rounded-4 formSec'>
          <div className='row'>
            <h3 className='h3Style text-center'>Fill this form to register a new carriage</h3>
          </div>

          <form onSubmit={handleSubmit}>
            <div className='row'>

              <div className='col-12 col-lg-6 p-3'>
                <div className="form-group row">
                  <label htmlFor="inputCarriageNum" className="col-form-label">Enter Carriage Number</label>
                  <div className="">
                    <input type="text" className="form-control" id="inputCarriageNum" name="carriageNum" placeholder="Carriage Number" onChange={handleInputChange} />
                    {errors.carriageNum && <div className="text-danger">{errors.carriageNum}</div>}
                  </div>
                </div>
                <div className="form-group row">
                  <label htmlFor="inputSeatsCount" className="col-form-label">Enter Seat Count</label>
                  <div className="">
                    <input type="text" className="form-control" id="inputSeatsCount" name="seatsCount" placeholder="Seat Count" onChange={handleInputChange} />
                    {errors.seatsCount && <div className="text-danger">{errors.seatsCount}</div>}
                  </div>
                </div>
                <div className="form-group row">
                  <label htmlFor="inputLength" className="col-form-label">Enter Length</label>
                  <div className="">
                    <input type="text" className="form-control" id="inputLength" name="length" placeholder="Length" onChange={handleInputChange} />
                    {errors.length && <div className="text-danger">{errors.length}</div>}
                  </div>
                </div>
                <div className="form-group row">
                  <label htmlFor="inputWidth" className="col-form-label">Enter Width</label>
                  <div className="">
                    <input type="text" className="form-control" id="inputWidth" name="width" placeholder="Width" onChange={handleInputChange} />
                    {errors.width && <div className="text-danger">{errors.width}</div>}
                  </div>
                </div>
                <div className="form-group row">
                  <label htmlFor="inputHeight" className="col-form-label">Enter Height</label>
                  <div className="">
                    <input type="text" className="form-control" id="inputHeight" name="height" placeholder="Height" onChange={handleInputChange} />
                    {errors.height && <div className="text-danger">{errors.height}</div>}
                  </div>
                </div>
                <div className="form-group row">
                  <label htmlFor="inputWeight" className="col-form-label">Enter Weight</label>
                  <div className="">
                    <input type="text" className="form-control" id="inputWeight" name="weight" placeholder="Weight" onChange={handleInputChange} />
                    {errors.weight && <div className="text-danger">{errors.weight}</div>}
                  </div>
                </div>
                <div className="form-group row">
                  <label htmlFor="inputCarriageClass" className="col-form-label">Enter Carriage Class</label>
                  <div className="">
                    <input type="text" className="form-control" id="inputCarriageClass" name="carriageClass" placeholder="Carriage Class" onChange={handleInputChange} />
                    {errors.carriageClass && <div className="text-danger">{errors.carriageClass}</div>}
                  </div>
                </div>
              
              </div>

              {/* Carriage seat structure */}
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
    </>
  );
}

export default CarriageRegistrationForm;
