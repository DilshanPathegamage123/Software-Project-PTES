import React from 'react'
import './Button.css'

function PrimaryButton(props: any) {

  const handleClick = (event: React.MouseEvent<HTMLInputElement>) => {
    if (props.onClick) {
      props.onClick(event);
    } else if (props.link) {
      window.location.href = props.link;
    }
  };

    const color = props.color;
    const Block = props.IsBlock? "btn-block" : "";
    const size = props.IsSmall? "btn-sm" : "";
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

   
    return (
      <>
      <div>
        <input
          type={props.type}
          className={`btn btn-primary ${classColor} ${Block} ${size}`}
          value={props.value}
          style={buttonStyles}
          onClick={handleClick}
        />
      </div>
    </>
  )

}

export default PrimaryButton
