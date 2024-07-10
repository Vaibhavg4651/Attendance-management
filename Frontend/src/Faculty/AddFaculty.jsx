import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Navbar from '../Navbar/Navbar';
import { ToastContainer, toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import GetStudent from '../Proctor/GetStudent';
import { Link } from 'react-router-dom';
import UpdateFaculty from './UpdateFaculty';

const AddFaculty = () => {
    const userid = useSelector((state) => state.user.userid);
    const [subjectId, setSubjectId] = useState(0);
    const [facultyId, setFacultyId] = useState();
    const [semesterNumber, setSemesterNumber] = useState(0);
    const [Class, setClass] = useState('');
    const [year, setYear] = useState(0);
    const [room, setRoom] = useState('');
    const [details, setDetails] = useState([]);
    const [error, setError] = useState(null);

   const fetchIds = async () => {
        try {
            const response = await axios.get(`http://127.0.0.1:8000/api/user/getFacultyDetails/${userid}`);
            const data = response.data;
            // console.log(response.SubjectID);
            setDetails(data);
            setSubjectId(data[0].SubjectID);
            // console.log(data[0].SubjectID);
            setFacultyId(data[0].FacultyID);
            setRoom(data[0].room);
            console.log(data);
        } catch (error) {
            console.error('Error fetching Ids:', error);
            setError(error);
        }
    };

    useEffect(() => {
        fetchIds();
    }, []);

    const handleAddFaculty = async () => {
        const facultyDetails = {
            SemesterNumber: parseInt(semesterNumber),
            Class: Class,
            year: parseInt(year),
            room: room
        };
        console.log('Sending add faculty request', facultyDetails);
        try {
            const res = await axios.post('http://127.0.0.1:8000/api/user/addFaculty', facultyDetails);
            console.log('Add Faculty successful. Response:', res.data);
            toast.success('Faculty added successfully');
        } catch (err) {
            console.error('Add faculty failed. Error:', err);
            toast.error('Add unsuccessful');
        }
    };

    return (
        <>
            <Navbar />
            <ToastContainer />
            <div className="Container2">
                <div className="row justify-content-center mb-4">
                    <div className="col md-5">
                        <div className="card2 mt-5 login-custom ">
                            <div className="card-body">
                                <strong style={{ color: "#035b96" }} className='d-flex justify-content-center align-items-center text-center'>
                                    Enter your details
                                </strong>
                                <input className='mt-4' type="number" placeholder='Enter your Semester' onChange={(e) => setSemesterNumber(e.target.value)} />
                                <input className='mt-4' type="text" placeholder='Enter your Class' onChange={(e) => setClass(e.target.value)} />
                                <input className='mt-4' type="number" placeholder='Enter your Year' onChange={(e) => setYear(e.target.value)} />
                                <input className='mt-4' type="number" placeholder='Enter your Room' onChange={(e) => setRoom(e.target.value)} />
                                <center>
                                    <button className='btn btn-primary d-flex align-items-center' onClick={handleAddFaculty}>submit</button>
                                </center>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div>
                <center>
                    <h3 style={{ margin: 'auto' }}>Faculty Details</h3>
                </center>
                <div className='details mt-4 d-flex align-items-center'>
                    <table style={{ width: '75%', margin: 'auto' }}>
                        <thead style={{ backgroundColor: 'rgb(51, 51, 103)', color: 'white' }}>
                            <tr>
                                <th style={{ border: '1px solid white', padding: '7px' }}>Class</th>
                                <th style={{ border: '1px solid white', padding: '7px' }}>Semester</th>
                                <th style={{ border: '1px solid white', padding: '7px' }}>Room</th>
                                <th style={{ border: '1px solid white', padding: '7px' }}>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {details.map((faculty, index) => (
                                <tr key={index}>
                                    <td style={{ border: '1px solid black', padding: '10px' }}>{faculty.Class}</td>
                                    <td style={{ border: '1px solid black', padding: '10px' }}>{faculty.SemesterNumber}</td>
                                    <td style={{ border: '1px solid black', padding: '10px' }}>{faculty.room}</td>
                                    <td style={{ border: '1px solid black', padding: '10px' }}>
                                        <div >
                                            <Link to='/attendance' className='btn btn-primary flex' element={<GetStudent subjectId={subjectId} facultyId={facultyId} room={room} />}>Mark Attendance</Link>
                                            &ensp;
                                            <Link to='/edit' className='btn btn-secondary' element={<UpdateFaculty/>}>Edit Details</Link>
                                            &ensp;
                                            <Link className='btn btn-danger' element={<GetStudent />}>Delete Details</Link>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            {/* <GetStudent subjectId={subjectId} facultyId={facultyId} Room={room}/> */}
        </>
    );
};

export default AddFaculty;
