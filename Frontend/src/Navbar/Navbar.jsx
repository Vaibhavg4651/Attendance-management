import React from 'react';
import { Link, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

const Navbar = () => {
  const id = useSelector((state)=>{return state.user.userid})
  const role = useSelector((state)=>{return state.user.role})
  const auth = useSelector((state)=>{return state.user.isAuthenticated})
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
            {role === "faculty"? (<Link to={auth === true ? `/${id}/subjects` : "/login"} className='btn btn-light mx-2'>
            Subjects</Link> ): null}
            {role === 'proctor' ? <Link to='/addStudent' className='btn btn-light mx-2'> Add Student</Link> : null}
            <Link to='/attendance' className='btn btn-light mx-2'>
            Attendance</Link>
          </div>
        </nav>
    </div>
  );
};

export default Navbar;
