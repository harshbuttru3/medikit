import React, { useState, useEffect } from 'react';
import { doc, getDoc } from "firebase/firestore"; // Import Firestore methods
import { db } from "../firebaseConfig"; // Firebase configuration
import LoadingSpinner from './LoadingSpinner';
import './bed-availability.css';

const BedAvailability = () => {
  const [beds, setBeds] = useState([]);   // Hospital bed data state
  const [loading, setLoading] = useState(true);  // Loading state
  const [error, setError] = useState(null);  // Error state
  const [searchTerm, setSearchTerm] = useState('');  // Search term state

  useEffect(() => {
    const fetchBeds = async () => {
      try {
        // Fetch data from the single document "bihar_hospitals" in the "hospital_data" collection
        const docRef = doc(db, "hospital_data", "bihar_hospitals");
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          setBeds(data.hospitals); // Set the hospitals array from the document
        } else {
          setError("No hospital data found");
        }

        setLoading(false); // Stop the loading spinner
      } catch (error) {
        setError("Failed to fetch data");
        setLoading(false); // Stop the loading spinner
      }
    };

    fetchBeds(); // Fetch hospital data when the component mounts
  }, []);

  // Filter the hospitals based on search term
  const filteredBeds = beds.filter((bed) =>
    bed.hospital_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    bed.city.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return <LoadingSpinner />;  // Show loading spinner while data is being fetched
  }

  if (error) {
    return <div>{error}</div>;  // Show error message if data fetching fails
  }

  return (
    <div id='Bedtable'>
      <h1>Hospital Bed Availability</h1>

      {/* Search input */}
      <input
        type="text"
        placeholder="Search by hospital name or city..." 
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {/* Table to display bed data */}
      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Hospital Name</th>
            <th>Total Beds</th>
            <th>Available Beds</th>
            <th>City</th>
            <th>Total ICU beds</th>
            <th>Available ICU beds</th>
            <th>Last Updated</th>
          </tr>
        </thead>
        <tbody>
          {filteredBeds.map((bed, index) => (
            <tr key={index}>
              <td>{bed.hospital_name}</td>
              <td>{bed.total_beds}</td>
              <td>{bed.available_beds}</td>
              <td>{bed.city}</td>
              <td>{bed.total_icu_beds}</td>
              <td>{bed.available_icu_beds}</td>
              <td>{new Date(bed.last_updated).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* If no hospitals found */}
      {filteredBeds.length === 0 && <p>No hospitals found</p>}
    </div>
  );
};

export default BedAvailability;
