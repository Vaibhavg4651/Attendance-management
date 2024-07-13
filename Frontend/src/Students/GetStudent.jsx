import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Filters from '../Filters/Filters';
import * as XLSX from 'xlsx';
import { useSelector } from 'react-redux';

const GetStudent = () => {
  const userid = useSelector((state) => state.user.userid);
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [studentData, setStudentData] = useState([]);
  const [facultyDetails, setFacultyDetails] = useState([]);
  const [selectedFaculty, setSelectedFaculty] = useState({});
  const [loading, setLoading] = useState(false);
  const [attendance, setAttendance] = useState({});
  const [presentCount, setPresentCount] = useState(0);
  const [absentCount, setAbsentCount] = useState(0);
  const [attendanceMarked, setAttendanceMarked] = useState(false);
  const [facultyClass,setFacultyClass]=useState('');

  const classes = ['CSE1', 'CSE2', 'CSE3', 'CSE4', 'IT1', 'IT2', 'IT3', 'ECE1', 'ECE2', 'ECE3', 'EEE1', 'EEE2'];
  const years = [1, 2, 3, 4];

  const getStudentDetails = {
    Class: selectedClass,
    year: parseInt(selectedYear),
  };

  const handleGetStudentChange = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://127.0.0.1:8000/api/user/getStudents', { params: getStudentDetails });
      console.log(response.data);
      setStudentData(response.data);
      setLoading(false);
    } catch (error) {
      console.log('Error in getting students', error);
      toast.error('Failed to Fetch Students');
      setLoading(false);
    }
  };

  const fetchIds = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/user/getFacultyDetails/${userid}`);
      const data = response.data;
      
      setFacultyDetails(data);
      setSelectedFaculty(data[0]); // Default to first faculty member
      console.log(data);
    } catch (error) {
      console.error('Error fetching Ids:', error);
    }
  };

  useEffect(() => {
    fetchIds();
  }, []);

  const markAttendanceapi = async () => {
    const studarray = studentData.map((student) => ({
      EnrollmentNumber: student.EnrollmentNumber,
      SubjectID: selectedFaculty.SubjectID,
      FacultyID: selectedFaculty.FacultyID,
      AttendanceStatus: attendance[student.EnrollmentNumber],
      room: selectedFaculty.room,
    }));

    try {
      console.log('Sending request', studarray);
      const res = await axios.post(`http://127.0.0.1:8000/api/user/markAttendance/${selectedFaculty.FacultyID}`, studarray);
      console.log('Attendance marked successfully', res.data);
      const updatedStudentData = studentData.filter((student) => !studarray.some((att) => att.EnrollmentNumber === student.EnrollmentNumber));
      setStudentData(updatedStudentData);
      const updatedAttendance = { ...attendance };
      studarray.forEach((att) => delete updatedAttendance[att.EnrollmentNumber]);
      setAttendance(updatedAttendance);
      updateCounts(updatedAttendance);
      setAttendanceMarked(true);
      toast.success('Attendance marked successfully');
    } catch (error) {
      console.log('Error in marking attendance', error);
      toast.error('Error in marking attendance');
    }
  };

  const handleAttendanceChange = (enrollmentNumber, status) => {
    setAttendance((prevAttendance) => ({
      ...prevAttendance,
      [enrollmentNumber]: status,
    }));
  };

  const updateCounts = (updatedAttendance) => {
    const presentStudents = Object.values(updatedAttendance).filter((status) => status === 'present').length;
    const absentStudents = Object.values(updatedAttendance).filter((status) => status === 'absent').length;

    setPresentCount(presentStudents);
    setAbsentCount(absentStudents);
  };

  const markAllPresent = () => {
    const updatedAttendance = {};
    studentData.forEach((student) => {
      updatedAttendance[student.EnrollmentNumber] = 'present';
    });
    setAttendance(updatedAttendance);
    updateCounts(updatedAttendance);
  };

  const markAllAbsent = () => {
    const updatedAttendance = {};
    studentData.forEach((student) => {
      updatedAttendance[student.EnrollmentNumber] = 'absent';
    });
    setAttendance(updatedAttendance);
    updateCounts(updatedAttendance);
  };

  useEffect(() => {
    const storedAttendance = JSON.parse(localStorage.getItem('attendance'));
    if (storedAttendance) {
      setAttendance(storedAttendance);
    }
  }, []);

  useEffect(() => {
    updateCounts(attendance);
    localStorage.setItem('attendance', JSON.stringify(attendance));
  }, [attendance]);

  const downloadExcel = () => {
    if (!attendanceMarked) {
      toast.error('Please first mark the attendance!');
      return;
    }

    const data = studentData.map((student) => ({
      'S.No.': student.ClassSerialNumber,
      Name: student.StudentName,
      'Enrollment no.': student.EnrollmentNumber,
      'Group': student.Group,
      Attendance: attendance[student.EnrollmentNumber],
    }));

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Attendance');
    XLSX.writeFile(workbook, 'Student_Attendance.xlsx');
  };

  return (
    <div>
      <ToastContainer />
      <div className='container mt-4'>
        <h2>Get Student Details</h2>
      
        <div className='row g-3'>
          <div className='col-md-3'>
            <label htmlFor='class' className='form-label'>Class</label>
            <select
              className='form-select'
              id='class'
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
            >
              <option value=''>Select Class</option>
              {classes.map((className, index) => (
                <option key={index} value={className}>{className}</option>
              ))}
            </select>
          </div>
          <div className='col-md-3'>
            <label htmlFor='year' className='form-label'>Year</label>
            <select
              className='form-select'
              id='year'
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
            >
              <option value=''>Select Year</option>
              {years.map((year, index) => (
                <option key={index} value={year}>{year}</option>
              ))}
            </select>
          </div>
        </div>
        <button className='btn btn-primary' onClick={handleGetStudentChange}>Get Students</button>
      </div>

      {loading && <p>Loading...</p>}

      {studentData && studentData.length > 0 && (
        <>
          <div className='container mt-4'>
          <h2>
  Student Details of Class
  {" "}
     {selectedClass} {" "} {selectedYear} year
      {/* {index < facultyDetails.length - 1 ? ", " : ""} */}
  
    </h2>
            {/* <h3>Total Lectures held: {selectedFaculty.total_lectures}</h3> */}
            <Filters />
            <h5>Total Students Present: {presentCount}</h5>
            <h5>Total Students Absent: {absentCount}</h5>
            <div></div>
            <table className='table'>
              <thead>
                <tr style={{ backgroundColor: 'rgb(51, 51, 103)', color: 'white' }}>
                  <th style={{ border: '1px solid white', padding: '7px' }}><h6>S.No.</h6></th>
                  <th style={{ border: '1px solid white', padding: '7px' }}><h6>Name</h6></th>
                  <th style={{ border: '1px solid white', padding: '7px' }}><h6>Enrollment no.</h6></th>
                  <th style={{ border: '1px solid white', padding: '7px' }}>
                    <div className='d-flex align-items-center'>
                      <h6>Present</h6>
                      <span className='mx-2'></span>
                      <button className='btn btn-primary' style={{ marginBottom: '1rem' }} onClick={markAllPresent}>Mark All Present</button>
                    </div>
                  </th>
                  <th style={{ border: '1px solid white', padding: '10px' }}>
                    <div className='d-flex align-items-center'>
                      <h6>Absent</h6>
                      <span className='mx-2'></span>
                      <button className='btn btn-primary' style={{ marginBottom: '1rem' }} onClick={markAllAbsent}>Mark All Absent</button>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {studentData.map((student, index) => (
                  <tr key={index}>
                    <td style={{ border: '1px solid black', padding: '8px' }}>{student.ClassSerialNumber}</td>
                    <td style={{ border: '1px solid black', padding: '8px' }}>{student.StudentName}</td>
                    <td style={{ border: '1px solid black', padding: '8px' }}>{student.EnrollmentNumber}</td>
                    <td style={{ border: '1px solid black', padding: '8px' }}>
                      <input
                        type='radio'
                        name={`attendance-${student.EnrollmentNumber}`}
                        value='present'
                        checked={attendance[student.EnrollmentNumber] === 'present'}
                        onChange={() => handleAttendanceChange(student.EnrollmentNumber, 'present')}
                      />
                    </td>
                    <td style={{ border: '1px solid black', padding: '8px' }}>
                      <input
                        type='radio'
                        name={`attendance-${student.EnrollmentNumber}`}
                        value='absent'
                        checked={attendance[student.EnrollmentNumber] === 'absent'}
                        onChange={() => handleAttendanceChange(student.EnrollmentNumber, 'absent')}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div>
            <center>
              <div className='flex'>
                <button className='d-flex align-items-center btn btn-primary' onClick={markAttendanceapi}>Submit Attendance</button>
                <button className='d-flex align-items-center btn btn-success' onClick={downloadExcel}>Download Excel</button>
              </div>
            </center>
          </div>
        </>
      )}
    </div>
  );
};

export default GetStudent;
