import React, { useState } from 'react';
import Visa from './asset/visa.png';
import Master from './asset/Mastercard.png';

function VisaMasterBtn(){

  const [visaButtonClicked, setVisaButtonClicked] = useState(false);
  const [masterButtonClicked, setMasterButtonClicked] = useState(false);

  const buttonStyle1 =  {
    backgroundColor: visaButtonClicked ? 'rgb(0, 117, 124)' : 'rgb(246, 246, 246)',
    // backgroundColor: 'rgb(0, 117, 124)',
    color: 'black', // Optionally change text color to ensure readability
    width: '100%',
    height: '100%',
    
  };
  const buttonStyle2 = {
    backgroundColor: masterButtonClicked ? 'rgb(0, 117, 124)' : 'rgb(246, 246, 246)',
    // backgroundColor: 'rgb(246, 246, 246)',
    // color: 'white', // Optionally change text color to ensure readability
    width: '100%',
    height: '100%',
    color: 'black',
  };

  const handleVisaPaymentClick = () => {
    setVisaButtonClicked(true);
    setMasterButtonClicked(false); 
  }

  const handleMasterPaymentClick = () => {
    setMasterButtonClicked(true);
    setVisaButtonClicked(false); 
  };


    return(
        <div>
           
<div className="row">
  <div className="col-2">
    <button type="button" className="btn btn-w-100" style={buttonStyle1} onClick={handleVisaPaymentClick}>
      <img src={Visa} alt="visa" className='button-image me-3' />
      Visa
    </button>
  </div>
  <div className="col-2">
    <button type="button" className="btn btn-lg w-100" style={buttonStyle2} onClick={handleMasterPaymentClick}>
      <img src={Master} alt="master" className='button-image me-3' />
      Master
    </button>
  </div>
</div>

            
        </div>
    )
}
export default VisaMasterBtn;












