import { useState } from "react";
import "./App.css";
import Register from "./User/Register";
import Subjects from "./Subjects/Subjects";
import { BrowserRouter, Routes, Route, useParams } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import Proctor from "./Proctor/Proctor";
import Faculty from "./Faculty/Faculty";
import Login from "./User/Login";
import UpdatePassword from "./User/UpdatePassword";
// import AddProctor from "./Proctor/AddProctor";
// import Filters from "./MarkAttendance/Filters";
import MarkAttendance from "./MarkAttendance/MarkAttendance";

function App() {
  const userid = useSelector((state)=>{return state.user.userid})
  const role = useSelector((state)=>{return state.user.role})



const ShowComponent = () => {
  const { id } = useParams();
  const user_type = new URLSearchParams(window.location.search).get('role'); 
  if (id===userid && user_type === role) {
    if (role === "faculty") {
      return <Faculty />;
    } else if (role === "proctor") {
      return <Proctor/>;
    }
  }
   else{
    return <h1>Invalid</h1>
  }
};
  return (
    <>
      <BrowserRouter>
        <Routes>
        <Route exact path="/" element={<Login/>} />
        <Route exact path="/updatepassword" element={<UpdatePassword/>}/>
        <Route exact path="/Register" element={<Register />} />
        <Route exact path="/:id" element={<ShowComponent  />}>
        <Route exact path="/:id/subjects" element={<Subjects/>} />
        {/* <Route exact path="/:id/filters" element={<Filters/>}/> */}
        {/* <Route exact path="/:id/student" element={<Proctor/>}/> */}
        </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}



export default App;
