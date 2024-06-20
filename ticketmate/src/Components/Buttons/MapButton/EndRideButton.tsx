import React from 'react';
import axios from 'axios';
import * as signalR from '@microsoft/signalr';

interface EndRideButtonProps {
    rideId: number;
    connectionId: string;
}

const EndRideButton: React.FC<EndRideButtonProps> = ({ rideId ,connectionId}) => {
    const endRide = async () => {
        try {
            // Send the end ride request to the backend
           const response=await axios.post(`https://localhost:7196/api/Location/EndRide/${rideId}`);
            console.log('Ride ended:', response.data);

            // Optionally, you can stop the connection if it's needed
            const connection = new signalR.HubConnectionBuilder()
                .withUrl('https://localhost:7196/locationHub', { withCredentials: true })
                .withAutomaticReconnect()
                .build();

            await connection.start();
            console.log('Connected to SignalR Hub to end the ride');
            await connection.invoke("LeaveRideGroup", connectionId, rideId);
            await connection.stop();
            console.log('Ride ended and connection removed from group');
        } catch (e) {
            console.log('Failed to end ride: ', e);
        }
    };

    return (
        <button onClick={endRide} className='btn btn-primary '>{"End Ride !!"}</button>
    );
};

export default EndRideButton;
