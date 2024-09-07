import React from 'react';
import "./Homepage.css";

function Homepage() {
  return (
    <div id='homepage'>
      <div className="container">
        <div className="card">
          <div className="icon">
            <img src="download-icon.png" alt="e-OPD Card" />
          </div>
          <p>Book Appointment</p>
        </div>
        <div className="card">
          <div className="icon">
            <img src="payment-icon.png" alt="Payments" />
          </div>
          <p>Bed Availablity</p>
        </div>
        <div className="card">
          <div className="icon">
            <img src="blood-availability-icon.png" alt="Blood Availability" />
          </div>
          <p>Blood Availability</p>
        </div>
        <div className="card">
          <div className="icon">
            <img src="blood-availability-icon.png" alt="Blood Availability" />
          </div>
          <p>Blood Donation</p>
        </div>
        <div className="card">
          <div className="icon">
            <img src="lab-report-icon.png" alt="Lab Report" />
          </div>
          <p>Ambulance Service</p>
        </div>
      </div>
    </div>
  );
}

export default Homepage;
