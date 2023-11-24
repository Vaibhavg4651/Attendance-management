import React, { useState } from 'react';

const Subjects = () => {
  const semesters = ["1st", "2nd ", "3rd", "4th","5th","6th","7th","8th"];
  const depts = ["CSE", "IT", "ECE", "EEE"];
  const types = ["Lecture", "Lab", "Tutorial"];
  const sub=["Applied mathematics","Applied physics","Applied Chemistry","Engineering Graphics","Manufacturing Process","Indian Constitution","Human Values and Ethics"
,"Applied mathematics lab","Applied physics lab","Applied Chemistry lab","Engineering Graphics lab"];

  const [selectedSem, setSelectedSem] = useState("");
  const [selectedDept, setSelectedDept] = useState("");
  const [selectedType, setSelectedType] = useState("");

  const handleYearChange = (event) => {
    setSelectedSem(event.target.value);
    // Reset selected department and type when year changes
    setSelectedDept("");
    setSelectedType("");
  };

  const handleDeptChange = (event) => {
    setSelectedDept(event.target.value);
    // Reset selected type when department changes
    setSelectedType("");
  };

  const handleTypeChange = (event) => {
    setSelectedType(event.target.value);
  };

  const showSubjects = () => {
    if (selectedSem && selectedDept && selectedType === "Lecture") {
      return sub.filter((subject) => !subject.includes("lab"));
    }
   else if (selectedSem && selectedDept && selectedType === "Tutorial") {
      return sub.filter((subject) => !subject.includes("lab"));
    }
else if(selectedSem && selectedDept && selectedType === "Lab"){
    return sub.filter((subject) => subject.includes("lab"));

}
    return [];
  };

  const subjectsArray = showSubjects();

  return (
    <div>
      <h2>Subjects</h2>
      <div>
        <label htmlFor="yearSelect">Select Semester:</label>
        <select id="yearSelect" value={selectedSem} onChange={handleYearChange}>
          <option value="">Select Semester</option>
          {semesters.map((semester) => (
            <option key={semester} value={semester}>
              {semester}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="deptSelect">Select Department:</label>
        <select id="deptSelect" value={selectedDept} onChange={handleDeptChange}>
          <option value="">Select Department</option>
          {depts.map((dept) => (
            <option key={dept} value={dept}>
              {dept}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="typeSelect">Select Subject Type:</label>
        <select id="typeSelect" value={selectedType} onChange={handleTypeChange}>
          <option value="">Select Type</option>
          {types.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>
      {subjectsArray.length > 0 && (
        <div>
          <h3>Subjects for {selectedDept} - {selectedSem} - {selectedType}</h3>
          {subjectsArray.map((subject, index) => (
            <div key={index} className="subject-card">
              <p>{subject}</p>
              {/* Add more properties as needed */}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Subjects;
