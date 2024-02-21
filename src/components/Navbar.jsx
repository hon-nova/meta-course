/* eslint-disable react/prop-types */
import {Link} from 'react-router-dom'
import { useUser} from '../UseContext'
import {useState} from 'react'


const Navbar = ({totalItems})=>{
   const {currentUser}=useUser()
  const [len,setLen]=useState(totalItems)
  console.log('len::',len)
   return(
      <div>
         <nav>
           <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/products">Products</Link></li>
            <li><Link to="/cart"><span className="material-symbols-outlined">
shopping_cart
</span>{totalItems? (<sup>{len ? len: ''}</sup>) :''}</Link></li>

            <li><Link to="/login">Login</Link></li>
            <li>
               <select>
                  <option value="">{currentUser? currentUser.email: ''}</option>
                  <option value=""><Link to="/profile">My Profile</Link></option>
               </select>
            </li>
           
            <li><Link to="/logout">Logout</Link></li>
           </ul>
         </nav>
      </div>
   )

}
export default Navbar;