import React, { useState, useEffect } from 'react';
import axios from 'axios';

const HospitalData = () => {
  const [hospitals, setHospitals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHospitals = async () => {
      try {
        const response = await axios.get('https://indian-hospitals.p.rapidapi.com/hospitals/all', {
          headers: {
            'X-Rapidapi-Key': '2877970667msh3461ecc0a74a72ep1911c7jsne5642c0205f8',
            'X-Rapidapi-Host': 'indian-hospitals.p.rapidapi.com',
            
          },
        });
        setHospitals(response.data); // Assuming response data is an array of hospitals
        setLoading(false);
      } catch (error) {
        console.error('Error fetching hospital data:', error);
        setLoading(false);
      }
    };

    fetchHospitals();
  }, []);

  if (loading) {
    return <p>Loading hospital data...</p>;
  }

  return (
    <div>
      <h1>Hospital Bed Availability</h1>
      <ul>
        {hospitals.map((hospital) => (
          <li key={hospital.id}>
            <h2>{hospital.name}</h2>
            <p>Location: {hospital.location}</p>
            <p>Beds Available: {hospital.bedsAvailable}</p>
            <p>Total Beds: {hospital.totalBeds}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HospitalData;
