import { useState } from 'react'
import './App.css'
import Navbar from './Navbar/Navbar'
import Subjects from './Subjects/Subjects'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <Navbar/>
     <Subjects/>
    </>
  )
}

export default App
