import React, { useState } from "react";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import user_icon from "../assets/person.png";
import password_icon from "../assets/password.png";
import axios from "axios";
import "./Login.css";
import {useDispatch} from 'react-redux'
import { useNavigate } from "react-router-dom";
import { loginSuccess } from "../reducers/userSlice";


const Login = () => {
  const dispatch =useDispatch()
  const navigate = useNavigate();
  const [EID, setEid] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("select role");

  const forgorpassword=()=>{
    navigate('/updatepassword');
  }
  const handleLogin = () => {
    if (EID.length != 9 || !password || role === "select role") {
      toast.error('Login failed');
      return;
    }
   
    
   const loginData = {
      EID: EID,
      password: password,
      user_type: role,
    };
    console.log("Sending registration request:", loginData);
    axios
      .post(`http://127.0.0.1:8000/api/user/login`, loginData)
      .then((response) => {
        toast.success('Login Successful');
        console.log("Login successful. Response:", response.data);
        dispatch(loginSuccess(response.data));
        navigate(`/${response.data.id}?role=${role}`);
        console.log(response.data.id);
      })
      .catch((err) => {
        console.error("Login failed. Error:", err);
        toast.error('Login failed');
      });
  };
  return (
    <>
    <ToastContainer/>
    <div>
      <div className="Container">
        <div className="row justify-content-center mb-4">
          <div className="col md-5">
            <div className="card mt-5 login-custom ">
              <div className="card-body">
                <div className="text-center">
                <img src="msit.png" className="d-inline-block align-text-center mx-auto" width="100" height="100"></img>
                </div>
                <div className="header1">
                  <h2>Attendance Management System</h2>
                  <h1 className="heading">Welcome User</h1>
                  <p className="text-center" style={{ color: "#8f8f8f" }}>
                    Please <strong style={{ color: "#035b96" }}>Login</strong>{" "}
                    to Get Started.
                    <br />
                    <span style={{ color: "#8f8f8f" ,  padding : "0 7.5rem"}}>or</span> <br />
                    Don't have an account?
                    <a href="Register">
                      {" "}
                      <strong style={{ color: "#035b96" }}>
                        Register
                      </strong>{" "}
                    </a>
                    here.
                  </p>
                </div>
                <br />
                <div className="d-flex dropdown" >
                <select
                  className="form-select w-50"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  
                >
                  <option value="select role">Select role</option>
                  <option value="proctor">Proctor</option>
                  <option value="faculty">Faculty</option>
                </select>

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
                      type="password"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                </div>
                <div className="forgot_password mt-4" onClick={forgorpassword} >
                  Forgot Password? <span>Click Here!</span>
                </div>
              </div>
                <div className="d-flex justify-content-center align-items-center">
                  <div className="btn btn-primary mb-4" onClick={handleLogin}>
                    Submit
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

export default Login;
