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

      <Link to="/opdbooking">
        <div className="card" onClick={handleOPDBooking}>
          <div className="icon">
            <img src="../public/image/consultation.gif" alt="e-OPD Card" />
          </div>
          Book Appointment
        </div>
        </Link>

        <Link to="/bedAvailability">
        <div className="card">
          <div className="icon">
            <img src="../public/image/hospitalization.gif" alt="Payments" />
          </div>
          Bed Availability
        </div>
        </Link>

        <div className="card">
          <div className="icon">
            <img src="../public/image/blood-donation.gif" alt="Blood Availability" />
          </div>
          <p>Blood Availability</p>
        </div>
        <div className="card">
          <div className="icon">
            <img src="../public/image/online-meeting.gif" alt="Blood Availability" />
          </div>
          <p>E-Consultation</p>
        </div>
        <div className="card">
          <div className="icon">
            <img src="../public/image/ambulance.gif" alt="Lab Report" />
          </div>
          <p>Ambulance Service</p>
        </div>
      </div>
      <div className="appointment-section">
        <Appointments/>
       
      </div>
      <div id="homefeature">
       <Homefeature/>
      </div>
        <Highlights/>
        <Footer/>
    </div>
  );
}

export default Homepage;
