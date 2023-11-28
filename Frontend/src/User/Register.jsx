import React, { useState } from 'react';
import './Register.css';
import user_icon from '../assets/person.png';
import email_icon from '../assets/email.png';
import password_icon from '../assets/password.png';
// import Subjects from '../Subjects/Subjects';

const Register = () => {
 
  const [isRegistered, setIsRegistered] = useState(false);
  const [isRegistrationFailed, setIsRegistrationFailed] = useState(false);
  const [selectedRole, setSelectedRole] = useState(null);

  const handleRegister = () => {

    
    const IDInput = document.querySelector('input[placeholder="Enter your EID"]').value;
    const emailInput = document.querySelector('input[placeholder="Enter your email"]').value;
    const passwordInput = document.querySelector('input[placeholder="Enter your password"]').value;

    if (!IDInput || !emailInput || !passwordInput || selectedRole===null) {
      setIsRegistrationFailed(true);
      return;
    }

    setTimeout(() => {
      setIsRegistered(true);
      
    }, 1000);
  };
  const handleRoleChange = (event) => {
    setSelectedRole(event.target.value);
  };

  return (
    <div>
      <div className="Container">
        <div className="header">
          <div className="text">Register</div>
          <div className="underline"></div>
        </div>
        <br />
        <div className="d-flex flex-column align-items-center">
          <h4 className="mb-3">Select Role</h4>
          <div className="d-flex flex-row">
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                value="1"
                id="proctorCheckbox"
                checked={selectedRole === "1"}
                onChange={handleRoleChange}
              />
              <label className="form-check-label" htmlFor="proctorCheckbox">
                <h5 className="mb-0">Proctor</h5>
              </label>
              &ensp;
            </div>
            <div className="form-check ml-3">
              <input
                className="form-check-input"
                type="checkbox"
                value="2"
                id="facultyCheckbox"
                checked={selectedRole === "2"}
                onChange={handleRoleChange}
              />
              <label className="form-check-label" htmlFor="facultyCheckbox">
                <h5 className="mb-0">Faculty</h5>
              </label>
            </div>
          </div>
        </div>
        {selectedRole === "1" && (
          <>
            <div className="inputs">
              <div className="input">
                <img src={user_icon} alt="" />
                <input type="text" placeholder="Enter your EID" />
              </div>
            </div>
            <div className="inputs">
            <div className="input">
              <img src={email_icon} alt="" />
              <input type="email" placeholder="Enter your email" />
            </div>
              <div className="input">
                <img src={password_icon} alt="" />
                <input type="password" placeholder="Enter your password" />
              </div>
              <div className="forgot_password">
          Forgot Password? <span>Click Here!</span>
        </div>
            </div>
          </>
        )}
        {selectedRole === "2" && (
          <div className="inputs">
            <div className="input">
              <img src={email_icon} alt="" />
              <input type="email" placeholder="Enter your email" />
            </div>
            <div className="input">
                <img src={password_icon} alt="" />
                <input type="password" placeholder="Enter your password" />
              </div>
              <div className="forgot_password">
          Forgot Password? <span>Click Here!</span>
        </div>
          </div>
          
          
        )}
        
        <div>
          <div className="d-flex justify-content-center align-items-center">
            <div className="btn btn-primary mx-2" onClick={handleRegister}>
              Submit
            </div>
          </div>
          {isRegistered && !isRegistrationFailed && (
            <div className="success-message">
              <center>
                <h3>Register Successfully</h3>
              </center>
            </div>
          )}
          {isRegistrationFailed && (
            <div className="error-message">
              <center>
                <h3>Register Unsuccessful. Please fill in all fields</h3>
              </center>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Register;
