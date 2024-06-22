// components/BusLocation.tsx
import React, { useEffect, useState } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import * as signalR from '@microsoft/signalr';
import logo from '../../Components/NavBar/assest/logo.png';

const mapContainerStyle = {

    height: "500px",
    width: "100%"
};

interface VehicleLocationProps {
    rideId: number;
}

interface Location {
    latitude: number;
    longitude: number;
}

const VehicleLocation: React.FC<VehicleLocationProps> = ({ rideId }) => {
    const [locations, setLocations] = useState<Location[]>([]);
    const [connection, setConnection] = useState<signalR.HubConnection | null>(null);

    useEffect(() => {
        const newConnection = new signalR.HubConnectionBuilder()
            //.withUrl("/locationHub")
            .withUrl("https://localhost:7196/locationHub",{   withCredentials: true })
            .withAutomaticReconnect()
            .build();

        setConnection(newConnection);




    }, []);

    useEffect(() => {
        if (connection) {
            connection.start()
                .then(() => {
                    console.log('Connected!');
                    const connectionId = connection.connectionId;
                    console.log(connectionId,rideId);
                    connection.invoke("JoinRideGroup", connectionId,rideId);

                    connection.on("ReceiveLocation", (latitude: number, longitude: number) => {
                        setLocations(locations => [...locations, { latitude, longitude }]);
                        console.log('New location received:', latitude, longitude);
                    });
                })
                .catch(e => console.log('Connection failed: ', e));
        }

        return () => {
            if (connection) {
                connection.stop();
            }
        };
    }, [connection, rideId]);

    const containerStyle = {
        width: '80%',
        height: '500px'
      };

      const center = {
        lat: -34.397,
        lng: 150.644
      };

    return (
        <LoadScript googleMapsApiKey="AIzaSyCmDfdWl4TZegcfinTmC0LlmFCiEcdRbmU">

            <GoogleMap
                mapContainerStyle={mapContainerStyle}
                 center={locations.length > 0 ? { lat: locations[locations.length - 1].latitude, lng: locations[locations.length - 1].longitude } : { lat: 6.9271, lng: 79.8612 }}
                // center={center}

                zoom={18}
                

            >
                {/* <Marker position={{ lat: -34.397, lng: 150.644 }} /> */}
           {locations.map((location, index) => (
                     <Marker key={index} position={{ lat: location.latitude, lng: location.longitude }} 
                     icon={{
                        url:logo,

                        scaledSize: new window.google.maps.Size(50, 50),
                     }}/>
                ))}    
            </GoogleMap>
        </LoadScript>
    );
};

export default VehicleLocation;
