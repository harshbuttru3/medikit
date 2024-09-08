import React, { useState, useEffect } from 'react';
import { db } from "../firebaseConfig"; // Import your Firebase configuration
import { collection, query, where, getDocs } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import "./Appointment.css" // Optional: Add CSS for styling

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAppointments = async () => {
      const auth = getAuth();
      const user = auth.currentUser;
      if (!user) return;

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
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

//   if (loading) return <div>Loading...</div>;

  return (
    <div className="appointments">
      <h2>Your Appointments</h2>
      {appointments.length === 0 ? (
        <p>No appointments booked yet.</p>
      ) : (
        <ul>
          {appointments.map((appointment) => (
            <li key={appointment.id}>
             State: {appointment.state}, <br/> Town: {appointment.town},<br/> Hospital: {appointment.hospital},<br/> Department: {appointment.department},<br/> Doctor: {appointment.doctor},<br/> Time:  {appointment.timeSlot}
              <span> (Booked on {appointment.timestamp.toDate().toLocaleString()})</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Appointments;
