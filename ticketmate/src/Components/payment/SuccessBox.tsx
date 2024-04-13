import Rec2 from "./asset/rec2.png";
import Checkmark from "./asset/checkmark.png";
// import { Link } from "react-router-dom";


function SuccessBox() {
  const buttonStyle = {
    backgroundColor: "rgb(4,47,64)",
    color: "white", // Optionally change text color to ensure readability

    width: "75%",
    height: "60%",
  };
  //  const usenavigate = useNavigate();
  return (
    <>
      {/* <div className="container">
         <img src={Rec2} className="rounded mx-auto d-block" alt="Rec2"/>
         <div className="centered">Centered</div>
         </div> */}
      <div className="container mt-5">
        <div className="d-flex justify-content-center align-items-center position-relative">
          <img src={Rec2} className="rounded mx-auto d-block" alt="Rec2" />

          <div className="position-absolute top-50 start-50 translate-middle">
            <p
              className="d-flex justify-content-center"
              style={{
                color: "rgb(0,117,124",
                fontFamily: "Poppins",
                fontSize: "20px",
                fontWeight: "Regular",
              }}
            >
              Payment Successful
            </p>
            <div className="d-flex justify-content-center">
              <img src={Checkmark} alt={Checkmark} />
            </div>

            <p
              className="d-flex justify-content-center"
              style={{
                fontFamily: "Poppins",
                fontSize: "16px",
                fontWeight: "Regular",
              }}
            >
              Thank You
            </p>

            {/* <button
              type="button"
              className="btn btn-primary ml-3"
              style={buttonStyle}
              onClick={() => window.location.replace('/payment4}/')}
            >
              Receipt
            </button> */}
          {/* <Link to="/payment4"> */}
            <button
              type="button"
              className="btn btn-primary ml-3"
              style={buttonStyle}
               // Remove the argument from the useNavigate function call
            >
              Receipt
            </button>
          {/* </Link> */}
          </div>
        </div>
      </div>
    </>
  );
}

export default SuccessBox;
