import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { ExcelRenderer } from "react-excel-renderer";
import branches from "../Branch.json";
import { useSelector, useDispatch } from "react-redux";
import "react-toastify/dist/ReactToastify.css";

const AddStudent = () => {
  const branchId = useSelector((state) => state.user.BranchId);
  const branch=branches.find(branch=>branch.BranchID===branchId);
  const className=branch.ClassName;
  const [studentDetailsList, setStudentDetailsList] = useState([]);
  const [year, setYear] = useState(0);

  if(sem === 1 || sem === 2){
    setYear(1);
  }
  else if(sem === 3 || sem === 4){
    setYear(2);
  }
  else if(sem === 5 || sem === 6){
    setYear(3);
  }
  else if(sem === 7 || sem === 8){
    setYear(4);
  }

  const [header, setHeader] = useState([]);
  const [cols, setCols] = useState([]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    ExcelRenderer(file, (err, response) => {
      if (err) {
        console.log("Error in display", err);
        toast.error("Failed to read Excel file");
      } else {
        console.log(response);
        const header = response.rows[0];
        const studentDetails = response.rows.slice(1).map((row) => {
          return {
            EnrollmentNumber: parseInt(row[0]),
            BranchID: branchId, // Map branch name to BranchID // Map branch name to BranchID
            ClassSerialNumber: parseInt(row[1]),
            Group: row[2],
            StudentName: row[3],
            Batch: parseInt(row[4]),
            SemesterNumber: parseInt(row[5]),
            year: parseInt(row[6]),
          };
        });
        setHeader(header);
        setCols(response.rows);
        addStudentsBulk(studentDetails);
      }
    });
  };

  const addStudentsBulk = async (studentDetails) => {
    try {
      console.log("Sending Add Students Bulk request", studentDetails);
      const response = await axios.post(
        "http://127.0.0.1:8000/api/user/addStudents",
        studentDetails
      );
      setStudentDetailsList([...studentDetailsList, ...response.data]);
      console.log("Students added successfully", response.data);
      toast.success("Students added successfully");
    } catch (error) {
      console.log("Error adding students:", error);
      toast.error("Failed to add students");
    }
  };

  const getStudentDetails = {
    Class: className,
    year: parseInt(year),
  };

  const getStudents = async () => {
    try {
      const response = await axios.get("http://http://127.0.0.1:8000/api/user/getStudents",{ params: getStudentDetails });
      setStudentDetailsList(response.data);
      console.log("Students fetched successfully", response.data);
    }
    catch (error) {
      console.log("Error fetching students:", error);
    }
  }

  useEffect(() => {
    getStudents();
  }
    , []);
  

  return (
    <div className="container">
      <h2 className="container mt-4">Add Students</h2>
      <input type="file" onChange={handleFileChange} />
      <ToastContainer />
      {studentDetailsList.length > 0 && (
        <div className="mt-4">
          <h3>Added Students</h3>
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>Class Serial Number</th>
                <th>Student Name</th>
                <th>Enrollment Number</th>
                <th>Group</th>
                <th>Batch</th>
                <th>Semester Number</th>
                
              </tr>
            </thead>
            <tbody>
              {studentDetailsList.map((student, index) => (
                <tr key={index}>
                  <td>{student.ClassSerialNumber}</td>
                  <td>{student.StudentName}</td>
                  <td>{student.EnrollmentNumber}</td>
                  <td>{student.Group}</td>
                  <td>{student.Batch}</td>
                  <td>{student.SemesterNumber}</td>
                  
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AddStudent;
