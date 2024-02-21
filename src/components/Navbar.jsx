import {Link} from 'react-router-dom'
const Navbar = ()=>{
   return(
      <div>
         <nav>
           <ul>
            <li><Link to="/">Home</Link></li>
            {/* <li><Link to="/register">Register</Link></li> */}
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/profile">Email Dropdown</Link></li>
            <li><Link to="/logout">Logout</Link></li>
           </ul>
         </nav>
      </div>
   )

}
export default Navbar;