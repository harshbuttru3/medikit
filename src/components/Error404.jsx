import React from "react";
import './Error404.css';

function Error404() {
  return (
    <div id="Error404">
      <div className="error-container">
        <div className="error-content">
          <h1>404</h1>
          <p>Oops! The page you are looking for is not available.</p>
          <p>It looks like this page needs a check-up!</p>
          <a href="/" className="home-link">
            Go Back Home
          </a>
        </div>
      </div>
    </div>
  );
}

export default Error404;
