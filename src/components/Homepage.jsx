import React from 'react';
import "./Homepage.css";
import { Link } from 'react-router-dom';
import Appointments from './Appointment';
import Homecrousel from './Homecrousel';
import Homefeature from './Homefeature';
import Highlights from './Highlights';
import Footer from './Footer'

function Homepage() {
 const handleOPDBooking = () =>{
  //some other logic
 }
  
  return (
    <div id='homepage'>
      <Homecrousel/>
      <div className="container">
        <div className="card" onClick={handleOPDBooking}>
          <div className="icon">
            <img src="download-icon.png" alt="e-OPD Card" />
          </div>
          <Link to="/opdbooking">Book Appointment</Link>
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
      <div className="appointment-section">
        <Appointments/>
        <Homefeature/>
        <Highlights/>
        <Footer/>
      </div>
    </div>
  );
}

export default Homepage;
