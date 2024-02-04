import React from 'react'
import { useState } from 'react';
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
    
  
    return (
      <div className="mt-4">
        <h4>Student Attendance List</h4>
          <h5>Batch: CSE-1 5th sem
          Subject: Compiler Design 
          Room no : 401</h5>
        <table className="table">
          <thead>
            <tr>
              <th><h4>S.No.</h4></th>
              <th><h4>Name</h4></th>
              <th><h4>Enrollment no.</h4></th>
              <th>
              
              <button className='btn btn-primary' onClick={() => handleAllAttendance('present')}> Present all</button>
              <br />
             <h4>Present{' '}</h4> 
            
            </th>
            <th>
              <button className='btn btn-primary' onClick={() => handleAllAttendance('absent')}>Absent all</button>
              <br />
              <h4>Absent{' '}</h4>
           
            </th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student['']}>
                <td>{student['']}</td>
                <td>{student['__1']}</td>
                <td>{student['__8']}</td>
                <td>
                  <input
                    type="radio"
                    name={`attendance-${student['']}`}
                    value="present"
                    onChange={() => handleAttendanceChange(student[''], 'present')}
                    checked={attendance[student['']] === 'present'}
                  />
                </td>
                <td>
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
