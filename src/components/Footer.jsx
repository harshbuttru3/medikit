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
      </div>
      <p>Engineered by-<a href="https://harshbuttru3.github.io/portfolio" target="_blank"> Shivam</a> & <a href="https://portfolio-unfinished.web.app" target="_blank">Aman</a></p>
    </div>
  );
}

export default Footer;
