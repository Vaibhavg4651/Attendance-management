import axios from 'axios';
import React, { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';

const GetStudent = () => {
  const [Class,SetClass]=useState('');
  const [year,SetYear]=useState('');
  const getStudentDetails={
    "Class":Class,
    "year":parseInt(year)
  }
  const HandleGetStudentChange=async()=>{
    try{
    console.log('Get Student request',getStudentDetails);
    const res=await axios.get('http://127.0.0.1:8000/api/user/getStudents',getStudentDetails);
    console.log('Get Student Successful',res.data);
    }
    catch(error){
        console.log('Error in getting students',error);
        toast.error("Failed to Fetch Students");
    }
  }
  return (
    <div>
  <ToastContainer/>
      <div className='container mt-4'>
        <h2>Get Student Details</h2>
        <div className="row g-3">
          <div className="col-md-3">
            <label htmlFor="enrollNo" className="form-label">Class</label>
            <input
              type="text"
              className="form-control"
              id="class"
              value={Class}
             onChange={(e) => SetClass(e.target.value)}
            />
          </div>
          <div className="col-md-3">
            <label htmlFor="branchId" className="form-label">Year</label>
            <input
              type="number"
              className="form-control"
              id="year"
              value={year}
              onChange={(e) => SetYear(e.target.value)}
            />
          </div>
        </div>
      <button className='btn btn-primary' onClick={HandleGetStudentChange}>Get Students</button>
    </div>
    </div>
  )
}

export default GetStudent
