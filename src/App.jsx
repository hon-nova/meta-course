import Header from "./components/Header";
// import Page from "./components/Page";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RegisterUser from "./components/RegisterUser";
import Navbar from './components/Navbar'
import Profile from './components/Profile'
import Logout from './components/Logout'
import {useState, useEffect} from 'react'
import LoginUser from "./components/LoginUser";

function App() {
   const [appUsers, setAppUsers]=useState([])

   const takeUsers = (data)=>{
     setAppUsers([...appUsers,data])
   }  

   useEffect(()=>{
      const localUsers = localStorage.getItem('appUsers')
      console.log('localUsers::',localUsers)
      if(localUsers){
         setAppUsers(JSON.parse(localUsers))
      }
   },[])
   useEffect(()=>localStorage.setItem('appUsers',JSON.stringify(appUsers)),[appUsers])
   // localStorage.clear()
   
   return (
      <Router basename="/meta-course">
         <Navbar />
         <Header />
         <Routes>
            <Route path="/register" element={<RegisterUser callback={takeUsers} />} />
            <Route path="/profile" element={<Profile />}/>
            <Route path="/login" element={<LoginUser />}/>
            <Route path="/logout" element={<Logout />}/>
         </Routes>
        
      </Router>
   );
}

export default App;
