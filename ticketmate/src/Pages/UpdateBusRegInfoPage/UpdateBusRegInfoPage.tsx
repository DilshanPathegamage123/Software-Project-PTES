import React, { useState, useEffect } from 'react';
import './UpdateBusRegInfoPage.css';
import PrimaryNavBar from '../../Components/NavBar/PrimaryNavBar-logout';
import Footer from '../../Components/Footer/footer';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import SelectBusSeatStructureUP from '../../Components/SelectBusSeatStructureUP/SelectBusSeatStructureUP';
import { FirStorage } from './FirebaseConfig';
import { v4 } from 'uuid';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import Swal from 'sweetalert2';
import { useLocation, useNavigate } from 'react-router-dom';

interface ApiResponse {
  busId: number;
}

interface ButtonState {
  availability: boolean;
  id: number;
}

function UpdateBusRegInfoPage() {

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const busId = queryParams.get('busId') ?? '';
  console.log("Bus id " + busId);

  const [formData, setFormData] = useState({
    busNum: '',
    busName: '',
    licenceNum: '',
    seatCount: '',
    selectedFile1: null,
    selectedFile2: null,
    acOption: '',
    userId: ''
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

  const [existingFiles, setExistingFiles] = useState({
    licenseImgURL: '',
    insuranceImgURL: ''
  });

  const [buttonStates, setButtonStates] = useState<{ [key: string]: ButtonState }>({});

  const navigate = useNavigate();

  useEffect(() => {
    if (busId) {
      fetchBusData(busId);
      fetchSeatData(busId);
    }
  }, [busId]);

  const fetchBusData = async (busId: string) => {
    try {
      const response = await axios.get(`https://localhost:7001/api/BusReg/${busId}`);
      const busData = response.data;
      setFormData({
        busNum: busData.busNo,
        busName: busData.busName,
        licenceNum: busData.licenNo,
        seatCount: busData.setsCount,
        selectedFile1: null,
        selectedFile2: null,
        acOption: busData.aCorNONAC ? 'AC' : 'Non AC',
        userId: busData.userId
      });
      setExistingFiles({
        licenseImgURL: busData.licenseImgURL,
        insuranceImgURL: busData.insuranceImgURL
      });
    } catch (error) {
      console.error('Error fetching bus data:', error);
    }
  };

  const fetchSeatData = async (busId: string) => {
    try {
      const response = await axios.get(`https://localhost:7001/api/SelectedSeatStr/bus/${busId}`);
      const seatData = response.data.reduce((acc: { [key: string]: ButtonState }, seat: any) => {
        acc[seat.seatId] = { availability: seat.seatAvailability, id: seat.id };
        return acc;
      }, {});
      setButtonStates(seatData);
    } catch (error) {
      console.error('Error fetching seat data:', error);
    }
  };

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

    if (formData.acOption === '') {
      newErrors.acOption = 'Select AC or Non AC option';
      formValid = false;
    } else {
      newErrors.acOption = '';
    }

    setErrors(newErrors);

    if (formValid) {
      Swal.fire({
        title: 'Updating...',
        allowOutsideClick: false,
        showConfirmButton: false
      });
      Swal.showLoading();

      const [licenseUrl, insuranceUrl] = await Promise.all([
        formData.selectedFile1 ? uploadFileAndGetUrl(formData.selectedFile1) : Promise.resolve(existingFiles.licenseImgURL),
        formData.selectedFile2 ? uploadFileAndGetUrl(formData.selectedFile2) : Promise.resolve(existingFiles.insuranceImgURL)
      ]);

      try {
        const acOptionValue = formData.acOption === 'AC' ? true : false;
        await axios.put(`https://localhost:7001/api/BusReg/${busId}`, {
          busId: busId,
          busNo: formData.busNum,
          licenNo: formData.licenceNum,
          setsCount: formData.seatCount,
          aCorNONAC: acOptionValue,
          licenseImgURL: licenseUrl,
          insuranceImgURL: insuranceUrl,
          busName: formData.busName,
          userId: formData.userId
        });

        const buttonDataSuccess = await storeButtonData(busId);

        if (buttonDataSuccess) {
          Swal.close();

          Swal.fire({
            icon: "success",
            title: "Your Bus Information Successfully Updated",
            showConfirmButton: false,
            timer: 3500
          });

          setTimeout(() => {
            navigate(`/RegisteredBusPage?busId=${busId}`);
          }, 4000);
        } else {
          throw new Error('Button data store failed');
        }

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

  const storeButtonData = async (busId: string): Promise<boolean> => {
    try {
      const buttonDataPromises = Object.entries(buttonStates).map(async ([seatId, { availability, id }]) => {
        const buttonData = {
          id: id,
          seatId: seatId,
          seatAvailability: !!availability,
          registeredBusBusId: parseInt(busId),
        };

        console.log("Button Data:", buttonData);

        await axios.put(`https://localhost:7001/api/SelectedSeatStr/${id}`, buttonData);

        console.log("Button data stored successfully for BusId:", busId);
      });

      await Promise.all(buttonDataPromises);
      return true;
    } catch (error) {
      console.error('Error storing button data:', error);
      return false;
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
      confirmButtonText: "Yes, go back",
      customClass: {
        title: "my-custom-title-class"
      }
    }).then((result) => {
      if (result.isConfirmed) {
        navigate(`/RegisteredBusPage?busId=${busId}`);
      }
    });
  };

  return (
    <>
      <PrimaryNavBar />
      <div className="container rounded-4 p-5">
        <form onSubmit={handleSubmit}>
          <div className="row ">
            <div className="col-lg-6 bg-light2 rounded-4 p-5">
              <div className="row mb-3">
                <div className="col-md-6">
                  <label htmlFor="busNum">Bus Number:</label>
                  <input
                    type="text"
                    id="busNum"
                    name="busNum"
                    className="form-control"
                    value={formData.busNum}
                    onChange={handleInputChange}
                  />
                  {errors.busNum && <p className="error-text">{errors.busNum}</p>}
                </div>
                <div className="col-md-6">
                  <label htmlFor="busName">Bus Name:</label>
                  <input
                    type="text"
                    id="busName"
                    name="busName"
                    className="form-control"
                    value={formData.busName}
                    onChange={handleInputChange}
                  />
                  {errors.busName && <p className="error-text">{errors.busName}</p>}
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-md-6">
                  <label htmlFor="licenceNum">Licence Number:</label>
                  <input
                    type="text"
                    id="licenceNum"
                    name="licenceNum"
                    className="form-control"
                    value={formData.licenceNum}
                    onChange={handleInputChange}
                  />
                  {errors.licenceNum && <p className="error-text">{errors.licenceNum}</p>}
                </div>
                <div className="col-md-6">
                  <label htmlFor="seatCount">Seat Count:</label>
                  <input
                    type="text"
                    id="seatCount"
                    name="seatCount"
                    className="form-control"
                    value={formData.seatCount}
                    onChange={handleInputChange}
                  />
                  {errors.seatCount && <p className="error-text">{errors.seatCount}</p>}
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-md-6">
                  <label htmlFor="selectedFile1">Attach Vehicle Licence Image:</label>
                  <input
                    type="file"
                    id="selectedFile1"
                    name="selectedFile1"
                    className="form-control"
                    onChange={handleFileChange}
                  />
                  {errors.selectedFile1 && <p className="error-text">{errors.selectedFile1}</p>}
                </div>
                <div className="col-md-6">
                  <label htmlFor="selectedFile2">Attach Vehicle Insurance Image:</label>
                  <input
                    type="file"
                    id="selectedFile2"
                    name="selectedFile2"
                    className="form-control"
                    onChange={handleFileChange}
                  />
                  {errors.selectedFile2 && <p className="error-text">{errors.selectedFile2}</p>}
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-md-6">
                  <label>AC or Non AC:</label>
                  <div>
                    <input
                      type="radio"
                      id="ac"
                      name="acOption"
                      value="AC"
                      checked={formData.acOption === 'AC'}
                      onChange={handleRadioChange}
                    />
                    <label htmlFor="ac" className="ml-2 mr-4">AC</label>
                    <input
                      type="radio"
                      id="nonAc"
                      name="acOption"
                      value="Non AC"
                      checked={formData.acOption === 'Non AC'}
                      onChange={handleRadioChange}
                    />
                    <label htmlFor="nonAc" className="ml-2">Non AC</label>
                  </div>
                  {errors.acOption && <p className="error-text">{errors.acOption}</p>}
                </div>
              </div>
              
            </div>
            <div className="col-lg-6 bg-light2 rounded-4 p-5">
              <h3 className="mb-4 text-center">Update Seat Structure</h3>
              <SelectBusSeatStructureUP
                buttonStates={buttonStates}
                setButtonStates={setButtonStates}
              />
            </div>

          </div>
          <div className="row justify-content-center mt-4">
              <div className="row justify-content-center text-center">
                <div className="col-6">
                  <button type="submit" className="btn primary m-2">Update</button>
                  <button type="button" className="btn white m-2" onClick={CancelButton}>Cancel</button>
                </div>
              </div>
          </div>
        </form>
        
      </div>
      <Footer />
    </>
  );
}

export default UpdateBusRegInfoPage;
