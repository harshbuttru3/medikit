import React from 'react'
import { NavLink } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  return (
    <>
     <header>
          <nav>
            <NavLink to="/" className='navlink' activeClassName="active">HOME</NavLink>
            <NavLink to="/discover" className='navlink' activeClassName="active">DISCOVER</NavLink>
            <NavLink to="/dashboard" className='navlink' activeClassName="active">DASHBOARD</NavLink>
            <NavLink to="/contact" className='navlink' activeClassName="active">CONTACT</NavLink>
           <NavLink to="/login" id="login" activeClassName="active">LOGIN</NavLink>
          </nav>
        </header>
    </>
  )
}

export default Navbar;