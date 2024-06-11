// import { createSlice } from '@reduxjs/toolkit';

// const initialState = {
//   BusScheduleId: '',
//   VehicleId: '',
//   RouteNo: '',
//   StartLocation: '',
//   EndLocation: '',
//   BoardingPoint: '',
//   DroppingPoint: '',
//   StartTime: '',
//   EndTime: '',
//   BookingDate: '',
//   BookingSeatNO: [],
//   BookingSeatCount: 0,
//   TicketPrice: 0,
//   TotalPaymentAmount: 0,
// };

// const bookingSlice = createSlice({
//   name: 'booking',
//   initialState,
//   reducers: {
//     setBookingDetails: (state, action) => {
//       const {
//         BusScheduleId,
//         VehicleId,
//         RouteNo,
//         StartLocation,
//         EndLocation,
//         BoardingPoint,
//         DroppingPoint,
//         StartTime,
//         EndTime,
//         BookingDate,
//         BookingSeatNO,
//         BookingSeatCount,
//         TicketPrice,
//         TotalPaymentAmount,
//       } = action.payload;

//       state.BusScheduleId = BusScheduleId;
//       state.VehicleId = VehicleId;
//       state.RouteNo = RouteNo;
//       state.StartLocation = StartLocation;
//       state.EndLocation = EndLocation;
//       state.BoardingPoint = BoardingPoint;
//       state.DroppingPoint = DroppingPoint;
//       state.StartTime = StartTime;
//       state.EndTime = EndTime;
//       state.BookingDate = BookingDate;
//       state.BookingSeatNO = BookingSeatNO;
//       state.BookingSeatCount = BookingSeatCount;
//       state.TicketPrice = TicketPrice;
//       state.TotalPaymentAmount = TotalPaymentAmount;
//     },
//   },
// });

// export const { setBookingDetails } = bookingSlice.actions;
// export default bookingSlice.reducer;
