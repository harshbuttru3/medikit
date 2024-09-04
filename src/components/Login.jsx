import React, { useState } from 'react';
import './Login.css'; // Ensure you have the appropriate CSS in Login.css
import GoogleSignIn from './Google';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import '@fortawesome/fontawesome-free/css/all.min.css';

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);

  const handleLoginClick = () => {
    setIsLogin(true);
  };

  const handleSignupClick = () => {
    setIsLogin(false);
  };

  return (
    <div id='loginreg'>
    <div id="container">
      <div id="logphoto">
        {/* Add any background image or styling here */}
      </div>
      {/* //adding */}
      {isLogin ? (
  <div id="login" className="form-container">
    <h2>Login</h2>
        <div className="button">
          <GoogleSignIn> <i className="fa-brands fa-google"></i> Google</GoogleSignIn>
          <button type="button">
            <i className="fa-solid fa-mobile-screen-button"></i> Phone
          </button>
        </div>
        <input type="email" placeholder="Enter your email" className="inputing" />
        <input type="password" placeholder="Enter your password" className="inputing" />
        <button id="loginSubmit" type="button">Login</button>
        <h3>Don't have an account? <span onClick={handleSignupClick} id="signupbtn">Signup</span></h3>
  </div>
) : (
  <div id="signup" className="form-container">
    <h2>Register</h2>
        <div className="button">
          <button type="button">
            <i className="fa-brands fa-google"></i> Google
          </button>
          <button type="button">
            <i className="fa-solid fa-mobile-screen-button"></i> Phone
          </button>
        </div>
        <input type="email" placeholder="Enter your email" className="inputing" />
        <input type="password" placeholder="Set your password" className="inputing" />
        <button id="signupSubmit" type="button">Register</button>
        <h3>Already have an account? <span onClick={handleLoginClick} id="loginbtn">Login</span></h3>
  </div>
)}
    </div>
    </div>
  );
}

export default Login;
