import React from 'react'
import './SquareButton.css'
import ICON from './assets/Group.png'

function SquareButton(props: any) {
  
  return (
    <>
    <div className="">
            <div className="row pt-3">
                <div className="col-md-3 col-12">
                    <button className="square-btn rounded-4">
                        <img src={ICON} alt="+icon" className='p-2'/>
                        <p>{props.text}</p>
                    </button>
                </div>
            </div> 
    </div> 
    </>
  )
}

export default SquareButton
