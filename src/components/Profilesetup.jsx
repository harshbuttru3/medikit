import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import './Profilesetup.css';
import { setDoc, doc, getDoc } from "firebase/firestore";
import { db, auth } from "../firebaseConfig";
import StateDistrict from "./StateDistrict";
import { onAuthStateChanged } from "firebase/auth";
import LoadingSpinner from "./LoadingSpinner";


function Profilesetup() {
  const navigate = useNavigate();

  // Form state management
  const [formData, setFormData] = useState({
    relation: "",
    initial: "",
    fullName: "",
    gender: "",
    dobDay: "",
    dobMonth: "",
    dobYear: "",
    mobile: "",
    email: "",
    address: "",
    state: "",
    district: ""
  });

  const [loading, setLoading] = useState(true);
  const stateDistricts = StateDistrict;
  const states = Object.keys(stateDistricts);
  const days = Array.from({ length: 31 }, (_, i) => i + 1);

  // Check if user is logged in and if profile exists
  useEffect(() => {
    const checkUserProfile = async (user) => {
      if (user) {
        try {
          const profileRef = doc(db, "profiles", user.uid); // Reference to the profile document using user's UID
          const profileSnap = await getDoc(profileRef);

          console.log("User profile check:", profileSnap.exists());

          if (profileSnap.exists()) {
            console.log("Profile exists. Redirecting to homepage...");
            navigate("/homepage");
          } else {
            console.log("No profile found. Proceed with profile setup.");
            setLoading(false);
          }
        } catch (error) {
          console.error("Error fetching profile:", error);
        }
      } else {
        console.log("No user logged in. Redirecting to login...");
        navigate("/login");
      }
    };

    // Firebase auth state listener
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("User authenticated:", user.uid);
        checkUserProfile(user); // Check if the profile exists when user is authenticated
      } else {
        console.log("User not authenticated. Redirecting to login...");
        navigate("/login");
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, [navigate]);

  // Handle input changes
  const handleChange = (e) => {
    const { id, value } = e.target;
    console.log(`Input change - ${id}: ${value}`);
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));

    // Reset district if state changes
    if (id === "state") {
      setFormData((prevData) => ({
        ...prevData,
        district: "", // Clear district when state changes
      }));
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form submission:", formData);
    try {
      // Get current user
      const user = auth.currentUser;
      if (user) {
        console.log("Submitting profile for user:", user.uid);
        // Save profile with the user's UID
        await setDoc(doc(db, "profiles", user.uid), { ...formData, userId: user.uid });
        console.log("Profile setup successful. Redirecting to homepage...");
        alert("Profile setup successful");
        navigate("/homepage");
      } else {
        console.log("User not authenticated.");
        alert("User not authenticated");
      }
    } catch (error) {
      console.error("Error adding document:", error);
      alert("There was an error setting up the profile. Please try again.");
    }
    
  };
  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    
    <div id="Profilesetup">
      <div className="form-container">
        <div className="form-header">
          <h2>Setup your Profile</h2>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="input-group">
              <label htmlFor="relation">Relation</label>
              <select id="relation" value={formData.relation} onChange={handleChange} required>
                <option value="" disabled>Select</option>
                <option value="Self">Self</option>
                <option value="Father">Father</option>
                <option value="Mother">Mother</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className="input-group">
              <label htmlFor="initial">Initial</label>
              <select id="initial" value={formData.initial} onChange={handleChange} required>
                <option value="" disabled>Select</option>
                <option value="Mr.">Mr.</option>
                <option value="Ms.">Ms.</option>
                <option value="Mrs.">Mrs.</option>
                <option value=" ">None</option>
              </select>
            </div>
          </div>

          <div className="row">
            <div className="input-group">
              <label htmlFor="fullName">Full Name</label>
              <input type="text" id="fullName" value={formData.fullName} onChange={handleChange} required />
            </div>
            <div className="input-group">
              <label htmlFor="gender">Gender</label>
              <select id="gender" value={formData.gender} onChange={handleChange} required>
                <option value="" disabled>Select</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          <div className="row">
            <div className="input-group">
              <label htmlFor="dobDay">Date of Birth (Day)</label>
              <select id="dobDay" value={formData.dobDay} onChange={handleChange} required>
                <option value="" disabled>Day</option>
                {days.map((day) => (
                  <option key={day} value={day}>{day}</option>
                ))}
              </select>
            </div>
            <div className="input-group">
              <label htmlFor="dobMonth">Month</label>
              <select id="dobMonth" value={formData.dobMonth} onChange={handleChange} required>
                <option value="" disabled>Month</option>
                <option value="January">January</option>
                <option value="February">February</option>
                <option value="March">March</option>
                <option value="April">April</option>
                <option value="May">May</option>
                <option value="June">June</option>
                <option value="July">July</option>
                <option value="August">August</option>
                <option value="September">September</option>
                <option value="October">October</option>
                <option value="November">November</option>
                <option value="December">December</option>
              </select>
            </div>
            <div className="input-group">
              <label htmlFor="dobYear">Year</label>
              <select id="dobYear" value={formData.dobYear} onChange={handleChange} required>
                <option value="" disabled>Year</option>
                {Array.from({ length: 100 }, (_, i) => 2024 - i).map((year) => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="row">
            <div className="input-group">
              <label htmlFor="mobile">Mobile No</label>
              <input type="text" id="mobile" value={formData.mobile} onChange={handleChange} required />
            </div>
            <div className="input-group">
              <label htmlFor="email">Email</label>
              <input type="email" id="email" value={formData.email} onChange={handleChange} required />
            </div>
          </div>

          <div className="row">
            <div className="input-group">
              <label htmlFor="address">Address</label>
              <input type="text" id="address" value={formData.address} onChange={handleChange} required />
            </div>
            <div className="input-group">
              <label htmlFor="country">Country</label>
              <input type="text" id="country" value="India" readOnly />
            </div>
          </div>

          <div className="row">
            <div className="input-group">
              <label htmlFor="state">State</label>
              <select id="state" value={formData.state} onChange={handleChange} required>
                <option value="" disabled>Select State</option>
                {states.map((state) => (
                  <option key={state} value={state}>{state}</option>
                ))}
              </select>
            </div>
            <div className="input-group">
              <label htmlFor="district">District</label>
              <select id="district" value={formData.district} onChange={handleChange} required>
                <option value="" disabled>Select District</option>
                {formData.state && stateDistricts[formData.state]?.map((district) => (
                  <option key={district} value={district}>{district}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="row">
            <button type="submit" className="submit-btn">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Profilesetup;
