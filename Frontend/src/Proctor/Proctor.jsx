import React, { useState } from 'react';

const Proctor = () => {
  const initialStudentDetails = {
    name: '',
    enrollmentNo: '',
    classNo: ''
  };

  const [studentDetailsList, setStudentDetailsList] = useState([]);
  const [currentStudentDetails, setCurrentStudentDetails] = useState(initialStudentDetails);
  const [enrollmentError, setEnrollmentError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Validate enrollment number to be exactly 11 digits
    if (name === 'enrollmentNo') {
      if (value.length === 11 && /^\d*$/.test(value)) {
        setEnrollmentError('');
      } else {
        setEnrollmentError('Enrollment number must be exactly 11 digits.');
      }
    }

    setCurrentStudentDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value
    }));
  };

  const handleAddButtonClick = () => {
    if (enrollmentError === '') {
      setStudentDetailsList((prevList) => [...prevList, currentStudentDetails]);
      setCurrentStudentDetails(initialStudentDetails);
    }
  };

  const handleNewButtonClick = () => {
    setCurrentStudentDetails(initialStudentDetails);
    setEnrollmentError('');
  };

  return (
    <div className='container mt-4'>
      <h2>Add Student Details</h2>
      <div className="row g-3">
        <div className="col-md-4">
          <label htmlFor="name" className="form-label">Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={currentStudentDetails.name}
            onChange={handleInputChange}
          />
        </div>
        <div className="col-md-4">
          <label htmlFor="enrollmentNo" className="form-label">Enrollment No.</label>
          <input
            type="text"
            className="form-control"
            id="enrollmentNo"
            name="enrollmentNo"
            value={currentStudentDetails.enrollmentNo}
            onChange={handleInputChange}
          />
          {enrollmentError && <div className="text-danger">{enrollmentError}</div>}
        </div>
        <div className="col-md-4">
          <label htmlFor="classNo" className="form-label">Class S.No.</label>
          <input
            type="text"
            className="form-control"
            id="classNo"
            name="classNo"
            value={currentStudentDetails.classNo}
            onChange={handleInputChange}
          />
        </div>
        <div className="col-md-4">
          <button className='btn btn-primary mt-3' onClick={handleAddButtonClick}>
            Add
          </button>
        </div>
      </div>

      {studentDetailsList.length > 0 && (
        <div className="mt-4">
          <h3>Entered Student Details:</h3>
          <table className="table">
            <thead>
              <tr>
                <th>Enrollment No.</th>
                <th>Name</th>
                <th>Class S.No.</th>
              </tr>
            </thead>
            <tbody>
              {studentDetailsList.map((student, index) => (
                <tr key={index}>
                  <td>{student.enrollmentNo}</td>
                  <td>{student.name}</td>
                  <td>{student.classNo}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <button className='btn btn-primary mt-3' onClick={handleNewButtonClick}>
            Add New Student
          </button>
        </div>
      )}
    </div>
  );
}

export default Proctor;
