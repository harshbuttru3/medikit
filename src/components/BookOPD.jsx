// src/BookOPD.jsx
import { useEffect, useState } from 'react';
import { db } from '../firebaseConfig';
import { collection, getDocs,addDoc, query, where } from 'firebase/firestore';
import seedFirestore from './SeedFirestore'; // Import seed function

const BookOPD = () => {
  const [states, setStates] = useState([]);
  const [towns, setTowns] = useState([]);
  const [hospitals, setHospitals] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [timeSlots, setTimeSlots] = useState([]);

  const [selectedState, setSelectedState] = useState('');
  const [selectedTown, setSelectedTown] = useState('');
  const [selectedHospital, setSelectedHospital] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [selectedDoctor, setSelectedDoctor] = useState('');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('');

  // Seed data on component mount
  useEffect(() => {
    seedFirestore(); // Seed data

    // Fetch states from Firestore
    const fetchStates = async () => {
      const querySnapshot = await getDocs(collection(db, 'states'));
      const stateData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setStates(stateData);
    };

    fetchStates();
  }, []);

  // Fetch towns based on selected state
  useEffect(() => {
    if (selectedState) {
      const fetchTowns = async () => {
        const townsSnapshot = await getDocs(collection(db, `states/${selectedState}/towns`));
        const townData = townsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setTowns(townData);
      };

      fetchTowns();
    }
  }, [selectedState]);

  // Fetch hospitals based on selected town
  useEffect(() => {
    if (selectedTown) {
      const fetchHospitals = async () => {
        const hospitalsSnapshot = await getDocs(collection(db, `states/${selectedState}/towns/${selectedTown}/hospitals`));
        const hospitalData = hospitalsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setHospitals(hospitalData);
      };

      fetchHospitals();
    }
  }, [selectedTown]);

  // Fetch departments based on selected hospital
  useEffect(() => {
    if (selectedHospital) {
      const fetchDepartments = async () => {
        const departmentsSnapshot = await getDocs(collection(db, `states/${selectedState}/towns/${selectedTown}/hospitals/${selectedHospital}/departments`));
        const departmentData = departmentsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setDepartments(departmentData);
      };

      fetchDepartments();
    }
  }, [selectedHospital]);

  // Fetch doctors based on selected department
  useEffect(() => {
    if (selectedDepartment) {
      const fetchDoctors = async () => {
        const doctorsSnapshot = await getDocs(collection(db, `states/${selectedState}/towns/${selectedTown}/hospitals/${selectedHospital}/departments/${selectedDepartment}/doctors`));
        const doctorData = doctorsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setDoctors(doctorData);
      };

      fetchDoctors();
    }
  }, [selectedDepartment]);

  // Fetch time slots based on selected doctor
  useEffect(() => {
    if (selectedDoctor) {
      const fetchTimeSlots = async () => {
        const timeSlotsSnapshot = await getDocs(collection(db, `states/${selectedState}/towns/${selectedTown}/hospitals/${selectedHospital}/departments/${selectedDepartment}/doctors/${selectedDoctor}/timeSlots`));
        const timeSlotData = timeSlotsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setTimeSlots(timeSlotData);
      };

      fetchTimeSlots();
    }
  }, [selectedDoctor]);


  //submitting the data to "appointment" collection in firestore
  const handleSubmit = async () => {
    try {
      // Create an object with the data to be submitted
      const appointmentData = {
        state: selectedState,
        town: selectedTown,
        hospital: selectedHospital,
        department: selectedDepartment,
        doctor: selectedDoctor,
        timeSlot: selectedTimeSlot,
        timestamp: new Date() // Add a timestamp for the appointment
      };
  
      // Add the data to the Firestore collection "appointments"
      const docRef = await addDoc(collection(db, 'appointments'), appointmentData);
  
      console.log('Appointment booked successfully with ID:', docRef.id);
      // You can add further logic here, e.g., show a confirmation message or redirect the user
  
    } catch (error) {
      console.error('Error booking appointment:', error);
      // Handle errors appropriately, e.g., show an error message to the user
    }
  };
  

  return (
    <div>
      <h1>Book OPD</h1>

      {/* State Dropdown */}
      <label>Select State:</label>
      <select onChange={(e) => setSelectedState(e.target.value)} value={selectedState}>
        <option value="">Select State</option>
        {states.map((state) => (
          <option key={state.id} value={state.id}>
            {state.name}
          </option>
        ))}
      </select>

      {/* Town Dropdown */}
      {towns.length > 0 && (
        <>
          <label>Select Town:</label>
          <select onChange={(e) => setSelectedTown(e.target.value)} value={selectedTown}>
            <option value="">Select Town</option>
            {towns.map((town) => (
              <option key={town.id} value={town.id}>
                {town.name}
              </option>
            ))}
          </select>
        </>
      )}

      {/* Hospital Dropdown */}
      {hospitals.length > 0 && (
        <>
          <label>Select Hospital:</label>
          <select onChange={(e) => setSelectedHospital(e.target.value)} value={selectedHospital}>
            <option value="">Select Hospital</option>
            {hospitals.map((hospital) => (
              <option key={hospital.id} value={hospital.id}>
                {hospital.name}
              </option>
            ))}
          </select>
        </>
      )}

      {/* Department Dropdown */}
      {departments.length > 0 && (
        <>
          <label>Select Department:</label>
          <select onChange={(e) => setSelectedDepartment(e.target.value)} value={selectedDepartment}>
            <option value="">Select Department</option>
            {departments.map((department) => (
              <option key={department.id} value={department.id}>
                {department.name}
              </option>
            ))}
          </select>
        </>
      )}

      {/* Doctor Dropdown */}
      {doctors.length > 0 && (
        <>
          <label>Select Doctor:</label>
          <select onChange={(e) => setSelectedDoctor(e.target.value)} value={selectedDoctor}>
            <option value="">Select Doctor</option>
            {doctors.map((doctor) => (
              <option key={doctor.id} value={doctor.id}>
                {doctor.name}
              </option>
            ))}
          </select>
        </>
      )}
     
      {/* Time Slot Dropdown */}
      {timeSlots.length > 0 && (
        <>
          <label>Select Time Slot:</label>
          <select onChange={(e) => setSelectedTimeSlot(e.target.value)} value={selectedTimeSlot}>
            <option value="">Select Time Slot</option>
            {timeSlots.map((slot) => (
              <option key={slot.id} value={slot.id}>
                {slot.time}
              </option>
            ))}
          </select>
        </>
      )}

      {/* Submit Button */}
      <button onClick={handleSubmit}>Book Appointment</button>
    </div>
  );
};

export default BookOPD;
