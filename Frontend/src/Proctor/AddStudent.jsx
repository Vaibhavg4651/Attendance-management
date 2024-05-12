import axios from "axios";
import { useState } from "react"
import React from 'react'
import { ToastContainer, toast } from "react-toastify";
import Filters from "../MarkAttendance/Filters";

const AddStudent = () => {
    const [studentDetailsList, setStudentDetailsList] = useState([]);
    const [enrollNo, setEnrollNo] = useState('');
    const [branchId, setBranchId] = useState('');
    const [classSerialNo, setClassSerialNo] = useState('');
    const [group, setGroup] = useState('');
    const [studentName, setStudentName] = useState('');
    const [batch, setBatch] = useState('');
    const [year, setYear] = useState('');
    const [header, setHeader] = useState([]);
    const [cols,setCols]=useState([]);
    const details=[
        {
        "EnrollmentNumber": parseInt(enrollNo),
        "BranchID": parseInt(branchId),
        "ClassSerialNumber": parseInt(classSerialNo),
        "Group": group,
        "StudentName": studentName,
        "Batch": parseInt(batch),
        "year": parseInt(year),
      }
    ]
    const addStudent = async () => {
      try {
        console.log('Sending Add Student request',details);
        const response = await axios.post('http://127.0.0.1:8000/api/user/addStudents',details);
        setStudentDetailsList([...studentDetailsList, ...response.data]);
          console.log('Student added successfully',response.data);
          toast.success('Student added successfully');
          clearFields();
        } catch (error) {
          console.log('Error adding student:', error);
          toast.error('Failed to add student');
        }
      };
    
      const clearFields = () => {
        setEnrollNo('');
        setBranchId('');
        setClassSerialNo('');
        setGroup('');
        setStudentName('');
        setBatch('');
        setYear('');
      };
    
      const handleFileChange = (e) => {
       const file = e.target.files[0];
        ExcelRenderer(file,(err,response)=>{
          if(err){
            console.log("Error in display",err);
          }
          else{
              setHeader(response.rows[0]);
              setCols(response.rows);
          }
        })
      };
    
  return (

    <>
     <ToastContainer/>
      {/* <Filters/> */}
      <div className='container mt-4'>
        <h2>Add Student Details</h2>
        <div className="row g-3">
          <div className="col-md-3">
            <label htmlFor="enrollNo" className="form-label">Enrollment Number</label>
            <input
              type="number"
              className="form-control"
              id="enrollNo"
              value={enrollNo}
              onChange={(e) => setEnrollNo(e.target.value)}
            />
          </div>
          <div className="col-md-3">
            <label htmlFor="branchId" className="form-label">Branch ID</label>
            <input
              type="number"
              className="form-control"
              id="branchId"
              value={branchId}
              onChange={(e) => setBranchId(e.target.value)}
            />
          </div>
          <div className="col-md-3">
            <label htmlFor="classSerialNo" className="form-label">Class Serial No.</label>
            <input
              type="number"
              className="form-control"
              id="classSerialNo"
              value={classSerialNo}
              onChange={(e) => setClassSerialNo(e.target.value)}
            />
          </div>
          <div className="col-md-3">
            <label htmlFor="group" className="form-label">Group</label>
            <input
              type="text"
              className="form-control"
              id="group"
              value={group}
              onChange={(e) => setGroup(e.target.value)}
            />
          </div>
          <div className="col-md-3">
            <label htmlFor="studentName" className="form-label">Student Name</label>
            <input
              type="text"
              className="form-control"
              id="studentName"
              value={studentName}
              onChange={(e) => setStudentName(e.target.value)}
            />
          </div>
          <div className="col-md-3">
            <label htmlFor="batch" className="form-label">Batch</label>
            <input
              type="number"
              className="form-control"
              id="batch"
              value={batch}
              onChange={(e) => setBatch(e.target.value)}
            />
          </div>
          <div className="col-md-3">
            <label htmlFor="year" className="form-label">Year</label>
            <input
              type="number"
              className="form-control"
              id="year"
              value={year}
              onChange={(e) => setYear(e.target.value)}
            />
          </div>
        </div>
        <div className="mt-4">
          <button className='btn btn-primary' onClick={addStudent}>
            Add Student
          </button>
        </div>

        {/* Display entered student details */}
        <div className="mt-4">
              {studentDetailsList.map((student, index) => (
                <>
          <h3>Entered Student Details:</h3>
                <table className="table">
                <thead>
                  <tr>
                    <th>Enrollment No.</th>
                    <th>Student Name</th>
                    {/* <th>Branch ID</th> */}
                    <th>Class Serial No.</th>
                    <th>Group</th>
                    <th>Batch</th>
                    <th>Year</th>
                  </tr>
                </thead>
                <tbody>
                <tr key={index}>
                  <td>{student.EnrollmentNumber}</td>
                  <td>{student.StudentName}</td>
                  {/* <td>{student.BranchID}</td> */}
                  <td>{student.ClassSerialNumber}</td>
                  <td>{student.Group}</td>
                  <td>{student.Batch}</td>
                  <td>{student.year}</td>
                </tr>
              
            </tbody>
          </table>
              </>
              ))}
</div>
        <div className="mt-4">
          <h2>Or</h2>
          <h2>Add Students in Bulk</h2>
          <p>Upload the excel file of the students</p>
          <input
            type="file"
            style={{ width: '18rem' }}
            className="form-control"
            id="excelFile"
            accept=".xlsx, .xls"
            onChange={handleFileChange}
          />
            <div>
        <table style={{borderCollapse:'collapse',margin:'10px auto',border:'1px solid black'}}> 
          <thead>
            <tr>
              {header.map((h,i)=>(
                <th key={i} style={{border:'1px solid black'}}>{h}

                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {cols.slice(1).map((col,i)=>(
                <tr key={i}>
                    {
                      col.map((c,i)=>(
                        <td key={i} style={{border:'1px solid black'}}>
                            {c}
                        </td>
                      ))
                    }
                </tr>
            ))}
          </tbody>
        </table>
      </div>    
        </div>
      </div>
            {/* <Filters/> */}
    </>
  )
}

export default AddStudent
