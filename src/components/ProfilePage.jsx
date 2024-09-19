import React, { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db, auth } from '../firebaseConfig';
import LoadingSpinner from './LoadingSpinner';
import './ProfilePage.css';

function ProfilePage() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        // Check if profile exists in sessionStorage
        const storedProfile = sessionStorage.getItem('profileData');
        if (storedProfile) {
          console.log('Profile found in sessionStorage:', storedProfile);
          setProfile(JSON.parse(storedProfile));
          setLoading(false);
          return; // Exit early if profile is in sessionStorage
        }

        // If not in sessionStorage, fetch from Firestore
        const user = auth.currentUser;

        if (user) {
          console.log("Current user UID:", user.uid);
          const profileRef = doc(db, 'profiles', user.uid);
          const profileSnap = await getDoc(profileRef);

          if (profileSnap.exists()) {
            const profileData = profileSnap.data();
            console.log("Profile data fetched from Firestore:", profileData);

            // Store profile data in sessionStorage
            sessionStorage.setItem('profileData', JSON.stringify(profileData));

            setProfile(profileData);
          } else {
            console.log("No profile found for this user.");
          }
        } else {
          console.log('No user is currently logged in.');
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!profile) {
    return <div>No profile data available.</div>;
  }

  return (
    <div id="ProfilePage">
      <div className="profile-container">
        <h2>User Profile</h2>
        <div className="profile-info">
          <div className="info-row">
            <span className="info-label">Full Name:</span>
            <span className="info-value">{profile.fullName}</span>
          </div>
          <div className="info-row">
            <span className="info-label">Gender:</span>
            <span className="info-value">{profile.gender}</span>
          </div>
          <div className="info-row">
            <span className="info-label">Date of Birth:</span>
            <span className="info-value">{profile.dobDay} {profile.dobMonth} {profile.dobYear}</span>
          </div>
          <div className="info-row">
            <span className="info-label">Mobile No:</span>
            <span className="info-value">{profile.mobile}</span>
          </div>
          <div className="info-row">
            <span className="info-label">Email:</span>
            <span className="info-value">{profile.email}</span>
          </div>
          <div className="info-row">
            <span className="info-label">Address:</span>
            <span className="info-value">{profile.address}</span>
          </div>
          <div className="info-row">
            <span className="info-label">State:</span>
            <span className="info-value">{profile.state}</span>
          </div>
          <div className="info-row">
            <span className="info-label">District:</span>
            <span className="info-value">{profile.district}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
