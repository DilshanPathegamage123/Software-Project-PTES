import React from 'react';
//import Paymentvisa from '../../Components/payment/Paymentvisa';
import PrimaryNavBar from '../../Components/NavBar/PrimaryNavBar';
import Creditcard from '../../Components/payment/asset/creditcard.png';
import TravelDetails from '../../Components/payment/TravelDetail';
import VisaMasterBtn from '../../Components/payment/VisaMasterBtn';
import Footer from '../../Components/Footer/footer';
import Selection from '../../Components/payment/Selection';
import Back from '../../Components/payment/Backbutton';


function Payment1(){
    return(
        <>
        
        {/* <PrimaryNavBar/> 
        <Back/> */}
        <div className="container ">
            {/* <div className="row">
              <Selection/>
            </div> */}
            <div className="row mt-4">
              <div className="col-1"></div>
              <div className="col-11">
                <VisaMasterBtn/>
              </div>
            </div>
            <div className="row mt-4">
               <div className="col-2"></div>
               <div className="col-4 ">
                  <img src={Creditcard} className="img-fluid ml-auto" ></img>
               </div>
               <div className="col-6">
                  <TravelDetails/> 
               </div>
            </div>
            <div className="row mb-5 d-flex justify-content-center">
               <div className="col-2"></div>
               <div className="col-10">
                 {/* <Paymentvisa/> */}
               </div>
            </div>
   
   
     </div>
     {/* <Footer/> */}
    
        </>
    )
}
export default Payment1;
