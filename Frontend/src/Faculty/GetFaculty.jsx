import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import GetStudent from '../Students/GetStudent';
import UpdateFaculty from './UpdateFaculty';
import Navbar from '../Navbar/Navbar';
import AddFaculty from './AddFaculty';
import subjectData from '../subject.json';


const GetFaculty = () => {
    const userid = useSelector((state) => state.user.userid);
    const role = useSelector((state)=>{return state.user.role})
  
    const [details, setDetails] = useState([]);
    const [subjectId, setSubjectId] = useState(0);
    const [facultyId, setFacultyId] = useState();
    const [room, setRoom] = useState('');
    const [error, setError] = useState(null);
    const [showAddFaculty,setShowAddFaculty]=useState(false);
    const [subjects,setSubjects]=useState([]);
    const subjectMap=subjectData.reduce((map,sub)=>{
        map[sub.SubjectID]=sub.Subjectcode;
        return map;
    },{});
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


    const handleAddNewClass=()=>{
        setShowAddFaculty(true);
    }
    return (
        <>
            <Navbar />
            <ToastContainer />
            <div className='mt-4'>
                <center>
                    <h3 style={{ margin: 'auto' }}>Faculty Details</h3>
                </center>
                <div className='details mt-4 d-flex align-items-center'>
                    <table style={{ width: '75%', margin: 'auto' }}>
                        <thead style={{ backgroundColor: 'rgb(51, 51, 103)', color: 'white' }}>
                            <tr>
                                <th style={{ border: '1px solid white', padding: '15px' }}>Class</th>
                                <th style={{ border: '1px solid white', padding: '15px' }}>Semester</th>
                                <th style={{ border: '1px solid white', padding: '15px' }}>Year</th>
                                <th style={{ border: '1px solid white', padding: '15px' }}>Subject</th>
                                <th style={{ border: '1px solid white', padding: '15px' }}>Room</th>
                                <th style={{ border: '1px solid white', padding: '15px' }}>Total Lectures Held</th>
                                <th style={{ border: '1px solid white', padding: '15px' }}>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {details.map((faculty, index) => (
                                <tr key={index}>
                                    <td style={{ border: '1px solid black', padding: '10px' }}>{faculty.Class}</td>
                                    <td style={{ border: '1px solid black', padding: '10px' }}>{faculty.SemesterNumber}</td>
                                    <td style={{ border: '1px solid black', padding: '10px' }}>{faculty.year}</td>
                                    <td style={{ border: '1px solid black', padding: '10px' }}>{subjectMap[faculty.SubjectID] || faculty.SubjectID}</td>
                                    <td style={{ border: '1px solid black', padding: '10px' }}>{faculty.room}</td>
                                    <td style={{ border: '1px solid black', padding: '10px' }}>{faculty.total_lectures}</td>
                                    <td style={{ border: '1px solid black', padding: '10px' }}>
                                        <div>
                                            <Link to='/attendance' className='btn btn-primary flex' element={<GetStudent subjectId={subjectId} facultyId={facultyId} room={room} />}>Mark Attendance</Link>
                                            &ensp;
                                            <Link to='/edit' className='btn btn-secondary' element={<UpdateFaculty />}>Update Details</Link>
                                            &ensp;
                                           
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className='container'>
                    <div className='container mt-4'>
                    <h2>Add More Details</h2>
                    <button className='btn btn-primary' onClick={handleAddNewClass}>Add New Class</button>
                    {showAddFaculty && <AddFaculty/>}
                </div>
                </div>
            </div>
        </>
    );
};

export default GetFaculty;
