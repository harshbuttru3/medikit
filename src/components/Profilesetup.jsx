import React, { useState } from "react";
import './Profilesetup.css';
import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebaseConfig";

function Profilesetup() {
  // Form state management
  const [formData, setFormData] = useState({
    relation: "",
    initial: "",
    fullName: "",
    gender: "",
    dobDay: "",
    dobMonth: "",
    dobYear: "",
    mobile: "",
    email: "",
    address: "",
    state: "",
    district: ""
  });

  // Define states and their respective districts
  const stateDistricts = {
    AndhraPradesh: [
      "Anantapur", "Chittoor", "East Godavari", "Guntur", "Kadapa", "Krishna", 
      "Kurnool", "Nellore", "Prakasam", "Srikakulam", "Visakhapatnam", "Vizianagaram", 
      "West Godavari", "Annamayya", "Sri Balaji", "Kakinada", "Palnadu", "Nandyal", "NTR", "Sri Potti Sriramulu", "Bapatla", "Parvathipuram Manyam", "Konaseema", "Alluri Sitharama Raju"
    ],
    ArunachalPradesh: [
      "Tawang", "West Kameng", "East Kameng", "Papum Pare", "Kurung Kumey", "Kra Daadi", 
      "Lower Subansiri", "Upper Subansiri", "West Siang", "East Siang", "Siang", 
      "Upper Siang", "Lower Siang", "Lower Dibang Valley", "Dibang Valley", "Anjaw", 
      "Lohit", "Namsai", "Changlang", "Tirap", "Longding", "Pakke Kessang", 
      "Kamle", "Leparada", "Shi Yomi", "Lepa Rada"
    ],
    Assam: [
      "Baksa", "Barpeta", "Biswanath", "Bongaigaon", "Cachar", "Charaideo", "Chirang", 
      "Darrang", "Dhemaji", "Dhubri", "Dibrugarh", "Goalpara", "Golaghat", "Hailakandi", 
      "Hojai", "Jorhat", "Kamrup", "Kamrup Metropolitan", "Karbi Anglong", 
      "Karimganj", "Kokrajhar", "Lakhimpur", "Majuli", "Morigaon", "Nagaon", 
      "Nalbari", "Sivasagar", "Sonitpur", "South Salmara-Mankachar", "Tinsukia", "Udalguri", "West Karbi Anglong"
    ],
    Bihar: [
      "Araria", "Arwal", "Aurangabad", "Banka", "Begusarai", "Bhagalpur", "Bhojpur", 
      "Buxar", "Darbhanga", "East Champaran", "Gaya", "Gopalganj", "Jamui", 
      "Jehanabad", "Kaimur", "Katihar", "Khagaria", "Kishanganj", "Lakhisarai", 
      "Madhepura", "Madhubani", "Munger", "Muzaffarpur", "Nalanda", "Nawada", 
      "Patna", "Purnia", "Rohtas", "Saharsa", "Samastipur", "Saran", "Sheikhpura", 
      "Sheohar", "Sitamarhi", "Siwan", "Supaul", "Vaishali", "West Champaran"
    ],
    Chhattisgarh: [
      "Balod", "Baloda Bazar", "Balrampur", "Bastar", "Bemetara", "Bijapur", 
      "Bilaspur", "Dantewada", "Dhamtari", "Durg", "Gariaband", "Gaurela-Pendra-Marwahi", 
      "Janjgir-Champa", "Jashpur", "Kabirdham", "Kanker", "Kondagaon", "Korba", 
      "Koriya", "Mahasamund", "Mungeli", "Narayanpur", "Raigarh", "Raipur", 
      "Rajnandgaon", "Sukma", "Surajpur", "Surguja"
    ],
    Goa: [
      "North Goa", "South Goa"
    ],
    Gujarat: [
      "Ahmedabad", "Amreli", "Anand", "Aravalli", "Banaskantha", "Bharuch", 
      "Bhavnagar", "Botad", "Chhota Udaipur", "Dahod", "Dang", "Devbhoomi Dwarka", 
      "Gandhinagar", "Gir Somnath", "Jamnagar", "Junagadh", "Kheda", "Kutch", 
      "Mahisagar", "Mehsana", "Morbi", "Narmada", "Navsari", "Panchmahal", 
      "Patan", "Porbandar", "Rajkot", "Sabarkantha", "Surat", "Surendranagar", 
      "Tapi", "Vadodara", "Valsad"
    ],
    Haryana: [
      "Ambala", "Bhiwani", "Charkhi Dadri", "Faridabad", "Fatehabad", "Gurugram", 
      "Hisar", "Jhajjar", "Jind", "Kaithal", "Karnal", "Kurukshetra", "Mahendragarh", 
      "Nuh", "Palwal", "Panchkula", "Panipat", "Rewari", "Rohtak", "Sirsa", 
      "Sonipat", "Yamunanagar"
    ],
    HimachalPradesh: [
      "Bilaspur", "Chamba", "Hamirpur", "Kangra", "Kinnaur", "Kullu", 
      "Lahaul and Spiti", "Mandi", "Shimla", "Sirmaur", "Solan", "Una"
    ],
    Jharkhand: [
      "Bokaro", "Chatra", "Deoghar", "Dhanbad", "Dumka", "East Singhbhum", 
      "Garhwa", "Giridih", "Godda", "Gumla", "Hazaribagh", "Jamtara", 
      "Khunti", "Koderma", "Latehar", "Lohardaga", "Pakur", "Palamu", 
      "Ramgarh", "Ranchi", "Sahebganj", "Seraikela Kharsawan", "Simdega", "West Singhbhum"
    ],
    Karnataka: [
      "Bagalkot", "Bangalore", "Bangalore Rural", "Belgaum", "Bellary", "Bidar", 
      "Chamarajanagar", "Chikkaballapur", "Chikkamagaluru", "Chitradurga", "Dakshina Kannada", 
      "Davanagere", "Dharwad", "Gadag", "Gulbarga", "Hassan", "Haveri", "Kodagu", 
      "Kolar", "Koppal", "Mandya", "Mysore", "Raichur", "Ramanagara", "Shimoga", 
      "Tumkur", "Udupi", "Uttara Kannada", "Vijayapura", "Yadgir"
    ],
    Kerala: [
      "Alappuzha", "Ernakulam", "Idukki", "Kannur", "Kasaragod", "Kollam", 
      "Kottayam", "Kozhikode", "Malappuram", "Palakkad", "Pathanamthitta", 
      "Thiruvananthapuram", "Thrissur", "Wayanad"
    ],
    MadhyaPradesh: [
      "Agar Malwa", "Alirajpur", "Anuppur", "Ashoknagar", "Balaghat", "Barwani", 
      "Betul", "Bhind", "Bhopal", "Burhanpur", "Chhatarpur", "Chhindwara", 
      "Damoh", "Datia", "Dewas", "Dhar", "Dindori", "Guna", "Gwalior", "Harda", 
      "Hoshangabad", "Indore", "Jabalpur", "Jhabua", "Katni", "Khandwa", "Khargone", 
      "Mandla", "Mandsaur", "Morena", "Narsinghpur", "Neemuch", "Niwari", 
      "Panna", "Raisen", "Rajgarh", "Ratlam", "Rewa", "Sagar", "Satna", 
      "Sehore", "Seoni", "Shahdol", "Shajapur", "Sheopur", "Shivpuri", 
      "Sidhi", "Singrauli", "Tikamgarh", "Ujjain", "Umaria", "Vidisha"
    ],
    Maharashtra: [
      "Ahmednagar", "Akola", "Amravati", "Aurangabad", "Beed", "Bhandara", 
      "Buldhana", "Chandrapur", "Dhule", "Gadchiroli", "Gondia", "Hingoli", 
      "Jalgaon", "Jalna", "Kolhapur", "Latur", "Mumbai", "Nagpur", "Nanded", 
      "Nandurbar", "Nashik", "Osmanabad", "Palghar", "Parbhani", "Pune", 
      "Raigad", "Ratnagiri", "Sangli", "Satara", "Sindhudurg", "Solapur", 
      "Thane", "Wardha", "Washim", "Yavatmal"
    ],
    Manipur: [
      "Bishnupur", "Chandel", "Churachandpur", "Imphal East", "Imphal West", "Jiribam", 
      "Kakching", "Kamjong", "Kangpokpi", "Noney", "Pherzawl", "Senapati", 
      "Tamenglong", "Tengnoupal", "Thoubal", "Ukhrul"
    ],
    Meghalaya: [
      "East Garo Hills", "East Jaintia Hills", "East Khasi Hills", "North Garo Hills", 
      "Ri Bhoi", "South Garo Hills", "South West Garo Hills", "South West Khasi Hills", 
      "West Garo Hills", "West Jaintia Hills", "West Khasi Hills"
    ],
    Mizoram: [
      "Aizawl", "Champhai", "Hnahthial", "Khawzawl", "Kolasib", "Lawngtlai", 
      "Lunglei", "Mamit", "Saiha", "Serchhip", "Saitual"
    ],
    Nagaland: [
      "Dimapur", "Kiphire", "Kohima", "Longleng", "Mokokchung", "Mon", "Noklak", 
      "Peren", "Phek", "Tuensang", "Wokha", "Zunheboto"
    ],
    Odisha: [
      "Angul", "Balangir", "Balasore", "Bargarh", "Bhadrak", "Boudh", "Cuttack", 
      "Debagarh", "Dhenkanal", "Gajapati", "Ganjam", "Jagatsinghapur", "Jajpur", 
      "Jharsuguda", "Kalahandi", "Kandhamal", "Kendrapara", "Kendujhar", "Khordha", 
      "Koraput", "Malkangiri", "Mayurbhanj", "Nabarangpur", "Nayagarh", "Nuapada", 
      "Puri", "Rayagada", "Sambalpur", "Subarnapur", "Sundergarh"
    ],
    Punjab: [
      "Amritsar", "Barnala", "Bathinda", "Faridkot", "Fatehgarh Sahib", "Fazilka", 
      "Ferozepur", "Gurdaspur", "Hoshiarpur", "Jalandhar", "Kapurthala", "Ludhiana", 
      "Mansa", "Moga", "Muktsar", "Nawanshahr", "Pathankot", "Patiala", "Rupnagar", 
      "Sangrur", "SAS Nagar", "Tarn Taran"
    ],
    Rajasthan: [
      "Ajmer", "Alwar", "Banswara", "Baran", "Barmer", "Bharatpur", "Bhilwara", 
      "Bikaner", "Bundi", "Chittorgarh", "Churu", "Dausa", "Dholpur", "Dungarpur", 
      "Hanumangarh", "Jaipur", "Jaisalmer", "Jalore", "Jhalawar", "Jhunjhunu", 
      "Jodhpur", "Karauli", "Kota", "Nagaur", "Pali", "Pratapgarh", "Rajsamand", 
      "Sawai Madhopur", "Sikar", "Sirohi", "Sri Ganganagar", "Tonk", "Udaipur"
    ],
    Sikkim: [
      "East Sikkim", "North Sikkim", "South Sikkim", "West Sikkim"
    ],
    TamilNadu: [
      "Ariyalur", "Chengalpattu", "Chennai", "Coimbatore", "Cuddalore", "Dharmapuri", 
      "Dindigul", "Erode", "Kallakurichi", "Kanchipuram", "Kanyakumari", "Karur", 
      "Krishnagiri", "Madurai", "Mayiladuthurai", "Nagapattinam", "Namakkal", 
      "Nilgiris", "Perambalur", "Pudukkottai", "Ramanathapuram", "Ranipet", 
      "Salem", "Sivaganga", "Tenkasi", "Thanjavur", "Theni", "Thiruvallur", 
      "Thiruvarur", "Thoothukudi", "Tiruchirappalli", "Tirunelveli", "Tirupathur", 
      "Tiruppur", "Tiruvannamalai", "Vellore", "Viluppuram", "Virudhunagar"
    ],
    Telangana: [
      "Adilabad", "Bhadradri Kothagudem", "Hyderabad", "Jagtial", "Jangaon", 
      "Jayashankar Bhupalpally", "Jogulamba Gadwal", "Kamareddy", "Karimnagar", 
      "Khammam", "Kumuram Bheem", "Mahabubabad", "Mahbubnagar", "Mancherial", 
      "Medak", "Medchal–Malkajgiri", "Mulugu", "Nagarkurnool", "Nalgonda", 
      "Narayanpet", "Nirmal", "Nizamabad", "Peddapalli", "Rajanna Sircilla", 
      "Rangareddy", "Sangareddy", "Siddipet", "Suryapet", "Vikarabad", "Wanaparthy", 
      "Warangal Rural", "Warangal Urban", "Yadadri Bhuvanagiri"
    ],
    Tripura: [
      "Dhalai", "Gomati", "Khowai", "North Tripura", "Sepahijala", "South Tripura", 
      "Unakoti", "West Tripura"
    ],
    UttarPradesh: [
      "Agra", "Aligarh", "Ambedkar Nagar", "Amethi", "Amroha", "Auraiya", 
      "Ayodhya", "Azamgarh", "Baghpat", "Bahraich", "Ballia", "Balrampur", 
      "Banda", "Barabanki", "Bareilly", "Basti", "Bhadohi", "Bijnor", "Budaun", 
      "Bulandshahr", "Chandauli", "Chitrakoot", "Deoria", "Etah", "Etawah", 
      "Farrukhabad", "Fatehpur", "Firozabad", "Gautam Buddh Nagar", "Ghaziabad", 
      "Ghazipur", "Gonda", "Gorakhpur", "Hamirpur", "Hapur", "Hardoi", "Hathras", 
      "Jalaun", "Jaunpur", "Jhansi", "Kannauj", "Kanpur Dehat", "Kanpur Nagar", 
      "Kasganj", "Kaushambi", "Kushinagar", "Lakhimpur Kheri", "Lalitpur", 
      "Lucknow", "Maharajganj", "Mahoba", "Mainpuri", "Mathura", "Mau", 
      "Meerut", "Mirzapur", "Moradabad", "Muzaffarnagar", "Pilibhit", "Pratapgarh", 
      "Prayagraj", "Raebareli", "Rampur", "Saharanpur", "Sambhal", "Sant Kabir Nagar", 
      "Shahjahanpur", "Shamli", "Shravasti", "Siddharthnagar", "Sitapur", "Sonbhadra", 
      "Sultanpur", "Unnao", "Varanasi"
    ],
    Uttarakhand: [
      "Almora", "Bageshwar", "Chamoli", "Champawat", "Dehradun", "Haridwar", 
      "Nainital", "Pauri Garhwal", "Pithoragarh", "Rudraprayag", "Tehri Garhwal", 
      "Udham Singh Nagar", "Uttarkashi"
    ],
    WestBengal: [
      "Alipurduar", "Bankura", "Birbhum", "Cooch Behar", "Dakshin Dinajpur", 
      "Darjeeling", "Hooghly", "Howrah", "Jalpaiguri", "Jhargram", "Kalimpong", 
      "Kolkata", "Malda", "Murshidabad", "Nadia", "North 24 Parganas", 
      "Paschim Bardhaman", "Paschim Medinipur", "Purba Bardhaman", "Purba Medinipur", 
      "Purulia", "South 24 Parganas", "Uttar Dinajpur"
    ],
  };
  

  const states = Object.keys(stateDistricts);
  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  
  // Handle input changes
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
    
    // Reset district if state changes
    if (id === "state") {
      setFormData((prevData) => ({
        ...prevData,
        district: "", // Clear district when state changes
      }));
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Add a new document with form data to Firestore
      await addDoc(collection(db, "profiles"), formData);
      alert("Profile successfully saved!");
    } catch (error) {
      console.error("Error saving profile: ", error);
    }
  };

  return (
    <div id="Profilesetup">
      <div className="form-container">
        <div className="form-header">
          <h2>Setup your Profile</h2>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="input-group">
              <label htmlFor="relation">Relation</label>
              <select id="relation" value={formData.relation} onChange={handleChange} required>
                <option value="" disabled>Select</option>
                <option value="Self">Self</option>
                <option value="Father">Father</option>
                <option value="Mother">Mother</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className="input-group">
              <label htmlFor="initial">Initial</label>
              <select id="initial" value={formData.initial} onChange={handleChange} required>
                <option value="" disabled>Select</option>
                <option value="Mr.">Mr.</option>
                <option value="Ms.">Ms.</option>
                <option value="Mrs.">Mrs.</option>
              </select>
            </div>
          </div>

          <div className="row">
            <div className="input-group">
              <label htmlFor="fullName">Full Name</label>
              <input type="text" id="fullName" value={formData.fullName} onChange={handleChange} required />
            </div>
            <div className="input-group">
              <label htmlFor="gender">Gender</label>
              <select id="gender" value={formData.gender} onChange={handleChange} required>
                <option value="" disabled>Select</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          <div className="row">
            <div className="input-group">
              <label htmlFor="dobDay">Date of Birth (Day)</label>
              <select id="dobDay" value={formData.dobDay} onChange={handleChange} required>
                <option value="" disabled>Day</option>
                {days.map((day) => (
                  <option key={day} value={day}>{day}</option>
                ))}
              </select>
            </div>
            <div className="input-group">
              <label htmlFor="dobMonth">Month</label>
              <select id="dobMonth" value={formData.dobMonth} onChange={handleChange} required>
                <option value="" disabled>Month</option>
                <option value="January">January</option>
                <option value="February">February</option>
                <option value="March">March</option>
                <option value="April">April</option>
                <option value="May">May</option>
                <option value="June">June</option>
                <option value="July">July</option>
                <option value="August">August</option>
                <option value="September">September</option>
                <option value="October">October</option>
                <option value="November">November</option>
                <option value="December">December</option>
              </select>
            </div>
            <div className="input-group">
              <label htmlFor="dobYear">Year</label>
              <select id="dobYear" value={formData.dobYear} onChange={handleChange} required>
                <option value="" disabled>Year</option>
                {Array.from({ length: 100 }, (_, i) => 2024 - i).map((year) => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="row">
            <div className="input-group">
              <label htmlFor="mobile">Mobile No</label>
              <input type="text" id="mobile" value={formData.mobile} onChange={handleChange} required />
            </div>
            <div className="input-group">
              <label htmlFor="email">Email</label>
              <input type="email" id="email" value={formData.email} onChange={handleChange} required />
            </div>
          </div>

          <div className="row">
            <div className="input-group">
              <label htmlFor="address">Address</label>
              <input type="text" id="address" value={formData.address} onChange={handleChange} required />
            </div>
            <div className="input-group">
              <label htmlFor="country">Country</label>
              <input type="text" id="country" value="India" readOnly />
            </div>
          </div>

          <div className="row">
            <div className="input-group">
              <label htmlFor="state">State</label>
              <select id="state" value={formData.state} onChange={handleChange} required>
                <option value="" disabled>Select State</option>
                {states.map((state) => (
                  <option key={state} value={state}>{state}</option>
                ))}
              </select>
            </div>
            <div className="input-group">
              <label htmlFor="district">District</label>
              <select id="district" value={formData.district} onChange={handleChange} required>
                <option value="" disabled>Select District</option>
                {formData.state && stateDistricts[formData.state]?.map((district) => (
                  <option key={district} value={district}>{district}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="row">
            <button type="submit" className="submit-btn">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Profilesetup;
