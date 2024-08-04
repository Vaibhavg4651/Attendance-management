import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import * as XLSX from 'xlsx';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import { setStudents } from '../reducers/userSlice';
import API_URL from '../ConfigUrl/Configurl';

const GetStudent = () => {
  const faculty=useSelector((state)=>state.user.Faculty);
  const location=useLocation();
  const {date}=location.state ||({date:""});
  const [studentData, setStudentData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [attendance, setAttendance] = useState({});
  const [presentCount, setPresentCount] = useState(0);
  const [absentCount, setAbsentCount] = useState(0);
  const [attendanceMarked, setAttendanceMarked] = useState(false);
  const dispatch=useDispatch();
  const studs=useSelector((state)=>state.user.Students)
 
  // console.log(faculty);
  useEffect(()=>{
    handleGetStudentChange();
  },[faculty]);
  const getStudentDetails={
    Class:faculty.Class,
    
    year:parseInt(faculty.year),
  }
  const handleGetStudentChange = async () => {
    try {
      setLoading(true);
      console.log('Sending request',getStudentDetails);
     
      const response = await axios.get(`${API_URL}api/user/getStudents`, { params: getStudentDetails });
      console.log(response.data);
      setStudentData(response.data);
      setLoading(false);
    } catch (error) {
      console.log('Error in getting students', error);
      toast.error('Failed to Fetch Students');
      setLoading(false);
    }
  };


 

  const markAttendanceapi = async () => {
    const studarray = studentData.map((student) => ({
      EnrollmentNumber: student.EnrollmentNumber,
      SubjectID: faculty.SubjectID,
      FacultyID: faculty.FacultyID,
      AttendanceStatus: attendance[student.EnrollmentNumber],
      room: faculty.room,
      Date:date,
    }));
   
    try {
      console.log('Sending request', studarray);
      const res = await axios.post(`${API_URL}api/user/markAttendance/${faculty.FacultyID}`, studarray);
      console.log('Attendance marked successfully', res.data);
      setAttendanceMarked(true);
      toast.success(res.data.message);
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
    const storedAttendance = studs;
    if (storedAttendance) {
      setAttendance(storedAttendance);
    }
  }, []);

  useEffect(() => {
    updateCounts(attendance);
    //localStorage.setItem('attendance', JSON.stringify(attendance));
    dispatch(setStudents(attendance));
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
  const ClearStudents=()=>{
    dispatch(setStudents([]));
    setAttendance({});
  }
  return (
   
 <div>
      <ToastContainer />
      {/* <Navbar/> */}
      <div className='container mt-4'>
        <h2>Get Student Details</h2>
      </div>
      {loading && <p>Loading...</p>}
      {studentData && studentData.length > 0 && (
        <>
          <div className='container mt-4'>
          <h2>
  Student Details of Class
  {" "}
     {faculty.Class} {" "} {faculty.year} year
    </h2>
        <div>
          <button className='btn btn-danger' onClick={ClearStudents}>Clear All</button>
        </div>
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
                        name= {`attendance-${student.EnrollmentNumber}`}
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
                <button className='d-flex align-items-center btn btn-success mb-4' onClick={downloadExcel}>Download Excel</button>
              </div>
            </center>
          </div>
        </>
      )}
    </div>
  );
};
export default GetStudent;
