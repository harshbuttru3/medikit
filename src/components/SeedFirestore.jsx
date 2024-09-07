// src/seedFirestore.js
import { db } from '../firebaseConfig';
import { doc, setDoc, collection } from 'firebase/firestore';

async function seedFirestore() {
  try {
    const statesRef = doc(db, 'states', 'Bihar');
    await setDoc(statesRef, { name: 'Bihar' });

    const districts = [
      'Patna', 'Gaya', 'Bhagalpur', 'Munger', 'Muzaffarpur', 'Purnea', 'Sasaram', 'Darbhanga', 'Samastipur', 'Katihar'
    ];

    for (const district of districts) {
      const districtRef = doc(collection(statesRef, 'towns'), district);
      await setDoc(districtRef, { name: district });

      const hospitals = ['Hospital A', 'Hospital B', 'Hospital C', 'Hospital D', 'Hospital E'];

      for (const hospital of hospitals) {
        const hospitalRef = doc(collection(districtRef, 'hospitals'), hospital);
        await setDoc(hospitalRef, { name: hospital });

        const departments = ['Cardiology', 'Orthopedics', 'Neurology', 'Gynecology', 'Pediatrics'];

        for (const department of departments) {
          const departmentRef = doc(collection(hospitalRef, 'departments'), department);
          await setDoc(departmentRef, { name: department });

          const doctors = ['Dr. Manish kumar', 'Dr. shukla', 'Dr. gupta'];

          for (const doctor of doctors) {
            const doctorRef = doc(collection(departmentRef, 'doctors'), doctor);
            await setDoc(doctorRef, { name: doctor });

            const timeSlots = ['09:00 AM - 11:00 AM', '11:00 AM - 01:00 PM', '02:00 PM - 04:00 PM'];

            for (const timeSlot of timeSlots) {
              const timeSlotRef = doc(collection(doctorRef, 'timeSlots'), timeSlot);
              await setDoc(timeSlotRef, { time: timeSlot });
            }
          }
        }
      }
    }

    console.log('Data seeded successfully');
  } catch (error) {
    console.error('Error seeding Firestore:', error);
  }
}

export default seedFirestore;
