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
    const handleGetProctor= async()=>{
            await axios.get(`http://127.0.0.1:8000/api/user/getProctor/${userid}`)
            .then((response) => {
            setDetails(response.data);
            setSemester(response.data.SemesterNumber);
            setBranchId(response.data.BranchID);
            const branch=branches.find(branch=>branch.BranchID===response.data.BranchID);
            dispatch(setBranchId({ "BranchID": response.data.BranchID, "SemesterNumber": response.data.SemesterNumber }));
            if (branch) {
                setClassName(branch.ClassName);
            }
            })
         .catch ((error)=> {
            console.log("Error in getting proctor",error);
    });
}

    useEffect(() => {
            handleGetProctor();
    }, [userid]); 
  return (
    <div className="d-flex flex-column align-items-center justify-content-center min-vh-100 p-3 container ">
    <h2 className=" text-center mt-3 text-primary">Proctor Details: {className} Semester No- {semester}</h2>
        {/* {branchId && <AddStudent branchId={branchId}/>} */}
</div>
  )
}

export default GetProctor;