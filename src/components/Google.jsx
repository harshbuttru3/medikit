import React, { useState } from 'react';
import { auth } from '../firebaseConfig'; // Import your Firebase auth instance
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

function GoogleSignIn() {
  const [user, setUser] = useState(null);

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      setUser(result.user);
      console.log("User signed in with Google:", result.user);
      window.location.href = "/onboarding"
    } catch (error) {
      console.error("Error signing in with Google:", error);
    }
  };

  return (
    <button className='bu' onClick={handleGoogleSignIn}><i className="fa-brands fa-google"></i> Google</button>
  );
}

export default GoogleSignIn;
