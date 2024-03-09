import React from 'react'
import PrimaryNavBar from '../../Components/NavBar/PrimaryNavBar'
import Footer from '../../Components/Footer/Footer'
import './CreateBusJourneyPage.css'
import PrimaryButton from '../../Components/Buttons/PrimaryButton'

function CreateBusJourneyPage() {
  return (
    <>
        <PrimaryNavBar/>
      <div className='container-fluid py-4'>
        <div className='col-12 rounded-4 formSec'>
          <div className='row'>
            <h3 className='h3Style text-center'>Schedule a Bus Journey</h3>
          </div>
          <form action="">
          <div className='row'>
            
              <div className='col-12 p-3'>
                <div className="form-group row">
                    <label htmlFor="inputbusNum" className="col-form-label">Enter Bus Number</label>
                    <div className="">
                      <input type="text" className="form-control" id="inputbusNum" placeholder="Bus Number"/>
                    </div>
                </div>
                <div className="form-group row">
                    <label htmlFor="inputLicencenum" className="col-form-label">Driver ID</label>
                    <div className="">
                      <input type="text" className="form-control" id="inputLicencenum" placeholder="Enter Driver ID"/>
                    </div>
                </div>
                <div className="form-group row">
                    <div className='col-md-4'>
                        <label htmlFor="inputLicencenum" className="col-form-label">Rout No</label>
                        <div className="">
                        <input type="text" className="form-control" id="inputLicencenum" placeholder="Enter Rout No"/>
                        </div>
                    </div>
                    <div className='col-md-8'>
                        <label htmlFor="inputLicencenum" className="col-form-label">Rout Name</label>
                        <div className="">
                        <input type="text" className="form-control" id="inputLicencenum" placeholder="Enter Rout Name"/>
                        </div>
                    </div>
                </div>

                <div className="form-group row">
                    <div className='col-md-4'>
                        <label htmlFor="inputLicencenum" className="col-form-label">Date</label>
                        <div className="">
                        <input type="text" className="form-control" id="inputLicencenum" placeholder="Enter Date"/>
                        </div>
                    </div>
                    <div className='col-md-4'>
                        <label htmlFor="inputLicencenum" className="col-form-label">Departure Time</label>
                        <div className="">
                        <input type="text" className="form-control" id="inputLicencenum" placeholder="Enter Departure Time"/>
                        </div>
                    </div>
                    <div className='col-md-4'>
                        <label htmlFor="inputLicencenum" className="col-form-label">Arrival Time</label>
                        <div className="">
                        <input type="text" className="form-control" id="inputLicencenum" placeholder="Enter Arrival Time"/>
                        </div>
                    </div>
                </div>

                <div className="form-group row">
                    <label htmlFor="exampleFormControlFile1">Attach Rout Permit</label>
                    <input type="file" className="form-control-file" id="exampleFormControlFile1"/>
                </div>

                <div className="row">
                    <p>Select the Bus Stops</p>
                    <div className='d-flex flex-wrap'>
                        <div className="form-check px-4">
                            <input className="form-check-input" type="checkbox" value="" id="CheckB1"/>
                            <label className="form-check-label" htmlFor="CheckB1">
                                Bus stop1
                            </label>
                        </div>
                        <div className="form-check px-4">
                            <input className="form-check-input" type="checkbox" value="" id="CheckB2" />
                            <label className="form-check-label" htmlFor="CheckB2">
                                Bus stop2
                            </label>
                        </div>
                        <div className="form-check px-4">
                            <input className="form-check-input" type="checkbox" value="" id="CheckB3" />
                            <label className="form-check-label" htmlFor="CheckB3">
                                Bus stop1
                            </label>
                        </div>
                        <div className="form-check px-4">
                            <input className="form-check-input" type="checkbox" value="" id="CheckB3" />
                            <label className="form-check-label" htmlFor="CheckB3">
                                Bus stop4
                            </label>
                        </div>
                        <div className="form-check px-4">
                            <input className="form-check-input" type="checkbox" value="" id="CheckB3" />
                            <label className="form-check-label" htmlFor="CheckB3">
                                Bus stop5
                            </label>
                        </div>
                        <div className="form-check px-4">
                            <input className="form-check-input" type="checkbox" value="" id="CheckB3" />
                            <label className="form-check-label" htmlFor="CheckB3">
                                Bus stop6
                            </label>
                        </div>
                        <div className="form-check px-4">
                            <input className="form-check-input" type="checkbox" value="" id="CheckB3" />
                            <label className="form-check-label" htmlFor="CheckB3">
                                Bus stop6
                            </label>
                        </div>
                        <div className="form-check px-4">
                            <input className="form-check-input" type="checkbox" value="" id="CheckB3" />
                            <label className="form-check-label" htmlFor="CheckB3">
                                Bus stop6
                            </label>
                        </div>
                        <div className="form-check px-4">
                            <input className="form-check-input" type="checkbox" value="" id="CheckB3" />
                            <label className="form-check-label" htmlFor="CheckB3">
                                Bus stop6
                            </label>
                        </div>
                        <div className="form-check px-4">
                            <input className="form-check-input" type="checkbox" value="" id="CheckB3" />
                            <label className="form-check-label" htmlFor="CheckB3">
                                Bus stop6
                            </label>
                        </div>
                    </div>
                </div>

                <div className='row pt-4'>
                    <div className='d-flex justify-content-center'>
                        <div className='px-3'>
                            <PrimaryButton type="submit" value="Submit" color="third"/>
                        </div>
                        <div className='px-3'>
                            <PrimaryButton type="submit" value="Cancel" color="third"/>
                        </div>
                        
                    </div>
                        
                </div>
                
              </div>
            
          </div>
          </form>

        </div>
        
      </div>
      <Footer/>
    </>
  )
}

export default CreateBusJourneyPage
