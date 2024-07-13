import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { ExcelRenderer } from "react-excel-renderer";
import branches from "../Branch.json";
import "react-toastify/dist/ReactToastify.css";

const AddStudent = () => {
  const [studentDetailsList, setStudentDetailsList] = useState([]);
  const [header, setHeader] = useState([]);
  const [cols, setCols] = useState([]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    ExcelRenderer(file, (err, response) => {
      if (err) {
        console.log("Error in display", err);
        toast.error("Failed to read Excel file");
      } else {
        const header = response.rows[0];
        const studentDetails = response.rows.slice(1).map((row) => {
          return {
            EnrollmentNumber: parseInt(row[0]),
            BranchID: parseInt(row[1]), // Map branch name to BranchID
            ClassSerialNumber: parseInt(row[2]),
            Group: row[3],
            StudentName: row[4],
            Batch: parseInt(row[5]),
            SemesterNumber: parseInt(row[6]),
            year: parseInt(row[7]),
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
