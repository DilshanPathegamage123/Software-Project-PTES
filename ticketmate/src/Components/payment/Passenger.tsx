
  interface BookingData {
    busBookingId: number;
    busScheduleId: number;
    busId: number;
  
    passengerId: string;
    routeNo: string;
    startLocation: string;
    endLocation: string;
    boardingPoint: string;
    droppingPoint: string;
    startTime: string;
    endTime: string;
    bookingDate: string;
    bookingSeatNO: string;
    bookingSeatCount: string;
    ticketPrice: number;
    totalPaymentAmount: number;
    paymentStatus: boolean;
  
    trainBookingId:number ;
    trainScheduleId: number;
    bookingCarriageNo: number;
    bookingClass: string;
  
  }
  const Paassenger:React.FC<BookingData> = (props)=>{
    return (
        <>
        <div>
   
<div className="container text-center">
  <div className="row mt-3">
    <div className="col-3 text-start mr-5" style={{ fontFamily: 'Poppins', fontSize: '24px', fontWeight: 'bold' }}>Passengers</div>
    <div className="col-4 text-end ml-5" style={{ fontFamily: 'Poppins', fontSize: '30px', fontWeight: 'bold' }}>{props.bookingSeatCount}</div>
  </div>
  <div className="row mt-5"> {/* Added margin-top for separation */}
    <div className="col-4 text-start " style={{ fontFamily: 'Poppins', fontSize: '32px', fontWeight: 'bold' }}>Total</div>
    <div className="col-5 text-end mr-2" style={{ fontFamily: 'Poppins', fontSize: '36px', color: 'rgb(0, 117, 124)', fontWeight: 'bold' }}>LKR {props.totalPaymentAmount}</div>
  </div>
</div>

        </div>
        </>
        
    )
}
export default Paassenger;