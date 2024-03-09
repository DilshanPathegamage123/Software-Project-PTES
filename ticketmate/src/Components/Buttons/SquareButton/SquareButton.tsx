import React from 'react'
import './SquareButton.css'
import ICON from './assets/Group.png'

function SquareButton(props: any) {

  const bwidth = props.bwidth - 24;

  return (
    <>
    <div className="">
            <div className="row pt-3">
                <div className="col-12">
                    <button className="square-btn rounded-4" style={{ width: bwidth ? `${bwidth}px` : 'auto', height: bwidth ? `${bwidth}px` : 'auto' }}>
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
