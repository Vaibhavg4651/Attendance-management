import React, { useEffect, useState } from 'react';
import Navbar from '../Navbar/Navbar';
import AddStudent from '../Students/AddStudent';
import Filters from '../Filters/Filters';
import GetProctor from './GetProctor';
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { OutTable, ExcelRenderer } from "react-excel-renderer";
// import xlsx  from 'json-as-xlsx';
// import { useNavigate } from 'react-router-dom';
// import Filters from '../MarkAttendance/Filters';
import AddProctor from "./AddProctor";

import { useSelector, useDispatch } from "react-redux";

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
    {/* < AddStudent/> */}
    <Filters/>
    <br />
    <br />
    <br />
    </>
  );
};

export default Proctor;
