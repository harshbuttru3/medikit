import React from "react";
import "./Footer.css";
function Footer() {
  return (
    <div id="footer">
      <div className="footerbox">
        <div className="board img">
          <img className="imglicence" src="/image/health.png" alt="" />
          <img className="imglicence" src="/image/india.png" alt="" />
          <img className="imglicence" src="/image/nic_logo.png" alt="" />
        </div>
        <div className="board">
          <h1>Affiliation</h1>
          <h2>Minister of Health</h2>
          <h2>Government of India</h2>
          <h2>Bihar Government</h2>
        </div>
        <div className="board">
          <h1>References</h1>
          <h2>Feverr</h2>
          <h2>Topal</h2>
          <h2>Instagram</h2>
        </div>
      </div>
      <p>Engineered by-<a href="https://harshbuttru3.github.io/portfolio" target="_blank"> Shivam</a> & <a href="https://harshbuttru3.github.io/portfolio" target="_blank">Aman</a></p>
    </div>
  );
}

export default Footer;
