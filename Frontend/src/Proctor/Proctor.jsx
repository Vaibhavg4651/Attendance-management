import React, { useEffect, useState } from 'react';
import Navbar from '../Navbar/Navbar';
import AddStudent from '../Students/AddStudent';
import Filters from '../Filters/Filters';
import axios from "axios";
import { setBranchId } from "../reducers/userSlice";
import branches from '../Branch.json';

// import xlsx  from 'json-as-xlsx';
// import { useNavigate } from 'react-router-dom';
// import Filters from '../MarkAttendance/Filters';
import { useSelector, useDispatch } from "react-redux";
import AddProctor from './AddProctor';

const Proctor = () => {
  const branchID = useSelector((state) => state.user.BranchId);
  const sem = useSelector((state) => state.user.SemesterNumber);
  const [firstTime, setFirstTime] = useState(null);

  const branch=branches.find(branch=>branch.BranchID===branchID);
  const className=branch.ClassName;
  const id = useSelector((state) => state.user.userid);
  const dispatch = useDispatch();

  const getProctor = () => {
    axios.get(`http://127.0.0.1:8000/api/user/getProctor/${id}`)
      .then((response) => {
        console.log("Get Proctor successful. Response:", response.data);
        if (response.status === 404) {
          setFirstTime(false);
        } else if (response.status === 200) {
          setFirstTime(true);
          dispatch(setBranchId({ "BranchID": response.data.BranchID, "SemesterNumber": response.data.SemesterNumber }));
        }
      })
      .catch((error) => {
        console.error("There was an error fetching the proctor data!", error);
        setFirstTime(true); // Handle the error by setting firstTime to true
      });
  }

  useEffect(() => {
    getProctor();
  }, [id]); // Fetch the proctor data when the component mounts or the id changes


  return (
    <>
      <Navbar />
      <div style={{ marginBottom: '5rem' }}>
        {firstTime === null ? (
          <p>Loading...</p>
        ) : firstTime ? (
          <div className="container">
    <h2 className=" text-center mt-3 text-primary">Proctor Details: {className} Semester No- {sem}</h2>
        <AddStudent />
</div>
        ) : (
        <AddProctor />
        )}
      </div>
    <Filters/>
    <br />
    <br />
    <br />
    </>
  );
};

export default Proctor;
