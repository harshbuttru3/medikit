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
          <NavLink to="/" className='navlink' activeClassName="active">HOME</NavLink>
          <NavLink to="/discover" className='navlink' activeClassName="active">DISCOVER</NavLink>
          <NavLink to="/dashboard" className='navlink' activeClassName="active">DASHBOARD</NavLink>
          <NavLink to="/contact" className='navlink' activeClassName="active">CONTACT</NavLink>
          <NavLink to="/login" id="login" activeClassName="active"><LogoutButton/></NavLink>
        </nav>
      </div>
    </>
  );
}

export default Homenav;
