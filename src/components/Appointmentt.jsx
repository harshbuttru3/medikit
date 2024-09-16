import React, { useState, useEffect } from 'react';
import { db } from "../firebaseConfig"; // Import your Firebase configuration
import { collection, query, where, getDocs, deleteDoc, doc } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import LoadingSpinner from "./LoadingSpinner";
import './Appointmentt.css'; // Your existing CSS file
import jsPDF from 'jspdf'; // Import jsPDF
import ConfirmationPopup from './ConfirmationPopup'; // Import the Confirmation Popup component
import Popup from "./Popup"; // Import the simple Popup component

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [appointmentToCancel, setAppointmentToCancel] = useState(null); // State to store appointment to cancel
  const [showConfirmationPopup, setShowConfirmationPopup] = useState(false); // State to control confirmation popup visibility
  const [showPopup, setShowPopup] = useState(false); // State to control the success popup visibility
  const [popupMessage, setPopupMessage] = useState(""); // Dynamic message for the popup

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

  const downloadPDF = (appointment) => {
    const doc = new jsPDF();

    // Add watermark
    doc.setTextColor(150, 150, 150); // Light grey color for watermark
    doc.setFontSize(50);
    doc.text("Medikit", 105, 150, { align: 'center' });

    // Add title
    doc.setFontSize(22);
    doc.text("Booked with Medikit", 10, 20);

    // Add appointment details in the desired format
    doc.setFontSize(16);
    doc.text(`State: ${appointment.state}`, 10, 40);
    doc.text(`Town: ${appointment.town}`, 10, 50);
    doc.text(`Hospital: ${appointment.hospital}`, 10, 60);
    doc.text(`Department: ${appointment.department}`, 10, 70);
    doc.text(`Doctor: ${appointment.doctor}`, 10, 80);
    doc.text(`Time Slot: ${appointment.timeSlot}`, 10, 90);
    doc.text(`Booked on: ${appointment.timestamp.toDate().toLocaleString()}`, 10, 100);

    // Save the PDF
    doc.save(`appointment_${appointment.id}.pdf`);
  };

  const handleCancelClick = (appointment) => {
    setAppointmentToCancel(appointment);
    setShowConfirmationPopup(true);
  };

  const cancelAppointment = async () => {
    try {
      if (appointmentToCancel) {
        await deleteDoc(doc(db, "appointments", appointmentToCancel.id));
        setAppointments(prevAppointments => prevAppointments.filter(appointment => appointment.id !== appointmentToCancel.id));
        setShowConfirmationPopup(false);
        setPopupMessage("Appointment cancelled successfully");
        setShowPopup(true);
      }
    } catch (error) {
      console.error("Error canceling appointment: ", error);
      setPopupMessage("Failed to cancel appointment. Please try again.");
      setShowPopup(true);
    }
  };

  const handleCancelConfirmation = () => {
    cancelAppointment();
  };

  const handleCancelPopup = () => {
    setShowConfirmationPopup(false);
  };

  const handlePopupOk = () => {
    setShowPopup(false);
  };

  if (loading) return <LoadingSpinner/>;

  return (
    <div className="appointments">
      {appointments.length === 0 ? (
        <p>No appointments booked yet.</p>
      ) : (
        <ul>
          {appointments.map((appointment) => (
            <li key={appointment.id}>
              <div className="appointment-card">
                <div className="header-section">
                  <div className="logo-and-title">
                    <img src="" className="logo"/>
                    <div className="title">
                      <h1>APPOINTMENT CARD</h1>
                      <p>Top-notch, innovative medical care</p>
                    </div>
                  </div>
                </div>
                <div className="content-section">
                  <div className="left-content">
                    <h4>State: {appointment.state}</h4>
                    <h4>Town: {appointment.town}</h4>
                    <h4>Booked On: {appointment.timestamp.toDate().toLocaleDateString()}</h4>
                    <h4>Time: {appointment.timestamp.toDate().toLocaleTimeString()}</h4>
                  </div>
                  <div className="right-content">
                    <h2>{appointment.doctor}</h2>
                    <h3>Department: {appointment.department}</h3>
                    <p>Hospital: {appointment.hospital}</p>
                    <p>Time Slot: {appointment.timeSlot}</p>
                  </div>
                </div>
                <div className="action-buttons">
                  <button onClick={() => handleCancelClick(appointment)} className="cancel-appointment-btn">Cancel</button>
                  <button onClick={() => downloadPDF(appointment)} className="download-pdf-btn">Download</button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
      {showConfirmationPopup && (
        <ConfirmationPopup
          message={`Are you sure you want to cancel this appointment?\n\nState: ${appointmentToCancel.state}\nTown: ${appointmentToCancel.town}\nHospital: ${appointmentToCancel.hospital}\nDepartment: ${appointmentToCancel.department}\nDoctor: ${appointmentToCancel.doctor}\nTime Slot: ${appointmentToCancel.timeSlot}`}
          onConfirm={handleCancelConfirmation}
          onCancel={handleCancelPopup}
        />
      )}
      {showPopup && (
        <Popup
          message={popupMessage}
          onOk={handlePopupOk}
        />
      )}
    </div>
  );
};

export default Appointments;
