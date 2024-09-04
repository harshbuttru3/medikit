import React, { useState } from 'react';
import { auth } from '../firebaseConfig';// Import your Firebase auth instance
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';

const PhoneSignIn = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [verificationId, setVerificationId] = useState(null);
  const [verificationCode, setVerificationCode] = useState('');
  const [user, setUser] = useState(null);
  const [showVerification, setShowVerification] = useState(false);

  const handlePhoneNumberChange = (event) => {
    setPhoneNumber(event.target.value);
  };

  const handleVerificationCodeChange = (event) => {
    setVerificationCode(event.target.value);
  };

  const startPhoneNumberVerification = async () => {
    try {
      const appVerifier = new RecaptchaVerifier('recaptcha-container', {
        size: 'invisible',
        callback: (response) => {
          // reCAPTCHA solved, proceed with sign-in
        },
      });

      const result = await signInWithPhoneNumber(auth, phoneNumber, appVerifier);
      setVerificationId(result.verificationId);
      setShowVerification(true);
      console.log("Verification ID:", result.verificationId);
    } catch (error) {
      console.error("Error starting phone number verification:", error);
    }
  };

  const verifyPhoneNumber = async () => {
    try {
      const credential = PhoneAuthProvider.credential(verificationId, verificationCode);
      const result = await signInWithCredential(auth, credential);
      setUser(result.user);
      console.log("User signed in with phone number:", result.user);
    } catch (error) {
      console.error("Error verifying phone number:", error);
    }
  };

  return (
    <div>
      {!showVerification && (
        <div>
          <input type="tel" value={phoneNumber} onChange={handlePhoneNumberChange} placeholder="Enter your phone number" />
          <button onClick={startPhoneNumberVerification}>Send Verification Code</button>
        </div>
      )}

      {showVerification && (
        <div>
          <input type="text" value={verificationCode} onChange={handleVerificationCodeChange} placeholder="Enter verification code" />
          <button onClick={verifyPhoneNumber}>Verify</button>
        </div>
      )}
    </div>
  );
};

export default PhoneSignIn;
