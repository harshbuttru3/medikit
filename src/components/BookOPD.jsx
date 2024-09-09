import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { opdData } from "./opddata";
import { db } from "../firebaseConfig";
import { addDoc, collection } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import "./Book.css";
import Popup from "./Popup";

const BookOPD = () => {
  const loginPopup = "Please log in to book an appointment";
  const failedAppointment = "Failed to book appointment";
  const sucessAppointment = "Appointment booked successfully";

  const [selectedState, setSelectedState] = useState("");
  const [selectedTown, setSelectedTown] = useState("");
  const [selectedHospital, setSelectedHospital] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [selectedTimeSlot, setSelectedTimeSlot] = useState("");
  const [showPopup, setShowPopup] = useState(false); // State to control popup visibility
  const [popupMessage, setPopupMessage] = useState(""); // Dynamic message for the popup
  const [onOkAction, setOnOkAction] = useState(null); // Dynamic action for the OK button

  const navigate = useNavigate();

  // Handle submission of appointment
  const handleSubmit = async () => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (!user) {
      setPopupMessage(loginPopup);
      setOnOkAction(() => () => navigate('/login')); // Set the action for "OK" button to navigate to login
      setShowPopup(true);
      return;
    }

    const appointmentData = {
      userId: user.uid,
      state: selectedState,
      town: selectedTown,
      hospital: selectedHospital,
      department: selectedDepartment,
      doctor: selectedDoctor,
      timeSlot: selectedTimeSlot,
      timestamp: new Date(),
    };

    try {
      // Add appointment data to Firestore
      const docRef = await addDoc(collection(db, "appointments"), appointmentData);
      console.log("Document written with ID: ", docRef.id);

      // Send notification (this will be handled separately)
      setPopupMessage(sucessAppointment); //send success appointment popup
      setOnOkAction(() => () => navigate('/homepage')); //navigate to /homepage on clicking "ok"
      setShowPopup(true);
      // navigate("/homepage");
    } catch (e) {
      console.error("Error adding document: ", e);
      setPopupMessage(failedAppointment);
      setOnOkAction(() => () => setShowPopup(false)); // Close the popup on failed booking
      setShowPopup(true);
    }
  };

  return (
    <div id="opdbook">
      <div id="opd">
        <h1>Book OPD</h1>

        {/* State Dropdown */}
        <label>Select State:</label>
        <select
          onChange={(e) => setSelectedState(e.target.value)}
          value={selectedState}
        >
          <option value="">Select State</option>
          {Object.keys(opdData).map((state) => (
            <option key={state} value={state}>
              {state}
            </option>
          ))}
        </select>

        {/* Town Dropdown */}
        {selectedState && (
          <>
            <label>Select Town:</label>
            <select
              onChange={(e) => setSelectedTown(e.target.value)}
              value={selectedTown}
            >
              <option value="">Select Town</option>
              {Object.keys(opdData[selectedState].towns).map((town) => (
                <option key={town} value={town}>
                  {town}
                </option>
              ))}
            </select>
          </>
        )}

        {/* Hospital Dropdown */}
        {selectedTown && (
          <>
            <label>Select Hospital:</label>
            <select
              onChange={(e) => setSelectedHospital(e.target.value)}
              value={selectedHospital}
            >
              <option value="">Select Hospital</option>
              {Object.keys(opdData[selectedState].towns[selectedTown].hospitals).map(
                (hospital) => (
                  <option key={hospital} value={hospital}>
                    {hospital}
                  </option>
                )
              )}
            </select>
          </>
        )}

        {/* Department Dropdown */}
        {selectedHospital && (
          <>
            <label>Select Department:</label>
            <select
              onChange={(e) => setSelectedDepartment(e.target.value)}
              value={selectedDepartment}
            >
              <option value="">Select Department</option>
              {Object.keys(opdData[selectedState].towns[selectedTown].hospitals[selectedHospital].departments).map(
                (department) => (
                  <option key={department} value={department}>
                    {department}
                  </option>
                )
              )}
            </select>
          </>
        )}

        {/* Doctor Dropdown */}
        {selectedDepartment && (
          <>
            <label>Select Doctor:</label>
            <select
              onChange={(e) => setSelectedDoctor(e.target.value)}
              value={selectedDoctor}
            >
              <option value="">Select Doctor</option>
              {opdData[selectedState].towns[selectedTown].hospitals[selectedHospital].departments[selectedDepartment].doctors.map(
                (doctor) => (
                  <option key={doctor.name} value={doctor.name}>
                    {doctor.name}
                  </option>
                )
              )}
            </select>
          </>
        )}

        {/* Time Slot Dropdown */}
        {selectedDoctor && (
          <>
            <label>Select Time Slot:</label>
            <select
              onChange={(e) => setSelectedTimeSlot(e.target.value)}
              value={selectedTimeSlot}
            >
              <option value="">Select Time Slot</option>
              {opdData[selectedState].towns[selectedTown].hospitals[selectedHospital].departments[selectedDepartment].doctors
                .find((doc) => doc.name === selectedDoctor)
                .timeSlots.map((slot) => (
                  <option key={slot} value={slot}>
                    {slot}
                  </option>
                ))}
            </select>
          </>
        )}

        {/* Submit Button */}
        <button onClick={handleSubmit}>Book Appointment</button>

        {/* Conditionally render the popup */}
        {showPopup && <Popup message={popupMessage} onOk={onOkAction} />}
      </div>
    </div>
  );
};

export default BookOPD;
