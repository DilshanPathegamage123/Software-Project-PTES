import PrimaryNavBar from "../../Components/NavBar/PrimaryNavBar";
import Footer from "../../Components/Footer/footer";
import "./payment4.css";
import Receipt from "../../Components/payment/Receipt";

function Payment4(){
    return(
        <>
          <div className="d-flex flex-column min-vh-100">
            <PrimaryNavBar />
            <Receipt/>
            <div className="mt-auto">
                <Footer />
            </div>
        </div>
        </>
    )
}
export default Payment4;
