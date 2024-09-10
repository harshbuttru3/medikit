import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { opdData } from "./opdData";
import { db } from "../firebaseConfig";
import { addDoc, collection } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import "./Book.css";
import Popup from "./Popup";

const BookOPD = () => {
  const loginPopup = "Please log in to book an appointment";
  const failedAppointment = "Failed to book appointment";
  const successAppointment = "Appointment booked successfully";

  const [selectedState, setSelectedState] = useState("");
  const [selectedTown, setSelectedTown] = useState("");
  const [selectedHospital, setSelectedHospital] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [selectedTimeSlot, setSelectedTimeSlot] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const [onOkAction, setOnOkAction] = useState(null);
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  // Validate form fields
  const validateForm = () => {
    let formErrors = {};
    if (!selectedState) formErrors.state = "State is required";
    if (!selectedTown) formErrors.town = "Town is required";
    if (!selectedHospital) formErrors.hospital = "Hospital is required";
    if (!selectedDepartment) formErrors.department = "Department is required";
    if (!selectedDoctor) formErrors.doctor = "Doctor is required";
    if (!selectedTimeSlot) formErrors.timeSlot = "Time slot is required";
    
    setErrors(formErrors);

    return Object.keys(formErrors).length === 0; // If no errors, return true
  };

  // Handle submission of appointment
  const handleSubmit = async () => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (!validateForm()) {
      return; // Stop submission if form is invalid
    }

    if (!user) {
      setPopupMessage(loginPopup);
      setOnOkAction(() => () => navigate('/login')); 
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

      setPopupMessage(successAppointment);
      setOnOkAction(() => () => navigate('/homepage')); 
      setShowPopup(true);
    } catch (e) {
      console.error("Error adding document: ", e);
      setPopupMessage(failedAppointment);
      setOnOkAction(() => () => setShowPopup(false));
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
        {errors.state && <p className="error">{errors.state}</p>} {/* Show error message */}

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
            {errors.town && <p className="error">{errors.town}</p>}
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
            {errors.hospital && <p className="error">{errors.hospital}</p>}
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
            {errors.department && <p className="error">{errors.department}</p>}
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
            {errors.doctor && <p className="error">{errors.doctor}</p>}
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
            {errors.timeSlot && <p className="error">{errors.timeSlot}</p>}
          </>
        )}

        {/* Submit Button */}
        <button onClick={handleSubmit} disabled={!selectedState || !selectedTown || !selectedHospital || !selectedDepartment || !selectedDoctor || !selectedTimeSlot}>
          Book Appointment
        </button>

        {/* Conditionally render the popup */}
        {showPopup && <Popup message={popupMessage} onOk={onOkAction} />}
      </div>
    </div>
  );
};

export default BookOPD;
