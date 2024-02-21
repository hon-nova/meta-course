import {Link} from 'react-router-dom'
import { useUser} from '../UseContext'
const Navbar = ()=>{
   const {currentUser}=useUser()
   return(
      <div>
         <nav>
           <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/products">Products</Link></li>
            <li><Link to="/cart"><span className="material-symbols-outlined">
shopping_cart
</span></Link></li>

            <li><Link to="/login">Login</Link></li>
            <li>
               <select>
                  <option>{currentUser? currentUser.email: ''}</option>
                  <option><Link to="/profile">My Profile</Link></option>
               </select>
            </li>
           
            <li><Link to="/logout">Logout</Link></li>
           </ul>
         </nav>
      </div>
   )

}
export default Navbar;