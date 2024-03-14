import React from 'react';
import { Link, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux';
import MarkAttendance from '../MarkAttendance/MarkAttendance';
import Subjects from '../Subjects/Subjects';
// import { useAuth0 } from '@auth0/auth0-react';
// import user_icon from '../Assets/person.png'

const Navbar = () => {
  const user = useSelector((state) => state.user);
  const {userInfo}=user;

  const id = useSelector((state) => state.user.userid);
  const role = useSelector((state) => state.user.role);
  const auth = useSelector((state) => state.user.isAuthenticated);
  // const [isAuthenticated,error,user,logout]=useAuth0();

  return (
    <div>
      <nav className="navbar navbar-light bg-light">
        <div className="container-fluid">
          <div className="row align-items-center">
            <div className="col-auto">
  <img src="msit.png" alt="" width="120" height="100" class="d-inline-block align-text-center mx-auto" />
            </div>
            <div className="col ml-auto">
              <h3 className='text-black text-start mt-3'>Attendance Management System</h3>
              <div>
               
              <p className='ml-auto' style={{marginLeft:'72rem'}}>Kshitiz
              <br />
               EID: 123456789</p>
             
          </div>
          </div>
            </div>
           
        </div>

        <div className="ml-auto mt-3">
          <Routes>
            {role === "faculty" ? (
              <>            
                 <Route
                  path="/"
                  element={<Link to={auth === true ? `/${id}/subjects` : "/login"} className='btn btn-primary mx-2'>Subjects</Link>}
                />
                <Route path={`/${id}/subjects`} element={<Subjects />} />
                <Route path={`/${id}/attendance`} element={<MarkAttendance/>} />
                 </>
              
            ) : null}
            {role === 'proctor' ? (
              <Route
                path="/"
                // element={<Link to="/branch" className='btn btn-primary mx-2'>Add Your Details</Link>}
              />
            ) : null}
                    
            <Route path="/attendance" element={<Link to='/attendance' className='btn btn-light mx-2'> Attendance</Link>} />
          </Routes>

       
        </div>
      </nav>
    </div>
  );
};

export default Navbar;

import React from 'react';
import { Link, Route, Routes, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import MarkAttendance from '../MarkAttendance/MarkAttendance';
import Subjects from '../Subjects/Subjects';
import { ToastContainer, toast } from 'react-toastify';

const Navbar = () => {
  const user = useSelector((state) => state.user);
  const id = useSelector((state) => state.user.userid);
  const role = useSelector((state) => state.user.role);
  const auth = useSelector((state) => state.user.isAuthenticated);
  const navigate = useNavigate();

  const handleLogout = () => {
    toast.success('Logout Successfully');
    localStorage.clear();
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
                <img src="msit.png" alt="" width="120" height="100" className="d-inline-block align-text-center" style={{marginBottom:'2rem'}} />
              </div>
              <div className="col ml-auto">
                <h3 className='text-black text-start mt-4' >Attendance Management System</h3>
                {auth && (
                  <div className="d-flex align-items-center" style={{marginLeft:'58rem'}}>
                    <span className="mr-2">
                      <h4>{`${user.role}`}</h4>
                      <p>{`${user.userid}`}</p>
                    </span>
                    <Routes>
                      {role === 'faculty' ? (
                        <>
                          <Route path="/" element={<button onClick={handleLogout} className="btn btn-danger mx-2">Logout</button>} />
                          <Route path={`/${id}/subjects`} element={<Subjects />} />
                          <Route path={`/${id}/attendance`} element={<MarkAttendance />} />
                        </>
                      ) : null}
                      {role === 'proctor' ? (
                        <>
                          <Route path="/" element={<button onClick={handleLogout} className="btn btn-danger mx-2">Logout</button>} />
                        </>
                      ) : null}
                      <Route path="/attendance" element={<Link to="/attendance" className="btn btn-light mx-2">Attendance</Link>} />
                    </Routes>
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
