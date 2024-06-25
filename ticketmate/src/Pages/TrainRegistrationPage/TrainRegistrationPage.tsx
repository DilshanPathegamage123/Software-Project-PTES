import React, { useState, useEffect } from 'react';
import './TrainRegistrationPage.css';
import PrimaryNavBar from '../../Components/NavBar/PrimaryNavBar';
import Footer from '../../Components/Footer/footer';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, useLocation } from 'react-router-dom';
import LocomotiveRegistrationForm from '../../Components/LocomotiveRegistrationForm/LocomotiveRegistrationForm';
import CarriageRegistrationForm from '../../Components/CarriageRegistrationForm/CarriageRegistrationForm';

function TrainRegistrationPage() {
  const [activeForm, setActiveForm] = useState('locomotive');
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const userId = queryParams.get('id');
  console.log("user id " + userId);

  useEffect(() => {
    // By default, show the LocomotiveRegistrationForm
    setActiveForm('locomotive');
  }, []);

  const renderForm = () => {
    if (activeForm === 'locomotive') {
      return <LocomotiveRegistrationForm />;
    } else if (activeForm === 'carriage') {
      return <CarriageRegistrationForm />;
    }
  };

  const buttonStyle = (formType:any) => ({
    backgroundColor: activeForm === formType ? '#00757c' : '#fff',
    color: activeForm === formType ? '#fff' : '#000',
    borderColor: '#00757c',
    width: '100%',
  });

  return (
    <>
      <PrimaryNavBar />
      <div className='container py-5'>
        <div className='col-12 rounded-4 formSec'>
          <div className='row px-sm-4'>
            <div className='col-sm-6 p-2 d-flex justify-content-center'>
              <button
                className='btn'
                style={buttonStyle('locomotive')}
                onClick={() => setActiveForm('locomotive')}
              >
                Register a new Locomotive
              </button>
            </div>
            <div className='col-sm-6 p-2 d-flex justify-content-center'>
              <button
                className='btn'
                style={buttonStyle('carriage')}
                onClick={() => setActiveForm('carriage')}
              >
                Register a new Carriage
              </button>
            </div>
          </div>
          <div className='row'>
            {renderForm()}
          </div>
        </div>
      </div>
      <ToastContainer />
      <Footer />
    </>
  );
}

export default TrainRegistrationPage;
