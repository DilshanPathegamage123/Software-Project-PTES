// import React, { useRef } from "react";
// import "./TravelHistory.css";
// import Icon1 from "./images/notification.png";
// import { useEffect, useState } from "react";
// import * as signalR from "@microsoft/signalr";
// import axios from "axios";

// const NotificationComponent: React.FC = () => {
//   const [messages, setMessages] = useState<
//     { Id: number; message: string; routNo: string }[]
//   >([]);
//   //const allowedIds = [12, 10,14,15]; // Define the allowed IDs
//   const [allowedIds, setAllowedIds] = useState<number[]>([]);
//   const [allowedBusIds, setAllowedBusIds] = useState([]);
//   const [allowedTrainIds, setAllowedTrainIds] = useState([]);
 

//   const PassengerId="P002";
//   useEffect(() => {
//     // Load messages from local storage
//     const savedMessages = JSON.parse(localStorage.getItem("messages") || "[]");
//     setMessages(savedMessages);

//     // Fetch allowed IDs from API
//     const fetchBusIds = axios.get(
//       `https://localhost:7296/api/BusScheduledId/GetBusScheduleIdsByPassengerId/${PassengerId}`
//     );
//     const fetchTrainIds = axios.get(
//       `https://localhost:7296/api/TrainScheduledId/GetBusScheduleIdsByPassengerId/${PassengerId}`
//     );

//     Promise.all([fetchBusIds, fetchTrainIds])
//       .then(([busResponse, trainResponse]) => {
//         setAllowedBusIds(busResponse.data);
//         setAllowedTrainIds(trainResponse.data);
//         setAllowedIds([...busResponse.data, ...trainResponse.data]);
//       })
//       .catch((error) => {
//         console.error("Error fetching allowed IDs:", error);
//       });

//     const connection = new signalR.HubConnectionBuilder()
//       .withUrl("https://localhost:7296/notificationHub") // Ensure this URL matches the server endpoint
//       .configureLogging(signalR.LogLevel.Information)
//       .withAutomaticReconnect()
//       .build();

//     connection
//       .start()
//       .then(() => {
//         console.log("Connection established");

//         connection.on(
//           "ReceiveNotification",
//           (receivedMessage: string, Id: number, routNo: string) => {
//             console.log(
//               `Notification received: ${receivedMessage} for ${Id} and ${routNo}`
//             );

//             if (allowedIds.includes(Id)) {
//               setMessages((prevMessages) => {
//                 const newMessages = [
//                   { Id, message: receivedMessage, routNo },
//                   ...prevMessages,
//                 ]; // Prepend the new message
//                 localStorage.setItem("messages", JSON.stringify(newMessages)); // Save to local storage
//                 return newMessages;
//               });
//             }
//           }
//         );
//       })
//       .catch((err) => console.error("Connection error: ", err));

//     // Clean up the connection when the component unmounts
//     return () => {
//       connection.stop().then(() => console.log("Connection stopped"));
//     };
//   }, [allowedIds]);

//   return (
//     <div className="notification-container">
     
//       {messages.length > 0 ? (
//         <div>
//           {messages.map((msg, index) => (
//             <div className="row p-4 rounded-4 sec shadow m-4" key={index}>
//               <div className="col-lg-1 d-flex align-items-center">
//                 <img src={Icon1} alt="BusIcon" className="img-fluid" />
//               </div>

//               <div className="col-lg-11 d-flex align-items-center">
//                 <div className="message-content">{msg.message}</div>
//               </div>
//             </div>
//           ))}
//         </div>
//       ) : (
//         <p>No messages available.</p>
//       )}
//     </div>
//   );
// };
// export default NotificationComponent;




import React, { useEffect, useState } from "react";
import Icon1 from "./images/notification.png";
import * as signalR from "@microsoft/signalr";
import axios from "axios";

const NotificationComponent: React.FC = () => {
  const [messages, setMessages] = useState<
    { Id: number; message: string; routNo: string }[]
  >([]);
  const [allowedIds, setAllowedIds] = useState<number[]>([]);
  const [allowedBusIds, setAllowedBusIds] = useState<number[]>([]);
  const [allowedTrainIds, setAllowedTrainIds] = useState<number[]>([]);
  const PassengerId = "P002";

  useEffect(() => {
    // Load messages from local storage on initial load
    const savedMessages = JSON.parse(localStorage.getItem("messages") || "[]");
    setMessages(savedMessages);

    // Fetch allowed IDs from API
    const fetchBusIds = axios.get(
      `https://localhost:7296/api/BusScheduledId/GetBusScheduleIdsByPassengerId/${PassengerId}`
    );
    const fetchTrainIds = axios.get(
      `https://localhost:7296/api/TrainScheduledId/GetBusScheduleIdsByPassengerId/${PassengerId}`
    );

    Promise.all([fetchBusIds, fetchTrainIds])
      .then(([busResponse, trainResponse]) => {
        setAllowedBusIds(busResponse.data);
        setAllowedTrainIds(trainResponse.data);
        setAllowedIds([...busResponse.data, ...trainResponse.data]);
      })
      .catch((error) => {
        console.error("Error fetching allowed IDs:", error);
      });

    // SignalR setup for real-time notifications
    const connection = new signalR.HubConnectionBuilder()
      .withUrl("https://localhost:7296/notificationHub") // Adjust URL as per your server endpoint
      .configureLogging(signalR.LogLevel.Information)
      .withAutomaticReconnect()
      .build();

    connection
      .start()
      .then(() => {
        console.log("Connection established");

        connection.on(
          "ReceiveNotification",
          (receivedMessage: string, Id: number, routNo: string) => {
            console.log(
              `Notification received: ${receivedMessage} for ${Id} and ${routNo}`
            );

            if (allowedIds.includes(Id)) {
              setMessages((prevMessages) => {
                const newMessages = [
                  { Id, message: receivedMessage, routNo },
                  ...prevMessages,
                ]; // Prepend the new message
                localStorage.setItem("messages", JSON.stringify(newMessages)); // Save to local storage
                return newMessages;
              });
            }
          }
        );
      })
      .catch((err) => console.error("Connection error: ", err));

    // Clean up the connection when the component unmounts
    return () => {
      connection.stop().then(() => console.log("Connection stopped"));
    };
  }, [allowedIds]);

  return (
    <div className="notification-container" style={styles.container}>
      {messages.length > 0 ? (
        <div>
          {messages.map((msg, index) => (
            <div className="row p-4 rounded-4 sec shadow m-4" key={index} style={styles.messageContainer}>
              <div className="col-lg-1 d-flex align-items-center">
                <img src={Icon1} alt="BusIcon" className="img-fluid" style={styles.icon} />
              </div>
              <div className="col-lg-11 d-flex align-items-center">
                <div className="message-content" style={styles.messageContent}>{msg.message}</div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No messages available.</p>
      )}
    </div>
  );
};

// Internal CSS styles
const styles = {
  container: {
    maxHeight: "400px" as const, // Adjust the height as needed
    overflowY: "auto" as const,
  },
  messageContainer: {
    backgroundColor: "#f8f9fa",
    border: "1px solid #ccc",
    borderRadius: "8px",
    marginBottom: "20px",
    padding: "10px",
  },
  icon: {
    maxWidth: "100%",
  },
  messageContent: {
 
    marginLeft: "10px",
  },
};

export default NotificationComponent;
