import React, { useState } from 'react';

const Filters = () => {
  const [filter, showFilter] = useState(true);
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');
  const [percentage, setPercentage] = useState('');

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
      <div className="row g-3">
        <div className="col-md-3">
          <label htmlFor="startDate" className="form-label">Enter Date</label>
          <input
            type="date"
            className="form-control"
            id="startDate"
            value={start}
            onChange={(e) => handleStartDateChange(e.target.value)}
          />
        </div>
        <div className="col-md-3">
          <label htmlFor="startDate" className="form-label">Start Date</label>
          <input
            type="date"
            className="form-control"
            id="startDate"
            value={start}
            onChange={(e) => handleStartDateChange(e.target.value)}
          />
        </div>
        <div className="col-md-3">
          <label htmlFor="endDate" className="form-label">End Date</label>
          <input
            type="date"
            className="form-control"
            id="endDate"
            value={end}
            onChange={(e) => handleEndDateChange(e.target.value)}
          />
        </div>
        <div className="col-md-3">
          <label htmlFor="percentage" className="form-label">Percentage</label>
          <select
            className="form-select"
            value={percentage}
            onChange={(e) => setPercentage(e.target.value)}
          >
            <option value="">Select by Percentage</option>
            <option value="below30">Below 30%</option>
            <option value="30-40">30-40%</option>
            <option value="50-60">50-60%</option>
            <option value="60-70">60-70%</option>
            <option value="70-80">70-80%</option>
          </select>
        </div>
      </div>
      <div>
        <center>
        <button className='btn btn-primary'>
            Apply
        </button>
        </center>
      </div>
    </div>
  );
};

export default Filters;
