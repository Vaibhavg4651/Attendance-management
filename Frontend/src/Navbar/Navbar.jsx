import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';  
import './Navbar.css';
import { logout } from '../reducers/userSlice';

const Navbar = () => {
  const user = useSelector((state) => state.user);
  const auth = useSelector((state) => state.user.isAuthenticated);
  const navigate = useNavigate();
  const dispatch=useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    toast.success('Logout Successfully');
    console.log('Logout successful');
    console.log(user);
    navigate('/');
  };

  return (
    <>
      <ToastContainer />
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <h3 className="navbar-brand container-fluid d-flex flex-row">
          <div className=''>
            <img src="msit.png" alt="" width="100" height="90" className="d-inline-block align-text-center" />
          </div>
            <span className='ms-2'>Attendance Management System</span>
          </h3>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            {auth && (
              <ul className="navbar-nav ms-auto mb-2 align-items-center">
                <li className="nav-item d-flex flex-column align-items-center">
                  <span className="nav-link">{user.name}</span>
             
                </li>
                <li className="nav-item d-flex align-items-center">
             
                  <span className="nav-link dropdown-toggle text-primary fs-4" id="navbarDropdown" role="button" data-bs-toggle="dropdown" >
                    {user.role}
                  </span>
                  <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                    <li className='dropdown-item text-primary'>{user.email}</li>
                    <li><button onClick={handleLogout} className="dropdown-item text-danger">Logout</button></li>
                  </ul>
                </li>
              </ul>
            )}
            {!auth && (
              <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <Link to="/login" className="btn btn-primary">Login</Link>
                </li>
              </ul>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
