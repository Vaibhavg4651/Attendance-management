import React, { useEffect, useState } from 'react';
import Navbar from '../Navbar/Navbar';
import AddStudent from '../Students/AddStudent';
import Filters from '../Filters/Filters';
import GetProctor from './GetProctor';
import axios from "axios";
import { setBranchId } from "../reducers/userSlice";
import { ToastContainer, toast } from "react-toastify";
import { OutTable, ExcelRenderer } from "react-excel-renderer";
// import xlsx  from 'json-as-xlsx';
// import { useNavigate } from 'react-router-dom';
// import Filters from '../MarkAttendance/Filters';
import { useSelector, useDispatch } from "react-redux";
import AddProctor from './AddProctor';

const Proctor = () => {
  const branchID = useSelector((state) => state.user.BranchId);

  return (
    <>
      <Navbar />
      {/* <div>
        {branchID === null ? (
          <p>Loading...</p>
        ) : branchID ? (
          <AddStudent />
        ) : (
        <AddProctor />
        )}
      </div> */}
      <GetProctor/>
     {firstTime===true?<AddProctor/>:<AddStudent branchId={branchId}/>}
      
    {/* < AddStudent/> */}
    <Filters/>
    <br />
    <br />
    <br />
    </>
  );
};

export default Proctor;
