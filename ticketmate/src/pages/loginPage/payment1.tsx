import React from 'react';
//import Paymentvisa from '../../Components/payment/Paymentvisa';
import PrimaryNavBar from '../../Components/NavBar/PrimaryNavBar';
import Creditcard from '../../Components/payment/asset/creditcard.png';
import TravelDetails from '../../Components/payment/TravelDetail';
import VisaMasterBtn from '../../Components/payment/VisaMasterBtn';
import Footer from '../../Components/Footer/footer';
import Selection from '../../Components/payment/Selection';
import Back from '../../Components/payment/Backbutton';
import './paymentmain.css';
import Paymentvisa from '../../Components/payment/Paymentvisa';

interface BookingData {
   driverId: number;
   
   busBookingId: number;
   busScheduleId: number;
   busId: number;
 
   passengerId: string;
   routeNo: string;
   startLocation: string;
   endLocation: string;
   boardingPoint: string;
   droppingPoint: string;
   startTime: string;
   endTime: string;
   bookingDate: string;
   bookingSeatNO: string;
   bookingSeatCount: string;
   ticketPrice: number;
   totalPaymentAmount: number;
   paymentStatus: boolean;
 
   trainBookingId:number ;
   trainScheduleId: number;
   bookingCarriageNo: number;
   bookingClass: string;
 }

const Payment1:React.FC<BookingData> = (props)=>{
  
    return(
        <>
        <div className='paymentmain'>
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
                  <img src={Creditcard} className="img-fluid ml-0 mr-2 " ></img>
               </div>
               <div className="col-6">
                  <TravelDetails {...props}/> 
               </div>
            </div>
            <div className="row mb-5 d-flex justify-content-center">
               <div className="col-2"></div>
               <div className="col-10">

                 <Paymentvisa {...props}/>

               </div>
            </div>
   
   </div>
     </div>
     {/* <Footer/> */}
    
        </>
    )
}
export default Payment1;
