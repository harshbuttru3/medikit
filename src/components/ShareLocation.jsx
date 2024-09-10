// src/ShareLocation.jsx
import React, { useEffect, useState } from 'react';
import { db, doc, setDoc } from '../firebaseConfig';

// Function to generate a random ID
const generateRandomId = () => {
  return 'ambulance_' + Math.random().toString(36).substr(2, 9);
};

const ShareLocation = () => {
  const [ambulanceId, setAmbulanceId] = useState(null);

  useEffect(() => {
    // Retrieve the ambulance ID from localStorage or generate a new one if not present
    const id = localStorage.getItem('ambulanceId') || generateRandomId();
    if (!localStorage.getItem('ambulanceId')) {
      localStorage.setItem('ambulanceId', id);
    }
    setAmbulanceId(id);

    const updateLocation = (position) => {
      const { latitude, longitude } = position.coords;
      if (!ambulanceId) {
        console.error("No ambulance ID available.");
        return;
      }
      
      // Update the ambulance's location in Firestore
      const ambulanceRef = doc(db, 'ambulances', ambulanceId);
      setDoc(ambulanceRef, {
        lat: latitude,
        lng: longitude,
        lastUpdated: Date.now(),
      }).catch((error) => {
        console.error("Error updating location: ", error);
      });
    };

    const errorHandler = (error) => {
      console.error("Error fetching location: ", error);
    };

    if (navigator.geolocation) {
      const watchId = navigator.geolocation.watchPosition(updateLocation, errorHandler, {
        enableHighAccuracy: true,
        maximumAge: 10000,
        timeout: 5000,
      });

      return () => navigator.geolocation.clearWatch(watchId);
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }, [ambulanceId]);

  return (
    <div>
      {ambulanceId ? (
        <div>Sharing location for ambulance ID: {ambulanceId}</div>
      ) : (
        <div>Generating ambulance ID...</div>
      )}
    </div>
  );
};

export default ShareLocation;
