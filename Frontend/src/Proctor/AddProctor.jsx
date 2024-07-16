import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// import Navbar from '../Navbar/Navbar';
import { toast,ToastContainer } from 'react-toastify';
import GetProctor from './GetProctor';
import { toast, ToastContainer } from "react-toastify";
import AddStudent from "./AddStudent";
import { useSelector, useDispatch } from 'react-redux';



const AddProctor = () => {
  const id = useSelector((state)=>{return state.user.userid})
  const [branchid, setBranchId] = useState();
  const [semester, setSemester] = useState(0);
  const navigate = useNavigate();
  const handleAddProctor = async (e) => {
    const proctordetails = {
      id: id,
      BranchID: branchid,
      SemesterNumber: parseInt(semester),
    };

    console.log("Sending Add proctor request", proctordetails);
    const res = await axios
      .post(`http://127.0.0.1:8000/api/user/addProctor`, proctordetails)
      .then((response) => {
        console.log("Add Proctor successful. Response:", response.data);
        toast.success("Proctor added successfully");
        navigate("/id/subjects");
      })
      .catch((err) => {
        console.error("Add proctor failed. Error:", err);
        toast.error("Add Proctor unsuccessful");
      });
  };
  return (
    <>
      <ToastContainer />
      <div>
        <div className="Container2">
          <div className="row justify-content-center mb-4">
            <div className="col md-5">
              <div className="card2 mt-5 login-custom" style={{height:"18rem"}}>
                <div className="card-body">
                  <strong
                    style={{ color: "#035b96" }}
                    className="d-flex justify-content-center align-items-center text-center"
                  >
                    Enter your details
                  </strong>{" "}
                  <input
                    className="mt-4"
                    type="text"
                    placeholder="Enter your Class"
                    onChange={(e) => setBranchId(e.target.value)}
                  />
                  <input
                    className="mt-4"
                    type="number"
                    placeholder="Enter the semester number"
                    onChange={(e) => setSemester(e.target.value)}
                  />
                  <center>
                    <button
                      className="btn btn-primary d-flex align-items-center"
                      onClick={handleAddProctor}
                    >
                      submit
                    </button>
                  </center>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddProctor;
