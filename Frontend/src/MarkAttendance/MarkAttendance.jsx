
import React, { useEffect } from 'react'
import { useState} from 'react';
// import * as XLSX from 'xlsx';
import ReactToExcel from 'react-html-table-to-excel';
import { Route, useNavigate, Routes,Link} from 'react-router-dom';
import Filters from './Filters';
import { ToastContainer, toast } from 'react-toastify';

const students=[   
        
        {
          "": 1,
          "__1": "KRRISH MALHOTRA",
          "__2": "Male",
          "__3": "General",
          "__4": "New Delhi",
          "__5": "",
          "__6": "malekm09122003@gmail.com",
          "__7": "B.Tech(CSE)",
          "__8": 115002721,
          "__9": 9667240912,
          "__10": 2021,
          "__11": "krrish"
        },
        {
          "": 2,
          "__1": "VARUN KUMAR GAUTAM",
          "__2": "Male",
          "__3": "SC",
          "__4": "New Delhi",
          "__5": "",
          "__6": "varungautam771@gmail.com",
          "__7": "B.Tech(CSE)",
          "__8": 215002721,
          "__9": 7683032156,
          "__10": 2021,
          "__11": "varun"
        },
        {
          "": 3,
          "__1": "VISHRUT RANA",
          "__2": "Male",
          "__3": "General",
          "__4": "New Delhi",
          "__5": "",
          "__6": "vishrutrana0202@gmail.com",
          "__7": "B.Tech(CSE)",
          "__8": 315002721,
          "__9": 9654787905,
          "__10": 2021,
          "__11": "vishrut"
        },
        {
          "": 4,
          "__1": "HASEEBUR REHMAN",
          "__2": "Male",
          "__3": "General",
          "__4": "New Delhi",
          "__5": "",
          "__6": "haseebur29@gmail.com",
          "__7": "B.Tech(CSE)",
          "__8": 415002721,
          "__9": 7982640794,
          "__10": 2021,
          "__11": "haseeb"
        },
        {
          "": 5,
          "__1": "ROHIT KUMAR KAUSHAL",
          "__2": "Male",
          "__3": "SC",
          "__4": "New Delhi",
          "__5": "",
          "__6": "rohitkaushal_21@yahoo.com",
          "__7": "B.Tech(CSE)",
          "__8": 515002721,
          "__9": 8800456100,
          "__10": 2021,
          "__11": ""
        },
        {
          "": 6,
          "__1": "ADITYA PRASAD",
          "__2": "Male",
          "__3": "General",
          "__4": "New Delhi",
          "__5": "",
          "__6": "adityaprasad947@gmail.com",
          "__7": "B.Tech(CSE)",
          "__8": 615002721,
          "__9": 7011169705,
          "__10": 2021,
          "__11": "aditya"
        },
        {
          "": 7,
          "__1": "AKSHAT RAI",
          "__2": "Male",
          "__3": "General",
          "__4": "New Delhi",
          "__5": "",
          "__6": "akshatrai21@gmail.com",
          "__7": "B.Tech(CSE)",
          "__8": 715002721,
          "__9": 7678135051,
          "__10": 2021,
          "__11": "akshat"
        },
        {
          "": 8,
          "__1": "SIDDARTH SINGH",
          "__2": "Male",
          "__3": "General",
          "__4": "New delhi",
          "__5": "",
          "__6": "siddarth.singh03@gmail.com",
          "__7": "B.Tech(CSE)",
          "__8": 815002721,
          "__9": 0.9958672584,
          "__10": 2021,
          "__11": "siddarth"
        },
        {
          "": 9,
          "__1": "UJJWAL SINGH",
          "__2": "Male",
          "__3": "General",
          "__4": "New Delhi",
          "__5": "",
          "__6": "ujjwalsingh.bbps@gmail.com",
          "__7": "B.Tech (CSE)",
          "__8": 915002721,
          "__9": 9667267564,
          "__10": 2021,
          "__11": "ujjwal"
        },
        {
          "": 10,
          "__1": "KSHITIZ SHARMA",
          "__2": "Male",
          "__3": "General",
          "__4": "New Delhi",
          "__5": "",
          "__6": "kshitiz01sharma@gmail.com",
          "__7": "B.Tech (CSE)",
          "__8": 1015002721,
          "__9": 9711274308,
          "__10": 2021,
          "__11": "Kshitiz"
        },
]

const MarkAttendance = () => {
    const [attendance, setAttendance] = useState({}); 
    const [presentcount,setpresentcount]=useState(0);
    const [absentcount,setabsentcount]=useState(0);
    const [filter,showfilter]=useState('');
    // const navigate=useNavigate();
    const handlefilter=()=>{
        showfilter(!filter);
    }
    
    useEffect(() => {
      // Load attendance from local storage on component mount
      const storedAttendance = JSON.parse(localStorage.getItem('attendance'));
      if (storedAttendance) {
        setAttendance(storedAttendance);
      }
    }, []);
    useEffect(() => {
      updateCounts(attendance);
    }, [attendance]);

    const handleAttendanceChange = (sNo, status) => {
      setAttendance((prevAttendance) =>{
        const updatedAttendance={
        ...prevAttendance,
        [sNo]: status,
      };
      updateCounts(updatedAttendance)
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

    setpresentcount(presentStudents);
    setabsentcount(absentStudents);
  };    
 const handlesubmitattendance=()=>{
  toast.success('Attendance marked successfully');
 }
 return (
  <>
<ToastContainer/>
      <div className="ml-4">
        <h4>Student Attendance List</h4>
          <h5>Batch: CSE-1 5th sem
          Subject: Compiler Design 
          Room no : 401</h5>
          <center> 
        <div className="d-flex justify-content-center align-items-center">
        <Routes>
  
  {/* Add other routes as needed */}
</Routes>
      </div>
      </center>
      
      <div className="justify-content-end align-items-center text-center">
          <h6 style={{ display: 'block' }}>Total students present: {presentcount}</h6>
          <span></span>
          <h6 style={{ display: 'block' }}>Total students absent: {absentcount}</h6>
      </div>

      <div className='d-flex justify-content-center align-items-center text-center'>
  {/* <button className='btn btn-primary' onClick={handlefilter}>Apply Filters</button>
  {
   filter && (
     <Filters/>
    )
  } */}
</div>  

<table className="table"  id="table-to-xls" style={{ borderCollapse: 'collapse', width: '100'}}>
        <thead>
          <tr style={{ backgroundColor: 'rgb(51, 51, 103)', color: 'white' }}>
            <th style={{ border: '1px solid white', padding: '10px' }}><h6>S.No.</h6></th>
            <th style={{ border: '1px solid white', padding: '10px' }}><h6>Name</h6></th>
            <th style={{ border: '1px solid white', padding: '10px' }}><h6>Enrollment no.</h6></th>
            <th style={{ border: '1px solid white', padding: '10px' }}>
            <div className="d-flex align-items-center ">
              <h6>Present</h6>
              <span className='mx-2'></span>
              <button className='btn btn-primary' style={{marginBottom:'1rem'}} onClick={() => handleAllAttendance('present')} >Present all</button>
              </div>
            </th>
            <th style={{ border: '1px solid white', padding: '10px' }}>
            <div className="d-flex align-items-center ">
              <h6>Absent</h6>
              <span className='mx-2'></span>
              <button className='btn btn-primary' style={{marginBottom:'1rem'}} onClick={() => handleAllAttendance('absent')} >Absent all</button>
              </div>
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
            </tr>
          ))}
        </tbody>
      </table>
        <br />
      </div>
      <div className='d-flex justify-content-center align-items-center text-center'>
        <button className='btn btn-primary' onClick={handlesubmitattendance}>
          Submit Attendance
        </button>
      </div>
        <br /> 
      </>
    );
  };
  
  export default MarkAttendance;

// import React, { useState, useEffect } from 'react';
// import { Link, Route, Routes, useNavigate } from 'react-router-dom';

// const MarkAttendance = () => {
//   const [attendance, setAttendance] = useState({});
//   const [presentCount, setPresentCount] = useState(0);
//   const [absentCount, setAbsentCount] = useState(0);
//   const navigate = useNavigate();

//   useEffect(() => {
//     updateCounts(attendance);
//   }, [attendance]);

//   const handleAttendanceChange = (sNo, status) => {
//     const updatedAttendance = {
//       ...attendance,
//       [sNo]: status,
//     };
//     setAttendance(updatedAttendance);
//   };

//   const handleAllAttendance = (status) => {
//     const updatedAttendance = {};
//     students.forEach((student) => {
//       updatedAttendance[student['']] = status;
//     });
//     setAttendance(updatedAttendance);
//   };

//   const updateCounts = (updatedAttendance) => {
//     const presentStudents = Object.values(updatedAttendance).filter(
//       (status) => status === 'present'
//     ).length;
//     const absentStudents = students.length - presentStudents;

//     setPresentCount(presentStudents);
//     setAbsentCount(absentStudents);
//   };

//   const handleSubmitAttendance = async () => {
//     try {
//       const response = await fetch('http://127.0.0.1:8000/api/user/markAttendance/2', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(Object.entries(attendance).map(([sNo, status]) => ({
//           EnrollmentNumber: students.find(student => student[''] === sNo)['__8'],
//           SubjectID: 4,
//           FacultyID: 2,
//           AttendanceStatus: status,
//           room: "403"
//         }))),
//       });
//       if (response.ok) {
//         const data = await response.json();
//         console.log(data.message); // Log the response message
//       } else {
//         throw new Error('Failed to mark attendance');
//       }
//     } catch (error) {
//       console.error('Error marking attendance:', error);
//     }
//   };

//   return (
//     <>
//       <div className="ml-4">
//         <h4>Student Attendance List</h4>
//         <h5>Batch: CSE-1 5th sem Subject: Compiler Design Room no : 401</h5>

//         <div className="d-flex justify-content-end align-items-center text-center">
//           <h6 style={{ display: 'block' }}>Total students present: {presentCount}</h6>
//           <span></span>
//           <h6 style={{ display: 'block' }}>Total students absent: {absentCount}</h6>
//         </div>

//         <table className="table" id="table-to-xls" style={{ borderCollapse: 'collapse', width: '100%' }}>
//           <thead>
//             <tr style={{ backgroundColor: 'rgb(51, 51, 103)', color: 'white' }}>
//               <th style={{ border: '1px solid white', padding: '10px' }}><h6>S.No.</h6></th>
//               <th style={{ border: '1px solid white', padding: '10px' }}><h6>Name</h6></th>
//               <th style={{ border: '1px solid white', padding: '10px' }}><h6>Enrollment no.</h6></th>
//               <th style={{ border: '1px solid white', padding: '10px' }}>
//                 <div className="d-flex align-items-center ">
//                   <h6>Present</h6>
//                   <span className='mx-2'></span>
//                   <button className='btn btn-primary' style={{ marginBottom: '1rem' }} onClick={() => handleAllAttendance('present')}>Present all</button>
//                 </div>
//               </th>
//               <th style={{ border: '1px solid white', padding: '10px' }}>
//                 <div className="d-flex align-items-center ">
//                   <h6>Absent</h6>
//                   <span className='mx-2'></span>
//                   <button className='btn btn-primary' style={{ marginBottom: '1rem' }} onClick={() => handleAllAttendance('absent')}>Absent all</button>
//                 </div>
//               </th>
//             </tr>
//           </thead>
//           <tbody>
//             {students.map((student) => (
//               <tr key={student['']} style={{ border: '1px solid black' }}>
//                 <td style={{ border: '1px solid black', padding: '10px' }}>{student['']}</td>
//                 <td style={{ border: '1px solid black', padding: '10px' }}>{student['__1']}</td>
//                 <td style={{ border: '1px solid black', padding: '10px' }}>{student['__8']}</td>
//                 <td style={{ border: '1px solid black', padding: '10px' }}>
//                   <input
//                     type="radio"
//                     name={`attendance-${student['']}`}
//                     value="present"
//                     onChange={() => handleAttendanceChange(student[''], 'present')}
//                     checked={attendance[student['']] === 'present'}
//                   />
//                 </td>
//                 <td style={{ border: '1px solid black', padding: '10px' }}>
//                   <input
//                     type="radio"
//                     name={`attendance-${student['']}`}
//                     value="absent"
//                     onChange={() => handleAttendanceChange(student[''], 'absent')}
//                     checked={attendance[student['']] === 'absent'}
//                   />
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>

//         <div className="justify-content-end align-items-center text-center">
//           <button className='btn btn-primary' onClick={handleSubmitAttendance}>Submit Attendance</button>
//         </div>
//       </div>
//     </>
//   );
// };

// export default MarkAttendance;
