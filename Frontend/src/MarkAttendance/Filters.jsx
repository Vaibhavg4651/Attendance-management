import React, { useState } from 'react'

const Filters = () => {
    const [filter,showfilter]=useState(true);
    const [start,setstart]=useState('');
    const [end,setend]=useState('');
    const [Percentage,setPercentage]=useState('');
    const handlepercentage=(percentage)=>{
        setPercentage(percentage);
      }
      const handleStartDateChange = (date) => {
        setstart(date);
      };
    
      const handleEndDateChange = (date) => {
        setend(date);
      };
    
    const setfilter=()=>{
      showfilter((prevVisible) => !prevVisible);
    }
    const applyFilters=()=>{
      setfilter(false);
    }

  return (
    <div>
       {filter && (
        <div className="filter-modal" >
        
          <label>Date:</label>
          <input type="date" placeholder="Enter date" onChange={(e) => handleStartDateChange(e.target.value)} />
          <div>
            <h4 className='text-center'>OR</h4>
            <label>Start Date:</label>
            <input type="date" onChange={(e) => handleStartDateChange(e.target.value)} />
          </div>
          <div>
            <label>End Date:</label>
            <input type="date" onChange={(e) => handleEndDateChange(e.target.value)} />
          </div>
            <h4 className='text-center'>OR</h4>
          <div>
          <button className="btn btn-primary mx-2" onClick={handlepercentage}>
            Sort by Percentage
           </button>
          </div>
                   <button className="btn btn-primary" onClick={applyFilters}>
            Apply
          </button>
        </div>
      )}
   
    </div>
  )
}

export default Filters
