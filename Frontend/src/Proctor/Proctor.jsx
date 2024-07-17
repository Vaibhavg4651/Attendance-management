import React, { useEffect, useState } from 'react';
import Navbar from '../Navbar/Navbar';
import AddStudent from '../Students/AddStudent';
import Login from '../User/Login';
import AddProctor from './AddProctor';
import Filters from '../Filters/Filters';
import GetProctor from './GetProctor';

const Proctor = () => {
  const [firsttime,setfirsttime]=useState(false);
  const handleLogin=()=>{
    Login().then(()=>{
      setfirsttime(true);
    }).catch(error=>{
      console.log('Login failed',error);
    })
  }
  useEffect(() => {
    const isFirstTime = localStorage.getItem('firsttime');
    if (isFirstTime === null) {
      setfirsttime(true);
    } else {
      setfirsttime(false);
    }
  }, []);
  return (
    <>
      <Navbar/>
   
      <GetProctor/>
    {/* < AddStudent/> */}
    <Filters/>
    <br />
    <br />
    <br />
    </>
  );
}

export default Proctor;
