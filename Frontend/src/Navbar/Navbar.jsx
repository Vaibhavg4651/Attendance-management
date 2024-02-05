import React from 'react';
import { Link, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Login from '../User/Login';
import Register from '../User/Register'; 
import Subject from '../Subjects/Subjects'
import Proctor from '../Proctor/Proctor';
import MarkAttendance from '../MarkAttendance/MarkAttendance';

const Navbar = () => {
  return (
    <div>
        <nav className="navbar navbar-light bg-primary">
        <div className="container-fluid">
  <div className="row align-items-center">
    <div className="col-auto">
      <img src="msit.png" alt="" width="120" height="100" className="d-inline-block align-text-center" />
    </div>
    <div className="col mt-3 ml-auto">
      <h3 className='text-white text-start'>Attendance Management System</h3>
    </div>
  </div>
</div>

          <div className="ml-auto mt-3">
            <Link to='/subjects' className='btn btn-light mx-2'>
            Subjects</Link>
            <Link to='/proctor' className='btn btn-light mx-2'>
            Proctor</Link>
            <Link to='/attendance' className='btn btn-light mx-2'>
            Attendance</Link>
          </div>
        </nav>
    </div>
  );
};

export default Navbar;
