import {Link} from 'react-router-dom'
const Navbar = ()=>{
   return(
      <div>
         <nLinkv>
           <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/register">Register</Link></li>
            <li><Link to="/profile">EmLinkil Dropdown</Link></li>
            <li><Link to="/logout">Logout</Link></li>
           </ul>
         </nLinkv>
      </div>
   )

}
export default Navbar;