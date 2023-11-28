import React, { useState } from 'react';
const Subjects = () => {
  const years=["1st","2nd","3rd","4th"]
  const semesters = ["1st", "2nd ", "3rd", "4th","5th","6th","7th","8th"];
  const depts = ["CSE", "IT", "ECE", "EEE"];
  const types = ["Lecture", "Lab", "Tutorial"];
  const sub=["Applied mathematics","Applied physics","Applied Chemistry","Engineering Graphics","Manufacturing Process","Indian Constitution","Human Values and Ethics"
,"Applied mathematics lab","Applied physics lab","Applied Chemistry lab","Engineering Graphics lab"];
const batch=["CSE-1","CSE-2","CSE-3","IT-1","IT-2","ECE-1","ECE-2","EEE"];
const room=["401","404","411","406","413"];

  const [selectedYear, setSelectedYear] = useState("");
  const [selectedSem, setSelectedSem] = useState("");
  const [selectedDept, setSelectedDept] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [selectedBatch,setSelectedBatch]=useState("");
  const [selectedRoom,setSelectedRoom]=useState("");

  const handleYearChange = (event) => {
   
    setSelectedYear(event.target.value);
    
    setSelectedDept("");
    setSelectedType("");
  };
  const handleSemChange = (event) => {
   
    setSelectedSem(event.target.value);
    
    setSelectedDept("");
    setSelectedType("");
  };

  const handleDeptChange = (event) => {
    setSelectedDept(event.target.value);
   
    setSelectedType("");
  };

  const handleTypeChange = (event) => {
    setSelectedType(event.target.value);
  };
 const handleBatchChange=(event)=>{
setSelectedBatch(event.target.value);
 };
 const handleRoomChange=(event)=>{
setSelectedRoom(event.target.value);
 };
  const showSubjects = () => {
    if (selectedYear&& selectedSem && selectedDept && selectedType === "Lecture" && selectedBatch && selectedRoom) {
      return [...sub.filter((subject) => !subject.includes("lab")),];
    }
   else if (selectedYear && selectedSem && selectedDept && selectedType === "Tutorial" && selectedBatch&& selectedRoom ) {
      return [...sub.filter((subject) => !subject.includes("lab")),];
    }
else if( selectedYear && selectedSem && selectedDept && selectedType === "Lab" && selectedBatch && selectedRoom){
    return [...sub.filter((subject) => subject.includes("lab")),];

}
    return [];
  };

  const subjectsArray = showSubjects();

  return (
    <div className='container mt-4'>
      <h2 className="mb-4">Subjects</h2>
      <div className="form-group">
        <label htmlFor="yearSelect"><h4>Select Year</h4></label>
        <select className="form-control" id="yearSelect" value={selectedYear} onChange={handleYearChange}>
          <option value="">Select Year</option>
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="yearSelect"><h4>Select Semester</h4></label>
        <select className="form-control" id="yearSelect" value={selectedSem} onChange={handleSemChange}>
          <option value="">Select Semester</option>
          {semesters.map((semester) => (
            <option key={semester} value={semester}>
              {semester}
            </option>
          ))}
        </select>
      </div>
      <div className='form-group'>
        <label htmlFor="deptSelect"><h4>Select Department</h4></label>
        <select className="form-control" id="deptSelect" value={selectedDept} onChange={handleDeptChange}>
          <option value="">Select Department</option>
          {depts.map((dept) => (
            <option key={dept} value={dept}>
              {dept}
            </option>
          ))}
        </select>
      </div>
      <div className='form-group'>
        <label htmlFor="typeSelect"><h4>Select Subject Type</h4></label>
        <select className='form-control' id="typeSelect" value={selectedType} onChange={handleTypeChange}>
          <option value="">Select Type</option>
          {types.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <label htmlFor='typeSelect'><h4>Select Class</h4></label>
        <select className='form-control' id='typeSelect' value={selectedBatch} onChange={handleBatchChange}>
          <option value="">Select Class</option>
          {batch.map((batch) => (
            <option key={batch} value={batch}>
              {batch}
              </option>
              ))}
        </select> 
      </div>
      <div className="form-group">
        <label htmlFor='typeSelect'><h4>Select Room no.</h4></label>
        <select className='form-control' id='typeSelect' value={selectedRoom} onChange={handleRoomChange}>
          <option value="">Select Room no.</option>
          {room.map((room) => (
            <option key={room} value={room}>
              {room}
              </option>
              ))}
        </select> 
      </div>
      {subjectsArray.length > 0 && (
        <div>
          <h3 className='mt-4'>Subjects for {selectedBatch} {selectedYear} year {selectedSem} semester- {selectedType}</h3>
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
