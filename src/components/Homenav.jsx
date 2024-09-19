import React, { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import './Homenav.css';
import LogoutButton from './Logout';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons/faBars';
import { auth } from '../firebaseConfig'; // Firebase authentication
import { onAuthStateChanged } from 'firebase/auth';

function Homenav() {
  // State to manage menu visibility
  const [menuOpen, setMenuOpen] = useState(false);
  const [username, setUsername] = useState('');

  // Toggle menu open/close
  const handleMenu = () => {
    setMenuOpen(prevState => !prevState); // Toggle the state
    console.log("Menu Open:", !menuOpen); // Debugging statement
  };

  // Fetch the logged-in user's name
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // If user has a display name, use that; otherwise, fallback to email prefix
        const displayName = user.displayName || user.email.split('@')[0];
        setUsername(displayName);
      }
    });

    return () => unsubscribe(); // Clean up the listener
  }, []);

  return (
    <>
      <div id='headerr'>
        <i className="fa-solid fa-kit-medical" style={{color: "#0be545", fontSize: "25px"}}></i>
        
        <nav id='nav' className={menuOpen ? 'open' : ''}>
          <NavLink to="#" className='navlink'>HOME</NavLink>
          <NavLink to="/discover" className='navlink'>APPOINTMENTS</NavLink>
          <NavLink to="/dashboard" className='navlink'>FEATURES</NavLink>
          <NavLink to="/contact" className='navlink'>HIGHLIGHTS</NavLink>
          <NavLink to="/contact" className='navlink'>INFO</NavLink>
          <NavLink to="/login" id="login"><LogoutButton /></NavLink>
        </nav>

        {/* Display username before user icon */}
        <Link to="/profile" className="profile-link">
          {username && <span className="username">{username}</span>} {/* Display username */}
          <i className='fa-solid fa-user' style={{fontSize: "25px", marginLeft: "5px"}}></i>
        </Link>

        {/* Menu toggle button */}
        <button id="menubar" onClick={handleMenu}>
          <FontAwesomeIcon icon={faBars} className='fabars' />
        </button>
      </div>
    </>
  );
}

export default Homenav;
