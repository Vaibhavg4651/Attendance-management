import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import Navbar from '../Navbar/Navbar';
import {OutTable,ExcelRenderer} from 'react-excel-renderer';
// import xlsx  from 'json-as-xlsx';
// import { useNavigate } from 'react-router-dom';
// import Filters from '../MarkAttendance/Filters';
import AddStudent from './AddStudent';
import Login from '../User/Login';
import AddProctor from './AddProctor';
import Filters from '../MarkAttendance/Filters';

const Proctor = () => {
  const [firsttime,setfirsttime]=useState(false);
  const handleLogin=()=>{
    Login().then(()=>{
      setfirsttime(true);
    }).catch(error=>{
      console.log('Login failed',error);
    })
  }
  useEffect(() => {
    const isFirstTime = localStorage.getItem('firsttime');
    if (isFirstTime === null) {
      setfirsttime(true);
    } else {
      setfirsttime(false);
    }
  }, []);
  return (
    <>
      <Navbar/>
    <div>{firsttime?(
      <AddProctor onLogin={handleLogin}/>):(<AddStudent/>)}
      <AddStudent/>
    </div>
    <Filters/>
    <br />
    <br />
    <br />
    </>
  );
}

export default Proctor;
