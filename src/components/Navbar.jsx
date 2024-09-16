import React, { useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css';
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";


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
            gsap.to(navElement, { backgroundColor: "#333", opacity: "1", duration: 0.1, ease: 'power1.inOut' });
          },
          onLeaveBack: () => {
            gsap.to(navElement, { backgroundColor: 'transparent', duration: 0.1, ease: 'power1.inOut' });
          }
        }
      }
    );
  }, []);

  return (
    <>
      <header ref={navRef}>
        <nav id='nav'>
          <i className="fa-solid fa-kit-medical" style={{color: "#0be545", fontSize: "25px"}}></i>
          <NavLink to="/" className='navlink' activeClassName="active">HOME</NavLink>
          <NavLink to="/discover" className='navlink' activeClassName="active">FEATURES</NavLink>
          <NavLink to="/dashboard" className='navlink' activeClassName="active">HIGHLIGHTS</NavLink>
          <NavLink to="/contact" className='navlink' activeClassName="active">INFO</NavLink>
          <NavLink to="/login" id="login" activeClassName="active">LOGIN</NavLink>
        </nav>
      </header>
    </>
  );
}

export default Navbar;
