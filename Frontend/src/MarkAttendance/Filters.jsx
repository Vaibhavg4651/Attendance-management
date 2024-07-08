import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import branchDataJson from '../Branch.json';

const Filters = () => {
  const [filter, showFilter] = useState(true);
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');
  const [percentage, setPercentage] = useState('');
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [studentData, setStudentData] = useState(null);
  const [branchData, setBranchData] = useState([]);
  const classes = ["CSE1", "CSE2", "CSE3", "CSE4", "IT1", "IT2", "IT3", "ECE1", "ECE2", "ECE3", "EE1", "EE2"];
  const year = [1, 2, 3, 4];

  useEffect(() => {
    setBranchData(branchDataJson);
  }, []);

  const requestdetails = {
    BranchID: 1,
    Class: "CSE1",
    year: parseInt(selectedYear)
  };

  const validateRequestDetails = (details) => {
    if (isNaN(details.BranchID) || !details.Class || isNaN(details.year)) {
      return false;
    }
    return true;
  };

  const filterchange = async () => {
    if (!validateRequestDetails(requestdetails)) {
      toast.error('Invalid filter criteria. Please check your inputs.');
      return;
    }

    try {
      console.log('Sending request', requestdetails);
      const response = await axios.get('http://127.0.0.1:8000/filters/proctor', {params: requestdetails });
      console.log('Filtered students response:', response.data);
      setStudentData(response.data);
    } catch (error) {
      console.log('Error in producing filtered students response', error);
      toast.error('Failed to apply filters');
    }
  };

  const handlePercentage = (percentage) => {
    setPercentage(percentage);
  };

  const handleStartDateChange = (date) => {
    setStart(date);
  };

  const handleEndDateChange = (date) => {
    setEnd(date);
  };

  const setFilter = () => {
    showFilter((prevVisible) => prevVisible);
  };

  const applyFilters = () => {
    setFilter(false);
  };

  return (
    <div className='container mt-4'>
      <h2 className='d-flex justify-content-center '>Apply Filters</h2>
      <div className="col-md-3">
        <label htmlFor="class" className="form-label">Class</label>
        <select
          className="form-select"
          id="class"
          value={selectedClass}
          onChange={(e) => setSelectedClass(e.target.value)}
        >
          <option value="">Select Class</option>
          {classes.map((cls, index) => (
            <option key={index} value={cls}>{cls}</option>
          ))}
        </select>
        <label htmlFor="year" className="form-label">Year</label>
        <select
          className="form-select"
          id="year"
          value={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value)}
        >
          <option value="">Select Year</option>
          {year.map((year, index) => (
            <option key={index} value={year}>{year}</option>
          ))}
        </select>
      </div>
      <div>
        <center>
          <button className='btn btn-primary' onClick={filterchange}>
            Apply
          </button>
        </center>
      </div>
    </div>
  );
};

export default Filters;
