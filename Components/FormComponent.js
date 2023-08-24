import React, { useState } from 'react';
import './FormComponent.css';
const FormComponent = ({ onSubmit }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [dob, setDob] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [email, setEmail] = useState('');
  const [idProofAttachment, setIdProofAttachment] = useState(null);
  const [panAttachment, setPanAttachment] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      firstName,
      lastName,
      dob,
      mobileNumber,
      email,
      idProofAttachment,
      panAttachment,
    };
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
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
          value={mobileNumber}
          onChange={(e) => setMobileNumber(e.target.value)}
        />
  
        <label>Email Address:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
  
        <label>ID Proof Attachment:</label>
        <input
          type="file"
          accept=".jpg, .jpeg, .png, .pdf"
          onChange={(e) => setIdProofAttachment(e.target.files[0])}
        />
  
        <label>PAN Number Attachment:</label>
        <input
          type="file"
          accept=".jpg, .jpeg, .png, .pdf"
          onChange={(e) => setPanAttachment(e.target.files[0])}
        />
      
      <button type="submit">Submit</button>
    </form>
  );
};

export default FormComponent;
