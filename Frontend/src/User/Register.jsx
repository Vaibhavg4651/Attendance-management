import React, { useState } from 'react';
import './Register.css';
import user_icon from '../assets/person.png';
import password_icon from '../assets/password.png';
import axios from 'axios';
import { useDispatch} from 'react-redux';
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';

// const djangoBackendURL = 'http://127.0.0.1:8000/';

const Register = () => {
  
  const [isRegistrationFailed, setIsRegistrationFailed] = useState(false);
  const [EID, setEid] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('select role');
  const [email,setEmail]=useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleRegister = async (e) => {
    e.preventDefault();
    if (EID.length !== 9 || !name || !password || !email || role==='select role') {
      toast.error('Register failed!');
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

    const res = await axios
      .post(`http://127.0.0.1:8000/api/user/signup`, userData)
      .then((response) => {
        toast.success('Register Successfully');
        console.log('Registration successful. Response:', response.data);
        navigate('/');
      })
      .catch((err) => {
        console.error('Registration failed. Error:', err);
        setIsRegistrationFailed(true);
      });
  };

  return (
    <>
    <ToastContainer/>
    <div className="container">
      <div className="row justify-content-center mb-4">
        <div className="col-md-5">
          <div className="card mt-5 custom-color ">
            <div className="card-body">
            <img src="msit.png" className="d-flex align-items-center mx-auto" width="100" height="100"></img>
              <div className="header">
                <div className="text">Register</div>
                <p style={{ color: "#8f8f8f" }}>
                    Already have an account ?&nbsp;
                    <a href="/">
                      <strong style={{ color: "#035b96" }}>
                         Login
                      </strong>
                    </a>
                    &nbsp;here.
                  </p>
              </div>
              <br />
              <div className="d-flex flex-column align-items-center" style={{marginTop:"3rem"}}>
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
        <br />
        <div>
          <div className="d-flex justify-content-center align-items-center">
            <div className="btn btn-primary mx-1" onClick={handleRegister}>
              Submit
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
    </div>
    </div>
    </>
  );
};

export default Register;
