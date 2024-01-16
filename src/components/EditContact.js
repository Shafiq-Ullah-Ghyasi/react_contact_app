import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const EditContact = ({ updateContacts }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const existingContacts = JSON.parse(localStorage.getItem('contacts')) || [];
    const selectedContact = existingContacts.find(contact => contact.id === id);

    if (selectedContact) {
      setName(selectedContact.name);
      setPhone(selectedContact.phone);
      setEmail(selectedContact.email);
    } else {
      navigate('/');
    }
  }, [id, navigate]);

  const handleEditContact = () => {
    if (!name || !phone || !email) {
      setErrorMessage('Please fill out all fields.');
      return;
    }

    const existingContacts = JSON.parse(localStorage.getItem('contacts')) || [];
    const contactIndex = existingContacts.findIndex(contact => contact.id === id);

    if (contactIndex !== -1) {
      existingContacts[contactIndex] = { id, name, phone, email };
      localStorage.setItem('contacts', JSON.stringify(existingContacts));

      // Call the updateContacts function to trigger a re-render in ContactList
      updateContacts();

      navigate('/');
    } else {
      navigate('/');
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h2 className="mt-4 mb-4">Edit Contact</h2>
          <form onSubmit={(e) => e.preventDefault()}>
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
            <button type="submit" className="btn btn-primary" onClick={handleEditContact}>Save Changes</button>
          </form>
          {errorMessage && <p className="mt-3 text-danger">{errorMessage}</p>}
        </div>
      </div>
    </div>
  );
};

export default EditContact;
