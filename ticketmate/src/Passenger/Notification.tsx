// import React, { useEffect, useState } from "react";
// import Icon1 from "./images/notification.png";
// import * as signalR from "@microsoft/signalr";
// import axios from "axios";
// import Passenger from "./passenger1";
// type NotificationProps = {
//   passengerId: number;
// };

// const NotificationComponent: React.FC<NotificationProps> = ({passengerId}) => {
//   const [messages, setMessages] = useState<
//     { Id: number; message: string; routNo: string }[]
//   >([]);
//   const [allowedIds, setAllowedIds] = useState<number[]>([]);
//   const [allowedBusIds, setAllowedBusIds] = useState<number[]>([]);
//   const [allowedTrainIds, setAllowedTrainIds] = useState<number[]>([]);
//   //const PassengerId = "P002";

//   useEffect(() => {
//     // Load messages from local storage on initial load
//     const savedMessages = JSON.parse(localStorage.getItem("messages") || "[]");
//     setMessages(savedMessages);

//     // Fetch allowed IDs from API
//     const fetchBusIds = axios.get(
//       `https://localhost:7296/api/BusScheduledId/GetBusScheduleIdsByPassengerId/${passengerId}`
//     );
//     const fetchTrainIds = axios.get(
//       `https://localhost:7296/api/TrainScheduledId/GetBusScheduleIdsByPassengerId/${passengerId}`
//     );

//     Promise.all([fetchBusIds, fetchTrainIds])
//       .then(([busResponse, trainResponse]) => {
//         setAllowedBusIds(busResponse.data);
//         setAllowedTrainIds(trainResponse.data);
//         setAllowedIds([...busResponse.data, ...trainResponse.data]);
//         console.log("Allowed IDs fetched successfully");
//         console.log("Allowed Bus IDs: ", busResponse.data);
//         console.log("Allowed Train IDs: ", trainResponse.data);
//         console.log("Allowed IDs: ", [...busResponse.data, ...trainResponse.data]);
//       })
//       .catch((error) => {
//         console.error("Error fetching allowed IDs:", error);
//       });

//     // SignalR setup for real-time notifications
//     const connection = new signalR.HubConnectionBuilder()
//       .withUrl("https://localhost:7296/notificationHub") // Adjust URL as per your server endpoint
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
//     <div className="notification-container" style={styles.container}>
//       {messages.length > 0 ? (
//         <div>
//           {messages.map((msg, index) => (
//             <div className="row p-4 rounded-4 sec shadow m-4" key={index} style={styles.messageContainer}>
//               <div className="col-lg-1 d-flex align-items-center">
//                 <img src={Icon1} alt="BusIcon" className="img-fluid" style={styles.icon} />
//               </div>
//               <div className="col-lg-11 d-flex align-items-center">
//                 <div className="message-content" style={styles.messageContent}>{msg.message}</div>
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

// // Internal CSS styles
// const styles = {
//   container: {
//     maxHeight: "400px" as const, // Adjust the height as needed
//     overflowY: "auto" as const,
//   },
//   messageContainer: {
//     backgroundColor: "#f8f9fa",
//     border: "1px solid #ccc",
//     borderRadius: "8px",
//     marginBottom: "20px",
//     padding: "10px",
//   },
//   icon: {
//     maxWidth: "100%",
//   },
//   messageContent: {

//     marginLeft: "10px",
//   },
// };

// export default NotificationComponent;

//accept all notifications=====================================================

// import React, { useEffect, useState } from "react";
// import Icon1 from "./images/notification.png";
// import * as signalR from "@microsoft/signalr";
// import axios from "axios";

// type NotificationProps = {
//   passengerId: number;
// };

// const NotificationComponent: React.FC<NotificationProps> = ({ passengerId }) => {
//   const [messages, setMessages] = useState<{ Id: number; message: string; routNo: string }[]>([]);

//   useEffect(() => {
//     // Load messages from local storage on initial load
//     const savedMessages = JSON.parse(localStorage.getItem("messages") || "[]");
//     setMessages(savedMessages);

//     // SignalR setup for real-time notifications
//     const connection = new signalR.HubConnectionBuilder()
//       .withUrl("https://localhost:7296/notificationHub") // Adjust URL as per your server endpoint
//       .configureLogging(signalR.LogLevel.Information)
//       .withAutomaticReconnect()
//       .build();

//     connection
//       .start()
//       .then(() => {
//         console.log("Connection established");

//         connection.on("ReceiveNotification", (receivedMessage: string, Id: number, routNo: string) => {

//           setMessages((prevMessages) => {
//             const newMessages = [{ Id, message: receivedMessage, routNo }, ...prevMessages]; // Prepend the new message
//             localStorage.setItem("messages", JSON.stringify(newMessages)); // Save to local storage
//             return newMessages;
//           });

//         });
//       })
//       .catch((err) => console.error("Connection error: ", err));

//     // Clean up the connection when the component unmounts
//     return () => {
//       connection.stop().then(() => console.log("Connection stopped"));
//     };
//   }, []); // Removed dependency on allowedIds

//   return (
//     <div className="notification-container" style={styles.container}>
//       {messages.length > 0 ? (
//         <div>
//           {messages.map((msg, index) => (
//             <div className="row p-4 rounded-4 sec shadow m-4" key={index} style={styles.messageContainer}>
//               <div className="col-lg-1 d-flex align-items-center">
//                 <img src={Icon1} alt="BusIcon" className="img-fluid" style={styles.icon} />
//               </div>
//               <div className="col-lg-11 d-flex align-items-center">
//                 <div className="message-content" style={styles.messageContent}>{msg.message}</div>
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

// // Internal CSS styles remain unchanged
// const styles = {
//   container: {
//        maxHeight: "400px" as const, // Adjust the height as needed
//         overflowY: "auto" as const,
//        },
//   messageContainer: {
//     backgroundColor: "#f8f9fa",
//     border: "1px solid #ccc",
//     borderRadius: "8px",
//     marginBottom: "20px",
//     padding: "10px",
//   },
//   icon: {
//     maxWidth: "100%",
//   },
//   messageContent: {
//     marginLeft: "10px",
//   },
// };

// export default NotificationComponent;

//edit as filtering code========================================================================

import React, { useEffect, useState } from "react";
import Icon1 from "./images/notification.png";
import * as signalR from "@microsoft/signalr";
import axios from "axios";

type NotificationProps = {
  passengerId: number;
};

const NotificationComponent: React.FC<NotificationProps> = ({
  passengerId,
}) => {
  const [messages, setMessages] = useState<
    { Id: number; message: string; routNo: string }[]
  >([]);
  const [allowedIds, setAllowedIds] = useState<number[]>([]);

  useEffect(() => {
    const fetchAllowedIds = async () => {
      try {
        const [busResponse, trainResponse] = await Promise.all([
          axios.get(
            `https://localhost:7296/api/BusScheduledId/GetBusScheduleIdsByPassengerId/${passengerId}`
          ),
          axios.get(
            `https://localhost:7296/api/TrainScheduledId/GetBusScheduleIdsByPassengerId/${passengerId}`
          ),
        ]);

        const busIds = busResponse.data;
        const trainIds = trainResponse.data;

        const combinedIds = [...busIds, ...trainIds];
        setAllowedIds(combinedIds);
        console.log("Allowed IDs: ", combinedIds); // Print allowed IDs to console
        console.log("Allowed IDs fetched successfully");
      } catch (error) {
        console.error("Error fetching allowed IDs: ", error);
      }
    };

    fetchAllowedIds();
  }, [passengerId]);

  useEffect(() => {
    // Load messages from local storage on initial load
    const savedMessages = JSON.parse(localStorage.getItem("messages") || "[]");
    setMessages(savedMessages);

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
              // Filter messages to only show those with allowed Ids
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
  }, [allowedIds]); // Add allowedIds as a dependency

  return (
    <div className="notification-container" style={styles.container}>
      {messages.length > 0 ? (
        <div>
          {messages.map((msg, index) => (
            <div
              className="row p-4 rounded-4 sec shadow m-4"
              key={index}
              style={styles.messageContainer}
            >
              <div className="col-lg-1 d-flex align-items-center">
                <img
                  src={Icon1}
                  alt="BusIcon"
                  className="img-fluid"
                  style={styles.icon}
                />
              </div>
              <div className="col-lg-11 d-flex align-items-center">
                <div className="message-content" style={styles.messageContent}>
                  {msg.message}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        // <p>No messages available.</p>
        <div className="row p-4 rounded-4 sec shadow bg-grey mt-4 mb-4 ml-4 mr-4">
          <div className="col-lg-12 mt-5 mb-4">
            <p className="text-center fs-10 font-family-Inter">
              No messages available.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

// Internal CSS styles remain unchanged
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
