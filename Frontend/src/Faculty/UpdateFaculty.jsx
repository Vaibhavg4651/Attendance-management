import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Navbar from '../Navbar/Navbar';
import { ToastContainer, toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import API_URL from '../ConfigUrl/Configurl';

const UpdateFaculty = () => {
    const userid = useSelector((state) => state.user.userid);
    const { facultyId } = useParams(); 
    const [subjectId, setSubjectId] = useState(0);
    const [Class, setClass] = useState('');
    const [room, setRoom] = useState('');
    const [details, setDetails] = useState({});
    const [error, setError] = useState(null);
    const navigate=useNavigate();
    const fetchFacultyDetails = async () => {
        try {
            const response = await axios.get(`${API_URL}api/user/getFacultyDetails/${userid}`);
            const data = response.data;
            
            setSubjectId(data[0].SubjectID);
            setClass(data[0].Class);

        } catch (error) {
            console.error('Error fetching faculty details:', error);
            setError(error);
        }
    };

    useEffect(() => {
        fetchFacultyDetails();
    }, [facultyId]);

    const handleUpdateFaculty = async () => {
        const facultyDetails = {
            Class: Class,
            SubjectID: parseInt(subjectId),
            room
        };
        console.log('Sending update faculty request', facultyDetails);
        try {
            const res = await axios.patch(`http://127.0.0.1:8000/api/user/updateFaculty`, facultyDetails);
            console.log('Update Faculty successful. Response:', res.data);
            navigate(-1);
            toast.success('Faculty updated successfully');

        } catch (err) {
            console.error('Update faculty failed. Error:', err);
            toast.error('Update unsuccessful');
        }
    };

    return (
        <>
           
            <ToastContainer />
            <div className="Container2">
                <div className="row justify-content-center">
                    <div className="col md-5">
                        <div className="card2 mt-5 login-custom ">
                            <div className="card-body">
                                <strong style={{ color: "#035b96" }} className='d-flex justify-content-center align-items-center text-center'>
                                    Update Faculty Room
                                </strong>
                                
                                <input
                                    className='mt-4'
                                    type="number"
                                    value={room}
                                    placeholder='Enter new Room'
                                    onChange={(e) => setRoom(e.target.value)}
                                />
                                <center>
                                    <button className='btn btn-primary d-flex align-items-center' onClick={handleUpdateFaculty}>
                                        Update Room
                                    </button>
                                </center>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default UpdateFaculty;
