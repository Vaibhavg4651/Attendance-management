import axios from 'axios';
import React, { useState } from 'react'
// import { toast } from 'react-toastify';
import Navbar from '../Navbar/Navbar';
import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

const AddFaculty = () => {
    const [Id,setid]=useState();
    const [subjectId,SetSubjectId]=useState(0);
    const [semesterNumber,SetSemesterNumber]=useState(0);
    const [Class,SetClass]=useState();
    const [Year,SetYear]=useState(0);
    const [Room,SetRoom]=useState();
  const handleAddFaculty=async(e)=>{

    const facultydetails={
      "id": Id,
      "SubjectID": parseInt(subjectId),
      "SemesterNumber": parseInt(semesterNumber),
      "Class": Class,
      "year": parseInt(Year),
      "room":Room
    }
    console.log('Sending add faculty request',facultydetails);
    const res= await axios.post('http://127.0.0.1:8000/api/user/addFaculty',facultydetails)
    .then((response)=>{
      console.log('Add Faculty successful. Response:', response.data);
      toast.success('Faculty added successfully')
      // navigate('/:id/subjects');
    })
    .catch((err) => {
      console.error('Add faculty failed. Error:', err);
    toast.error('Add unsuccessful');
    });
    console.log('Get Faculty request');
    // const getf=await  axios.get('http://127.0.0.1:8000/api/user/getFacultyDetails/:id',facultydetails.id)
    // .then((response)=>{
    //   console.log('Get Faculty Successful.Response:',response.data);
    // }).catch((err) => {
    //   console.error('Get faculty failed. Error:', err);
    // toast.error('Add unsuccessful');
    // });

  }
  return (
   <>
      {/* <Navbar/> */}
      <ToastContainer/>
      <div>
    <div className="Container2">
        <div className="row justify-content-center mb-4">
          <div className="col md-5">
            <div className="card2 mt-5 login-custom ">
              <div className="card-body">
      <input className='mt-4' type="text" placeholder='Enter your id' onChange={(e)=>setid(e.target.value)} />
      <input className='mt-4' type="number" placeholder='Enter your Subject Id' onChange={(e)=>SetSubjectId(e.target.value)} />
      <input className='mt-4' type="number" placeholder='Enter your Semester' onChange={(e)=>SetSemesterNumber(e.target.value)} />
      <input className='mt-4' type="text" placeholder='Enter your Class' onChange={(e)=>SetClass(e.target.value)} />
      <input className='mt-4' type="number" placeholder='Enter your Year' onChange={(e)=>SetYear(e.target.value)} />
      <input className='mt-4' type="number" placeholder='Enter your Room' onChange={(e)=>SetRoom(e.target.value)} />
      <button className='btn btn-primary' onClick={handleAddFaculty}>submit</button>
    </div>
    </div>
    </div>
    </div>
    </div>
    </div>
      </>
    
  )
}

export default AddFaculty
