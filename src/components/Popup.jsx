import React from 'react';
import './Popup.css';

const Popup = ({ message, onOk }) => {
  return (
    <div className="popup-overlay">
      <div className="popup">
        <h2>Hey there !</h2>
        <p>{message}</p> {/* Displaying dynamic message here */}
        <button onClick={onOk}>OK</button> {/* Use the onOk prop for the button action */}
      </div>
    </div>
  );
};

export default Popup;
