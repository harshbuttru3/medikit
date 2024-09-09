import React from 'react';
import { auth } from '../firebaseConfig';// Import your Firebase auth instance
import { signOut } from 'firebase/auth';

const LogoutButton = () => {
  const handleLogout = async () => {
    try {
      await signOut(auth);
      console.log("User signed out successfully");
      window.location.href = "/"
      // You might want to redirect the user to a login page or home page here
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <h4 onClick={handleLogout}>Logout</h4>
  );
};

export default LogoutButton;
