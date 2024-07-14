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
import '../../vars.css';

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

  const getToken = () => {
    return sessionStorage.getItem("token");
  };

  const [formData, setFormData] = useState({
    busNum: '',
    busName: '',
    licenceNum: '',
    selectedFile1: null,
    selectedFile2: null,
    acOption: '',
    userId: ''
  });

  const [errors, setErrors] = useState({
    busNum: '',
    busName: '',
    licenceNum: '',
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
      const response = await axios.get(`https://localhost:7001/api/BusReg/${busId}`,{
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      
      });
      const busData = response.data;
      setFormData({
        busNum: busData.busNo,
        busName: busData.busName,
        licenceNum: busData.licenNo,
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
      const response = await axios.get(`https://localhost:7001/api/SelectedSeatStr/bus/${busId}`,{
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      
      });
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
    setFormData({
      ...formData,
      [name]: value
    });
    setErrors({
      ...errors,
      [name]: ''
    });
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
        const seatCount = Object.values(buttonStates).filter(state => state.availability).length;

        await axios.put(`https://localhost:7001/api/BusReg/${busId}`, {
          busId: busId,
          busNo: formData.busNum,
          licenNo: formData.licenceNum,
          setsCount: seatCount,
          aCorNONAC: acOptionValue,
          licenseImgURL: licenseUrl,
          insuranceImgURL: insuranceUrl,
          busName: formData.busName,
          userId: formData.userId
        },{
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        
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

        await axios.put(`https://localhost:7001/api/SelectedSeatStr/${id}`, buttonData,{
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        
        });

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
      <div className='BusRegBackUP'>
      <div className="container p-5">
        <form onSubmit={handleSubmit}>
          
          <div className='row bg-light2 rounded-4 p-5'>
          <h3 className='h3Style text-center'>Bus Registration Information</h3>
            <div className='col-lg-6'>
              <div className="form-group p-2">
                <label>Bus Number:</label>
                <input
                  type="text"
                  className={`form-control ${errors.busNum ? 'is-invalid' : ''}`}
                  placeholder="Enter Bus Number"
                  name="busNum"
                  value={formData.busNum}
                  onChange={handleInputChange}
                />
                {errors.busNum && <div className="invalid-feedback">{errors.busNum}</div>}
              </div>
              <div className="form-group p-2">
                <label>Bus Name:</label>
                <input
                  type="text"
                  className={`form-control ${errors.busName ? 'is-invalid' : ''}`}
                  placeholder="Enter Bus Name"
                  name="busName"
                  value={formData.busName}
                  onChange={handleInputChange}
                />
                {errors.busName && <div className="invalid-feedback">{errors.busName}</div>}
              </div>
              <div className="form-group p-2">
                <label>Licence Number:</label>
                <input
                  type="text"
                  className={`form-control ${errors.licenceNum ? 'is-invalid' : ''}`}
                  placeholder="Enter Licence Number"
                  name="licenceNum"
                  value={formData.licenceNum}
                  onChange={handleInputChange}
                />
                {errors.licenceNum && <div className="invalid-feedback">{errors.licenceNum}</div>}
              </div>
              <div className="form-group p-2">
                <label>Upload Licence Scan Copy:</label>
                <input
                  type="file"
                  className={`form-control ${errors.selectedFile1 ? 'is-invalid' : ''}`}
                  name="selectedFile1"
                  onChange={handleFileChange}
                />
                {existingFiles.licenseImgURL && (
                  <p>
                    Existing file: <a href={existingFiles.licenseImgURL} target="_blank" rel="noopener noreferrer">View</a>
                  </p>
                )}
                {errors.selectedFile1 && <div className="invalid-feedback">{errors.selectedFile1}</div>}
              </div>
              <div className="form-group p-2">
                <label>Upload Insurance Scan Copy:</label>
                <input
                  type="file"
                  className={`form-control ${errors.selectedFile2 ? 'is-invalid' : ''}`}
                  name="selectedFile2"
                  onChange={handleFileChange}
                />
                {existingFiles.insuranceImgURL && (
                  <p>
                    Existing file: <a href={existingFiles.insuranceImgURL} target="_blank" rel="noopener noreferrer">View</a>
                  </p>
                )}
                {errors.selectedFile2 && <div className="invalid-feedback">{errors.selectedFile2}</div>}
              </div>
              <div className="form-group p-2">
                <label>AC/Non AC:</label>
                <div>
                  <div className="form-check form-check-inline">
                    <input
                      type="radio"
                      className={`form-check-input ${errors.acOption ? 'is-invalid' : ''}`}
                      name="acOption"
                      value="AC"
                      checked={formData.acOption === 'AC'}
                      onChange={handleRadioChange}
                    />
                    <label className="form-check-label">AC</label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input
                      type="radio"
                      className={`form-check-input ${errors.acOption ? 'is-invalid' : ''}`}
                      name="acOption"
                      value="Non AC"
                      checked={formData.acOption === 'Non AC'}
                      onChange={handleRadioChange}
                    />
                    <label className="form-check-label">Non AC</label>
                  </div>
                </div>
                {errors.acOption && <div className="invalid-feedback">{errors.acOption}</div>}
              </div>
            </div>
          <div className='col-lg-6'>
            <div className="form-group p-2">
              <label>Select Seat Structure:</label>
              <SelectBusSeatStructureUP buttonStates={buttonStates} setButtonStates={setButtonStates} />
            </div>
          </div>
          <div className="text-center pt-3">
            <button type="submit" className="btn primary mx-3">Update</button>
            <button type="button" className="btn yellow mx-3" onClick={CancelButton}>Cancel</button>
          </div>
          </div>
        </form>
      </div>
      </div>
      <Footer />
    </>
  );
}

export default UpdateBusRegInfoPage;
