import React, { useState, useEffect } from 'react';
import { auth } from '../firebaseConfig'; // Import your Firebase auth instance
import { RecaptchaVerifier, signInWithPhoneNumber, PhoneAuthProvider, signInWithCredential } from 'firebase/auth';
import Popup from './Popup';

const PhoneSignin = () => {
  const [phone, setPhone] = useState('+91'); // Initial phone number
  const [hasFilled, setHasFilled] = useState(false); // Tracks if the phone number has been filled
  const [otp, setOtp] = useState(''); // Stores the OTP entered by the user
  const [verificationId, setVerificationId] = useState(null); // Stores the verification ID

  const generateRecaptcha = () => {
    window.recaptchaVerifier = new RecaptchaVerifier('recaptcha', {
      'size': 'invisible',
      'callback': (response) => {
        // reCAPTCHA solved, allow signInWithPhoneNumber.
      }
    }, auth);
  };

  const handleSend = (event) => {
    event.preventDefault();
    setHasFilled(true);
    generateRecaptcha(); // Create the RecaptchaVerifier
    let appVerifier = window.recaptchaVerifier;

    signInWithPhoneNumber(auth, phone, appVerifier)
      .then((confirmationResult) => {
        // SMS sent. Store the confirmation result
        window.confirmationResult = confirmationResult;
        setVerificationId(confirmationResult.verificationId); // Store the verification ID
      })
      .catch((error) => {
        // Error; SMS not sent
        console.log(error);
      });
  };

  const verifyOtp = (event) => {
    let otp = event.target.value;
    setOtp(otp);

    if (otp.length === 6) {
      // Verify OTP
      let confirmationResult = window.confirmationResult;
      confirmationResult.confirm(otp)
        .then((result) => {
          // User signed in successfully.
          let user = result.user;
          console.log(user);
          alert('User signed in successfully');
        })
        .catch((error) => {
          // User couldn't sign in (bad verification code?)
          alert('Invalid verification code');
        });
    }
  };

  useEffect(() => {
    if (hasFilled) {
      // Only create the RecaptchaVerifier when the element is rendered
      generateRecaptcha();
    }
  }, [hasFilled]); // Run this effect when hasFilled changes

  return (
    <div>
      <h2>Phone Sign-in</h2>
      {/* Phone Input Form */}
      {!hasFilled ? (
        <form onSubmit={handleSend}>
          <input
            type="text"
            placeholder="Enter your phone number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
          <div id="recaptcha"></div> {/* Make sure this is rendered */}
          <button type="submit">Send OTP</button>
        </form>
      ) : (
        // OTP Input for verification
        <div>
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={verifyOtp}
            maxLength={6}
          />
        </div>
      )}
    </div>
  );
};

export default PhoneSignin;
