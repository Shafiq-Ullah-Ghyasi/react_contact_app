import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './Header';
import AddContact from './AddContact';
import ContactList from './ContactList';
import ContactDetail from './ContactDetail';
import EditContact from './EditContact';

const App = () => {
  const LOCAL_STORAGE_KEY = 'contacts';
  const [contacts, setContacts] = useState([]);

  const addContactHandler = (contact) => {
    const updatedContacts = [...contacts, contact];
    setContacts(updatedContacts);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedContacts));
  };

  // Function to update contacts and trigger a re-render in ContactList
  const updateContacts = () => {
    const retrievedContacts = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || [];
    setContacts(retrievedContacts);
  };

  const removeContactHandler = (id) => {
    const updatedContacts = contacts.filter((contact) => contact.id !== id);
    setContacts(updatedContacts);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedContacts));
  };

  useEffect(() => {
    const retrievedContacts = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || [];
    setContacts(retrievedContacts);
  }, []); // Empty dependency array ensures it runs once on mount

  return (
    <div className="container">
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<ContactList contacts={contacts} removeContactHandler={removeContactHandler} />} />
          {/* Pass the updateContacts function to AddContact */}
          <Route path="/add" element={<AddContact setContacts={setContacts} updateContacts={updateContacts} />} />
          <Route path="/contact/:id" element={<ContactDetail />} />
          {/* Pass the updateContacts function to EditContact */}
          <Route path="/edit/:id" element={<EditContact updateContacts={updateContacts} />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
