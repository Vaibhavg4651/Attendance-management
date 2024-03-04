import React, { useState } from 'react';
import axios from 'axios';
const Subjects = async() => {
  
  const [branchName, setBranchName] = useState("");
  const [subjectName, setSubjectName] = useState("");
  const [subjectCode, setSubjectCode] = useState("");
  const [subjectType,setSubjectType]=useState("");
  const [Year, setYear] = useState("");
  

  const AddSubject = {
    BranchName: branchName,
    SubjectName: subjectName,
    Subjectcode: subjectCode,
    SubjectType:subjectType,
    year:Year
  };

  console.log('Add Subject request:', AddSubject);

  const res = await axios
  .post(`http://127.0.0.1:8000/api/user/addSubjects`, AddSubject)
  .then((response) => {
    console.log('Add Subject successful. Response:', response.data);
   
  })
  .catch((err) => {
    console.error('Registration failed. Error:', err);
  });
  const showSubjects = () => {
    if (branchName && Year&& subjectType === "Lecture" && subjectName && subjectCode) {
      return [...sub.filter((subject) => !subject.includes("lab")),];
    }
   else if (branchName && Year && subjectName && subjectCode && subjectType === "Tutorial" ) {
      return [...sub.filter((subject) => !subject.includes("lab")),];
    }
else if(branchName && Year && subjectName && subjectCode && subjectType === "Lab" ){
    return [...sub.filter((subject) => subject.includes("lab")),];

}
    return [];
  };
   const handleYearChange = (event) => {
    setYear(event.target.value);
  };

  const handleSubjectName = (event) => {
    setSubjectName(event.target.value);
  };

  const handleBranchChange = (event) => {
    setBranchName(event.target.value);
  };

  const handleSubjectTypeChange = (event) => {
    setSubjectType(event.target.value);
  };

  const handleSubjectCodeChange = (event) => {
    setSubjectCode(event.target.value);
  };

 

  const subjectsArray = showSubjects();

  return (
    <div className='container mt-4'>
      <h2 className="mb-4">Subjects</h2>
      <div className="form-group">
        <label htmlFor="yearSelect"><h4>Select Year</h4></label>
        <select className="form-control" id="yearSelect" value={Year} onChange={handleYearChange}>
          <option value="">Select Year</option>
          {Year.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="yearSelect"><h4>Subject Name</h4></label>
        <select className="form-control" id="yearSelect" value={subjectName} onChange={handleSubjectName}>
          <option value="">Select Subject</option>
          {subjectName.map((subject) => (
            <option key={subject} value={subject}>
              {subject}
            </option>
          ))}
        </select>
      </div>
      <div className='form-group'>
        <label htmlFor="deptSelect"><h4>Branch Name</h4></label>
        <select className="form-control" id="deptSelect" value={branchName} onChange={handleBranchChange}>
          <option value="">Select Branch</option>
          {depts.map((dept) => (
            <option key={dept} value={dept}>
              {dept}
            </option>
          ))}
        </select>
      </div>
      <div className='form-group'>
        <label htmlFor="typeSelect"><h4>Select Subject Type</h4></label>
        <select className='form-control' id="typeSelect" value={subjectType} onChange={handleSubjectTypeChange}>
          <option value="">Select Type</option>
          {subjectType.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <label htmlFor='typeSelect'><h4>Subject Code</h4></label>
        <select className='form-control' id='typeSelect' value={subjectCode} onChange={handleSubjectCodeChange}>
          <option value="">Select Code</option>
          {subjectCode.map((code) => (
            <option key={code} value={code}>
              {code}
              </option>
              ))}
        </select> 
      </div>
      {subjectsArray.length > 0 && (
        <div>
          <h3 className='mt-4'>Subjects for {branchName} {Year} year {subjectType}</h3>
          {subjectsArray.map((subject, index) => (
            <div key={index} className="card mt-2">
              <div className="card-body">
                <h4 className="card-text">{subject} 
               
                </h4>
              </div>
            </div>
          ))}
         
   
        </div>
      )}
    </div>
  );
};

export default Subjects;
