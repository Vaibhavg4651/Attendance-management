import React, { useState } from 'react';
import './UpdatePassword.css'
const UpdatePassword = () => {
  const [EID, setEID] = useState('');
  const [userType, setUserType] = useState('');
  // const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleUpdatePassword = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/user/updatepassword', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          newpassword: newPassword,
          EID,
          user_type: userType,
          // password: currentPassword,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(data.message);
        console.log('Updated password:',response.data);
        console.log(newPassword);
        setError('');
      } else {
        setMessage('');
        setError(data.detail);
      }
    } catch (error) {
      console.error('Error updating password:', error);
      setError('An error occurred while updating the password.');
    }
  };

  return (
    <div className='container1'>
        <div className='row justify-content-center mb-4'>
            <div className='col md-5'>
            <div className="card1 mt-5 login-custom ">
              <div className="card-body1">
                <div className="text-center">
                    <br />
                <img src="msit.png" className="d-inline-block align-text-center mx-auto" width="100" height="100"></img>
                <div/>
                <h4 style={{ color: "#035b96" }}>
                         Update Password
                      </h4>
      <div>
        
        <input placeholder='Enter your EID' type="text" value={EID} onChange={(e) => setEID(e.target.value)} />
      </div>
      <br />
      <div>
        
        <input placeholder='Enter your role' type="text" value={userType} onChange={(e) => setUserType(e.target.value)} />
      </div>
      <br />
     
      <br />
      <div>
        <input placeholder='Enter new password' type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
      </div>
      <button className='btn btn-primary mt-4' onClick={handleUpdatePassword}>Update Now</button>
      {/* {message && <p>{message}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>} */}
    </div>
    </div>
    </div>
    </div>
    </div>
    </div>
  );
};

export default UpdatePassword;