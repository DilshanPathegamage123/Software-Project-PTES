import './TravelDetail.css';
function TravelDetails(){
    return (
      <>
 
<div className="container ml-5">
    <div className="card ml-5 mt-1" style={{border:'none',width:'25rem'}}>
      <div className="card-body" >
      <ul className="list-inline">
        <li className="list-inline-item">Travel Journey Id:</li>
        <li className="list-inline-item"></li>
      </ul>
      <ul className="list-inline">
        <li className="list-inline-item">Rout No:</li>
        <li className="list-inline-item"></li>
      </ul>
      <ul className="list-inline">
        <li className="list-inline-item">Rout Name:</li>
        <li className="list-inline-item"></li>
      </ul> 
      <ul className="list-inline">
        <li className="list-inline-item">Date:</li>
        <li className="list-inline-item"></li>
      </ul>  
      <ul className="list-inline">
        <li className="list-inline-item">Start Time:</li>
        <li className="list-inline-item"></li>
      </ul>
      <ul className="list-inline">
        <li className="list-inline-item">End Time:</li>
        <li className="list-inline-item"></li>
      </ul>     
      </div>
    </div>
    </div>
      </>
    );
}

export default TravelDetails;



