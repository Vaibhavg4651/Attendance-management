import { useState } from "react";
import "./App.css";
import Login from "./User/Login";
import Register from "./User/Register";
import Navbar from "./Navbar/Navbar";
import { BrowserRouter, Routes, Route, useParams } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import Proctor from "./Proctor/Proctor";
import Faculty from "./Faculty/Faculty";

function App() {
  const id = useSelector((state)=>{return state.user.userid})
  const role = useSelector((state)=>{return state.user.role})
  return (
    <>
      <BrowserRouter>
        <Routes>
        <Route exact path="/" element={<Login />} />
        <Route exact path="/Register" element={<Register />} />
        <Route exact path="/:id" element={<ShowProctorComponent  />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}


const ShowProctorComponent = () => {
  const { id } = useParams();
  const role = new URLSearchParams(window.location.search).get('role'); 
  if (id && role === 'proctor') {
    return <Proctor />;
  } else if (id && role === 'faculty') {
    return <Faculty />;
  } else{
    return <h1>Invalid</h1>
  }
};


export default App;
