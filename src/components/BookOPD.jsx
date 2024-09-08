import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { opdData} from "./opdData";
import "./Book.css";

const BookOPD = () => {
  const [selectedState, setSelectedState] = useState("");
  const [selectedTown, setSelectedTown] = useState("");
  const [selectedHospital, setSelectedHospital] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [selectedTimeSlot, setSelectedTimeSlot] = useState("");

  const navigate = useNavigate();

  // Handle submission of appointment
  const handleSubmit = () => {
    const appointmentData = {
      state: selectedState,
      town: selectedTown,
      hospital: selectedHospital,
      department: selectedDepartment,
      doctor: selectedDoctor,
      timeSlot: selectedTimeSlot,
      timestamp: new Date(),
    };

    console.log("Appointment data:", appointmentData);
    alert("Appointment booked successfully");
    navigate("/homepage");
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
              {Object.keys(opdData[selectedState].towns[selectedTown].hospitals).map((hospital) => (
                <option key={hospital} value={hospital}>
                  {hospital}
                </option>
              ))}
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
      </div>
    </div>
  );
};

export default BookOPD;
