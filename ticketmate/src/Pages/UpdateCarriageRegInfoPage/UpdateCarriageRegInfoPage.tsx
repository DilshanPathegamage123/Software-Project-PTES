import React, { useState, useEffect } from 'react';
import './UpdateCarriageRegInfoPage.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import SelectBusSeatStructureCarr from '../../Components/SelectBusSeatStructureCarr/SelectBusSeatStructureCarr';
import Swal from 'sweetalert2';
import { useLocation, useNavigate } from 'react-router-dom';
import PrimaryNavBar from '../../Components/NavBar/PrimaryNavBar';
import Footer from '../../Components/Footer/footer';

interface ApiResponse {
  carriageId: number;
  carriageNo: string;
  seatsCount: number;
  length: number;
  width: number;
  height: number;
  weight: number;
  carriageClass: number;
  userId: string;
}

interface ButtonState {
  availability: boolean;
  id: number;
}

function UpdateCarriageRegInfoPage() {

  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const carriageId = queryParams.get('carriageId') ?? '';
  console.log("carriage id " + carriageId);

  const [formData, setFormData] = useState({
    carriageNum: '',
    seatsCount: '',
    length: '',
    width: '',
    height: '',
    weight: '',
    carriageClass: '1', // Default to 'First Class'
    userId: '',
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

  const [buttonStates, setButtonStates] = useState<{ [key: string]: ButtonState }>({});

  useEffect(() => {
    if (carriageId) {
      fetchCarriageData(carriageId);
      fetchSeatData(carriageId);
    }
  }, [carriageId]);

  const fetchCarriageData = async (carriageId: string) => {
    try {
      const response = await axios.get<ApiResponse>(`https://localhost:7001/api/RegCarriage/${carriageId}`);
      const data = response.data;
      setFormData({
        carriageNum: data.carriageNo || '',
        seatsCount: data.seatsCount.toString(),
        length: data.length.toString(),
        width: data.width.toString(),
        height: data.height.toString(),
        weight: data.weight.toString(),
        carriageClass: data.carriageClass.toString(),
        userId: data.userId || '',
      });

    } catch (error) {
      console.error('Error fetching carriage data:', error);
    }
  };

  const fetchSeatData = async (carriageId: string) => {
    try {
      const response = await axios.get(`https://localhost:7001/api/SelCarriageSeatStru/ByCarriageId/${carriageId}`);
      const seatData = response.data.reduce((acc: { [key: string]: ButtonState }, seat: any) => {
        acc[seat.seatId] = { availability: seat.avalability, id: seat.id };
        return acc;
      }, {});
      setButtonStates(seatData);
    } catch (error) {
      console.error('Error fetching seat data:', error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (['seatsCount', 'length', 'width', 'height', 'weight'].includes(name) && !/^\d*$/.test(value)) {
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

  const handleClassChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      carriageClass: e.target.value
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

    setErrors(newErrors);

    if (formValid) {
      Swal.fire({
        title: 'Updating...',
        allowOutsideClick: false,
        showConfirmButton: false
      });
      Swal.showLoading();

      try {
        await axios.put(`https://localhost:7001/api/RegCarriage/${carriageId}`, {
          carriageId: carriageId,
          carriageNo: formData.carriageNum,
          seatsCount: formData.seatsCount,
          length: formData.length,
          width: formData.width,
          height: formData.height,
          weight: formData.weight,
          carriageClass: formData.carriageClass,
          userId: formData.userId,
        });

        const buttonDataSuccess = await storeButtonData(carriageId);

        if (buttonDataSuccess) {
          Swal.close();

          Swal.fire({
            icon: "success",
            title: "Your Carriage Information Successfully Updated",
            showConfirmButton: false,
            timer: 3500
          });

          setTimeout(() => {
            navigate(`/RegisteredCarriagePage?carriageId=${carriageId}`);
          }, 4000);
        } else {
          throw new Error('Button data store failed');
        }

      } catch (error) {
        console.error("Error:", error);
        Swal.fire({
          icon: "error",
          title: "Update failed",
          showConfirmButton: false,
          timer: 2500
        });
      }
    } else {
      Swal.fire({
        icon: "error",
        title: "Update failed",
        showConfirmButton: false,
        timer: 2500
      });
    }
  };

  const storeButtonData = async (carriageId: string): Promise<boolean> => {
    try {
      const buttonDataPromises = Object.entries(buttonStates).map(async ([seatId, { availability, id }]) => {
        if (id === -1) return; // Skip invalid ids
        const buttonData = {
          id: id,
          seatId: seatId,
          avalability: !!availability,
          registeredCarriageCarriageId: parseInt(carriageId),
        };

        console.log("Button Data:", buttonData);

        await axios.put(`https://localhost:7001/api/SelCarriageSeatStru/${id}`, buttonData);

        console.log("Button data stored successfully for carriageId:", carriageId);
      });

      await Promise.all(buttonDataPromises);
      return true;
    } catch (error) {
      console.error('Error storing button data:', error);
      return false;
    }
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
      <PrimaryNavBar />
      <div className='container py-4'>
        <div className='col-12 rounded-4 formSec'>
          <div className='row'>
            <h3 className='h3Style text-center'>Update Carriage Information</h3>
          </div>

          <form onSubmit={handleSubmit}>
            <div className='row'>
              <div className='col-12 col-lg-6 p-3'>
                <div className="form-group row">
                  <label htmlFor="inputCarriageNum" className="col-form-label">Enter Carriage Number</label>
                  <div className="">
                    <input type="text" className="form-control" id="inputCarriageNum" name="carriageNum" placeholder="Carriage Number" value={formData.carriageNum} onChange={handleInputChange} />
                    {errors.carriageNum && <div className="text-danger">{errors.carriageNum}</div>}
                  </div>
                </div>
                <div className="form-group row">
                  <label htmlFor="inputSeatsCount" className="col-form-label">Enter Seat Count</label>
                  <div className="">
                    <input type="number" className="form-control" id="inputSeatsCount" name="seatsCount" placeholder="Seat Count" value={formData.seatsCount} onChange={handleInputChange} />
                    {errors.seatsCount && <div className="text-danger">{errors.seatsCount}</div>}
                  </div>
                </div>
                <div className="form-group row">
                  <label htmlFor="inputLength" className="col-form-label">Enter Length</label>
                  <div className="">
                    <input type="number" className="form-control" id="inputLength" name="length" placeholder="Length" value={formData.length} onChange={handleInputChange} />
                    {errors.length && <div className="text-danger">{errors.length}</div>}
                  </div>
                </div>
                <div className="form-group row">
                  <label htmlFor="inputWidth" className="col-form-label">Enter Width</label>
                  <div className="">
                    <input type="number" className="form-control" id="inputWidth" name="width" placeholder="Width" value={formData.width} onChange={handleInputChange} />
                    {errors.width && <div className="text-danger">{errors.width}</div>}
                  </div>
                </div>
                <div className="form-group row">
                  <label htmlFor="inputHeight" className="col-form-label">Enter Height</label>
                  <div className="">
                    <input type="number" className="form-control" id="inputHeight" name="height" placeholder="Height" value={formData.height} onChange={handleInputChange} />
                    {errors.height && <div className="text-danger">{errors.height}</div>}
                  </div>
                </div>
                <div className="form-group row">
                  <label htmlFor="inputWeight" className="col-form-label">Enter Weight</label>
                  <div className="">
                    <input type="number" className="form-control" id="inputWeight" name="weight" placeholder="Weight" value={formData.weight} onChange={handleInputChange} />
                    {errors.weight && <div className="text-danger">{errors.weight}</div>}
                  </div>
                </div>
                <div className="form-group row">
                  <label className="col-form-label">Select Carriage Class</label>
                  <div className="">
                    <div className="form-check">
                      <input className="form-check-input" type="radio" name="carriageClass" id="firstClass" value="1" checked={formData.carriageClass === '1'} onChange={handleClassChange} />
                      <label className="form-check-label" htmlFor="firstClass">
                        First Class
                      </label>
                    </div>
                    <div className="form-check">
                      <input className="form-check-input" type="radio" name="carriageClass" id="secondClass" value="2" checked={formData.carriageClass === '2'} onChange={handleClassChange} />
                      <label className="form-check-label" htmlFor="secondClass">
                        Second Class
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-lg-6 bg-light2 rounded-4 p-5">
                <h3 className="mb-4 text-center">Update Seat Structure</h3>
                <SelectBusSeatStructureCarr
                  buttonStates={buttonStates}
                  setButtonStates={setButtonStates}
                />
              </div>
            </div>
            <div className='row'>
              <div className='col-12 text-center p-3'>
                <button type='submit' className='btn primary mx-3'>Update</button>
                <button type='button' className='btn white mx-3' onClick={() => CancelButton()}>Cancel</button>
              </div>
            </div>
          </form>
        </div>
      </div>
      <Footer/>
    </>
    
  );
}

export default UpdateCarriageRegInfoPage;
