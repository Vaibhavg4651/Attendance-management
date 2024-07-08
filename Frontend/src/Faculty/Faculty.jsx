import React from 'react'
import Navbar from '../Navbar/Navbar'
// import MarkAttendance from '../MarkAttendance/MarkAttendance'
// import Filters from '../MarkAttendance/Filters'
import Subjects from '../Subjects/Subjects'
import AddFaculty from './AddFaculty'
import GetStudent from '../Proctor/GetStudent'
import { Route, Routes } from 'react-router-dom'

const Faculty = () => {
  return (
    <div>
      {/* <Filters/> */}
        {/* <Navbar/> */}
        {/* <Routes>
        <Route path='/attendance' element={<GetStudent/>}/>
        </Routes> */}
        <AddFaculty/>
        <Subjects/>
        <GetStudent/>
        <br />
        {/* <MarkAttendance/> */}
    </div>
  )
}

export default Faculty