// src/AmbulanceTracker.jsx
import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { ambulanceDb, doc, onSnapshot } from './firebaseAmbulance'; // Import from ambulance-specific Firebase config

// Custom hook to update map view
const ChangeMapView = ({ position }) => {
  const map = useMap();
  useEffect(() => {
    if (position) {
      map.flyTo(position, 13, {
        duration: 1.5, // Adjust duration for smoothness
      });
    }
  }, [position, map]);

  return null;
};

const AmbulanceTracker = () => {
  const [ambulanceId, setAmbulanceId] = useState('');
  const [ambulanceLocation, setAmbulanceLocation] = useState({ lat: 28.6139, lng: 77.2090 }); // Default center (Delhi coordinates)
  const [error, setError] = useState('');

  useEffect(() => {
    if (!ambulanceId) return;

    const ambulanceRef = doc(ambulanceDb, 'ambulances', ambulanceId); // Use ambulanceDb from ambulance-specific Firebase app

    // Listen for real-time updates to the ambulance's location
    const unsubscribe = onSnapshot(ambulanceRef, (doc) => {
      if (doc.exists()) {
        const data = doc.data();
        setAmbulanceLocation({
          lat: data.lat || 28.6139, // Default values if data is missing
          lng: data.lng || 77.2090
        });
        setError(''); // Clear any previous errors
      } else {
        setError("No such document!");
      }
    }, (error) => {
      setError("Error fetching location: " + error.message);
    });

    return () => unsubscribe(); // Clean up the subscription on component unmount
  }, [ambulanceId]);

  const handleIdChange = (e) => {
    setAmbulanceId(e.target.value);
  };

  return (
    <div>
      <div>
        <input
          type="text"
          placeholder="Enter Ambulance ID"
          value={ambulanceId}
          onChange={handleIdChange}
        />
      </div>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <MapContainer 
        center={[ambulanceLocation.lat, ambulanceLocation.lng]} 
        zoom={50} 
        style={{ height: '800px', width: '100%' }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker 
          position={[ambulanceLocation.lat, ambulanceLocation.lng]} 
          icon={L.icon({
            iconUrl: '/image/ambulance.png', // Ensure this path is correct
            iconSize: [32, 32], // Size of the icon
            iconAnchor: [16, 32], // Anchor position of the icon
          })}
        >
          <Popup>
            Ambulance is here.
          </Popup>
        </Marker>
        <ChangeMapView position={[ambulanceLocation.lat, ambulanceLocation.lng]} />
      </MapContainer>
    </div>
  );
};

export default AmbulanceTracker;
