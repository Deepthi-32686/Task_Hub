import React, { useState } from 'react';

const Contact = () => {
 const [formData, setFormData] = useState({ name: '', email: '', message: '' });
 const [errors, setErrors] = useState({});

const validate = () => {
  const newErrors = {};
  if (!formData.name) newErrors.name = 'Name is required';
  if (!formData.email.includes('@')) newErrors.email = 'Valid email required';
 return newErrors;
  };

const handleSubmit = (e) => {
    e.preventDefault();
  const validationErrors = validate();
  if (Object.keys(validationErrors).length > 0) {
     setErrors(validationErrors);
   return;
    }
    alert('Message sent!');
  };

const handleChange = (e) => {
   setFormData({ ...formData, [e.target.name]: e.target.value });
  };

return (
    <div className="page">
      <h1>Contact Us</h1>
      <form onSubmit={handleSubmit} className="contact-form">
        <div>
          <label>Name:</label>
          <input
            type="text"
           name="name"
            value={formData.name}
            onChange={handleChange}
          />
          {errors.name && <span className="error">{errors.name}</span>}
        </div>

        <div>
          <label>Email:</label>
          <input
            type="email"
           name="email"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <span className="error">{errors.email}</span>}
        </div>

        <div>
          <label>Message:</label>
          <textarea
           name="message"
            value={formData.message}
            onChange={handleChange}
          />
        </div>

        <button type="submit">Send Message</button>
      </form>
    </div>
  );
};

export default Contact;