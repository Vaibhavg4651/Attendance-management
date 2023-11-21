import React, { useState } from 'react';
import './Login.css';
import user_icon from '../assets/person.png';
import email_icon from '../assets/email.png';
import password_icon from '../assets/password.png';

const Login = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [isLoginFailed, setIsLoginFailed] = useState(false);

  
  const handleLogin = () => {
    const nameInput = document.querySelector('input[placeholder="Enter your Name"]').value;
    const emailInput = document.querySelector('input[placeholder="Enter your email"]').value;
    const passwordInput = document.querySelector('input[placeholder="Enter your password"]').value;
    
    if (!nameInput || !emailInput || !passwordInput) {
      setIsLoginFailed(true);
      return;
    }

    
    setTimeout(() => {
      setIsLogin(true);
    }, 1000);
  };

  return (
    <div>
      <div className="Container">
        <div className="header">
          <div className="text">Login</div>
          <div className="underline"></div>
        </div>
        <br />
        <div className="d-flex flex-column align-items-center">
 
   
</div>
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
        </div>
        <div className="inputs">
          <div className="input">
            <img src={password_icon} alt="" />
            <input type="password" placeholder="Enter your password" />
          </div>
        </div>
       
        <div className="forgot_password">
          Forgot Password? <span>Click Here!</span>
        </div>
        <div>
          <div className="d-flex justify-content-center align-items-center">
            <div className="btn btn-primary mx-2" onClick={handleLogin}>
              Submit
            </div>
          </div>
          {isLogin && !isLoginFailed && (
            <div className="success-message">
              <center><h3>Register Successfully</h3></center>
            </div>
          )}
          {isLoginFailed && (
            <div className="error-message">
              <center><h3>Register Unsuccessful. Please fill in all fields</h3></center>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
