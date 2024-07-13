import React, { useState } from 'react'
import axios from 'axios';
const GetSubjects = () => {
  const [BranchName,setBranchName]=useState('');
  const [year ,setYear]=useState(0);
  const [subjectData,setSubjectData]=useState([]);
  const years=[1,2,3,4];
  const branch=['CSE','IT','ECE','EEE'];

 const handleGetSubjects=async()=>{

  const subRequest={
    "BranchName":BranchName,
    "year":parseInt(year)
  }
  try {
    console.log('Sending Get Subject request',subRequest);
    const response=await axios.get('http://127.0.0.1:8000/api/user/getSubjects');
    console.log('Get Subject response',response.data);
    setSubjectData(response.data);

  } catch (error) {
    console.log('Error in  getting subjects',error);
  }
 }
  return (
    <div className='container mt-2'>
    <h2>Get Subjects</h2>
    <div className='row g-3'>
      <div className='col-md-3'>
        <label htmlFor="branchName" className='form-label'>Enter Branch </label>
        <select 
          className='form-select' 
          id="branch" 
          value={BranchName}
          onChange={(e) => setBranchName(e.target.value)}
        >
          <option value="">Select Branch</option>
          {branch.map((BranchName, index) => (
            <option key={index} value={BranchName}>{BranchName}</option>
          ))}
        </select>
      </div>
      <div className="col-md-3">
        <label htmlFor="year" className="form-label">Year</label>
        <select
          className="form-select"
          id="year"
          value={year}
          onChange={(e) => setYear(e.target.value)}
        >
          <option value="">Select Year</option>
          {years.map((Year, index) => (
            <option key={index} value={Year}>{Year}</option>
          ))}
        </select>
      </div>
      <div className="col-md-3">
        <button className="btn btn-primary mt-4" onClick={handleGetSubjects}>Get Subjects</button>
      </div>
    </div>
    </div>
  )
}

export default GetSubjects