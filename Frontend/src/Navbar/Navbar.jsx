import React , {useState} from 'react';
import { Link, Route, Routes, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import MarkAttendance from '../MarkAttendance/MarkAttendance';
import Subjects from '../Subjects/Subjects';
import { ToastContainer, toast } from 'react-toastify';
import Proctor from '../Proctor/Proctor';

const Navbar = () => {
  const user = useSelector((state) => state.user);
  const auth = useSelector((state) => state.user.isAuthenticated);
  const navigate = useNavigate();

  const handleLogout = () => {
    toast.success('Logout Successfully');
    console.log('Logout successful');
    navigate('/');
  };
 

  return (
    <>
      <ToastContainer />
      <div>
        <nav className="navbar navbar-light bg-light">
          <div className="container-fluid">
            <div className="row align-items-center">
              <div className="col-auto">
                <img src="msit.png" alt="" width="120" height="100" className="d-inline-block align-text-center " style={{marginBottom:'6rem'}} />
              </div>
              <div className="col ml-auto">
              <h3 className='text-black text-start mt-4' >Attendance Management System</h3>
                {auth && (
                  <div className="d-flex align-items-center" style={{marginLeft:'69rem'}}>
                    <span className="mr-2">
                      <h4>{`${user.role}`}</h4>
                    </span>
                      <button onClick={handleLogout} className="btn btn-danger mx-2">Logout</button>
                  </div>
                )}

                {!auth && (
                  <Link to="/login" className="btn btn-primary ml-auto">
                    Login
                  </Link>
                )}
              </div>
            </div>
          </div>
        </nav>
        
      </div>
    </>
  );
};

export default Navbar;
