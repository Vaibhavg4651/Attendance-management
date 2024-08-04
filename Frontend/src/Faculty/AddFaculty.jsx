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
    const [filteredSubjects,setFilteredSubjects]=useState([]);
    const navigate=useNavigate();
    const Classes=['CSE1','CSE2','CSE3','CSE-4','IT-1','IT-2','IT-3','ECE-1','ECE-2','EEE'];
    const years=[1,2,3,4];
    const semesters=[1,2,3,4,5,6,7,8];
useEffect(()=>{
    setSubject(subjectData);
})

const filterSubjectsByYear=(year)=>{
    const filtered=subjectData.filter(sub=>sub.year===parseInt(year));
    setFilteredSubjects(filtered);
}
useEffect(() => {
    filterSubjectsByYear(year);
    
    },[year]);
    const handleAddFaculty = async () => {
        const selectedSubject=filteredSubjects.find(sub=>sub.Subjectcode===subCode)
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
            <div className="container mt-4">
                <div className="d-flex justify-content-center">
                    <div className="row">
                        <div className="col md-2 ">
                            <label htmlFor="class" className='form-label'>Select Class
                                <select className='form-select' value={Class} onChange={(e)=>setClass(e.target.value)} id="class">

                                    <option value="">Select Class</option>
                                    {Classes.map((cls,index)=>(
                                        <option key={index} value={cls}>{cls}</option>
                                    ))}
                                </select>
                            </label>
                        </div>
                        <div className="col md-2 ">
                            <label htmlFor="sem" className='form-label'>Select Semester
                                <select className='form-select' value={semesterNumber} onChange={(e)=>setSemesterNumber(e.target.value)} id="sem">

                                    <option value="">Select Semester</option>
                                    {semesters.map((sem,index)=>(
                                        <option key={index} value={sem}>{sem}</option>
                                    ))}
                                </select>
                            </label>
                        </div>
                        <div className="col md-2 ">
                            <label htmlFor="year" className='form-label'>Select Year
                                <select className='form-select' value={year} onChange={(e)=>setYear(e.target.value)} id="year">

                                    <option value="">Select Year</option>
                                    {years.map((yrs,index)=>(
                                        <option key={index} value={yrs}>{yrs}</option>
                                    ))}
                                </select>
                            </label>
                        </div>
                        <div className="col md-2">
                            <label htmlFor="subject" className="form-label">Select Subject
                            <select
                                id="subject"
                                className="form-select"
                                value={subCode}
                                onChange={(e) => setSubCode(e.target.value)}
                            >
                                <option value="">Select Subject</option>
                                {filteredSubjects.map((sub, index) => (
                                    <option key={index} value={sub.Subjectcode}>{sub.SubjectName}</option>
                                ))}
                            </select>
                            </label>
                        </div>
                        <div className="col md-2">
                            <label htmlFor="room" className="form-label">Enter room
                           <input type="number" placeholder='Enter your room' onChange={(e)=>setRoom(e.target.value)}/>
                            </label>
                        </div>
                    </div>
                </div>
                <div className="d-flex justify-content-center mt-3">
                    <button className="btn btn-primary" onClick={handleAddFaculty}>Add Faculty</button>
                </div>
            </div>
        </>
    );
};

export default AddFaculty;
