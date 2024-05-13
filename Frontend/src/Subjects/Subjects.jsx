import React, { useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import Navbar from '../Navbar/Navbar';
import SubjectData from '../subject.json';
const Subjects = (e) => {
  // const [subjectid, setSubjectId] = useState(0);
  const [branchname, setBranchName] = useState();
  const [subjectname, setSubjectName] = useState();
  const [subjectCode, setSubjectCode] = useState();
  const [subjecttype, setSubjectType] = useState();
  const [Year, setYear] = useState();
  const branch=['CSE','IT','ECE','EEE'];
  const subname=SubjectData.map(sub=>sub.SubjectName);
  const subcode=SubjectData.map((x)=> x.Subjectcode);
  const subtype=['theory','Lab','Tutorial'];
  const year=[1,2,3,4];

  const handleaddSubjects = async (e) => {
    const AddSubject = [

      {
        // "SubjectID": parseInt(subjectid),
        "BranchName": branchname,
        "SubjectName": subjectname,
        "Subjectcode": subjectCode,
        "SubjectType": subjecttype,
        "year": parseInt(Year),
      }
    ]
    

    console.log('Add Subject request:', AddSubject);

    try {
      const response = await axios.post(
        'http://127.0.0.1:8000/api/user/addSubjects',
        AddSubject
      );
      console.log('Add Subject successful. Response:', response.data);
      toast.success('Subject Added Successfully');
    } catch (err) {
      console.error('Adding subject failed:', err);
      toast.error('Add Subject Unsuccessful');
    }
  };

  return (
    <>
      <ToastContainer />
      <div className='container mt-4'>
        <h2>Add Subjects</h2>
        <div className="row g-3">
          <div className="col-md-3">
            <label htmlFor="enrollNo" className="form-label">Enter Branch Name</label>
            <select
              className="form-select"
              id="branch"
              value={branchname}
              onChange={(e) => setBranchName(e.target.value)}
            >

              <option value="">Select Branch</option>
              {branch.map((branchname, index) => (
                <option key={index} value={branchname}>{branchname}</option>
              ))}
            </select>
          </div>
          <div className="col-md-3">
            <label htmlFor="branchId" className="form-label">Enter Subject Name</label>
            <select
              className="form-select"
              id="subjectname"
              value={subjectname}
              onChange={(e) => setSubjectName(e.target.value)}
            >

              <option value="">Select Subject</option>
              {subname.map((subjectname, index) => (
                <option key={index} value={subjectname}>{subjectname}</option>
              ))}
            </select>
          </div>
          <div className="col-md-3">
            <label htmlFor="classSerialNo" className="form-label">Enter Subject Code</label>
            <select
              className="form-select"
              id="subjectcode"
              value={subjectCode}
              onChange={(e) => setSubjectCode(e.target.value)}
            >

              <option value="">Select Subject Code</option>
              {subcode.map((subjectCode, index) => (
                <option key={index} value={subjectCode}>{subjectCode}</option>
              ))}
            </select>
          </div>
          <div className="col-md-3">
            <label htmlFor="classSerialNo" className="form-label">Enter Subject Type</label>
            <select
              className="form-select"
              id="subjecttype"
              value={subjecttype}
              onChange={(e) => setSubjectType(e.target.value)}
            >

              <option value="">Select Subject Type</option>
              {subtype.map((subjecttype, index) => (
                <option key={index} value={subjecttype}>{subjecttype}</option>
              ))}
            </select>
          </div>
          <div className="col-md-3">
            <label htmlFor="group" className="form-label">Year</label>
            <select
              className="form-select"
              id="year"
              value={Year}
              onChange={(e) => setYear(e.target.value)}
            >

              <option value="">Select Year</option>
              {year.map((Year, index) => (
                <option key={index} value={Year}>{Year}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="mt-4">
          <button className='btn btn-primary' onClick={handleaddSubjects}>
            Add Subject
          </button>
        </div>
        </div>

    </>
  );
};

export default Subjects;
