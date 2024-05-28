import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import './Paymentvisa.css'
import SelectMonth from './SelectMonth';
import SelectYear from './SelectYear';
import Passenger from './Passenger';
import PayNowbtn from './PayNowbtn';

function Paymentvisa() {
    const [cardNumber, setCardNumber] = useState('');
    const [cvv, setCVV] = useState('');
    const [isCardNumberValid, setIsCardNumberValid] = useState(true);
    const [isCVVValid, setIsCVVValid] = useState(true);


  

    const handleCardNumberChange = (event: { target: { value: any; }; }) => {
        const { value } = event.target;
        setCardNumber(value);
        setIsCardNumberValid(validateCardNumber(value));
    };

    const handleCVVChange = (event: { target: { value: any; }; }) => {
        const { value } = event.target;
        setCVV(value);
        setIsCVVValid(validateCVV(value));
    };

    const validateCardNumber = (cardNumber: string) => {
        // Simple Luhn algorithm validation
        const sanitizedInput = cardNumber.replace(/\D/g, '');
        let sum = 0;
        let shouldDouble = false;
        for (let i = sanitizedInput.length - 1; i >= 0; i--) {
            let digit = parseInt(sanitizedInput.charAt(i));
            if (shouldDouble) {
                if ((digit *= 2) > 9) digit -= 9;
            }
            sum += digit;
            shouldDouble = !shouldDouble;
        }
        return sum % 10 === 0;
    };
    const validateCVV = (cvv: string) => {
        return /^[0-9]{3}$/.test(cvv);
    };
    return(
<>

<div className="container">
    <div className="row">
        <div className="col-6">
            
                
                
                    <form>
                    <div className="form-group">                           
                            <input type="text" className="form-control" placeholder="John Henry" aria-label="name" />
                        </div>
                        <div className="form-group">        
                           <label> <input type="text"  className={`form-control ${!isCardNumberValid ? 'is-invalid' : ''}`} placeholder="45** **** **** 3947" aria-label="cardno" value={cardNumber} onChange={handleCardNumberChange}/>
                           {!isCardNumberValid && <div className="invalid-feedback">Invalid card number</div>}
                           </label>
                        </div>
                        {/* <div className="form-group" style={{ display: 'flex', alignItems: 'center' }}>                        
                           <SelectMonth/>
                           <SelectYear/>
                        </div> */}
                        <div className="row g-5">
                        <div className="col-md-4">
                        <SelectMonth/>
                        </div>
                        {/* <div className="col-md-1"></div> */}
                        <div className="col-md-4 ml-4">
                        <SelectYear/>
                        </div>
                        </div>
                        <div className="form-group" style={{ display: 'flex', alignItems: 'center' }}>                            
                        <input
                                    type="text"
                                    className={`form-control ${!isCVVValid ? 'is-invalid' : ''}`}
                                    placeholder="145"
                                    style={{ width: 162.19, marginRight: '14px'}}
                                    value={cvv}
                                    onChange={handleCVVChange}
                                />
                            <p style={{ width: '162.19px', margin: 0, fontSize:11, color:'grey'}} >3 or 4 digits usually found on the signature strip</p>
                            {!isCVVValid && <div className="invalid-feedback">Invalid CVV</div>}
                        </div>
                        <div className="form-check form-switch">
                        <label className="form-check-label ml-0" htmlFor="flexSwitchCheckDefault">SET AS DEFAULT</label> 
                        <input className="form-check-input ml-3" type="checkbox" role="switch" id="flexSwitchCheckDefault"/>
                        </div>
                        <div className="form-check form-check-inline">
                        <input className="form-check-input mt-2" type="checkbox" id="inlineCheckbox1" value="option1"/>
                        <label className="form-check-label ml-2" htmlFor="inlineCheckbox1" style={{ fontStyle: 'italic', fontSize: '12px'}}>By Continuing your agree to our <a href='#'>Terms and Conditions.</a></label>
                        </div>

                    </form>
                
            
           
        </div>
        
        <div className="col-6 mt-5">
            <Passenger/>
            <PayNowbtn /> 
            </div>
          
    </div>
</div>

</>
    )
}
export default Paymentvisa;






function validateCVV(value: any): React.SetStateAction<boolean> {
    throw new Error('Function not implemented.');
}
// import './Paymentvisa.css';
// import SelectMonth from './SelectMonth';
// import SelectYear from './SelectYear';

// function Paymentvisa() {
//   return (
//     <>
//       <div className="container">
//         <div className="row">
//           <div className="col-md-7">
//             <div className="card-body">
//               <form>
//                 <div className="mb-3">
//                   <input type="text" className="form-control" id="name" placeholder="John Henry" />
//                 </div>
//                 <div className="mb-3">                  
//                   <input type="text" className="form-control" id="cardNumber" placeholder="45** **** **** 3947" />
//                 </div>
//                 <div className="row mb-3">
//                   <div className="col-md-3">                   
//                     <SelectMonth />
//                   </div>
//                   <div className="col-md-3">                
//                     <SelectYear />
//                   </div>
//                 </div>
//                 <div className="mb-3 d-flex align-items-center">
//                   <input type="text" className="form-control" placeholder="145" style={{ width: '162.19px', marginRight: '14px' }} />
//                   {/* <p style={{ fontSize: '11px', color: 'grey' }}>3 or 4 digits usually found on the signature strip</p> */}
//                   <p style={{ width: '162.19px', margin: 0, fontSize:11, color:'grey'}}>3 or 4 digits usually found on the signature strip</p>

//                 </div>
//                 <div className="mb-3 form-check form-switch">
//                   <input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault" />
//                   <label className="form-check-label" htmlFor="flexSwitchCheckDefault">SET AS DEFAULT</label>
//                 </div>
//                 <div className="mb-3 form-check form-check-inline">
//                   <input className="form-check-input" type="checkbox" id="inlineCheckbox1" value="option1" />
//                   <label className="form-check-label" htmlFor="inlineCheckbox1" style={{ fontStyle: 'italic', fontSize: '12px' }}>
//                     By continuing, you agree to our <a href='#'>Terms and Conditions</a>.
//                   </label>
//                 </div>
//               </form>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

// export default Paymentvisa;



