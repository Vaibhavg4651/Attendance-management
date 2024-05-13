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
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <Link to="/" className="navbar-brand">
            <img src="msit.png" alt="" width="120" height="100" className="d-inline-block align-text-center" />
            <span className='ms-2'>Attendance Management System</span>
          </Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            {auth && (
              <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                <li className="nav-item dropdown">
                  <span className="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    {`${user.role}`}
                  </span>
                  <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                    <li><p className="dropdown-item" style={{marginRight:'2rem'}}>{`${user.userid}`}</p></li>
                    <li><button onClick={handleLogout} className="btn btn-danger dropdown-item">Logout</button></li>
                  </ul>
                </li>
                <Routes>
                  {role === 'faculty' ? (
                    <>
                      <Route path={`/${id}/subjects`} element={<li className="nav-item"><Link to={`/${id}/subjects`} className="nav-link">Subjects</Link></li>} />
                      <Route path={`/${id}/attendance`} element={<li className="nav-item"><Link to={`/${id}/attendance`} className="nav-link">Mark Attendance</Link></li>} />
                    </>
                  ) : null}
                </Routes>
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
