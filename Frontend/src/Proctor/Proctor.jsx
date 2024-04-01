import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import Navbar from '../Navbar/Navbar';
import {OutTable,ExcelRenderer} from 'react-excel-renderer';
// import xlsx  from 'json-as-xlsx';
// import { useNavigate } from 'react-router-dom';
// import Filters from '../MarkAttendance/Filters';
import AddStudent from './AddStudent';
// import Filters from '../MarkAttendance/Filters';
// import Filters from '../MarkAttendance/Filters';
const Proctor = () => {
 const [view,setview]=useState('filter');
  const onViewChange=(e)=>{
    setview(e);
  }
  return (
    <>
    <Navbar/>
     <AddStudent/> 
    </>
  );
}

export default Proctor;
