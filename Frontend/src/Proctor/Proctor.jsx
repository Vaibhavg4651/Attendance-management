import xlsx  from 'json-as-xlsx';
import React, { useState } from 'react';
import Navbar from '../Navbar/Navbar';
import {OutTable,ExcelRenderer} from 'react-excel-renderer';
// import Subjects from '../Subjects/Subjects';


const Proctor = () => {
  const initialStudentDetails = {
    name: '',
    enrollmentNo: '',
    classNo: ''
  };

  const [studentDetailsList, setStudentDetailsList] = useState([]);
  const [currentStudentDetails, setCurrentStudentDetails] = useState(initialStudentDetails);
  const [enrollmentError, setEnrollmentError] = useState('');
  const [header, setHeader] = useState([]);
  const [cols,setCols]=useState([]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Validate enrollment number to be exactly 11 digits
    if (name === 'enrollmentNo') {
      if (value.length === 11 && /^\d*$/.test(value)) {
        setEnrollmentError('');
      } else {
        setEnrollmentError('Enrollment number must be exactly 11 digits.');
      }
    }

    setCurrentStudentDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value
    }));
  };

  const handleAddButtonClick = () => {
    if (enrollmentError === '') {
      setStudentDetailsList((prevList) => [...prevList, currentStudentDetails]);
      setCurrentStudentDetails(initialStudentDetails);
    }
  };

  const handleNewButtonClick = () => {
    setCurrentStudentDetails(initialStudentDetails);
    setEnrollmentError('');
  };
  const handleFileChange =(e) => {
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
      <Navbar/>
    <div className='container mt-4'>
      <h2>Add Student Details</h2>
      <div className="row g-3">
        <div className="col-md-4">
          <label htmlFor="name" className="form-label">Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={currentStudentDetails.name}
            onChange={handleInputChange}
          />
        </div>
        <div className="col-md-4">
          <label htmlFor="enrollmentNo" className="form-label">Enrollment No.</label>
          <input
            type="text"
            className="form-control"
            id="enrollmentNo"
            name="enrollmentNo"
            value={currentStudentDetails.enrollmentNo}
            onChange={handleInputChange}
            />
          {enrollmentError && <div className="text-danger">{enrollmentError}</div>}
        </div>
        <div className="col-md-4">
          <label htmlFor="classNo" className="form-label">Class S.No.</label>
          <input
            type="text"
            className="form-control"
            id="classNo"
            name="classNo"
            value={currentStudentDetails.classNo}
            onChange={handleInputChange}
            />

        </div>
        <div className="md-4 text-start">
          <button className='btn btn-primary mt-3' onClick={handleAddButtonClick}>
            Add
          </button>
        </div>
        {studentDetailsList.length > 0 && (
        <div className="mt-4">
          <h3>Entered Student Details:</h3>
          <table className="table">
            <thead>
              <tr>
                <th>Class S.No.</th>
                <th>Enrollment No.</th>
                <th>Name</th>
              </tr>
            </thead>
            <tbody>
              {studentDetailsList.map((student, index) => (
                <tr key={index}>
                  <td>{student.classNo}</td>
                  <td>{student.enrollmentNo}</td>
                  <td>{student.name}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <button className='btn btn-primary mt-3' onClick={handleNewButtonClick}>
            Add New Student
          </button>

        </div>
      )}
              <h2>Or</h2>
            <h2>Add Students in Bulk</h2>
              <p>Upload the excel file of the students
              <input
          type="file"
          style={{width:'18rem'}}
          className="form-control"
          id="excelFile"
          accept=".xlsx, .xls"
          onChange={handleFileChange}
        /> </p>         
      </div>
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
    {/* <Subjects/> */}
    </>
  );
}

export default Proctor;
