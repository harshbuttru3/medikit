// src/opdData.js
export const opdData = {
    Bihar: {
      towns: {
        Patna: {
          hospitals: {
            'Hospital A': {
              departments: {
                Cardiology: {
                  doctors: [
                    { name: 'Dr. Manish Kumar', timeSlots: ['09:00 AM - 11:00 AM', '11:00 AM - 01:00 PM', '02:00 PM - 04:00 PM'] },
                    { name: 'Dr. Shukla', timeSlots: ['09:00 AM - 11:00 AM', '11:00 AM - 01:00 PM'] },
                    { name: 'Dr. Gupta', timeSlots: ['02:00 PM - 04:00 PM'] }
                  ]
                },
                Orthopedics: {
                  doctors: [
                    { name: 'Dr. Manish Kumar', timeSlots: ['09:00 AM - 11:00 AM'] }
                  ]
                },
                Neurology: {
                  doctors: [
                    { name: 'Dr. Shukla', timeSlots: ['11:00 AM - 01:00 PM'] }
                  ]
                }
              }
            },
            'Hospital B': {
              departments: {
                Gynecology: {
                  doctors: [
                    { name: 'Dr. Gupta', timeSlots: ['09:00 AM - 11:00 AM', '11:00 AM - 01:00 PM'] }
                  ]
                }
              }
            }
          }
        },
        Gaya: {
          hospitals: {
            'Hospital C': {
              departments: {
                Pediatrics: {
                  doctors: [
                    { name: 'Dr. Manish Kumar', timeSlots: ['09:00 AM - 11:00 AM'] }
                  ]
                }
              }
            },
            'Hospital D': {
              departments: {
                Cardiology: {
                  doctors: [
                    { name: 'Dr. Gupta', timeSlots: ['11:00 AM - 01:00 PM'] }
                  ]
                }
              }
            }
          }
        },
        Bhagalpur: {
          hospitals: {
            'Hospital E': {
              departments: {
                Orthopedics: {
                  doctors: [
                    { name: 'Dr. Shukla', timeSlots: ['02:00 PM - 04:00 PM'] }
                  ]
                },
                Neurology: {
                  doctors: [
                    { name: 'Dr. Manish Kumar', timeSlots: ['09:00 AM - 11:00 AM'] }
                  ]
                }
              }
            },
            'Hospital F': {
              departments: {
                Pediatrics: {
                  doctors: [
                    { name: 'Dr. Gupta', timeSlots: ['02:00 PM - 04:00 PM'] }
                  ]
                }
              }
            }
          }
        }
      }
    }
  };
  