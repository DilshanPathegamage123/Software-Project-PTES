function ConfirmButton(){
    const buttonStyle = {
        backgroundColor: 'rgb(255,199,0)',
        color: 'white', // Optionally change text color to ensure readability
        
        width: '75%',
        height: '60%',
      };
    return(
        <div className="d-grid">
            <button className="btn mt-2 mb-5" type="button" style={buttonStyle}>Confirm</button>
        </div>
    )
}
export default ConfirmButton;