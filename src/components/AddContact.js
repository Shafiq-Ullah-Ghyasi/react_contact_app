import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddContact = ({ setContacts }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleAddContact = () => {
    // Simple form validation
    if (!name || !phone || !email) {
      setErrorMessage('Please fill out all fields.');
      return;
    }

    // Create a new contact object
    const newContact = {
      id: new Date().getTime().toString(),
      name,
      phone,
      email,
    };

    // Get existing contacts from local storage
    const existingContacts = JSON.parse(localStorage.getItem('contacts')) || [];

    // Add the new contact to the existing contacts
    const updatedContacts = [...existingContacts, newContact];

    // Update local storage with the updated contacts
    localStorage.setItem('contacts', JSON.stringify(updatedContacts));

    // Update the state with the new contacts
    setContacts(updatedContacts);

    // Navigate back to the contact list
    navigate('/');
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h2 className="mt-4 mb-4">Add Contact</h2>
          <form onSubmit={handleAddContact}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">Name:</label>
              <input type="text" id="name" className="form-control" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div className="mb-3">
              <label htmlFor="phone" className="form-label">Phone:</label>
              <input type="text" id="phone" className="form-control" value={phone} onChange={(e) => setPhone(e.target.value)} />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email:</label>
              <input type="text" id="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <button type="submit" className="btn btn-primary">Add Contact</button>
          </form>
          {errorMessage && <p className="mt-3 text-danger">{errorMessage}</p>}
        </div>
      </div>
    </div>
  );
};

export default AddContact;
