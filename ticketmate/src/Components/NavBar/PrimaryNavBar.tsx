import React from "react";
import "./PrimaryNavBar.css";
import LOGO from "./assest/logo.png";
import LOGO2 from "./assest/logopart2.png";
import PrimaryButton from "../Buttons/PrimaryButton";
import "../../vars.css";
import { Link } from "react-router-dom";
//import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";


function PrimaryNavBar() {
  const history = useNavigate();


  return (
    <>


      <nav className="navbar navbar-expand-lg navbar-light bg-light shadow cpadding">
    
        <a className="navbar-brand" href="/">
          {" "}
          <img src={LOGO} alt="LOGO" width="84px" height="37px" />{" "}
          <img src={LOGO2} alt="LOGO2" width="156px" height="22px" />
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarsExample02"
          aria-controls="navbarsExample02"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarsExample02">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <a
                className="nav-link"
                href="#"
                style={{ color: "var(--color-text-dark)" }}
              >
                Home <span className="sr-only">(current)</span>
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link"
                href="#"
                style={{ color: "var(--color-text-dark)" }}
              >
                About us
              </a>
            </li>
          </ul>
          <form className="form-inline my-2 my-md-0 ">
            <div className="pr-3">
             
                {/* <button
                  type="button"
                  className="btn btn-outline-primary btn-sm"
                  onClick={() => {<Link to="/register" />}}
                 
                >
                  SIGN UP
                
                </button>
              */}
              <button
                type="button"
                className="btn btn-outline-primary btn-sm"
                onClick={() => history("/register")}
              >
                SIGN UP
              </button>
            </div>


           <button
              type="button"
              value="SIGN IN"
              color="third"
              className="btn btn-outline-primary btn-sm"
          
            onClick={() => history("/login")}
            
            > SIGN IN
            </button>
          </form>
        </div>

      </nav>
    </>
  );
}

export default PrimaryNavBar;
