import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './Homenav.css';
import LogoutButton from './Logout';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons/faBars';

function Homenav() {
  // State to manage menu visibility
  const [menuOpen, setMenuOpen] = useState(false);

  // Toggle menu open/close
  const handleMenu = () => {
    setMenuOpen(prevState => !prevState); // Toggle the state
    console.log("Menu Open:", !menuOpen); // Debugging statement
  };

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

        {/* Menu toggle button */}
        <button id="menubar" onClick={handleMenu}>
          <FontAwesomeIcon icon={faBars} className='fabars' />
        </button>
      </div>
    </>
  );
}

export default Homenav;
