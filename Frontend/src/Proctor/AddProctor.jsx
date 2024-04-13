import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
// import Navbar from '../Navbar/Navbar';
import { toast,ToastContainer } from 'react-toastify';

const AddProctor = () => {
    const [id,setId]=useState();
    const [branchid,setBranchId]=useState();
    const [semester,setSemester]=useState(0);
    const navigate=useNavigate();
    const handleAddProctor=async(e)=>{
    const proctordetails={
      
            "id":id,
            "BranchID":branchid,
            "SemesterNumber":parseInt(semester)
    }
    
    console.log('Sending Add proctor request',proctordetails);
    const res= await axios
    .post(`http://127.0.0.1:8000/api/user/addProctor`,proctordetails)
    .then((response) => {
        console.log('Add Proctor successful. Response:', response.data);
        toast.success('Proctor added successfully')
        navigate('/id/subjects');
      })
      .catch((err) => {
        console.error('Add proctor failed. Error:', err);
      toast.error('Add Proctor unsuccessful');
      });
}
  return (
    <>   
    <ToastContainer/> 
    <div>
    <div className="Container2">
        <div className="row justify-content-center mb-4">
          <div className="col md-5">
            <div className="card2 mt-5 login-custom ">
              <div className="card-body">
      <input className='mt-4' type="text" placeholder='Enter your eid' onChange={(e)=>setId(e.target.value)} />
      <input className='mt-4' type="text" placeholder='Enter your branchId' onChange={(e)=>setBranchId(e.target.value)} />
      <input  className='mt-4'
      type="number"
      placeholder='Enter the semester number'
      onChange={(e) => setSemester(e.target.value)}
  />
      <button className='btn btn-primary' onClick={handleAddProctor}>submit</button>
    </div>
    </div>
    </div>
    </div>
    </div>
    </div>
    </>

  )
}

export default AddProctor
