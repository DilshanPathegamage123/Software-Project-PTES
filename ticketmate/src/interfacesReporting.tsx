// export interface DriverData {
//     name: string;
//     userId: string;
//     email: string;
//   }
  
  // export interface LeaveRequest {
  //   id: number;
  //   date: string;
  //   reason: string;
  //   otherReason?: string;
  //   startDate: string;
  //   endDate: string;
  //   totalDays: number;
  //   familyAndMedical?: string;
  //   funeralRelationship?: string;
  // }
  
  // export interface NewLeaveRequest {
  //   reason: string;
  //   otherReason?: string;
  //   startDate: string;
  //   endDate: string;
  //   totalDays: number;
  //   currentDate: string;
  //   familyAndMedical?: string;
  //   funeralRelationship?: string;
  // }
  
  // Update the LeaveRequest type to include currentDate
export interface LeaveRequest {
  id: number;
  date: string;
  reason: string;
  otherReason: string;
  startDate: string;
  endDate: string;
  totalDays: number;
  familyAndMedical: string;
  funeralRelationship: string;
  name: string;
  userId: string;
  currentDate?: string; // Add this line if currentDate is part of the response
  status:  ''|'Accepted' | 'Rejected'|'Cancelled'; // New field

}

export interface NewLeaveRequest {
  reason: string;
  otherReason: string;
  startDate: string;
  endDate: string;
  totalDays: number;
  currentDate: string;
  familyAndMedical: string;
  funeralRelationship: string;
  termsAccepted: boolean;
  status:''|'Accepted' | 'Rejected'|'Cancelled';
}