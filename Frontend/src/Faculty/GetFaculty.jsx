import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import GetStudent from '../Students/GetStudent';
import UpdateFaculty from './UpdateFaculty';
import Navbar from '../Navbar/Navbar';
import AddFaculty from './AddFaculty';
import subjectData from '../subject.json';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setBranchId ,setFaculty} from '../reducers/userSlice';
import API_URL from '../ConfigUrl/Configurl';

const GetFaculty = () => {
    const userid = useSelector((state) => state.user.userid);
    const role = useSelector((state)=>{return state.user.role})
    const navigate=useNavigate();
    const dispatch =useDispatch();
    const [details, setDetails] = useState([]);
    const [subjectId, setSubjectId] = useState(0);
    const [facultyId, setFacultyId] = useState();
    const [room, setRoom] = useState('');
    const [error, setError] = useState(null);
    const [showAddFaculty,setShowAddFaculty]=useState(false);
    const [subjects,setSubjects]=useState([]);
    const subjectMap=subjectData.reduce((map,sub)=>{
        map[sub.SubjectID]=sub.Subjectcode;
        // console.log(map);
        return map;
    },{});
    const fetchIds = async () => {
        try {
            const response = await axios.get(`${API_URL}api/user/getFacultyDetails/${userid}`);
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
    let currentDate = new Date();
currentDate.setDate(currentDate.getDate()-1);
let curr_year = currentDate.getFullYear();
let month = ('0' + (currentDate.getMonth() + 1)).slice(-2);
let day = ('0' + currentDate.getDate()).slice(-2);
let dateOnly = `${curr_year}-${month}-${day}`;
    const handleGetStudent=(faculty,date)=>{
        return()=>{
        dispatch(setFaculty(faculty));
        console.log('dispatch success');
        navigate('/attendance',{state:{date}});
        }
    }
    return (
        <>
            {/* <Navbar /> */}
            <ToastContainer />
            <div className='mt-4' style={{width:'auto'}}>
                <center>
                    <h3 style={{ margin: 'auto' }}>Faculty Details</h3>
                </center>
                <div className='details mt-4 d-flex align-items-center'>
                    <table style={{ width: 'auto', margin: 'auto' }}>
                        <thead style={{ backgroundColor: 'rgb(51, 51, 103)', color: 'white' }}>
                            <tr>
                                <th style={{ border: '1px solid white', padding: '10px' }}>Class</th>
                                <th style={{ border: '1px solid white', padding: '10px' }}>Semester</th>
                                <th style={{ border: '1px solid white', padding: '10px' }}>Year</th>
                                <th style={{ border: '1px solid white', padding: '10px' }}>Subject</th>
                                <th style={{ border: '1px solid white', padding: '10px' }}>Room</th>
                                <th style={{ border: '1px solid white', padding: '10px' }}>Total Lectures Held</th>
                                <th style={{ border: '1px solid white', padding: '10px' }}>Action</th>
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
                                    <td style={{ border: '1px solid black', padding: '10px' }}>{faculty.total_lectures - 1}</td>
                                    <td style={{ border: '1px solid black', padding: '10px' }}>
                                        <div>
                                            <button  className='btn btn-primary flex mt-auto' onClick={handleGetStudent(faculty ,"")}>Mark Attendance</button>
                                            &ensp;
                                            <button  className='btn btn-danger flex mt-auto' onClick={handleGetStudent(faculty,dateOnly)}>Mark Yesterday's Attendance</button>
                                            &ensp;
                                            <Link to='/edit' className='btn btn-secondary flex' element={<UpdateFaculty />}>Update Details</Link>
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
                    <button className='btn btn-primary ' onClick={handleAddNewClass}>Add New Class</button>
                    {showAddFaculty && <AddFaculty/>}
                </div>
                </div>
            </div>
        </>
    );
};

export default GetFaculty;
