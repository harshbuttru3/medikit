import React, { useEffect, useState } from 'react';
import { ambulanceDb, doc, setDoc } from './firebaseAmbulance'; // Ensure correct Firebase configuration

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

      // Update the ambulance's location in Firestore
      const ambulanceRef = doc(ambulanceDb, 'ambulances', ambulanceId);
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

    // Function to get the current location and update Firestore
    const trackLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(updateLocation, errorHandler, {
          enableHighAccuracy: true,
          maximumAge: 120000,
          timeout: 5000,
        });
      } else {
        console.error("Geolocation is not supported by this browser.");
      }
    };

    // Set interval to update location every 10 seconds
    const intervalId = setInterval(trackLocation, 120000); // 10 seconds = 10000 ms

    // Clear the interval on component unmount
    return () => clearInterval(intervalId);
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
