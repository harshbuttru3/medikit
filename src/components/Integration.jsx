// Integration.js
import React, { useEffect } from 'react';
import Typed from 'typed.js';
import './integration.css'; // Ensure you import your CSS

const Integration = () => {
  useEffect(() => {
    const options = {
      strings: ["Government", "Private"],
      typeSpeed: 100,
      backSpeed: 100,
      loop: true,
      showCursor: false,
      smartBackspace: true,
    };

    const typed = new Typed(".changing", options);

    // Cleanup function to destroy the Typed instance when the component unmounts
    return () => {
      typed.destroy();
    };
  }, []);

  return (
    <div id='pageb'>
    <div id="integration">
      <div id="image"></div>
      <div id="connection">
        <h1>
          <span id="medikit">MEDIKIT</span> is integrated with <span className="changing"></span> Hospital Services
        </h1>
        <hr />
        <ul id="feature">
          <li>Online <span id="OPD">OPD's</span> Booking.</li>
          <li>Online appointment for <span id="Blood">Blood</span> donation.</li>
          <li>Online <span id="Bed">Bed</span> Booking.</li>
          <li>Online <span id="Ambulance">Ambulance</span> Booking.</li>
          <li>Online live <span id="tracking">Tracking</span> Ambulance.</li>
          <li>Special availability of bed in <span id="Government">Government</span> hospitals for <span id="preg">Pregnant</span> Ladies.</li>
        </ul>
        <button id="learn">Learn More</button>
      </div>
    </div>
    </div>
  );
};

export default Integration;
