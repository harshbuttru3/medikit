import React, { useEffect } from 'react';
import './integration.css'; // Ensure you import your CSS
import Cursor from './Cursor'; // Import the Cursor component

const Integration = () => {
  return (
    <div className="page5">
      <Cursor /> {/* Include the Cursor component here */}
      <h2>feature</h2>
      <div className="box" data-image="/image/opd.jpg">
        <h3>Online OPD's services</h3>
        <h4 className="verify"><i className="ri-verified-badge-fill" style={{color: "#4692DD", fontSize: "25px"}}></i></h4>
      </div>
      <div className="box" data-image="https://images.unsplash.com/photo-1688232543149-5602b136ba11?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDExfGJvOGpRS1RhRTBZfHxlbnwwfHx8fHw%3D&auto=format&fit=crop&w=500&q=60">
        <h3>Appointment for Blood donation</h3>
        <h4 className="verify"><i className="ri-verified-badge-fill verify" style={{color: "#4692DD", fontSize: "25px"}}></i></h4>
      </div>
      <div className="box" data-image="https://images.unsplash.com/photo-1688103920333-117afda88518?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDMwfGJvOGpRS1RhRTBZfHxlbnwwfHx8fHw%3D&auto=format&fit=crop&w=500&q=60">
        <h3>Bed availablity check</h3>
        <h4 className="verify"><i className="ri-verified-badge-fill" style={{color: "#4692DD", fontSize: "25px"}}></i></h4>
      </div>
      <div className="box" data-image="https://images.unsplash.com/photo-1687913161653-7cddb0ba09b0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=736&q=80">
        <h3>Ambulance booking</h3>
        <h4 className="verify"><i className="ri-verified-badge-fill" style={{color: "#4692DD", fontSize: "25px"}}></i></h4>
      </div>
      <div className="box" data-image="https://images.unsplash.com/photo-1687913161653-7cddb0ba09b0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=736&q=80">
        <h3>Live ambulance tracking</h3>
        <h4 className="verify"><i className="ri-verified-badge-fill" style={{color: "#4692DD", fontSize: "25px"}}></i></h4>
      </div>
      <div className="box" data-image="https://images.unsplash.com/photo-1687913161653-7cddb0ba09b0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=736&q=80">
        <h3>Special availablity check of bed for pregnent ladies in GOVT. hospitals</h3>
        <h4 className="verify"><i className="ri-verified-badge-fill" style={{color: "#4692DD", fontSize: "25px"}}></i></h4>
      </div>
    </div>
  );
};

export default Integration;
