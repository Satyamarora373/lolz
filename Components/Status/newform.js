  import React ,{useState}from "react";
  import './newform.css'
  function generateHash(str) {
    let hash = 0;
    if (str.length === 0) return hash;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = (hash << 5) - hash + char;
      hash = hash & hash;
    }
    return hash;
  }
  function generateUniqueApplicationNumber(name, age, salesUser) {
    const userDetails = `${name}${age}${salesUser}`;
    const baseHash = generateHash(userDetails);
    const randomComponent = Math.floor(Math.random() * 10000);
    const uniqueHash = baseHash + randomComponent;
    return Math.abs(uniqueHash).toString().substr(0, 6).padStart(6, '0');
  }
  function generateRandomSalesUser() {
    const min = 1000000;
    const max = 9999999;
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  function NewApplicationForm({ onApplicationSubmit }) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [dob, setDob] = useState('');
  const [mobileNo, setMobileNo] = useState('');
  const [email, setEmail] = useState('');
  const [salesUserAssigned, setSalesUserAssigned] = useState(generateRandomSalesUser().toString());
  const [attachment, setAttachment] = useState(null);
  const [panFile, setPanFile] = useState(null);
  const [currentDate, setCurrentDate] = useState(new Date());
  
  const handleIDProofChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setAttachment(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };
    const handleSubmit = (e) => {
      e.preventDefault();
      const submissionDate = new Date();
  
      const newApplication = {
        applicationNumber: generateUniqueApplicationNumber(firstName, dob, mobileNo),
        firstName,
        lastName,
        dob,
        mobileNo,
        email,
        status: 'Pending',
        salesUserAssigned,
        attachment,
        panFile,
        timeElapsed: calculateTimeElapsed(currentDate,submissionDate),
      };
      console.log(newApplication);
      onApplicationSubmit(newApplication);
      setFirstName('');
      setLastName('');
      setDob('');
      setMobileNo('');
      setEmail('');
      setAttachment('');
      setPanFile(null);
      // setSalesUserAssigned('');
      
    };
  
    return (
      <form className="new-application-form" onSubmit={handleSubmit}>
        <h2>Create New Application</h2>
        <label>First Name:</label>
        <input
        
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
  
        <label>Last Name:</label>
        <input
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
  
        <label>Date of Birth:</label>
        <input
          type="date"
          value={dob}
          onChange={(e) => setDob(e.target.value)}
        />
  
        <label>Mobile Number:</label>
        <input
          type="tel"
          value={mobileNo}
          onChange={(e) => setMobileNo(e.target.value)}
        />
  
        <label>Email Address:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />


<label>        ID Proof Attachment: </label>
        <input
          style={{width:"80%"}}
          type="file"
          accept="image/*, application/pdf"
          onChange={handleIDProofChange}
        />
        
  
        <label>PAN Number Attachment:</label>
        <input
          style={{width:"80%"}}
          type="file"
          accept=".jpg, .jpeg, .png, .pdf"
          onChange={(e) => setPanFile(e.target.files[0])}
        />
        <br/> <br/>

        <button type="submit" className="submit-button" >Submit Application</button>
      </form>
    );
    function calculateTimeElapsed(startDate, endDate) {
      const timeDifference = endDate - startDate;
    
      const seconds = Math.floor(timeDifference / 1000);
      const minutes = Math.floor(seconds / 60);
      const hours = Math.floor(minutes / 60);
      const days = Math.floor(hours / 24);
    
      return days;
    }
    
  }
export default NewApplicationForm;