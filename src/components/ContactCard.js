import React from 'react';
import { Link } from 'react-router-dom';

const ContactCard = ({ contact, removeContactHandler }) => {
  const { id, name, phone, email } = contact;

  return (
    <div className="row col-md-12 bg-info" style={{ marginBottom: "1px" }}>
      <div className="col-md-10 col-sm-9 col-9">
        <Link to={{ pathname: `/contact/${id}`, state: { contact: { name, phone, email } } }}>
          <span>{name}</span><br />
          <span>{phone}</span><br />
          <span>{email}</span>
        </Link>
      </div>
      <div className="col-md-2 col-sm-3 col-3" style={{ paddingTop: "15px" }}>
        <button className="btn btn-danger btn-sm" onClick={() => removeContactHandler(id)}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default ContactCard;