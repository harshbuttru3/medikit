import React, { useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css';
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Logout from "./Logout";

gsap.registerPlugin(ScrollTrigger);

function Navbar() {
  const navRef = useRef(null);

  useEffect(() => {
    const navElement = navRef.current;

    // Initialize GSAP ScrollTrigger
    gsap.fromTo(
      navElement,
      { backgroundColor: 'transparent', y: 0 },
      {
        y: 0,
        duration: 0.3,
        scrollTrigger: {
          trigger: navElement,
          start: "top -30%",
          end: "top 0%",// Adjust this value based on how long you want the sticky effect to last
          scrub: 2,
          markers: false,

          onEnter: () => {
            gsap.to(navElement, { backgroundColor: "grey", opacity: "0.9", duration: 0.3, ease: 'power1.inOut' });
          },
          onLeaveBack: () => {
            gsap.to(navElement, { backgroundColor: 'transparent', duration: 0.3, ease: 'power1.inOut' });
          }
        }
      }
    );
  }, []);

  return (
    <>
      <header ref={navRef}>
        <nav >
          <i className="fa-solid fa-kit-medical" style={{color: "#0be545", fontSize: "25px"}}></i>
          <NavLink to="/" className='navlink' activeClassName="active">HOME</NavLink>
          <NavLink to="/discover" className='navlink' activeClassName="active">DISCOVER</NavLink>
          <NavLink to="/dashboard" className='navlink' activeClassName="active">DASHBOARD</NavLink>
          <NavLink to="/contact" className='navlink' activeClassName="active">CONTACT</NavLink>
          <NavLink to="/login" id="login" activeClassName="active"> <Logout/> </NavLink>
        </nav>
      </header>
    </>
  );
}

export default Navbar;
