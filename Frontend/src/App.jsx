import Register from "./User/Register";
import Subjects from "./Subjects/Subjects";
import { BrowserRouter, Routes, Route, useParams } from "react-router-dom";
import { useSelector} from 'react-redux';
import Proctor from "./Proctor/Proctor";
import Faculty from "./Faculty/Faculty";
import Login from "./User/Login";
import UpdatePassword from "./User/UpdatePassword";
import GetStudent from "./Students/GetStudent";
import UpdateFaculty from "./Faculty/UpdateFaculty";
import AddFaculty from "./Faculty/AddFaculty";
import AutoClearReduxState from "./User/AutoClearReduxState";

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
  //  else{
  //   return <h1>Invalid</h1>
  // }
};
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route exact path="/*" element={<AutoClearReduxState />} />
        <Route exact path="/" element={<Login/>} />
        <Route exact path="/updatepassword" element={<UpdatePassword/>}/>
       <Route exact path="/attendance" element={<GetStudent/>}/>
       <Route exact path="/edit" element={<UpdateFaculty/>} />
        <Route exact path="/Register" element={<Register />} />
        <Route exact path="/:id" element={<ShowComponent  />}>
        <Route exact path="/:id/subjects" element={<Subjects/>} />
        <Route exact path={`/:id/?role=${role}/addFaculty`} element={<AddFaculty/>}/>
        </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}



export default App;
