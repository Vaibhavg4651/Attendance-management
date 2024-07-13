import React from 'react'
import Navbar from '../Navbar/Navbar'
// import MarkAttendance from '../MarkAttendance/MarkAttendance'
// import Filters from '../MarkAttendance/Filters'
import Subjects from '../Subjects/Subjects'
import AddFaculty from './AddFaculty'

import { Route, Routes } from 'react-router-dom'
import GetFaculty from './GetFaculty'
import GetSubjects from '../Subjects/GetSubjects'

const Faculty = () => {
  return (
    <div>
     
        <GetFaculty/>
        <GetSubjects/>
        <Subjects/>
      
    </div>
  )
}

export default Faculty