import React from "react";
import "./HomeContent.css";
import HomeImg1 from "./AssertHomePage/HomeImg2.png";
import HomeImg2 from "./AssertHomePage/HomeImg3.png";

export default function HomeContent() {
  return (
    <>
      {/*Section 1 */}
      <div className=" HomeContent container p-0 col-lg-12 mt-4 py-2  ">
        <div className="row row-cols-1  row-cols-lg-2  pt-4 pb-4  m-auto  ">
          <div className="HomeTextContent1 col col-lg-7  col-12 m-auto   ">
            <div className="para1  ">
              <h2>
                <b> Welcome to TicketMate Booking Hub </b>
              </h2>
            </div>
            <br />
            <div className="para2 h3 ">
              <h5>Simplifying Your Daily Commute</h5>
            </div>
            <br />
            <div className="para3 ">
              <p>
                TicketMate is your go-to platform for effortless daily travel.
                Say goodbye to the complexities of daily commuting and embrace a
                stress-free journey with our comprehensive public transport
                booking system
              </p>
            </div>
          </div>

          <div className="HomeImg1  col col-lg-4 col-12 m-auto ">
            <img src={HomeImg1} alt="HomeImg1" className="img-fluid" />
          </div>
        </div>
      </div>

      {/*Section 2 */}

      <div className=" section2 container row row-cols-1 row-cols-lg-2  pt-4 pb-4  align-content-center ms-auto me-auto mb-auto      ">
        <div className=" sectioncolumn1 col-lg-5 col-12 align-content-start    ">
          <div className="para4  ">
            <p>
              <b> Why Choose Ticketmate?</b>
            </p>
          </div>

          <div className="para5 ">
            <p>
              <b>Daily Convenience:</b> Streamline your daily commute with our
              user-friendly platform. Booking your daily transport has never
              been easier. <br />
              <b>Comprehensive Network:</b> Access a wide range of buses, trams,
              and shuttles covering your city. We partner with local transit
              authorities to ensure seamless connectivity. <br />
              <b>Reliable Service:</b> Count on us for punctual and reliable
              services. Our commitment is to make sure you reach your
              destination on time, every time. <br />
              <b>Secure Transactions:</b> Your safety is our priority. Rest
              assured that your transactions are secure, and your information is
              kept confidential.
            </p>
          </div>
        </div>

        <div className=" sectioncolumn2 col-lg-5 col-12  align-content-end  ">
          <img
            src={HomeImg2}
            alt="HomeImg1"
            className="img-fluid align-content-center "
          />
        </div>
      </div>

      {/*Section 3 */}

      <div className="section3  container pt-3 pb-3  mt-4 mb-4  ">
        <div className="row section3row1 h-auto pt-4 ">
          <div className="para4  ">
            <p>
              <b>Start Your Effortless Commute Today!</b>
            </p>
          </div>
          <div className="para6 ">
            <p>
              Ready to transform your daily commute? Join UrbanCommute today and
              experience the ease of daily public transport booking. Sign up for
              free and take the first step towards stress-free daily travel.
            </p>
          </div>
        </div>
        <div className="row container section3row2 row-cols-1 row-cols-lg-2 h-auto   ">
          <div className="col container  section3col col-lg-4 col-12  ms-auto  me-auto mb-3   ">
            <button type="button" className="btn SignUpNow btn-sm ">
              Sign Up Now
            </button>
          </div>
          <div className="col  container section3col col-lg-4 col-12  ms-auto me-auto mb-0  ">
            <button type="button" className="btn ExploreRoutesButton btn-sm ">
              Explore Routes
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
