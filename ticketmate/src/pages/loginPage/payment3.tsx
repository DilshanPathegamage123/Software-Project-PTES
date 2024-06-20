import SuccessBox from "../../Components/payment/SuccessBox";
import PrimaryNavBar from "../../Components/NavBar/PrimaryNavBar";
import Footer from "../../Components/Footer/Footer1";
import "./payment3.css";

function Payment3() {
  return (
    <>
      <div className="d-flex flex-column min-vh-100" id="payment3_body">
        <PrimaryNavBar />
        <SuccessBox />
        <div className="mt-auto">
          <Footer />
        </div>
      </div>
    </>
  );
}
export default Payment3;
