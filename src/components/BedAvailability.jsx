import React, { useState, useEffect } from 'react';
import axios from 'axios';
import LoadingSpinner from './LoadingSpinner';

const BedAvailability = () => {
  const [beds, setBeds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState(''); // State for search term

  // Fetch the data from the API when the component mounts
  useEffect(() => {
    axios
      .get('https://66df2c35de4426916ee3c595.mockapi.io/Hospital_beds')
      .then((response) => {
        setBeds(response.data); // Store the response data in the state
        setLoading(false); // Stop the loading state
      })
      .catch((error) => {
        setError('Failed to fetch data');
        setLoading(false);
      });
  }, []);

  // Filtered data based on search term
  const filteredBeds = beds.filter((bed) =>
    bed.hospital_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    bed.city.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return <div><LoadingSpinner/></div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h1>Hospital Bed Availability</h1>
      
      {/* Search Input */}
      <input 
        type="text" 
        placeholder="Search by hospital name or city..." 
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)} // Update search term state
      />

      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Hospital Name</th>
            <th>Total Beds</th>
            <th>Available Beds</th>
            <th>City</th>
            <th>Last Updated</th>
          </tr>
        </thead>
        <tbody>
          {filteredBeds.map((bed) => (
            <tr key={bed.id}>
              <td>{bed.hospital_name}</td>
              <td>{bed.total_beds}</td>
              <td>{bed.available_beds}</td>
              <td>{bed.city}</td>
              <td>{new Date(bed.last_updated).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* If no results found */}
      {filteredBeds.length === 0 && <p>No hospitals found</p>}
    </div>
  );
};

export default BedAvailability;
