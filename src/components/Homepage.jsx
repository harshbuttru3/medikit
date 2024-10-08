import React from "react";
import "./Homepage.css";
import { Link } from "react-router-dom";
import Appointments from "./Appointmentt";
import Homecrousel from "./Homecrousel";
import Homefeature from "./Homefeature";
import Highlights from "./Highlights";
import Footer from "./Footer";

function Homepage() {
  return (
    <div id="homepage">
      <Homecrousel />
      <div className="container">
        <Link to="/opdbooking">
          <div className="card">
            <div className="icon">
              <img src="/image/consultation.gif" alt="e-OPD Card" />
            </div>
            Book Appointment
          </div>
        </Link>

        <Link to="/bedAvailability">
          <div className="card">
            <div className="icon">
              <img src="/image/hospitalization.gif" alt="Payments" />
            </div>
            Bed Availability
          </div>
        </Link>
        <Link to="/Comingsoon">
        <div className="card">
          <div className="icon">
            <img src="/image/blood-donation.gif" alt="Blood Availability" />
          </div>
          <p>Blood Availability</p>
        </div>
        
        </Link>
        <Link to="/Comingsoon">
        <div className="card">
          <div className="icon">
            <img src="/image/online-meeting.gif" alt="Blood Availability" />
          </div>
          <p>E-Consultation</p>
        </div>
        </Link>
        
        <Link to="/ambulance">
          <div className="card">
            <div className="icon">
              <img src="/image/ambulance.gif" alt="Lab Report" />
            </div>
            <p>Ambulance Service</p>
          </div>
        </Link>
      </div>
      <div className="appointment-section">
        <Appointments />
      </div>
      <div id="homefeature">
        <Homefeature />
      </div>
      <Highlights />
      <Footer />
    </div>
  );
}

export default Homepage;
