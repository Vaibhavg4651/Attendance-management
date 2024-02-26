import React from 'react';
import { Link, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux';
import MarkAttendance from '../MarkAttendance/MarkAttendance';
import Subjects from '../Subjects/Subjects';
// import { useAuth0 } from '@auth0/auth0-react';
import user_icon from '../Assets/person.png'
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
