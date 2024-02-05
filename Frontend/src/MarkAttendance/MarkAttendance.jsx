import React from 'react'
import { useState} from 'react';
// import XLSX from 'xlsx';
// import {DownloadTableExcel} from 'react-export-table-to-excel'
import xlsx from 'json-as-xlsx';
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
// let xls=require("json-as-xlsx")
let settings={
  filename:'Students',
  // extraLength:5,
  writeMode:'writeFile',
  writeOptions:{},
  RTL:true,

}
const MarkAttendance = () => {
    const [attendance, setAttendance] = useState({}); 
    const [presentcount,setpresentcount]=useState(0);
    const [absentcount,setabsentcount]=useState(0);
    const [filter,showfilter]=useState(false);
    const [filteroption,setfilteroptions]=useState({
      date:'',
      batch:'',
      class:'',
    })
    // const tableRef = useRef(null);


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
    
 const downloadExcel=()=>{
  try {
    if (students && students.length > 0) {
      xlsx(students, settings);
    } else {
      console.error('Error generating Excel file: No data to export.');
    }
  } catch (error) {
    console.error('Error generating Excel file:', error);
  }
 }
    return (
      <div className="mt-4">
        <h4 >Student Attendance List</h4>
          <h5>Batch: CSE-1 5th sem
          Subject: Compiler Design 
          Room no : 401</h5>
<div className='d-flex justify-content-center align-items-center'>
  <button className='btn btn-primary align-items-center'><i className="fa-solid fa-filter" ></i>Apply Filters</button>
  <span className='mx-2'></span>
 
  <button className='btn btn-success my-4 ' onClick={downloadExcel}><i className="fa-solid fa-download "></i> Download Excel</button>
</div>

<table className="table" style={{ borderCollapse: 'collapse', width: '100%' }}>
        <thead>
          <tr style={{ backgroundColor: 'rgb(51, 51, 103)', color: 'white' }}>
            <th style={{ border: '1px solid white', padding: '10px' }}><h5>S.No.</h5></th>
            <th style={{ border: '1px solid white', padding: '10px' }}><h5>Name</h5></th>
            <th style={{ border: '1px solid white', padding: '10px' }}><h5>Enrollment no.</h5></th>
            <th style={{ border: '1px solid white', padding: '10px' }}>
              <br />
              <button className='btn btn-primary' onClick={() => handleAllAttendance('present')}> Present all</button>
              <h5 className='mt-2'>Present</h5>
            </th>
            <th style={{ border: '1px solid white', padding: '10px' }}>
              <button className='btn btn-primary' onClick={() => handleAllAttendance('absent')}>Absent all</button>
              <h5 className='mt-2'>Absent</h5>
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
        <br />
        <div className="text-center">
        <h4>Total students present: {presentcount}</h4>
        <h4>Total students absent: {absentcount}</h4>
        </div>
      </div>
    );
  };
  
  export default MarkAttendance;
