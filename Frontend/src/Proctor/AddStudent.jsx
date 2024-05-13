import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { ExcelRenderer } from "react-excel-renderer";

const AddStudent = () => {
    const [studentDetailsList, setStudentDetailsList] = useState([]);
    const [header, setHeader] = useState([]);
    const [cols, setCols] = useState([]);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        ExcelRenderer(file, (err, response) => {
            if (err) {
                console.log("Error in display", err);
                toast.error('Failed to read Excel file');
            } else {
                const header = response.rows[0];
                const studentDetails = response.rows.slice(1).map(row => {
                    return {
                        "EnrollmentNumber": parseInt(row[0]),
                        "BranchID": parseInt(row[1]),
                        "ClassSerialNumber": parseInt(row[2]),
                        "Group": row[3],
                        "StudentName": row[4],
                        "Batch": parseInt(row[5]),
                        "SemesterNumber":parseInt(row[6]),
                        "year": parseInt(row[7])
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
            console.log('Sending Add Students Bulk request', studentDetails);
            const response = await axios.post('http://127.0.0.1:8000/api/user/addStudents', studentDetails);
            setStudentDetailsList([...studentDetailsList, ...response.data]);
            console.log('Students added successfully', response.data);
            toast.success('Students added successfully');
        } catch (error) {
            console.log('Error adding students:', error);
            toast.error('Failed to add students');
        }
    };

    return (
        <>
            <ToastContainer />
            <div className='container mt-4'>
                <h2>Add Students in Bulk</h2>
                <p>Upload the Excel file of the students</p>
                <input
                    type="file"
                    style={{ width: '18rem' }}
                    className="form-control"
                    id="excelFile"
                    accept=".xlsx, .xls"
                    onChange={handleFileChange}
                />
                <div>
                    <table style={{ borderCollapse: 'collapse', margin: '10px auto', border: '1px solid black' }}>
                        <thead>
                            <tr>
                                {header.map((h, i) => (
                                    <th key={i} style={{ border: '1px solid black' }}>{h}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {cols.slice(1).map((col, i) => (
                                <tr key={i}>
                                    {col.map((c, j) => (
                                        <td key={j} style={{ border: '1px solid black' }}>{c}</td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}

export default AddStudent;
