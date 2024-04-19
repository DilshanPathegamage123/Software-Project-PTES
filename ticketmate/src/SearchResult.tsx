export interface BusStand {
  busStation: string;
  standArrivalTime: string;
}

export interface ScheduledBusDates {
  departureDate: string;
  arrivalDate: string;
}

export interface SearchResult {
  scheduleId: string;
  busNo: string;
  routNo: string;
  startLocation: string;
  endLocation: string;
  departureTime: string;
  arrivalTime: string;
  comfortability: string;
  duration: string;
  ticketPrice: number;
  selectedBusStands: {
    $id: string;
    $values: BusStand[];
  };
  scheduledBusDatesList: {
    $id: string;
    $values: ScheduledBusDates[];
  };
}
