// // components/StartRideButton.tsx
// import React from 'react';
// import axios from 'axios';
// import * as signalR from '@microsoft/signalr';

// interface StartRideButtonProps {
//     busId: number;
// }

// const StartRideButton: React.FC<StartRideButtonProps> = ({ busId }) => {
//     const startRide = async () => {
//         try {
//             //const response = await axios.post('/api/ride/start', { busId });
//              const response = await axios.post('https://localhost:7196/api/Location/UpdateLocation', { busId });
//             const ride = response.data;
//             console.log('Ride started:', ride);
           

//             const connection = new signalR.HubConnectionBuilder()
//                 .withUrl("/locationHub")
//                 .withAutomaticReconnect()
//                 .build();



//             await connection.start();
//             await connection.invoke("JoinRideGroup", ride.rideId);

          

//             if (navigator.geolocation) {
//                 navigator.geolocation.watchPosition(
//                     async position => {
//                         const { latitude, longitude } = position.coords;
//                         await axios.post('https://localhost:7196/api/Location/UpdateLocation', { rideId: ride.rideId, latitude, longitude });
//                         await connection.invoke("SendLocation", ride.rideId, latitude, longitude);
                   
//                         // await axios.post('/api/ride/location', { rideId: ride.rideId, latitude, longitude });
//                         // await connection.invoke("SendLocation", ride.rideId, latitude, longitude);
//                     },
//                     error => console.log(error),
//                     { enableHighAccuracy: true, maximumAge: 0, timeout: 5000 }
//                 );
//             } else {
//                 console.log('Geolocation is not supported by this browser.');
//             }
//         } catch (error) {
//             console.error('Error starting ride:', error);
//         }
//     };

//     return <button onClick={startRide}>Start Ride</button>;
// };

// export default StartRideButton;



//copilot code is bellow

// //06/06 update is bellow
// import React from 'react';
// import axios from 'axios';
// import * as signalR from '@microsoft/signalr';

// interface StartRideButtonProps {
//     rideId: number;
// }

// const StartRideButton: React.FC<StartRideButtonProps> = ({ rideId }) => {
//     const startRide = async () => {
//         try {

//             const connection = new signalR.HubConnectionBuilder()
//             // .withUrl("http://localhost:5173/locationHub")
//             // .withUrl("/locationHub")
//             .withUrl(`https://localhost:7196/locationHub`,{   withCredentials: true })
//             .withAutomaticReconnect()
//             .build();


//             const response = await axios.post(`https://localhost:7196/api/Location/UpdateLocation`, {
                
//                     rideId: rideId,
//                     latitude: -34.397,
//                     longitude: 150.644
                  
                
                
//                 });
//             const ride = response.data;
//             console.log('Ride started:', ride);

           

//             connection.start()
//                 .then(async() => {
//                     console.log('Connected!');
//                     const connectionId = connection.connectionId; // Get the connection ID


//                     await axios.post(`https://localhost:7196/api/Location/StartRide/${rideId}`, { connectionId });

//                     const response = await axios.post('https://localhost:7196/api/Location/UpdateLocation', {
//                         rideId: rideId,
//                         latitude: -34.397,
//                         longitude: 150.644
//                    // connection.on('ReceiveLocation', (location) => {
//                         // Update Google Map with new location
//                     });
//                     console.log('Ride started:', response.data);
//                     connection.on('ReceiveLocation', (latitude, longitude) => {
//                         console.log('New location received:', latitude, longitude);
//                     });
//                 })
//                 .catch(e => console.log('Connection failed: ', e));
//         } catch (e) {
//             console.log('Failed to start ride: ', e);
//         }
//     };

//     return (
//         <button onClick={startRide}>Start Ride</button>
//     );
// };

// export default StartRideButton;


//07/06 updatte is bellow


import React, { useEffect, useState } from 'react';
import axios from 'axios';
import * as signalR from '@microsoft/signalr';

interface StartRideButtonProps {
    rideId: number;
}

const StartRideButton: React.FC<StartRideButtonProps> = ({ rideId }) => {

    const startRide = async () => {
        try {
            const connection = new signalR.HubConnectionBuilder()
                .withUrl('https://localhost:7196/locationHub', { withCredentials: true })
                .withAutomaticReconnect()
                .build();

            await connection.start();
            console.log('Connected!');
            const connectionId = connection.connectionId;
            console.log (connectionId);// Get the connection ID

            try{
            // Send the connectionId with the rideId to the backend
           // console.log('Sending StartRide request with payload:', { connectionId });
           const payload = { connectionId };
           console.log('Sending StartRide request with payload:', payload);
          
            await axios.post(`https://localhost:7196/api/Location/StartRide/${rideId}`, payload);

            }catch(e){
                console.log("Failed to start ride api: "+ e);
                
            }
            
            if (navigator.geolocation) {
                console.log("navigator.geolocation is supported");
                navigator.geolocation.watchPosition(
                    async position => {
                        const { latitude, longitude } = position.coords;
                        console.log('before Location updated:', latitude, longitude);
                        await axios.post('https://localhost:7196/api/Location/UpdateLocation', {
                            rideId: rideId,
                            latitude:latitude,
                            longitude:longitude

                        });
                        console.log('Location updated:', latitude, longitude);
                    },
                    error => console.log(error),
                    { enableHighAccuracy: true, maximumAge: 0, timeout: 5000 }
                );
            } else {
                console.log('Geolocation is not supported by this browser.');
            }

            connection.on('ReceiveLocation', (latitude, longitude) => {
                console.log('New location received by start:', latitude, longitude);
            });
        } catch (e) {
            console.log('Failed to start ride: ', e);
        }
    };

    return (
        <button onClick={startRide} className='btn btn-primary ' data-testid="start-ride-button">{"Start Ride >>"}</button>
    );
};

export default StartRideButton;
