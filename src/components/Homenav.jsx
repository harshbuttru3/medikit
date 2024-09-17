import React from 'react';
import { NavLink } from 'react-router-dom';
import './Homenav.css';
import LogoutButton from './Logout';



function Homenav() {

  return (
    <>
      <div id='headerr'>
        <nav id='nav'>
          <i className="fa-solid fa-kit-medical" style={{color: "#0be545", fontSize: "25px"}}></i>
          <NavLink to="#" className='navlink' >HOME</NavLink>
          <NavLink to="/discover" className='navlink' >APPOINTMENTS</NavLink>
          <NavLink to="/dashboard" className='navlink' >FEATURES</NavLink>
          <NavLink to="/contact" className='navlink' >HIGHLIGHTS</NavLink>
          <NavLink to="/contact" className='navlink' >INFO</NavLink>

          <NavLink to="/login" id="login" ><LogoutButton/></NavLink>
        </nav>
      </div>
    </>
  );
}

export default Homenav;
