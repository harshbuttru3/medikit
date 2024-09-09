// ConfirmationPopup.js
import React from 'react';
import './Popup.css'; // Reuse or create CSS for styling

const ConfirmationPopup = ({ message, onConfirm, onCancel }) => {
  return (
    <div className="popup-overlay">
      <div className="popup">
        <h2>Confirm Action</h2>
        <p>{message}</p>
        <button onClick={onConfirm}>Yes, Cancel</button>
        <button onClick={onCancel}>No, Go Back</button>
      </div>
    </div>
  );
};

export default ConfirmationPopup;
