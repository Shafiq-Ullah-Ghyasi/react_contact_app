import React from 'react';
import { Link } from 'react-router-dom';


const ContactList = ({ contacts, removeContactHandler }) => {
  return (
    <div>
      <h2>Contact List</h2>
      {contacts.length === 0 ? (
        <p>No contacts available.</p>
      ) : (
        <ul className="list-group">
          {contacts.map(contact => (
            <li key={contact.id} className="list-group-item d-flex justify-content-between align-items-center">
              <Link to={`/contact/${contact.id}`}>{contact.name}</Link>
              <span>
                <Link to={`/edit/${contact.id}`} className="btn btn-primary btn-sm mx-2">Edit</Link>
                <button onClick={() => removeContactHandler(contact.id)} className="btn btn-danger btn-sm">Delete</button>
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};


export default ContactList;
