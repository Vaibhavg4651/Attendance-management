import React, { useEffect, useState } from 'react';
import Navbar from '../Navbar/Navbar';
import AddStudent from '../Students/AddStudent';
import Filters from '../Filters/Filters';
import GetProctor from './GetProctor';
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { OutTable, ExcelRenderer } from "react-excel-renderer";
// import xlsx  from 'json-as-xlsx';
// import { useNavigate } from 'react-router-dom';
// import Filters from '../MarkAttendance/Filters';
import AddProctor from "./AddProctor";
import { setBranchId } from "../reducers/userSlice";
import { useSelector, useDispatch } from "react-redux";

const Proctor = () => {
  const id = useSelector((state) => {
    return state.user.userid;
  });
  const dispatch = useDispatch();
  const [firstTime, setFirstTime] = useState(false);

  const getProctor = () => {
    axios
      .get(`http://127.0.0.1:8000/api/user/getProctor/${id}`)
      .then((response) => {
        console.log("Get Proctor successful. Response:", response.data);
        if (response.status === 404) {
          setFirstTime(true);
        } else if (response.status === 200) {
          setFirstTime(false);
          dispatch(
            setBranchId({
              BranchID: response.data.BranchID,
              SemesterNumber: response.data.SemesterNumber,
            })
          );
        }
      })
      .catch((error) => {
        console.error("There was an error fetching the proctor data!", error);
        setFirstTime(true); // Handle the error by setting firstTime to true
      });
  };

  useEffect(() => {
    getProctor();
  }, [id]);

  return (
    <>
      <Navbar/>
   
      <GetProctor/>
    {/* < AddStudent/> */}
    <Filters/>
    <br />
    <br />
    <br />
    </>
  );
};

export default Proctor;
