import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const MarkAttendance = () => {
  const [attendance, setAttendance] = useState({});
  const [presentCount, setPresentCount] = useState(0);
  const [absentCount, setAbsentCount] = useState(0);
  const [filter, showFilter] = useState(false);
   // Sample data

  useEffect(() => {
    const storedAttendance = JSON.parse(localStorage.getItem('attendance'));
    if (storedAttendance) {
      setAttendance(storedAttendance);
    }
  }, []);

  useEffect(() => {
    updateCounts(attendance);
  }, [attendance]);

  const handleAttendanceChange = (sNo, status) => {
    setAttendance((prevAttendance) => {
      const updatedAttendance = {
        ...prevAttendance,
        [sNo]: status,
      };
      updateCounts(updatedAttendance);
      return updatedAttendance;
    });
  };

  const handleAllAttendance = (status) => {
    const updatedAttendance = {};
    students.forEach((student) => {
      updatedAttendance[student['']] = status;
    });
    updateCounts(updatedAttendance);
    setAttendance(updatedAttendance);
  };

  const updateCounts = (updatedAttendance) => {
    const presentStudents = Object.values(updatedAttendance).filter(
      (status) => status === 'present'
    ).length;
    const absentStudents = students.length - presentStudents;

    setPresentCount(presentStudents);
    setAbsentCount(absentStudents);
  };

  const handleDeleteStudent = (sNo) => {
    const updatedAttendance = { ...attendance };
    delete updatedAttendance[sNo];
    setAttendance(updatedAttendance);
    // Remove student from students array
    const updatedStudents = students.filter((student) => student[''] !== sNo);
    updateCounts(updatedAttendance);
  };

  const handleSubmitAttendance = () => {
    toast.success('Attendance marked successfully');
    localStorage.setItem('attendance', JSON.stringify(attendance));
  };

  return (
    <>
      <ToastContainer />
      <div className="ml-4">
        <h4>Student Attendance List</h4>
        <h5>
          Batch: CSE-1 5th sem
          <br />
          Subject: Compiler Design
          <br />
          Room no: 401
        </h5>
        <center>
          <div className="d-flex justify-content-center align-items-center"></div>
        </center>

        <div className="justify-content-end align-items-center text-center">
          <h6 style={{ display: 'block' }}>Total students present: {presentCount}</h6>
          <span></span>
          <h6 style={{ display: 'block' }}>Total students absent: {absentCount}</h6>
        </div>

        <div className="d-flex justify-content-center align-items-center text-center">
          {/* <button className='btn btn-primary' onClick={handlefilter}>Apply Filters</button>
          {
           filter && (
             <Filters/>
            )
          } */}
        </div>

        <table className="table" id="table-to-xls" style={{ borderCollapse: 'collapse', width: '100%' }}>
          <thead>
            <tr style={{ backgroundColor: 'rgb(51, 51, 103)', color: 'white' }}>
              <th style={{ border: '1px solid white', padding: '10px' }}>
                <h6>S.No.</h6>
              </th>
              <th style={{ border: '1px solid white', padding: '10px' }}>
                <h6>Name</h6>
              </th>
              <th style={{ border: '1px solid white', padding: '10px' }}>
                <h6>Enrollment no.</h6>
              </th>
              <th style={{ border: '1px solid white', padding: '10px' }}>
                <div className="d-flex align-items-center">
                  <h6>Present</h6>
                  <span className="mx-2"></span>
                  <button className="btn btn-primary" style={{ marginBottom: '1rem' }} onClick={() => handleAllAttendance('present')}>
                    Present all
                  </button>
                </div>
              </th>
              <th style={{ border: '1px solid white', padding: '10px' }}>
                <div className="d-flex align-items-center">
                  <h6>Absent</h6>
                  <span className="mx-2"></span>
                  <button className="btn btn-primary" style={{ marginBottom: '1rem' }} onClick={() => handleAllAttendance('absent')}>
                    Absent all
                  </button>
                </div>
              </th>
              <th style={{ border: '1px solid white', padding: '10px' }}>
                <h6>Delete</h6>
              </th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student['']} style={{ border: '1px solid black' }}>
                <td style={{ border: '1px solid black', padding: '10px' }}>{student['']}</td>
                <td style={{ border: '1px solid black', padding: '10px' }}>{student['__1']}</td>
                <td style={{ border: '1px solid black', padding: '10px' }}>{student['__8']}</td>
                <td style={{ border: '1px solid black', padding: '10px' }}>
                  <input
                    type="radio"
                    name={`attendance-${student['']}`}
                    value="present"
                    onChange={() => handleAttendanceChange(student[''], 'present')}
                    checked={attendance[student['']] === 'present'}
                  />
                </td>
                <td style={{ border: '1px solid black', padding: '10px' }}>
                  <input
                    type="radio"
                    name={`attendance-${student['']}`}
                    value="absent"
                    onChange={() => handleAttendanceChange(student[''], 'absent')}
                    checked={attendance[student['']] === 'absent'}
                  />
                </td>
                <td style={{ border: '1px solid black', padding: '10px' }}>
                  <button className="btn btn-danger" onClick={() => handleDeleteStudent(student[''])}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <br />
      </div>
      <div className="d-flex justify-content-center align-items-center text-center">
        <button className="btn btn-primary" onClick={handleSubmitAttendance}>
          Submit Attendance
        </button>
      </div>
      <br />
    </>
  );
};

export default MarkAttendance;
