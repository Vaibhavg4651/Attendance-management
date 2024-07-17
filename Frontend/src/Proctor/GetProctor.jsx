import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import branches from '../Branch.json';
import AddStudent from '../Students/AddStudent';
import { setBranchId } from "../reducers/userSlice";

const GetProctor = () => {
    const dispatch=useDispatch();
    const userid=useSelector((state)=>state.user.userid);
    const [details,setDetails]=useState();
    const [semester,setSemester]=useState(0);
    const [className,setClassName]=useState('');
    const [branchId,setBranchId]=useState(null);
    const handleGetProctor=async()=>{
        try {
            const response=await axios.get(`http://127.0.0.1:8000/api/user/getProctor/${userid}`);
            const data=response.data;
            setDetails(data);
            setSemester(data.SemesterNumber);
            setBranchId(data.BranchID);
            dispatch(
                setBranchId({
                  BranchID: data.BranchID,
                  SemesterNumber:data.SemesterNumber,
                })
              );
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
    <h2 className=" text-center mt-3 text-primary">Proctor Details: {className} Semester No- {semester}</h2>
        {branchId && <AddStudent branchId={branchId}/>}
</div>
  )
}

export default GetProctor;