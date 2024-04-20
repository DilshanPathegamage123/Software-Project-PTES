import React from 'react'
import { useNavigate } from 'react-router-dom';
import './Button.css'

//const history = useNavigate();
function PrimaryButton(props: any) {
    const color = props.color;
    const Block = props.IsBlock? "btn-block" : "";
    const size = props.IsSmall? "btn-sm" : "";
    // const history = useHistory();
    let classColor;

    if (color == "primary"){
      classColor = "primary"
    }
    else if (color == "secondary"){
      classColor = "secondary"
    }
    else if (color == "third"){
      classColor = "third"
    }
    else if (color == "yellow"){
      classColor = "yellow"
    }  

    const buttonStyles = {
      width: props.width,
    };


    const LINK = () => {
      window.location.href = props.link;
    }

    // const handleClick=()=>{
    //   history(props.link)
    // }

    return (
      <>
          <div>
              <input type={props.type} className={`btn btn-primary ${classColor} ${Block} ${size}`} value={props.value}  style={buttonStyles} onClick={LINK}/>


          </div>
      </>
  )

}

export default PrimaryButton
