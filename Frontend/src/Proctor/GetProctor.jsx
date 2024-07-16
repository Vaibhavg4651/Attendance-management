import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import branches from '../Branch.json';
const GetProctor = () => {
    const userid=useSelector((state)=>state.user.userid);
    const [details,setDetails]=useState();
    const [semester,setSemester]=useState(0);
    const [className,setClassName]=useState('');
    const handleGetProctor=async()=>{
        try {
            const response=await axios.get(`http://127.0.0.1:8000/api/user/getProctor/${userid}`);
            const data=response.data;
            setDetails(data);
            setSemester(data.SemesterNumber);
            const branch=branches.find(branch=>branch.BranchID===data.BranchID);
            if (branch) {
                setClassName(branch.ClassName);
            }
            console.log(data);
        } catch (error) {
            console.log("Error in getting proctor",error);
        }
    }
    useEffect(() => {
        if (userid) {
            handleGetProctor();
        }
    }, [userid]); 
  return (
    <div className="container">
    <h2 className=" text-center mt-3">Proctor Details: {className} Semester No- {semester}</h2>
   
</div>
  )
}

export default GetProctor;