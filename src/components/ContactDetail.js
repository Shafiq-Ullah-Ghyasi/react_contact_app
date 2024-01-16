import React, { useEffect, useState } from 'react';
import userimage from "../images/avatar_male.jpg";
import { useParams } from 'react-router-dom';

const ContactDetail = () => {
  const { id } = useParams();
  const [contact, setContact] = useState(null);

  useEffect(() => {
    // Get existing contacts from local storage
    const existingContacts = JSON.parse(localStorage.getItem('contacts')) || [];

    // Find the contact with the matching ID
    const selectedContact = existingContacts.find(c => c.id === id);

    // Set the contact details in the state
    setContact(selectedContact);
  }, [id]);

  if (!contact) {
    return <div className="alert alert-danger">Contact details not available</div>;
  }

  const { name, phone, email } = contact;

  return (
    <div>
      <h2>Contact Detail</h2>
      <div className="row justify-content-center mt-4">
        <div className="col-md-6 text-center">
          <img src={userimage} alt="User Image" className="img-fluid rounded-circle mb-3" />
          <h3>{name}</h3>
          <p>Phone: {phone}</p>
          <p>Email: {email}</p>
        </div>
      </div>
      {/* Add your additional content here */}
    </div>
  );
};

export default ContactDetail;
