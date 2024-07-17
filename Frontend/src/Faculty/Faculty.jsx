import React, { useState } from 'react'

import Subjects from '../Subjects/Subjects'
import AddFaculty from './AddFaculty'

import { Route, Routes } from 'react-router-dom'
import GetFaculty from './GetFaculty'
import GetSubjects from '../Subjects/GetSubjects'
import { useSelector } from 'react-redux'

const Faculty = () => {
  const userid=useSelector((state)=>state.user.userid);
  const [facultyId,setFacultyId]=useState(null);

  return (
    <div>
     
        <GetFaculty/>
        {/* <GetSubjects/>
        <Subjects/> */}
      
    </div>
  )
}

export default Faculty