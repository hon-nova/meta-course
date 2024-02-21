import Header from "./components/Header";
// import Page from "./components/Page";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RegisterUser from "./components/RegisterUser";
import Navbar from './components/Navbar'
import Profile from './components/Profile'
import Logout from './components/Logout'
import {useState, useEffect} from 'react'

function App() {
   const [appUsers, setAppUsers]=useState([])

   const takeUsers = (data)=>{
     setAppUsers(data)
   }  

   useEffect(()=>console.log('appUsers::',appUsers),[appUsers])
   
   return (
      <Router basename="/meta-course">
         <Navbar />
         <Header />
         <Routes>
            <Route path="/register" element={<RegisterUser callback={takeUsers} />} />
            <Route path="/profile" element={<Profile />}/>
            <Route path="/logout" element={<Logout />}/>
         </Routes>
        
      </Router>
   );
}

export default App;
