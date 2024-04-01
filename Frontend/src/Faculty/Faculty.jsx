import React from 'react'
import Navbar from '../Navbar/Navbar'
import MarkAttendance from '../MarkAttendance/MarkAttendance'
// import Filters from '../MarkAttendance/Filters'
import Subjects from '../Subjects/Subjects'
import AddFaculty from './AddFaculty'
import GetStudent from '../Proctor/GetStudent'

const Faculty = () => {
  return (
    <div>
      {/* <Filters/> */}
        {/* <Navbar/> */}
      <Subjects/>
        <GetStudent/>
        <AddFaculty/>
        <MarkAttendance/>
    </div>
  )
}

export default Faculty