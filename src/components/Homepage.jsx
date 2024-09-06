import React from 'react';
import { Link } from 'react-router-dom';
import './Homepage.css';

const Homepage = () => {
  return (
    <div className="homepage-container">
      {/* Navigation Bar */}
      <nav className="navbar">
        <div className="nav-logo">
          <h1>HealthCare System</h1>
        </div>
        <div className="nav-links">
          <Link to="/book-opd">Book OPD</Link>
          <Link to="/book-bed">Book Bed</Link>
          <Link to="/call-ambulance">Call Ambulance</Link>
          <Link to="/inventory">Inventory</Link>
          <Link to="/profile" className="profile-btn">Profile</Link>
        </div>
      </nav>

      {/* Main Content */}
      <main className="main-content">
        <h2>Welcome back, [User Name]</h2>
        <div className="quick-actions">
          <h3>Quick Actions</h3>
          <div className="actions">
            <Link to="/book-opd" className="action-btn">Book OPD</Link>
            <Link to="/book-bed" className="action-btn">Book Bed</Link>
            <Link to="/call-ambulance" className="action-btn">Call Ambulance</Link>
            <Link to="/availability" className="action-btn">Check Bed Availability</Link>
          </div>
        </div>

        <div className="notifications">
          <h3>Notifications</h3>
          <ul>
            <li>You have an OPD appointment with Dr. Smith at 3:00 PM today.</li>
            <li>Bed #12 is available in the ICU section.</li>
            <li>Your prescription for Paracetamol has been dispensed.</li>
          </ul>
        </div>

        <div className="real-time-stats">
          <h3>Hospital Stats</h3>
          <div className="stats">
            <div className="stat-item">
              <h4>OPD Queue</h4>
              <p>15 patients waiting</p>
            </div>
            <div className="stat-item">
              <h4>Available Beds</h4>
              <p>8 available beds</p>
            </div>
            <div className="stat-item">
              <h4>Ambulance Availability</h4>
              <p>3 ambulances available</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Homepage;