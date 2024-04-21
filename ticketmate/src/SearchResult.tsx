export interface SearchResult {
  scheduleId: string;
  vehicleNo: string;
  routNo: string;
  startLocation: string;
  endLocation: string;
  departureTime: string;
  arrivalTime: string;
  comfortability: string;
  duration: string;
  ticketPrice: number;
  selectedStands: {
    $id: string;
    $values: BusStand[] | TrainStopStation[]; // Add TrainStopStation[] for train stops
  };
  scheduledDatesList: {
    $id: string;
    $values: ScheduledBusDates[] | TrainDates[]; // Add TrainDates[] for train dates
  };

  //Optional fields
  trainType?: string;
  firstClassTicketPrice?: number;
  secondClassTicketPrice?: number;
}

export interface BusStand {
  busStation: string;
  standArrivalTime: string;
}

export interface ScheduledBusDates {
  departureDate: string;
  arrivalDate: string;
}

export interface TrainStopStation {
  id: number;
  trainStationName: string;
  trainDepartureTime: string;
}

export interface TrainDates {
  arrivalDate: string;
  departureDate: string;
}

// export interface SearchResult {
//   scheduleId: string;
//   busNo: string;
//   routNo: string;
//   startLocation: string;
//   endLocation: string;
//   departureTime: string;
//   arrivalTime: string;
//   comfortability: string;
//   duration: string;
//   ticketPrice: number;
//   selectedBusStands: {
//     $id: string;
//     $values: BusStand[];
//   };
//   scheduledBusDatesList: {
//     $id: string;
//     $values: ScheduledBusDates[];
//   };
// }
