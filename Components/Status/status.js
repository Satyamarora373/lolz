import React, { useState } from 'react';
import './status.css';
import NewApplicationForm from './newform';
import Heading from '../Heading';
function Status() {
  const [filterStatus, setFilterStatus] = useState('all');
  const [showNewApplicationForm, setShowNewApplicationForm] = useState(false);
  const [searchFilter, setSearchFilter] = useState('');
  const handleNewApplicationClick = () => {
    setShowNewApplicationForm(true);
  };
  const [applications, setApplications] = useState([

  ]);

  const handleApplicationSubmit = (newApplication) => {
    setApplications([...applications, newApplication]);
  };
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editedFields, setEditedFields] = useState({}); 
  
  const handleEditClick = (application) => {
    setSelectedApplication(application);
    setIsEditMode(true);
    setEditedFields({}); 
  };
  const handleIDProofChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setEditedFields((prevEditedFields) => ({
          ...prevEditedFields,
          idProofAttachment: event.target.result, 
        }));
      };
      console.log(file);
      reader.readAsDataURL(file);
    }
  };
  const handleSaveClick = (editedApplication) => {
    if (Object.keys(editedFields).length === 0) {
      setIsEditMode(false);
      setEditedFields({});
      return;
    }
    const updatedApplication = {
      ...selectedApplication,
      ...editedFields,
    };
    const updatedApplications = applications.map((app) =>
    app.applicationNumber === updatedApplication.applicationNumber ? updatedApplication : app
  );
    setApplications(updatedApplications);
    
    setIsEditMode(false);
    setEditedFields({});
  };

  const handleCancelEdit = () => {
    setIsEditMode(false);
    setEditedFields({});
  };
  const handleFieldChange = (field, value) => {
    setEditedFields((prevEditedFields) => ({
      ...prevEditedFields,
      [field]: value,
    }));
  };
  const filteredApplications = applications.filter((application) =>
    application.applicationNumber.toLowerCase().includes(searchFilter.toLowerCase()) ||
    application.salesUserAssigned.includes(searchFilter)
  );
  

  return (
    <div>
      <Heading/>
    <div className="Status-App">
      <h1>Credit Card Application Status</h1>
      <br/>
      <button className="new-application-button" onClick={handleNewApplicationClick}>
        Create New Application
      </button>

      {showNewApplicationForm && <NewApplicationForm onApplicationSubmit={handleApplicationSubmit}/>}
      <br/><br/>
      <div className="filters">
        <br/>
        <label htmlFor="filterStatus">Filter by Status:</label>
        <select
          id="filterStatus"
          value={filterStatus}
          onChange={e => setFilterStatus(e.target.value)}
        >
          <option value="all">All</option>
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
          <option value="rejected">Rejected</option>
        </select>
        <input
        style={{marginLeft:"50%"}}
        type="text"
        placeholder="Search by Application Number/ User ID"
        value={searchFilter}
        onChange={(e) => setSearchFilter(e.target.value)}
      />
      </div>
      <table>
        <thead>
          <tr>
            <th>Serial Number</th>
            <th>Application Number</th>
            <th>Applicant Name</th>
            <th>Application Age<br/>(in days)</th>
            <th>Application Status</th>
            <th>Sales User ID</th>
            <th>ID Attachment</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredApplications.map((application, index) => (
            
            <tr key={application.applicationNumber}>
              <td>{index + 1}</td>
              <td>{application.applicationNumber}</td>
              <td>{`${application.firstName}${' '}${application.lastName}`}</td>
              <td>{application.timeElapsed}</td>
              <td>{application.status}</td>
              <td>{application.salesUserAssigned}</td>
              <td>{application.attachment ? (
                  <a href={application.attachment} target="_blank" rel="noopener noreferrer">
                    View Document
                  </a>
                ) : (
                  "No Attachment"
                )}</td>
              <td>
              {isEditMode && selectedApplication === application ? (
                  <>
                    <button className="action-button" onClick={handleSaveClick}>
                      Save
                    </button>
                    <button className="action-button" onClick={handleCancelEdit}>
                      Cancel
                    </button>
                  </>
                ) : (
                  <button
                    className="action-button"
                    onClick={() => handleEditClick(application)}
                  >
                    Edit
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {selectedApplication && isEditMode && (
        <div className="application-details">
          <form>
            <label>
              First Name:
              <input
              
                type="text"
                value={editedFields.firstName || selectedApplication.firstName}
                onChange={(e) => handleFieldChange('firstName', e.target.value)}
              />
            </label>
            <label>
              Last Name:
              <input
                type="text"
                value={editedFields.lastName || selectedApplication.lastName}
                onChange={(e) => handleFieldChange('lastName', e.target.value)}
              />
            </label>
            <label>Date of Birth:
              <input
                type="date"
                value={editedFields.dob || selectedApplication.dob}
                onChange={(e) => handleFieldChange('dob', e.target.value)}
              />
          </label>
  
        <label>Mobile Number:
        <input
          type="tel"
          value={editedFields.mobileNo || selectedApplication.mobileNo}
          
          onChange={(e) => handleFieldChange('mobileNo', e.target.value)}
        />
        </label>
  
        <label>Email Address:
        <input
          type="email"
          value={editedFields.email || selectedApplication.email}
          onChange={(e) => handleFieldChange('email', e.target.value)}
        />
        </label>
        <label>
            New ID Proof Attachment:
            <input
              type="file"
              accept="image/*, application/pdf" 
              onChange={handleIDProofChange}
            />
            </label>
            {/* <div className='action-button'>
            <button className="action-button" onClick={handleSaveClick}>
              Save
            </button>
            <button className="action-button" onClick={handleCancelEdit}>
              Cancel
            </button>
            </div> */}
          </form>
        </div>
      )}
    </div>
    </div>
  );
}

export default Status;
