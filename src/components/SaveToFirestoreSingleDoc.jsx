import React from 'react';
import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebaseConfig"; // Firebase configuration

// Function to save hospital data
const saveHospitalData = async () => {
  const hospitalData = {
    hospitals: [
      {
        hospital_name: "Patna Medical College",
        total_beds: 200,
        available_beds: 50,
        total_icu_beds: 40,
        available_icu_beds: 10,
        city: "Patna",
        last_updated: new Date().toISOString(),
      },
      {
        hospital_name: "Nalanda Medical College",
        total_beds: 150,
        available_beds: 20,
        total_icu_beds: 30,
        available_icu_beds: 5,
        city: "Nalanda",
        last_updated: new Date().toISOString(),
      },
      {
        hospital_name: "AIIMS Patna",
        total_beds: 250,
        available_beds: 80,
        total_icu_beds: 60,
        available_icu_beds: 20,
        city: "Patna",
        last_updated: new Date().toISOString(),
      },
      {
        hospital_name: "Muzaffarpur Medical College",
        total_beds: 180,
        available_beds: 60,
        total_icu_beds: 35,
        available_icu_beds: 12,
        city: "Muzaffarpur",
        last_updated: new Date().toISOString(),
      },
      {
        hospital_name: "Bhagalpur Medical College",
        total_beds: 220,
        available_beds: 75,
        total_icu_beds: 45,
        available_icu_beds: 18,
        city: "Bhagalpur",
        last_updated: new Date().toISOString(),
      },
      {
        hospital_name: "Gaya Medical College",
        total_beds: 170,
        available_beds: 55,
        total_icu_beds: 25,
        available_icu_beds: 8,
        city: "Gaya",
        last_updated: new Date().toISOString(),
      },
      {
        hospital_name: "Begusarai Medical College",
        total_beds: 160,
        available_beds: 40,
        total_icu_beds: 20,
        available_icu_beds: 6,
        city: "Begusarai",
        last_updated: new Date().toISOString(),
      },
      {
        hospital_name: "Darbhanga Medical College",
        total_beds: 200,
        available_beds: 70,
        total_icu_beds: 50,
        available_icu_beds: 15,
        city: "Darbhanga",
        last_updated: new Date().toISOString(),
      },
      {
        hospital_name: "Saran Medical College",
        total_beds: 190,
        available_beds: 65,
        total_icu_beds: 30,
        available_icu_beds: 10,
        city: "Saran",
        last_updated: new Date().toISOString(),
      },
      {
        hospital_name: "Purnea Medical College",
        total_beds: 210,
        available_beds: 85,
        total_icu_beds: 40,
        available_icu_beds: 12,
        city: "Purnea",
        last_updated: new Date().toISOString(),
      },
      {
        hospital_name: "Katihar Medical College",
        total_beds: 180,
        available_beds: 50,
        total_icu_beds: 25,
        available_icu_beds: 7,
        city: "Katihar",
        last_updated: new Date().toISOString(),
      },
      {
        hospital_name: "Arrah Medical College",
        total_beds: 150,
        available_beds: 45,
        total_icu_beds: 20,
        available_icu_beds: 5,
        city: "Arrah",
        last_updated: new Date().toISOString(),
      },
      {
        hospital_name: "Siwan Medical College",
        total_beds: 170,
        available_beds: 50,
        total_icu_beds: 30,
        available_icu_beds: 9,
        city: "Siwan",
        last_updated: new Date().toISOString(),
      },
      {
        hospital_name: "Buxar Medical College",
        total_beds: 190,
        available_beds: 60,
        total_icu_beds: 40,
        available_icu_beds: 11,
        city: "Buxar",
        last_updated: new Date().toISOString(),
      },
      {
        hospital_name: "Kishanganj Medical College",
        total_beds: 160,
        available_beds: 55,
        total_icu_beds: 25,
        available_icu_beds: 8,
        city: "Kishanganj",
        last_updated: new Date().toISOString(),
      },
      {
        hospital_name: "Samastipur Medical College",
        total_beds: 220,
        available_beds: 80,
        total_icu_beds: 50,
        available_icu_beds: 16,
        city: "Samastipur",
        last_updated: new Date().toISOString(),
      },
      {
        hospital_name: "West Champaran Medical College",
        total_beds: 200,
        available_beds: 70,
        total_icu_beds: 40,
        available_icu_beds: 14,
        city: "West Champaran",
        last_updated: new Date().toISOString(),
      },
      {
        hospital_name: "East Champaran Medical College",
        total_beds: 210,
        available_beds: 75,
        total_icu_beds: 45,
        available_icu_beds: 12,
        city: "East Champaran",
        last_updated: new Date().toISOString(),
      },
      {
        hospital_name: "Supaul Medical College",
        total_beds: 180,
        available_beds: 65,
        total_icu_beds: 25,
        available_icu_beds: 10,
        city: "Supaul",
        last_updated: new Date().toISOString(),
      },
      {
        hospital_name: "Jhanjharpur Medical College",
        total_beds: 150,
        available_beds: 50,
        total_icu_beds: 20,
        available_icu_beds: 7,
        city: "Jhanjharpur",
        last_updated: new Date().toISOString(),
      },
      {
        hospital_name: "Madhubani Medical College",
        total_beds: 200,
        available_beds: 70,
        total_icu_beds: 35,
        available_icu_beds: 13,
        city: "Madhubani",
        last_updated: new Date().toISOString(),
      },
      {
        hospital_name: "Sheikhpura Medical College",
        total_beds: 190,
        available_beds: 60,
        total_icu_beds: 30,
        available_icu_beds: 9,
        city: "Sheikhpura",
        last_updated: new Date().toISOString(),
      },
      {
        hospital_name: "Lakhisarai Medical College",
        total_beds: 160,
        available_beds: 50,
        total_icu_beds: 20,
        available_icu_beds: 6,
        city: "Lakhisarai",
        last_updated: new Date().toISOString(),
      },
    ],
  };

  try {
    // Write the data to Firestore in a single document
    await setDoc(doc(db, "hospital_data", "bihar_hospitals"), hospitalData);
    console.log("Hospital data successfully written to Firestore");
    alert("Data saved successfully!");
  } catch (error) {
    console.error("Error writing document: ", error);
    alert("Error saving data");
  }
};

const SaveHospitalDataComponent = () => {
  return (
    <div>
      <h1>Save Hospital Data to Firestore</h1>
      <button onClick={saveHospitalData}>Save Hospital Data</button>
    </div>
  );
};

export default SaveHospitalDataComponent;
