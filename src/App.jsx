import Header from "./components/Header";
// import Page from "./components/Page";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RegisterUser from "./components/RegisterUser";
import Navbar from './components/Navbar'
import Profile from './components/Profile'
import Logout from './components/Logout'

function App() {
   return (
      <Router basename="/meta-course">
         <Navbar />
         <Header />
         <Routes>
            <Route path="/register" element={<RegisterUser />} />
            <Route path="/profile" element={<Profile />}/>
            <Route path="/logout" element={<Logout />}/>
         </Routes>
        
      </Router>
   );
}

export default App;
