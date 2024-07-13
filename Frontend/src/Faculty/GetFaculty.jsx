import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import GetStudent from '../Students/GetStudent';
import UpdateFaculty from './UpdateFaculty';
import Navbar from '../Navbar/Navbar';


const GetFaculty = () => {
    const userid = useSelector((state) => state.user.userid);
    const [details, setDetails] = useState([]);
    const [subjectId, setSubjectId] = useState(0);
    const [facultyId, setFacultyId] = useState();
    const [room, setRoom] = useState('');
    const [error, setError] = useState(null);

    const fetchIds = async () => {
        try {
            const response = await axios.get(`http://127.0.0.1:8000/api/user/getFacultyDetails/${userid}`);
            const data = response.data;
            setDetails(data);
            setSubjectId(data[0].SubjectID);
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

    return (
        <>
            <Navbar />
            <ToastContainer />
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
                                <th style={{ border: '1px solid white', padding: '7px' }}>Total Lectures Held</th>
                                <th style={{ border: '1px solid white', padding: '7px' }}>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {details.map((faculty, index) => (
                                <tr key={index}>
                                    <td style={{ border: '1px solid black', padding: '10px' }}>{faculty.Class}</td>
                                    <td style={{ border: '1px solid black', padding: '10px' }}>{faculty.SemesterNumber}</td>
                                    <td style={{ border: '1px solid black', padding: '10px' }}>{faculty.room}</td>
                                    <td style={{ border: '1px solid black', padding: '10px' }}>{faculty.total_lectures}</td>
                                    <td style={{ border: '1px solid black', padding: '10px' }}>
                                        <div>
                                            <Link to='/attendance' className='btn btn-primary flex' element={<GetStudent subjectId={subjectId} facultyId={facultyId} room={room} />}>Mark Attendance</Link>
                                            &ensp;
                                            <Link to='/edit' className='btn btn-secondary' element={<UpdateFaculty />}>Update Details</Link>
                                            &ensp;
                                            <Link className='btn btn-danger' element={<GetStudent />}>Delete Details</Link>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div>
                    {/* <h2>Add More Details</h2> */}
                    <Link to={`/${userid}/addfaculty`} className='btn btn-primary'>Add More Details</Link>
                </div>
            </div>
        </>
    );
};

export default GetFaculty;
