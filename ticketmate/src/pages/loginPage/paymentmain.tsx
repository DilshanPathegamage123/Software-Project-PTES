
import PrimaryNavBar from "../../Components/NavBar/PrimaryNavBar";
import Selection from "../../Components/payment/Selection";
import Back from "../../Components/payment/Backbutton";
import Footer from "../../Components/Footer/Footer1";
// import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

function Payment() {
  return (
    <>
      <PrimaryNavBar />
      <Back />
      <div className="container ">
        <div className="row">
          <Selection />
        </div>
      </div>
      <Footer />
    </>
  );

}
export default Payment;
