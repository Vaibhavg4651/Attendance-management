import React, { useState } from 'react';
import './Register.css';
import user_icon from '../assets/person.png';
import password_icon from '../assets/password.png';
import axios from 'axios';

// const djangoBackendURL = 'http://127.0.0.1:8000/';

const Register = () => {
  const [isRegistered, setIsRegistered] = useState(false);
  const [isRegistrationFailed, setIsRegistrationFailed] = useState(false);
  const [EID, setEid] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('select role');
  const [email,setEmail]=useState('');

  const handleRegister = () => {
    if (EID.length !== 9 || !name || !password || !email || role==='select role') {
      setIsRegistrationFailed(true);
      return;
    }

    const userData = {
      EID: EID,
      name: name,
      password: password,
      user_type:role,
      email:email
    };

    console.log('Sending registration request:', userData);

    axios
      .post(`http://127.0.0.1:8000/api/user/signup`, userData)
      .then((response) => {
        console.log('Registration successful. Response:', response.data);
        setIsRegistered(true);
        setIsRegistrationFailed(false);
      })
      .catch((err) => {
        console.error('Registration failed. Error:', err);
        setIsRegistrationFailed(true);
      });
  };

  return (
    <div className="container">
      <div className="row justify-content-center mb-4">
        <div className="col-md-5">
          <div className="card mt-5 custom-color ">
            <div className="card-body">
              <div className="header">
                <div className="text">Register</div>
                <div className="underline"></div>
              </div>
              <br />
              <div className="d-flex flex-column align-items-center">
                <select
                  className="form-control mb-3"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                >
                  <option value="select role">Select role...</option>
                  <option value="proctor">Proctor</option>
                  <option value="faculty">Faculty</option>
                </select>
              </div>
        <div className="inputs">
          <div className="input">
            <img src={user_icon} alt="" />
            <input
              type="text"
              placeholder="Enter your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>
        <div className="inputs">
          <div className="input">
            <img src={user_icon} alt="" />
            <input
              type="text"
              placeholder="Enter your EID"
              value={EID}
              onChange={(e) => setEid(e.target.value)}
            />
          </div>
        </div>
        <div className="inputs">
          <div className="input">
            <img src={password_icon} alt="" />
            <input
              type="text"
              placeholder="Enter your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        </div>
        <div className="inputs">
          <div className="input">
            <img src={password_icon} alt="" />
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>
        <div className="forgot_password1">
          Forgot Password? <span>Click Here!</span>
        </div>

        <div>
          <div className="d-flex justify-content-center align-items-center">
            <div className="btn btn-light mx-1" onClick={handleRegister}>
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
    </div>
    </div>
    </div>
  );
};

export default Register;
