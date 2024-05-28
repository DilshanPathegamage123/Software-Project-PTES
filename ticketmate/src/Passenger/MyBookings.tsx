// import React from 'react'
// import './MyBookings.css'
// import BusIcon from './images/fa6-solid_bus.png'
// import BusIcon2 from './images/Group 391.png'
// import PrimaryButton from '../Components/Buttons/PrimaryButton'

// function MyBookings() {
//   return (
//     <>
//     <div className='row p-5 rounded-4 sec shadow m-4'>
//         <div className='col-lg-2'>
//             <img src={BusIcon} alt="BusIcon" />
//         </div>
//         <div className='col-lg-2'>
//             <h5>Colomo</h5>
//             <p>oct 10, 5:50am</p>
//         </div>
//         <div className='col-lg-2'>
//             <img src={BusIcon2} alt="BusIcon2" />
//         </div>
//         <div className='col-lg-3'>
//             <h5>Badulla</h5>
//             <p>oct 10, 5:50am</p>
//         </div>
//         <div className='col-lg-1'>
//             <PrimaryButton value="View" type="button" color="primary"/>
//         </div>
//         <div className='col-lg-1'>
//             <PrimaryButton value="Edit" type="button" color="primary"/>
//         </div>
//         <div className='col-lg-1'>
//             <PrimaryButton value="cancel" type="button" color="primary"/>
//         </div>
//     </div>

//     <div className='row p-5 rounded-4 sec shadow m-4'>
//         <div className='col-lg-2'>
//             <img src={BusIcon} alt="BusIcon" />
//         </div>
//         <div className='col-lg-2'>
//             <h5>Colomo</h5>
//             <p>oct 10, 5:50am</p>
//         </div>
//         <div className='col-lg-2'>
//             <img src={BusIcon2} alt="BusIcon2" />
//         </div>
//         <div className='col-lg-3'>
//             <h5>Badulla</h5>
//             <p>oct 10, 5:50am</p>
//         </div>
//         <div className='col-lg-1'>
//             <PrimaryButton value="View" type="button" color="primary"/>
//         </div>
//         <div className='col-lg-1'>
//             <PrimaryButton value="Edit" type="button" color="primary"/>
//         </div>
//         <div className='col-lg-1'>
//             <PrimaryButton value="cancel" type="button" color="primary"/>
//         </div>
//     </div>

//     <div className='row p-5 rounded-4 sec shadow m-4'>
//         <div className='col-lg-2'>
//             <img src={BusIcon} alt="BusIcon" />
//         </div>
//         <div className='col-lg-2'>
//             <h5>Colomo</h5>
//             <p>oct 10, 5:50am</p>
//         </div>
//         <div className='col-lg-2'>
//             <img src={BusIcon2} alt="BusIcon2" />
//         </div>
//         <div className='col-lg-3'>
//             <h5>Badulla</h5>
//             <p>oct 10, 5:50am</p>
//         </div>
//         <div className='col-lg-1'>
//             <PrimaryButton value="View" type="button" color="primary"/>
//         </div>
//         <div className='col-lg-1'>
//             <PrimaryButton value="Edit" type="button" color="primary"/>
//         </div>
//         <div className='col-lg-1'>
//             <PrimaryButton value="cancel" type="button" color="primary"/>
//         </div>
//     </div>
//     </>
//   )
// }

// export default MyBookings





import React from "react";
import "./MyBookings.css";
import BusIcon from "./images/fa6-solid_bus.png";
import BusIcon2 from "./images/Group 391.png";
import PrimaryButton from "../Components/Buttons/PrimaryButton";

function MyBookings() {
  return (
    <>
      <div className="row p-5 rounded-4 sec shadow m-4 h-auto  ">
        <div className="col-lg-1 align-items-center justify-content-center m-auto d-grid pb-1 ">
          <img src={BusIcon} alt="BusIcon" />
        </div>
        <div className="col-lg-2 align-items-center justify-content-center m-auto d-grid  ">
          <h5 className="align-items-center justify-content-center m-auto">
            Colombo
          </h5>
          <p className="align-items-center justify-content-center m-auto">
            oct 10, 5:50am
          </p>
        </div>
        <div className="col-lg-2 align-items-center justify-content-center m-auto d-grid  ">
          <img src={BusIcon2} alt="BusIcon2" />
        </div>
        <div className="col-lg-2 align-items-center justify-content-center m-auto d-grid ">
          <h5 className="align-items-center justify-content-center m-auto">
            Badulla
          </h5>
          <p className="align-items-center justify-content-center m-auto">
            oct 10, 5:50am
          </p>
        </div>
        <div className="col col-lg-4 col-12 align-items-center justify-content-center d-flex  m-auto pt-1 ">
          <div className=" col-lg-1 col-2  m-0 align-items-center justify-content-center d-flex  m-auto">
            <PrimaryButton
              value="View"
              type="button"
              color="primary"
              className=" m-0 p-0 "
            />
          </div>
          <div className="col-lg-1 col-2 m-0 align-items-center justify-content-center d-flex  m-auto  ">
            <PrimaryButton
              value="Edit"
              type="button"
              color="primary"
              className=" m-0 "
            />
          </div>
          <div className="col-lg-1 col-2 m-0 align-items-center justify-content-center d-flex  m-auto ">
            <PrimaryButton
              value="cancel"
              type="button"
              color="primary"
              className=" m-0 p-0  "
            />
          </div>
        </div>
      </div>

      
    </>
  );
}

export default MyBookings;