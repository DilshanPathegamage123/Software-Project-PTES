// import Rec1 from './asset/Rec1.png';
// import Creditcard from './asset/credit-card.png';
// import Wallet from './asset/wallet.png';
// function Selection(){
//     return (
//     <>
//     <div className="container mt-2">
   
//     <div className="card" style={{border:'none'}}>
//         <img src={Rec1} className="card-img " alt="Rec1"></img>
//         <div className="card-img-overlay">
         
//               <p className="card-text " style={{color:'rgb(0,168,141', fontFamily:'Inter', fontSize:'26px', fontWeight:'semibold'}}>Select your payment method.</p>  
//               {/* <div className="container">  
//               <div className="row"> 
//               <div className="col-6">
//               <div className="form-check form-check-inline">
//                  <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="option1"/>
//                   <img src={Creditcard} alt="visa" className='button-image me-3' />
//                   <label className="form-check-label" htmlFor="inlineRadio1">Creddit/Debit Card</label>
//               </div>
//               </div>
//               <div className="col-6">
//               <div className="form-check form-check-inline">
//                   <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="option2"/>
//                   <img src={Wallet} alt="visa" className='button-image me-3' />
//                   <label className="form-check-label" htmlFor="inlineRadio2">Cash</label>
//                </div>
//                </div>
//                </div>
//                </div> */}
//             <div className="container">
//                 <div className="row">
//                     <div className="col-4 d-flex align-items-center">
//               <div className="form-check form-check-inline">
//               {/* <label className="form-check-label" htmlFor="inlineRadio1"> */}
//               <input className="form-check-input mt-2" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="option1" />
//               <img src={Creditcard} alt="visa" className='button-image me-3' />
//               Credit/Debit Card
//               {/* </label> */}
//              </div>
//               </div>
//               <div className="col-8 d-flex align-items-center">
//               <div className="form-check form-check-inline">
//               {/* <label className="form-check-label" htmlFor="inlineRadio2"> */}
//               <input className="form-check-input mt-2" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="option2" />
//               <img src={Wallet} alt="visa" className='button-image me-3 ' />
//               Cash
//               {/* </label> */}
//               </div>
//               </div>
//             </div>
//                </div>
             
//             </div>
       
//     </div>
//     </div>
//     </>
       
//     )
// }
// export default Selection;

// import React, { useState } from 'react';
// import Rec1 from './asset/Rec1.png';
// import Creditcard from './asset/credit-card.png';
// import Wallet from './asset/wallet.png';
// import Payment1 from '../../pages/loginPage/payment1';
// import Payment2 from '../../pages/loginPage/payment2';

// function Selection(){

//     const [selectedOption, setSelectedOption] = useState('payment1');

//     const handleOptionChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
//       setSelectedOption(event.target.value);
//     };


//     return (
//     <>
//     <div className="container mt-2">
   
//     <div className="card" style={{border:'none'}}>
//         <img src={Rec1} className="card-img " alt="Rec1"></img>
//         <div className="card-img-overlay">
//          <p className="card-text " style={{color:'rgb(0,168,141', fontFamily:'Inter', fontSize:'26px', fontWeight:'semibold'}}>Select your payment method.</p>
//                 <div className="container">
//                     <div className="row">
//                       <div className="col-4 d-flex align-items-center">
//                         <div className="form-check form-check-inline">
//                         <input className="form-check-input mt-2" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="payment1"  checked={selectedOption === 'payment1'} onChange={handleOptionChange}/>
//                         <img src={Creditcard} alt="visa" className='button-image me-3' />
//                         Credit/Debit Card
//                         </div>
//                       </div>
//                      <div className="col-8 d-flex align-items-center">
//                        <div className="form-check form-check-inline">
//                        <input className="form-check-input mt-2" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="payment2" checked={selectedOption === 'payment2'} onChange={handleOptionChange}/>
//                        <img src={Wallet} alt="visa" className='button-image me-3 ' />
//                        Cash
//                        </div>
//                      </div>
//                     </div>
//                </div>
             
//         </div>
       
//     </div>
//     {selectedOption === 'payment1' && <Payment1 />}
//     {selectedOption === 'payment2' && <Payment2 />}
//     </div>
//     </>    )
// }
// export default Selection;  


import React, { useState } from 'react';
import Rec1 from './asset/Rec1.png';
import Creditcard from './asset/credit-card.png';
import Wallet from './asset/wallet.png';
import Payment1 from '../../pages/loginPage/payment1';
import Payment2 from '../../pages/loginPage/payment2';

function Selection(){

    const [selectedOption, setSelectedOption] = useState('payment1');
    
    
    const handleOptionChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
      setSelectedOption(event.target.value);
    };
    

    return (
    <>
    <div className="container mt-2">
   
    <div className="card" style={{border:'none'}}>
        <img src={Rec1} className="card-img " alt="Rec1"></img>
        <div className="card-img-overlay">
         <p className="card-text " style={{color:'rgb(0,168,141', fontFamily:'Inter', fontSize:'26px', fontWeight:'semibold'}}>Select your payment method.</p>
                <div className="container">
                    <div className="row">
                      <div className="col-4 d-flex align-items-center">
                        <div className="form-check form-check-inline">
                        <input className="form-check-input mt-2" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="payment1"  checked={selectedOption === 'payment1'} onChange={handleOptionChange}/>
                        <img src={Creditcard} alt="visa" className='button-image me-3' />
                        Credit/Debit Card
                        </div>
                      </div>
                     <div className="col-8 d-flex align-items-center">
                       <div className="form-check form-check-inline">
                       <input className="form-check-input mt-2" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="payment2" checked={selectedOption === 'payment2'} onChange={handleOptionChange}/>
                       <img src={Wallet} alt="visa" className='button-image me-3 ' />
                       Cash
                       </div>
                     </div>
                    </div>
               </div>
             
        </div>
       
    </div>
    {selectedOption === 'payment1' && <Payment1 />}
    {selectedOption === 'payment2' && <Payment2 />}
    </div>
    </>    )
}
export default Selection;  
