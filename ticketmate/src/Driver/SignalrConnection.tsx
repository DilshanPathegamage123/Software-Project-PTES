// services/signalrConnection.ts
import * as signalR from "@microsoft/signalr";

//const userId = localStorage.getItem("P002");
//const userId = "P002";

// const connection = new signalR.HubConnectionBuilder()
//     .withUrl("https://localhost:7296/notificationHub", {
//         withCredentials: true
//     })
//     .withAutomaticReconnect()
//     .build();
   
// connection.start().catch(err => console.error("SignalR Connection Error: ", err));
// export default connection;


// signalrService.ts
import { HubConnectionBuilder, LogLevel, HubConnection } from '@microsoft/signalr';

let connection: HubConnection | null = null;

export const startSignalRConnection = async (passengerId: string): Promise<HubConnection | null>  => {
  if (!connection) {
    console.log('connection call')
    connection = new HubConnectionBuilder()
      .withUrl(`https://localhost:7296/notificationhub?passengerId=${passengerId}`, {
        withCredentials: true // Ensure credentials are included if needed
      })
      .configureLogging(LogLevel.Information)
      .build();

    connection.on('ReceiveNotification', (message: string) => {
      console.log('Notification received:', message);
      // Here you can handle the received message
      // For example, you can call a function to update the UI
      // or store the message in the state
    });

    try {
        console.log('Starting SignalR connection...');
      await connection.start();
      console.log('SignalR connection established');
    } catch (err) {
      console.error('Error establishing SignalR connection:', err);
      connection = null; // Reset the connection to null if there's an error
    }
  }
  return connection;
};

export const getConnection = (): HubConnection | null => connection;
