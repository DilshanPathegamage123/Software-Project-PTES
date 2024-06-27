import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

function OwnerPage() {

    const location = useLocation();
    const navigate = useNavigate();
    const locationState = location.state || { username: 'Guest', password: '' };
    const [username, setUsername] = useState(locationState.username);
    const [password, setPassword] = useState(locationState.password);
    const [loading, setLoading] = useState(true);

    const getToken = () => {
        return sessionStorage.getItem("token");
      };


    const [userData, setUserData] = useState({
        id: '',
        requestStatus: true,
        ownVehicleType: ''
      });
    
    useEffect(() => {
        if (loading) {
          Swal.fire({
            title: 'Loading...',
            text: 'Please wait while we fetch your data.',
            allowOutsideClick: false,
            allowEscapeKey: false,
            didOpen: () => {
              Swal.showLoading();
            }
          });
        }
    
        if (username !== 'Guest' && password !== '') {
          console.log(`Logged in as: ${username}`);
          console.log(`Password: ${password}`);
    
          // Function to fetch user data
          const fetchUserData = async () => {
            try {
              const response = await fetch(`https://localhost:7001/api/userData/authenticate?userName=${username}&password=${password}`);
              if (!response.ok) {
                throw new Error('Network response was not ok');
              }
              const data = await response.json();
              setUserData({
                id: data.id,
                requestStatus: data.requestStatus,
                ownVehicleType: data.ownVehicleType,
              });
              setLoading(false);
              Swal.close();
    
              // Check the requestStatus and navigate to /loginpage if it is 0
              if (data.requestStatus === 0) {
                navigate('/loginpage');
              }
              if (data.ownVehicleType === 'bus') {
                navigate("/BusOwnerPage", { state: { username, password } });
              }
              if (data.ownVehicleType === 'train') {
                navigate("/TrainOwnerPage", { state: { username, password } });
              }

            } catch (error) {
              console.error('Failed to fetch user data:', error);
              setLoading(false);
              Swal.fire({
                title: 'Error',
                text: 'Failed to fetch user data.',
                icon: 'error',
                confirmButtonText: 'OK'
              });
            }
          };
    
          fetchUserData();
        } else {
          setLoading(false);
          Swal.close();
        }
      }, [username, password, loading, navigate]);
    
  return (
    <>

    </>
  )
}

export default OwnerPage
