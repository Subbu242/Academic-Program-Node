import React, { useState } from 'react';
import emailjs from 'emailjs-com';

function ForgotPassword() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.name && formData.email) {
      const templateParams = {
        to_name: formData.name,
        to_email: formData.email,
        reset_link: `http://localhost:3000/resetPassword?email=${encodeURIComponent(formData.email)}`, // Pass email as a query param
      };
      

      emailjs
        .send('service_g5j2nm6', 'template_o4fjt8t', templateParams, '3sIWX9cGTR4Gd_QeN')
        .then(
          (response) => {
            console.log('SUCCESS!', response.status, response.text);
            alert('Password reset instructions have been sent to your email.');
          },
          (error) => {
            console.error('FAILED...', error);
            setMessage('Failed to send the reset email. Please try again later.');
          }
        );
    } else {
      setMessage('Please fill in all required fields.');
    }
  };

  return (
    <div>
      <br></br>
      <br></br>
      <br></br>
      <div className="container2">
        <center>
          <h2>Forgot Password</h2>
          <br />
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Your Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <button type="submit">Reset Password</button>
            </div>
          </form>
          <p>{message}</p>
        </center>
      </div>
    </div>
  );
}

export default ForgotPassword;
