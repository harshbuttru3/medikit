import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { ambulanceDb, doc, onSnapshot } from './firebaseAmbulance';
import "./ambulance.css";

const ChangeMapView = ({ position }) => {
  const map = useMap();
  useEffect(() => {
    if (position) {
      map.flyTo(position, 18, { // Set zoom level directly here
        duration: 1.5,
      });
    }
  }, [position, map]);

  return null;
};

const AmbulanceTracker = () => {
  const [ambulanceId, setAmbulanceId] = useState('');
  const [ambulanceLocation, setAmbulanceLocation] = useState(null); // Start with null to delay rendering
  const [lastLocation, setLastLocation] = useState(null); // Track the last location
  const [error, setError] = useState('');

  useEffect(() => {
    if (!ambulanceId) return;

    const ambulanceRef = doc(ambulanceDb, 'ambulances', ambulanceId);

    // Listen for real-time updates to the ambulance's location
    const unsubscribe = onSnapshot(ambulanceRef, (doc) => {
      if (doc.exists()) {
        const data = doc.data();
        const newLocation = {
          lat: data.lat || 28.6139,  // Default values if data is missing
          lng: data.lng || 77.2090
        };

        // Check if the new location is different from the last known location
        if (!lastLocation || newLocation.lat !== lastLocation.lat || newLocation.lng !== lastLocation.lng) {
          setAmbulanceLocation(newLocation);
          setLastLocation(newLocation); // Update the last known location
          setError('');
        }
      } else {
        setError("No such document!");
      }
    }, (error) => {
      setError("Error fetching location: " + error.message);
    });

    return () => unsubscribe(); // Clean up the subscription on component unmount
  }, [ambulanceId, lastLocation]);

  const handleIdChange = (e) => {
    setAmbulanceId(e.target.value);
  };

  return (
    <div>
      <div id='ambulance'>
        <input
          type="text"
          placeholder="Enter Ambulance ID"
          value={ambulanceId}
          onChange={handleIdChange}
        />
      </div>
      {error && <div style={{ color: 'red' }}>{error}</div>}

      {/* Only render the map if ambulanceLocation is not null */}
      {ambulanceLocation && (
        <MapContainer 
          center={[ambulanceLocation.lat, ambulanceLocation.lng]} 
          zoom={18}  // Set zoom level here
          style={{ height: '800px', width: '100%' }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            maxZoom={19}
          />
          <Marker 
            position={[ambulanceLocation.lat, ambulanceLocation.lng]} 
            icon={L.icon({
              iconUrl: '/image/ambulance.png',
              iconSize: [32, 32],
              iconAnchor: [16, 32],
            })}
          >
            <Popup>
             Be patient we will be there !
            </Popup>
          </Marker>
          <ChangeMapView position={[ambulanceLocation.lat, ambulanceLocation.lng]} />
        </MapContainer>
      )}
    </div>
  );
};

export default AmbulanceTracker;
