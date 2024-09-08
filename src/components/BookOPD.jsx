import { useEffect, useState } from "react";
import { db } from "../firebaseConfig";
import { collection, getDocs, addDoc, query, where } from "firebase/firestore";
import "./Book.css";
import { useNavigate } from "react-router-dom";

const BookOPD = () => {
  const [states, setStates] = useState([]);
  const [towns, setTowns] = useState([]);
  const [hospitals, setHospitals] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [timeSlots, setTimeSlots] = useState([]);

  const [selectedState, setSelectedState] = useState("");
  const [selectedTown, setSelectedTown] = useState("");
  const [selectedHospital, setSelectedHospital] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [selectedTimeSlot, setSelectedTimeSlot] = useState("");

  const navigate = useNavigate();

  // Seed data on component mount
  useEffect(() => {
    // seedFirestore(); // Seed data   => this was leading to huge writes and exhausting our free plan

    // Fetch states once and store them
    const fetchStates = async () => {
      const querySnapshot = await getDocs(collection(db, "states"));
      const stateData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setStates(stateData);
    };

    fetchStates();
  }, []);

  // Cache previously fetched data to avoid multiple Firestore reads
  const fetchDataWithCache = async (cacheKey, path) => {
    const cachedData = sessionStorage.getItem(cacheKey);
    if (cachedData) {
      return JSON.parse(cachedData);
    }
    const querySnapshot = await getDocs(collection(db, path));
    const data = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    sessionStorage.setItem(cacheKey, JSON.stringify(data));
    return data;
  };

  // Fetch towns based on selected state, with caching
  useEffect(() => {
    if (selectedState) {
      const fetchTowns = async () => {
        const townsData = await fetchDataWithCache(
          `towns_${selectedState}`,
          `states/${selectedState}/towns`
        );
        setTowns(townsData);
      };
      fetchTowns();
    }
  }, [selectedState]);

  // Fetch hospitals based on selected town, with caching
  useEffect(() => {
    if (selectedTown) {
      const fetchHospitals = async () => {
        const hospitalsData = await fetchDataWithCache(
          `hospitals_${selectedTown}`,
          `states/${selectedState}/towns/${selectedTown}/hospitals`
        );
        setHospitals(hospitalsData);
      };
      fetchHospitals();
    }
  }, [selectedTown]);

  // Fetch departments based on selected hospital, with caching
  useEffect(() => {
    if (selectedHospital) {
      const fetchDepartments = async () => {
        const departmentsData = await fetchDataWithCache(
          `departments_${selectedHospital}`,
          `states/${selectedState}/towns/${selectedTown}/hospitals/${selectedHospital}/departments`
        );
        setDepartments(departmentsData);
      };
      fetchDepartments();
    }
  }, [selectedHospital]);

  // Fetch doctors based on selected department, with caching
  useEffect(() => {
    if (selectedDepartment) {
      const fetchDoctors = async () => {
        const doctorsData = await fetchDataWithCache(
          `doctors_${selectedDepartment}`,
          `states/${selectedState}/towns/${selectedTown}/hospitals/${selectedHospital}/departments/${selectedDepartment}/doctors`
        );
        setDoctors(doctorsData);
      };
      fetchDoctors();
    }
  }, [selectedDepartment]);

  // Fetch time slots based on selected doctor, with caching
  useEffect(() => {
    if (selectedDoctor) {
      const fetchTimeSlots = async () => {
        const timeSlotData = await fetchDataWithCache(
          `timeSlots_${selectedDoctor}`,
          `states/${selectedState}/towns/${selectedTown}/hospitals/${selectedHospital}/departments/${selectedDepartment}/doctors/${selectedDoctor}/timeSlots`
        );
        setTimeSlots(timeSlotData);
      };
      fetchTimeSlots();
    }
  }, [selectedDoctor]);

  // Submit the data to "appointment" collection in Firestore
  const handleSubmit = async () => {
    try {
      const appointmentData = {
        state: selectedState,
        town: selectedTown,
        hospital: selectedHospital,
        department: selectedDepartment,
        doctor: selectedDoctor,
        timeSlot: selectedTimeSlot,
        timestamp: new Date(),
      };

      const docRef = await addDoc(
        collection(db, "appointments"),
        appointmentData
      );

      console.log("Appointment booked successfully with ID:", docRef.id);
      alert("Appointment booked successfully");
      navigate('/homepage');
    } catch (error) {
      console.error("Error booking appointment:", error);
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
            <select
              onChange={(e) => setSelectedTown(e.target.value)}
              value={selectedTown}
            >
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
            <select
              onChange={(e) => setSelectedHospital(e.target.value)}
              value={selectedHospital}
            >
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
            <select
              onChange={(e) => setSelectedDepartment(e.target.value)}
              value={selectedDepartment}
            >
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
            <select
              onChange={(e) => setSelectedDoctor(e.target.value)}
              value={selectedDoctor}
            >
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
            <select
              onChange={(e) => setSelectedTimeSlot(e.target.value)}
              value={selectedTimeSlot}
            >
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
    </div>
  );
};

export default BookOPD;
