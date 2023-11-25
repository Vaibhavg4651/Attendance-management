import React from 'react';
import { Link, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Login from '../User/Login';
import Register from '../User/Register'; // Assuming User is your register component

const Navbar = () => {
  return (
    <div>
      <Router>
        <nav className="navbar navbar-light bg-primary">
          <div className="container-fluid">
            <Link to="/login" className="navbar-brand text-white">
              <img src="msit.png" alt="" width="30" height="24" className="d-inline-block align-text-top" />
              Attendance Management System
            </Link>
          </div>
          <div className="d-flex">
            <Link to='/login' className='btn btn-light mx-2'>
              Login
            </Link>
            <Link to='/register' className='btn btn-light mx-2'>
              Register
            </Link>
          </div>
        </nav>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
        </Routes>
      </Router>
    </div>
  );
};

export default Navbar;
