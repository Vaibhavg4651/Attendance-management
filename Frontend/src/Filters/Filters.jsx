import axios from "axios";
import React, { useState, useMemo } from "react";
import Select from "react-select";
import { toast } from "react-toastify";
import * as XSLX from "xlsx";
import branchData from "../Branch.json";
import Subjects from "../subject.json";
import "react-toastify/dist/ReactToastify.css";
import { useSelector, useDispatch } from "react-redux";

const getYearFromSemester = (semester) => {
  if (semester === 1 || semester === 2) {
    return 1;
  } else if (semester === 3 || semester === 4) {
    return 2;
  } else if (semester === 5 || semester === 6) {
    return 3;
  } else if (semester === 7 || semester === 8) {
    return 4;
  } else {
    return 0; // Default case if semester is out of range
  }
};

const filterSubjects = (subject, year, branchName) => {
  console.log("Filtering subjects:", year, branchName);
  const sub = subject.filter(
    (subject) => subject.year === year && subject.BranchName === branchName
  );
  return sub.map((subject) => ({
    value: subject.SubjectID,
    label: `${subject.Subjectcode} (${subject.SubjectType})`,
  }));
};

const Filters = () => {
  const branchID = useSelector((state) => state.user.BranchId);
  const students = useSelector((state) => state.user.Students);
  const sem = useSelector((state) => state.user.SemesterNumber);
  const selectedBranch = branchData.find(
    (branch) => branch.BranchID === branchID
  );
  const branchName = selectedBranch.BranchName;
  const year = useMemo(() => getYearFromSemester(parseInt(sem)), [sem]);
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [LessThanPercentage, setLessThanPercentage] = useState(0);
  const [greaterThanPercentage, setgreaterThanPercentage] = useState(0);
  const [studentData, setStudentData] = useState([]);
  const [group, setGroup] = useState("");
  const [subjects, setSubjects] = useState([]);
  const [EnrollmentNumber, setEnrollmentNumber] = useState([]);
  const [subjectType, setSubjectType] = useState("");

  const filteredSubjects = useMemo(
    () => filterSubjects(Subjects, year, branchName),
    [Subjects, year, branchName]
  );

  const customStyles = {
    control: (provided) => ({
      ...provided,
      maxHeight: "60px", // Adjust the max height as needed
      overflowY: "auto", // Enable vertical scroll
    }),
  };

  const groupOptions = [
    { value: "", label: "Select Group" },
    { value: "A", label: "A" },
    { value: "B", label: "B" },
    { value: "C", label: "C" },
  ];

  const subjectTypeOptions = [
    { value: "", label: "Select Type" },
    { value: "Lecture", label: "Lecture" },
    { value: "Lab", label: "Lab" },
    { value: "Tutorial", label: "Tutorial" },
  ];

  const handleGroupChange = (selectedOptions) => {
    setGroup(selectedOptions.value);
  };

  const handleSubjectTypeChange = (selectedOptions) => {
    setSubjectType(selectedOptions.value);
  };

  const validateRequestDetails = (details) => {
    if (isNaN(details.BranchID) || !details.Class || isNaN(details.year)) {
      return false;
    }
    return true;
  };

  const handleStudentChange = (selectedOptions) => {
    const values = selectedOptions.map((option) => option.value);
    setEnrollmentNumber(values);
  };

  const handleSubjectChange = (selectedOptions) => {
    const values = selectedOptions.map((option) => option.value);
    setSubjects(values);
  };

  const filterchange = async () => {
    const requestdetails = {
      BranchID: branchID,
      Class: selectedBranch.ClassName,
      year: parseInt(year),
    };

    if (!validateRequestDetails(requestdetails)) {
      toast.error("Invalid filter criteria. Please check your inputs.");
      return;
    }

    try {
      console.log("Sending request", requestdetails);
      const response = await axios.post(
        "http://127.0.0.1:8000/filters/allfilter",
        requestdetails
      );
      console.log("Filtered students response:", response.data);
      setStudentData(response.data);
      // setSubjectCode(studentData[0].Subjects[0].Subjectcode);
    } catch (error) {
      console.log("Error in producing filtered students response", error);
      toast.error("Failed to apply filters");
    }
  };

  const exportToExcel = () => {
    const worksheet = XSLX.utils.json_to_sheet(studentData);
    const workbook = XSLX.utils.book_new();
    XSLX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    XSLX.writeFile(workbook, `FilteredStudents.xlsx`);
  };

  const proctorFilter = async () => {
    let temp = [];
    let uniqueArray = [];
    if(subjectType !== ""){
      temp = filteredSubjects.map((sub) => {
        if (sub.label.includes(subjectType)) {
          return sub.value;
        }
        return null;
      })
      .filter((sub) => sub !== null);
      const concatenatedArray = subjects.length===0 ?temp: [...temp, ...subjects];
      const uniqueSet = new Set(concatenatedArray);
      uniqueArray = [...uniqueSet];
    }
    const proctorRequestDetails = {
      BranchID: branchID,
      Class: selectedBranch.ClassName,
      year: parseInt(year),
      filter: {
        from_date: start, // optional
        to_date: end, // mandatory
        EnrollmentNumber: EnrollmentNumber, // optional
        subjects: uniqueArray.length===0 ? subjects : uniqueArray, // optional
        group: group, // optional
        lessThanPercentage: parseInt(LessThanPercentage), // optional
        greaterThanPercentage: parseInt(greaterThanPercentage), // optional
      },
    };

    try {
      console.log("Sending request", proctorRequestDetails);
      if (!validateRequestDetails(proctorRequestDetails)) {
        toast.error("Invalid filter criteria. Please check your inputs.");
        return;
      }
      const response = await axios.post(
        "http://127.0.0.1:8000/filters/proctorFilter",
        proctorRequestDetails
      );
      console.log("Filtered proctor students response:", response.data);
      if (response.data.length === 0) {
        alert("No data found for the given filters");
      }
      setStudentData(response.data);
    } catch (error) {
      console.log(
        "Error in producing filtered proctor students response",
        error
      );
      toast.error("Failed to apply proctor filters");
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="d-flex justify-content-center">Apply Filters</h2>
      <div className="row">
        {/* <div className="col-md-2">
          <label htmlFor="class" className="form-label">Class</label>
          <select
            className="form-select"
            id="class"
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
          >
            <option value="">Select Class</option>
            {classes.map((cls, index) => (
              <option key={index} value={cls}>{cls}</option>
            ))}
          </select>
        </div> */}
        {/* <div className="col-md-2">
          <label htmlFor="year" className="form-label">Year</label>
          <select
            className="form-select"
            id="year"
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
          >
            <option value="">Select Year</option>
            {year.map((yr, index) => (
              <option key={index} value={yr}>{yr}</option>
            ))}
          </select>
        </div> */}
        <div className="col-md-2 ">
          <label htmlFor="enrollment" className="form-label">
            Select Students
          </label>
          <Select
            value={students.filter((option) =>
              EnrollmentNumber.includes(option.value)
            )}
            options={students}
            styles={customStyles}
            onChange={handleStudentChange}
            isMulti
          />
        </div>
        <div className="col-md-2">
          <label htmlFor="group" className="form-label">
            Group
          </label>
          <Select
            value={groupOptions.filter((option) => option.value === group)}
            options={groupOptions}
            onChange={handleGroupChange}
          />
        </div>
        <div className="col-md-2 ">
          <label htmlFor="enrollment" className="form-label">
            Select Subjects
          </label>
          <Select
            value={filteredSubjects.filter((option) =>
              subjects.includes(option.value)
            )}
            options={filteredSubjects}
            styles={customStyles}
            onChange={handleSubjectChange}
            isMulti
          />
        </div>
        <div className="col-md-2">
          <label htmlFor="group" className="form-label">
            Subject Type
          </label>
          <Select
            value={subjectTypeOptions.filter((option) => option.value === subjectType)}
            options={subjectTypeOptions}
            onChange={handleSubjectTypeChange}
          />
        </div>
        <div className="col-md-2">
          <label htmlFor="start" className="form-label">
            Start Date
          </label>
          <input
            type="date"
            className="form-control"
            id="start"
            value={start}
            onChange={(e) => setStart(e.target.value)}
            max={new Date().toISOString().split("T")[0]}
          />
        </div>
        <div className="col-md-2">
          <label htmlFor="end" className="form-label">
            End Date
          </label>
          <input
            type="date"
            className="form-control"
            id="end"
            value={end}
            onChange={(e) => setEnd(e.target.value)}
            max={new Date().toISOString().split("T")[0]}
          />
        </div>
        <div className="col-md-2 mt-5">
          <label htmlFor="percentage" className="form-label">
            Greater than Percentage
          </label>
          <input
            type="number"
            className="form-control"
            id="percentage"
            value={greaterThanPercentage}
            onChange={(e) => setgreaterThanPercentage(e.target.value)}
          />
        </div>
        <div className="col-md-2 mt-5">
          <label htmlFor="percentage" className="form-label">
            Less than Percentage
          </label>
          <input
            type="number"
            className="form-control"
            id="percentage"
            value={LessThanPercentage}
            onChange={(e) => setLessThanPercentage(e.target.value)}
          />
        </div>
      </div>
      <div className="mt-4 d-flex justify-content-center">
        <button className="btn btn-primary me-2" onClick={filterchange}>
          Get All Students
        </button>
        <button className="btn btn-secondary" onClick={proctorFilter}>
          Apply Filter
        </button>
      </div>
      {studentData.length > 0 ? (
        <div className="container mt-4">
          <h2>
            Filtered Students of {selectedBranch.ClassName} {year} year
          </h2>

          <table className="table">
            <thead>
              <tr
                style={{ backgroundColor: "rgb(51, 51, 103)", color: "white" }}
              >
                <th
                  rowSpan="3"
                  style={{ border: "1px solid white", padding: "6px" }}
                >
                  <h6>S.No.</h6>
                </th>
                <th
                  rowSpan="3"
                  style={{ border: "1px solid white", padding: "6px" }}
                >
                  <h6>Name</h6>
                </th>
                <th
                  rowSpan="3"
                  style={{ border: "1px solid white", padding: "6px" }}
                >
                  <h6>Enrollment no.</h6>
                </th>
                <th
                  rowSpan="3"
                  style={{ border: "1px solid white", padding: "6px" }}
                >
                  <h6>Group</h6>
                </th>
                {studentData[0].Subjects.map((sub, index) => (
                  <th
                    key={index}
                    colSpan="2"
                    style={{ border: "1px solid white", padding: "6px" }}
                  >
                    {sub.Subjectcode}({sub.SubjectType})<h6></h6>
                  </th>
                ))}
                <th
                  rowSpan="2"
                  style={{ border: "1px solid white", padding: "6px" }}
                >
                  <h6>Total Lectures Held</h6>
                </th>
                <th
                  rowSpan="2"
                  style={{ border: "1px solid white", padding: "6px" }}
                >
                  <h6>Total Lectures Attended</h6>
                </th>
                <th
                  rowSpan="2"
                  style={{ border: "1px solid white", padding: "6px" }}
                >
                  <h6>Total Percentage</h6>
                </th>
              </tr>
              <tr
                style={{ backgroundColor: "rgb(51, 51, 103)", color: "white" }}
              >
                {studentData[0].Subjects.map((sub, index) => (
                  <React.Fragment key={index}>
                    <th style={{ border: "1px solid white", padding: "6px" }}>
                      LH
                    </th>
                    <th style={{ border: "1px solid white", padding: "6px" }}>
                      LA
                    </th>
                  </React.Fragment>
                ))}
              </tr>
            </thead>
            <tbody>
              {studentData.map((student, index) => (
                <tr key={index}>
                  <td style={{ border: "1px solid black", padding: "6px" }}>
                    {student.ClassSerialNumber}
                  </td>
                  <td style={{ border: "1px solid black", padding: "6px" }}>
                    {student.StudentName}
                  </td>
                  <td style={{ border: "1px solid black", padding: "6px" }}>
                    {student.EnrollmentNumber}
                  </td>
                  <td style={{ border: "1px solid black", padding: "6px" }}>
                    {student.Group}
                  </td>

                  {student.Subjects.map((sub, subIndex) => (
                    <React.Fragment key={subIndex}>
                      <td style={{ border: "1px solid black", padding: "6px" }}>
                        {sub.attend.total_lectures}
                      </td>
                      <td style={{ border: "1px solid black", padding: "6px" }}>
                        {sub.attend.attended_lectures}
                      </td>
                    </React.Fragment>
                  ))}

                  <td style={{ border: "1px solid black", padding: "6px" }}>
                    {student.totalHeld}
                  </td>
                  <td style={{ border: "1px solid black", padding: "6px" }}>
                    {student.totalAttended}
                  </td>
                  <td style={{ border: "1px solid black", padding: "6px" }}>
                    {student.totalPercentage}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <center>
            <div className="flex">
              <button
                className=" text-center align-items-center btn btn-success"
                onClick={exportToExcel}
              >
                Download Excel
              </button>
            </div>
          </center>
        </div>
      ) : (
        <div className="container mt-4">
          <h2>No students to display</h2>
        </div>
      )}
    </div>
  );
};

export default Filters;
