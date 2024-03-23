import React from 'react'
import Navbar from '../Navbar/Navbar'
import MarkAttendance from '../MarkAttendance/MarkAttendance'
import Filters from '../MarkAttendance/Filters'
import Subjects from '../Subjects/Subjects'

const Faculty = () => {
  return (
    <div>
      {/* <Filters/> */}
        {/* <Navbar/> */}
      <Subjects/>
        <MarkAttendance/>
    </div>
  )
}

export default Faculty