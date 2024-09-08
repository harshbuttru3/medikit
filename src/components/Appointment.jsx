import React, { useState, useEffect } from 'react';
import { db } from "../firebaseConfig"; // Import your Firebase configuration
import { collection, query, where, getDocs } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import LoadingSpinner from "./LoadingSpinner"
import './Appointment.css'; // Optional: Add CSS for styling

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const auth = getAuth();

    // Wait for Firebase Auth to finish loading
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);  // Set the user state once authenticated
        fetchAppointments(user); // Fetch appointments for the user
      } else {
        setLoading(false);  // Stop loading if user is not authenticated
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  const fetchAppointments = async (user) => {
    try {
      const q = query(
        collection(db, "appointments"),
        where("userId", "==", user.uid)
      );
      const querySnapshot = await getDocs(q);
      const userAppointments = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setAppointments(userAppointments);
    } catch (error) {
      console.error("Error fetching appointments: ", error);
    } finally {
      setLoading(false);  // Set loading to false once appointments are fetched
    }
  };

  if (loading) return <div><LoadingSpinner/></div>;

  return (
    <div className="appointments">
      <h2>Your Appointments</h2>
      {appointments.length === 0 ? (
        <p>No appointments booked yet.</p>
      ) : (
        <ul>
          {appointments.map((appointment) => (
            <li key={appointment.id}>
              {appointment.state}, {appointment.town}, {appointment.hospital}, {appointment.department}, {appointment.doctor}, {appointment.timeSlot}
              <span> (Booked on {appointment.timestamp.toDate().toLocaleString()})</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Appointments;
