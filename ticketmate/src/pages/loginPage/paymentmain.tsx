
import React from 'react';
import Paymentvisa from '../../Components/payment/Paymentvisa';
import PrimaryNavBar from '../../Components/NavBar/PrimaryNavBar';
import Creditcard from '../../Components/payment/asset/creditcard.png';
import TravelDetails from '../../Components/payment/TravelDetail';
import VisaMasterBtn from '../../Components/payment/VisaMasterBtn';
import Footer from '../../Components/Footer/Footer';
import Selection from '../../Components/payment/Selection';
import Back from '../../Components/payment/Backbutton';
import Payment1 from './payment1';
// import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';



function Payment(){
    return(
        <>
        
        <PrimaryNavBar/> 
        <Back/>
        <div className="container ">
            <div className="row">
              <Selection/>
            </div>
            {/* <div className="row">
              <Payment1/>
            </div> */}
          
           
   
   
     </div>
     <Footer/>
    
        </>
    )
}
export default Payment;