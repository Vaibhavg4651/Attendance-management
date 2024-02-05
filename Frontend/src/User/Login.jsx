import React, { useState } from "react";

import user_icon from "../assets/person.png";
// import email_icon from "../assets/email.png";
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

  const handleLogin = () => {
    if (EID.length != 9 || !password || role === "select role") {
      setIsLoginFailed(true);
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
        console.log("Login successful. Response:", response.data);
        dispatch(loginSuccess(response.data));
        navigate(`/${response.data.id}?role=${role}`);
      })
      .catch((err) => {
        console.error("Login failed. Error:", err);
        setIsLoginFailed(true);
      });
  };
  return (
    <div>
      <div className="Container">
        <div className="row justify-content-center mb-4">
          <div className="col md-5">
            <div className="card mt-5 login-custom ">
              <div className="card-body">
                <div className="header1">
                  <h2>Attendance Record Software</h2>
                  <h1 class="heading">Welcome User</h1>
                  <p style={{ color: "#8f8f8f" }}>
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
                <div className="d-flex flex-column align-items-center dropdown">
                  <select
                    className="form-control w-50"
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
                <div className="forgot_password">
                  Forgot Password? <span>Click Here!</span>
                </div>
              </div>

              <div>
                <div className="d-flex justify-content-center align-items-center">
                  <div className="btn btn-primary mb-4" onClick={handleLogin}>
                    Submit
                  </div>
                </div>
                {/* {isLogin && !isLoginFailed && (
                  <div className="success-message">
                    <center>
                      <h3>Login Successfully</h3>
                    </center>
                  </div>
                )}
                {isLoginFailed && (
                  <div className="error-message">
                    <center>
                      <h3>Login Unsuccessful. Please fill in all fields</h3>
                    </center>
                  </div>
                )} */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
