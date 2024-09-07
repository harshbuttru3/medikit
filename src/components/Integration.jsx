import React, { useEffect } from 'react';
import './integration.css'; // Ensure you import your CSS
import Cursor from './Cursor'; // Import the Cursor component

const Integration = () => {
  return (
    <div className="page5">
      <Cursor /> {/* Include the Cursor component here */}
      <h2>features</h2>
      <div className="box" data-image="/image/consult.jpg">
        <h3>Online OPD's services</h3>
        <h4 className="verify"><i className="ri-verified-badge-fill" style={{color: "#4692DD", fontSize: "25px"}}></i></h4>
      </div>
      <div className="box" data-image="/image/pregnent.png">
        <h3>Pregnent ladies bed availablity</h3>
        <h4 className="verify"><i className="ri-verified-badge-fill" style={{color: "#4692DD", fontSize: "25px"}}></i></h4>
      </div>
      <div className="box" data-image="/image/bedavail.png">
        <h3>Bed availablity check</h3>
        <h4 className="verify"><i className="ri-verified-badge-fill" style={{color: "#4692DD", fontSize: "25px"}}></i></h4>
      </div>
      <div className="box" data-image="/image/heart.png">
        <h3>Appointment for Blood donation</h3>
        <h4 className="verify"><i className="ri-verified-badge-fill verify" style={{color: "#4692DD", fontSize: "25px"}}></i></h4>
      </div>
      <div className="box" data-image="/image/heart.png">
        <h3>Blood Requirement</h3>
        <h4 className="verify"><i className="ri-verified-badge-fill verify" style={{color: "#4692DD", fontSize: "25px"}}></i></h4>
      </div>
      <div className="box" data-image="/image/ambu.jpg">
        <h3>Ambulance booking</h3>
        <h4 className="verify"><i className="ri-verified-badge-fill" style={{color: "#4692DD", fontSize: "25px"}}></i></h4>
      </div>
      <div className="box" data-image="/image/location.png">
        <h3>Live ambulance tracking</h3>
        <h4 className="verify"><i className="ri-verified-badge-fill" style={{color: "#4692DD", fontSize: "25px"}}></i></h4>
      </div>
    </div>
  );
};

export default Integration;
