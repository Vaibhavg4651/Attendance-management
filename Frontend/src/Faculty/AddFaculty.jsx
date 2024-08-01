import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import subjectData from '../subject.json';

const AddFaculty = () => {
    const userid = useSelector((state) => state.user.userid);
    const [semesterNumber, setSemesterNumber] = useState(0);
    const [Class, setClass] = useState('');
    const [year, setYear] = useState(0);
    const [room, setRoom] = useState('');
    const [error, setError] = useState(null);
    const [subCode,setSubCode]=useState('');
    const [subject,setSubject]=useState([]);
    const navigate=useNavigate();
    
useEffect(()=>{
    setSubject(subjectData);
})
    const handleAddFaculty = async () => {
        const selectedSubject=subject.find(sub=>sub.Subjectcode===subCode)
        if(!selectedSubject){
            toast.error("Invalid Subjet Name");
        }
        const facultyDetails = {
            id:userid,
            SubjectID:selectedSubject.SubjectID,
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
            // navigate(-1);
        } catch (err) {
            console.error('Add faculty failed. Error:', err);
            toast.error('Add unsuccessful');
        }
    };

    return (
        <>
         
            <ToastContainer />
            <div className="Container3">
                <div className="row justify-content-center mb-4">
                    <div className="col md-5">
                        <div className="card3 mt-5 login-custom ">
                            <div className="card-body">
                                <strong style={{ color: "#035b96" }} className='d-flex justify-content-center align-items-center text-center'>
                                    Enter your details
                                </strong>
                                <input className='mt-4' type="number" placeholder='Enter your Semester' onChange={(e) => setSemesterNumber(e.target.value)} />
                                <input className='mt-4' type="text" placeholder='Enter your Subject' onChange={(e) => setSubCode(e.target.value)} />
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
        </>
    );
};

export default AddFaculty;
