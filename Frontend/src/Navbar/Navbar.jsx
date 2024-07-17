import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';  // Ensure this import is present to style toast notifications

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
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <Link to="/" className="navbar-brand container-fluid d-flex flex-row">
          <div className=''>
            <img src="msit.png" alt="" width="100" height="90" className="d-inline-block align-text-center" />
          </div>
            <span className='ms-2'>Attendance Management System</span>
          </Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            {auth && (
              <ul className="navbar-nav ms-auto mb-2 align-items-center">
                <li className="nav-item d-flex flex-column align-items-center">
                  <span className="nav-link">{user.name}</span>
                  <span className="nav-link text-primary"> <h4>{user.role}</h4></span>
                </li>
                <li className="nav-item d-flex align-items-center">
                  {/* <img src="profile.png" alt="Profile" className="rounded-circle" width="30" height="30" /> */}
                  <span className="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-bs-toggle="dropdown" >
                    {user.email}
                  </span>
                  <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                    <li><button onClick={handleLogout} className="dropdown-item">Logout</button></li>
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
