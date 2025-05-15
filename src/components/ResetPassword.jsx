import React, { useState } from 'react';
import axios from 'axios';
import { useSearchParams } from 'react-router-dom';

function ResetPassword() {
  const [searchParams] = useSearchParams();
  const email = searchParams.get('email');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage('Passwords do not match.');
      return;
    }

    // try {
    //   const response =  axios.post('http://localhost:3001/resetPassword', {
    //     email,
    //     newPassword: password,
    //   });

    //   setMessage(response.data.message);
    // } catch (error) {
    //   console.error('Error resetting password:', error);
    //   setMessage('Failed to reset password. Please try again later.');
    // }
    console.log(email)
    console.log('PASSWORD:',password)

    axios.post('http://localhost:3001/resetPassword',{email,password})
      .then((res)=>{
        if(res.data.message){
          console.log("RESET: ",res.data)
          alert(res.data.message)
        }
        else{  
          console.log("RESET:",res.data)          
          setMessage(res.data.message);
        }
      })
  };

  return (
    <div>
      <br />
      <br />
      <br />
      <div className="container2">
        <center>
          <h2>Reset Password</h2>
          {email ? (
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="password">New Password</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <button type="submit">Set New Password</button>
              </div>
            </form>
          ) : (
            <p>Invalid or missing email parameter.</p>
          )}
          <p>{message}</p>
        </center>
      </div>
    </div>
  );
}

export default ResetPassword;
