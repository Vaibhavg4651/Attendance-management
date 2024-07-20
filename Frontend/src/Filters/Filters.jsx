import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import * as XSLX from 'xlsx';
import branchDataJson from '../Branch.json';
import 'react-toastify/dist/ReactToastify.css';

const Filters = () => {
 
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');
  const [percentage, setPercentage] = useState('');
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [studentData, setStudentData] = useState([]);
  const [branchData, setBranchData] = useState([]);
  const [proctorStudentData, setProctorStudentData] = useState([]);
  const classes = ["CSE1", "CSE2", "CSE3", "CSE4", "IT1", "IT2", "IT3", "ECE1", "ECE2", "ECE3", "EE1", "EE2"];
  const year = [1, 2, 3, 4];

  useEffect(() => {
    setBranchData(branchDataJson);
  }, []);

  const validateRequestDetails = (details) => {
    if (isNaN(details.BranchID) || !details.Class || isNaN(details.year)) {
      return false;
    }
    return true;
  };

  const filterchange = async () => {
    const selectedBranch = branchData.find(branch => branch.ClassName === selectedClass);
    const requestdetails = {
      BranchID: selectedBranch ? selectedBranch.BranchID : null,
      Class: selectedClass,
      year: parseInt(selectedYear),
    };

    if (!validateRequestDetails(requestdetails)) {
      toast.error('Invalid filter criteria. Please check your inputs.');
      return;
    }

    try {
      console.log('Sending request', requestdetails);
      const response = await axios.post('http://127.0.0.1:8000/filters/allfilter', requestdetails);
      console.log('Filtered students response:', response.data);
      setStudentData(response.data);
      // setSubjectCode(studentData[0].Subjects[0].Subjectcode);
    } catch (error) {
      console.log('Error in producing filtered students response', error);
      toast.error('Failed to apply filters');
    }
  };
  
  const exportToExcel = () => {

    if(studentData.length===0){
      toast.warn('No Data Available to export');
      return;
    }
    let headers=['S.No.','Name','Enrollment No.','Group'];
    const flattenData=studentData.map((student,index)=>{
      let rowData={
        'S.No.':student.ClassSerialNumber,
        'Name':student.StudentName,
        'Enrollment No.':student.EnrollmentNumber,
        'Group':student.Group,

      }
      student.Subjects.forEach((sub,subIndex)=>{
        rowData[`LH_${sub.Subjectcode}(${sub.SubjectType})`]=sub.attend.total_lectures;
        rowData[`LA_${sub.Subjectcode}(${sub.SubjectType})`]=sub.attend.attended_lectures;

        if(index===0){
          headers.push(`LH_${sub.Subjectcode}(${sub.SubjectType})`);
          headers.push(`LA_${sub.Subjectcode}(${sub.SubjectType})`);
        }

      });
      rowData['Total Lectures Held']=student.totalHeld;
      rowData['Total Lectures Attended']=student.totalAttended;
      rowData['Total Percentage']=student.totalPercentage;
      if (index === 0) {
        headers.push('Total Lectures Held', 'Total Lectures Attended', 'Total Percentage');
      }

      return rowData;
        });

    const worksheet =XSLX.utils.json_to_sheet(flattenData,{header:headers});
    const workbook =XSLX.utils.book_new();
    XSLX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
    XSLX.writeFile(workbook, `FilteredStudents.xlsx`);
  };

  const proctorFilter = async () => {
    const selectedBranch = branchData.find(branch => branch.ClassName === selectedClass);
    const proctorRequestDetails = {
      BranchID: selectedBranch ? selectedBranch.BranchID : null,
      Class: selectedClass,
      year: parseInt(selectedYear),
      filter: {
        from_date: start, // optional
        to_date: end, // mandatory
        EnrollmentNumber: [], // optional
        subjects: [], // optional
        group: '', // optional
        lessThanPercentage: percentage ? parseInt(percentage) : null, // optional
        greaterThanPercentage: null // optional
      }
    };

    try {
      console.log('Sending request', proctorRequestDetails);
      const response = await axios.post('http://127.0.0.1:8000/filters/proctorFilter', proctorRequestDetails);
      console.log('Filtered proctor students response:', response.data);
      setProctorStudentData(response.data);
    } catch (error) {
      console.log('Error in producing filtered proctor students response', error);
      toast.error('Failed to apply proctor filters');
    }
  };

  return (
    <div className='container mt-4'>
      <h2 className='d-flex justify-content-center'>Apply Filters</h2>
      <div className='row'>
        <div className="col-md-2">
          <label htmlFor="class" className="form-label">Class</label>
          <select
            className="form-select"
            id="class"
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
          >
            <option value="">Select Class</option>
            {classes.map((cls, index) => (
              <option key={index} value={cls}>{cls}</option>
            ))}
          </select>
        </div>
        <div className="col-md-2">
          <label htmlFor="year" className="form-label">Year</label>
          <select
            className="form-select"
            id="year"
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
          >
            <option value="">Select Year</option>
            {year.map((yr, index) => (
              <option key={index} value={yr}>{yr}</option>
            ))}
          </select>
        </div>
        <div className="col-md-2">
          <label htmlFor="start" className="form-label">Start Date</label>
          <input
            type="date"
            className="form-control"
            id="start"
            value={start}
            onChange={(e) => setStart(e.target.value)}
          />
        </div>
        <div className="col-md-2">
          <label htmlFor="end" className="form-label">End Date</label>
          <input
            type="date"
            className="form-control"
            id="end"
            value={end}
            onChange={(e) => setEnd(e.target.value)}
          />
        </div>
        <div className="col-md-2">
          <label htmlFor="percentage" className="form-label">Percentage</label>
          <input
            type="number"
            className="form-control"
            id="percentage"
            value={percentage}
            onChange={(e) => setPercentage(e.target.value)}
          />
        </div>
      </div>
      <div className='mt-4 d-flex justify-content-center'>
        <button className='btn btn-primary me-2' onClick={filterchange}>
          Apply Filter
        </button>
        <button className='btn btn-secondary' onClick={proctorFilter}>
          Apply Proctor Filter
        </button>
      </div>
      {
        studentData.length > 0 ? (
          <div className='container mt-4'>
            <h2>Filtered Students of {selectedClass} {" "} {selectedYear} year</h2>
          
            <table className='table'>
              <thead>
                <tr style={{ backgroundColor: 'rgb(51, 51, 103)', color: 'white' }}>
                  <th rowSpan="3" style={{ border: '1px solid white', padding: '6px' }}><h6>S.No.</h6></th>
                  <th rowSpan="3" style={{ border: '1px solid white', padding: '6px' }}><h6>Name</h6></th>
                  <th rowSpan="3" style={{ border: '1px solid white', padding: '6px' }}><h6>Enrollment no.</h6></th>
                  <th rowSpan="3" style={{ border: '1px solid white', padding: '6px' }}><h6>Group</h6></th>
                  {
                    studentData[0].Subjects.map((sub,index)=>(
                  <th key={index} colSpan="2" style={{ border: '1px solid white', padding: '6px' }}>{sub.Subjectcode}({sub.SubjectType})<h6></h6> 
                  </th>
                  ))}
                  <th rowSpan="2" style={{ border: '1px solid white', padding: '6px' }}><h6>Total Lectures Held</h6></th>
                  <th rowSpan="2" style={{ border: '1px solid white', padding: '6px' }}><h6>Total Lectures Attended</h6></th>
                  <th rowSpan="2" style={{ border: '1px solid white', padding: '6px' }}><h6>Total Percentage</h6></th>
                </tr>
                  <tr style={{ backgroundColor: 'rgb(51, 51, 103)', color: 'white' }}>
                  {studentData[0].Subjects.map((sub,index)=>(
                    <React.Fragment key={index}>
                      <th style={{ border: '1px solid white', padding: '6px' }}>LH</th>
                      <th style={{ border: '1px solid white', padding: '6px' }}>LA</th>

                    </React.Fragment>
                  ))}
                  </tr>
             
              </thead>
              <tbody>
                {studentData.map((student, index) => (
                  <tr key={index}>
                    <td style={{ border: '1px solid black', padding: '6px' }}>{student.ClassSerialNumber}</td>
                    <td style={{ border: '1px solid black', padding: '6px' }}>{student.StudentName}</td>
                    <td style={{ border: '1px solid black', padding: '6px' }}>{student.EnrollmentNumber}</td>
                    <td style={{ border: '1px solid black', padding: '6px' }}>{student.Group}</td>
                    
                    {student.Subjects.map((sub,subIndex)=>(
                      <React.Fragment key={subIndex}>
                        <td style={{ border: '1px solid black', padding: '6px' }}>{sub.attend.total_lectures}</td>
                        <td style={{ border: '1px solid black', padding: '6px' }}>{sub.attend.attended_lectures}</td>
                      </React.Fragment>
                    ))}
                  
                    <td style={{ border: '1px solid black', padding: '6px' }}>{student.totalHeld}</td>
                    <td style={{ border: '1px solid black', padding: '6px' }}>{student.totalAttended}</td>
                    <td style={{ border: '1px solid black', padding: '6px' }}>{student.totalPercentage}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <center>
            <div className='flex'>
            <button className=' text-center align-items-center btn btn-success' onClick={exportToExcel}> 
                Download Excel
            </button>
            </div>
            </center>
          </div>
        ) : (
          <div className='container mt-4'>
            <h2>No students to display</h2>
          </div>
        )
      }
      {
        proctorStudentData.length > 0 ? (
          <div className='container mt-4'>
            <h2>Proctor Filtered Students</h2>
            <table className='table'>
              <thead>
                <tr style={{ backgroundColor: 'rgb(51, 51, 103)', color: 'white' }}>
                  <th style={{ border: '1px solid white', padding: '7px' }}><h6>S.No.</h6></th>
                  <th style={{ border: '1px solid white', padding: '7px' }}><h6>Name</h6></th>
                  <th style={{ border: '1px solid white', padding: '7px' }}><h6>Enrollment no.</h6></th>
                  <th style={{ border: '1px solid white', padding: '7px' }}><h6>Group</h6></th>
                  <th style={{ border: '1px solid white', padding: '7px' }}><h6>Total Lectures Held</h6></th>
                  <th style={{ border: '1px solid white', padding: '7px' }}><h6>Total Lectures Attended</h6></th>
                  <th style={{ border: '1px solid white', padding: '7px' }}><h6>Total Percentage</h6></th>
                </tr>
              </thead>
              <tbody>
                {proctorStudentData.map((student, index) => (
                  <tr key={index}>
                    <td style={{ border: '1px solid black', padding: '8px' }}>{student.ClassSerialNumber}</td>
                    <td style={{ border: '1px solid black', padding: '8px' }}>{student.StudentName}</td>
                    <td style={{ border: '1px solid black', padding: '8px' }}>{student.EnrollmentNumber}</td>
                    <td style={{ border: '1px solid black', padding: '8px' }}>{student.Group}</td>
                    <td style={{ border: '1px solid black', padding: '8px' }}>{student.totalHeld}</td>
                    <td style={{ border: '1px solid black', padding: '8px' }}>{student.totalAttended}</td>
                    <td style={{ border: '1px solid black', padding: '8px' }}>{student.totalPercentage}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className='container mt-4'>
            <h2>No proctor filtered students to display</h2>
          </div>
        )
      }
    </div>
  );
};

export default Filters;
