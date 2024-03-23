import React, { useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import Navbar from '../Navbar/Navbar';

const Subjects = (e) => {
  // const [subjectid, setSubjectId] = useState(0);
  const [branchname, setBranchName] = useState();
  const [subjectname, setSubjectName] = useState();
  const [subjectCode, setSubjectCode] = useState();
  const [subjecttype, setSubjectType] = useState();
  const [Year, setYear] = useState();

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
      <Navbar />
      <div className='container mt-4'>
        <h2>Add Subjects</h2>
        <div className="row g-3">
          <div className="col-md-3">
            <label htmlFor="enrollNo" className="form-label">Enter Branch Name</label>
            <input
              type="text"
              className="form-control"
              id="branch"
              value={branchname}
              onChange={(e) => setBranchName(e.target.value)}
            />
          </div>
          <div className="col-md-3">
            <label htmlFor="branchId" className="form-label">Enter Subject Name</label>
            <input
              type="text"
              className="form-control"
              id="subjectname"
              value={subjectname}
              onChange={(e) => setSubjectName(e.target.value)}
            />
          </div>
          <div className="col-md-3">
            <label htmlFor="classSerialNo" className="form-label">Enter Subject Code</label>
            <input
              type="text"
              className="form-control"
              id="subcode"
              value={subjectCode}
              onChange={(e) => setSubjectCode(e.target.value)}
            />
          </div>
          <div className="col-md-3">
            <label htmlFor="classSerialNo" className="form-label">Enter Subject Type</label>
            <input
              type="text"
              className="form-control"
              id="subtype"
              value={subjecttype}
              onChange={(e) => setSubjectType(e.target.value)}
            />
          </div>
          <div className="col-md-3">
            <label htmlFor="group" className="form-label">Year</label>
            <input
              type="number"
              className="form-control"
              id="year"
              value={Year}
              onChange={(e) => setYear(e.target.value)}
            />
          </div>
        </div>
        <div className="mt-4">
          <button className='btn btn-primary' onClick={handleaddSubjects}>
            Add Student
          </button>
        </div>
        </div>

    </>
  );
};

export default Subjects;
