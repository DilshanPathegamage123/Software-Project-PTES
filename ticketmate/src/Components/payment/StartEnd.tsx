import Rec4 from "./asset/rec4.png";
import train from "./asset/train.png";
import Minicar from "./asset/Minicar.png";
import star from "./asset/star.png";
function StartEndLocation() {
  return (
    <>
      <div className="d-flex justify-content align-items-center position-relative img-fluid">
        <img src={Rec4} alt="Rec4" />
        <div className="position-absolute">
          <div className="container">
            <div className="row">
              {/* <div className="col-6"> */}
              {/* <p className="text-black fs-6 fw-normal font-family-Poppins  m-0 ">Driver Name</p> */}
              <div className="col-lg-2 ml-4 mt-2">
                <p>Driver Name</p>
                <img src={train} alt="BusIcon" />
              </div>
              <div className="col-lg-1 ml-5">
                <h3 className="text-dark fs-6 font-family-Poppins text-uppercase  m-0 px-0 py-5">
                  Colombo
                </h3>
              </div>
              <div className="col-lg-1 ml-5 px-4 py-5">
                <img src={Minicar} alt="BusIcon2" />
              </div>
              <div className="col-lg-1 ml-5">
                <h3 className="text-dark fs-6 font-family-Poppins text-uppercase  m-0 px-3 py-5">
                  Badulla
                </h3>
              </div>
              <div className="col-lg-2 ml-5">
                <p className="text-black fs-6 fw-bold font-family-Poppins  m-0 px-0 py-5 mt-3">
                  ND - 7825
                </p>
              </div>
              {/* <div className="col-lg-1 ml-5">
                <div className="bg-success-subtle rounded-3 ">
                  <img src={star} />
                  <p className="text-black text-opacity-75 fs-6 fw-semibold font-family-Poppins  m-0 px-3 py-2">4.6</p>
                </div>
              </div> */}
              <div className="col-lg-1 ml-5 position-relative mt-3">
                <div
                  className="bg-success-subtle rounded-3 px-2 py-0 position-relative"
                  style={{
                    width: "71.748px",
                    height: "26.905px",
                    flexShrink: 0,
                  }}
                >
                    <div className="row d-flex">
                        <div className="col-4"><img src={star} /></div>
                        <div className="col-6"><p  className="text-black text-opacity-75 fs-6 fw-semibold font-family-Poppins m-0 px-0 ">
                    4.6
                  </p></div>

                  {/* py-0  top-0 start-100 translate-middle-y mt-0 mr-2 */}
                    </div>
                  
                  
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <div className="position-relative">
    <img src={Rec4} alt="Rec4" className="img-fluid" />
    <div className="position-absolute top-0 start-0">
        <div className="container">
        <div className='row p-5 rounded-4 sec shadow m-4'>
        <div className='col-lg-2'>
            <img src={train} alt="BusIcon" />
        </div>
        <div className='col-lg-2'>
            <h5>Colomo</h5>
         
        </div>
        <div className='col-lg-2'>
            <img src={Minicar} alt="BusIcon2" />
        </div>
        <div className='col-lg-2'>
            <h5>Badulla</h5>
          
        </div>
        
    </div>
        </div>
    </div>
</div> */}
    </>
  );
}
export default StartEndLocation;
