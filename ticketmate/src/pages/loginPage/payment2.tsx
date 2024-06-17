import React from 'react';
import PrimaryNavBar from '../../Components/NavBar/PrimaryNavBar';
import TravelDetails from '../../Components/payment/TravelDetail';
import Paassenger from '../../Components/payment/Passenger';
import PayNowbtn from '../../Components/payment/PayNowbtn';
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";


function Payment2(){

    // let location = useLocation();
    // let { userId, tripId } = location.state;
    // console.log(userId, tripId);
    // const history = useNavigate();


 
    return(
        <>
        
        {/* <PrimaryNavBar/> 
        <Back/> */}
        <div className="container ">
        {/* <div className="row ">
              <Selection/>
            </div> */}
          
            <div className="row mt-4 justify-content-center">
            <div className="col-3"></div>
            <div className="col-6">
                 <TravelDetails/>    
            </div>
            <div className="col-3"></div>  
            </div>

            <div className="row mt-4 justify-content-center">
            <div className="col-2"></div>
            <div className="col-10">
                 <Paassenger/>    
            </div>
           
            </div>
                 
           
            <div className="row mt-4 justify-content-center">
            <div className="col-2"></div>
            <div className="col-10">
            <div className="form-check form-check-inline">
                        <input className="form-check-input mt-2" type="checkbox" id="inlineCheckbox1" value="option1"/>
                        <label className="form-check-label ml-2" htmlFor="inlineCheckbox1" style={{ fontStyle: 'italic', fontSize: '20px'}}>By Continuing your agree to our <a href='#'>Terms and Conditions.</a></label>
                        </div>
            </div>
            </div>
            <div className="row mt-4 justify-content-center">
           
            <div className="col-2"> </div>
            <div className="col-10"><PayNowbtn/>
            <div className="d-grid">

        </div>
                  </div>
            </div>
   
   
     </div>
     {/* <Footer/> */}
    
        </>
    )
}
export default Payment2;
