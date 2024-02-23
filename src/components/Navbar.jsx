/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { useUser } from "../UseContext";
import { useState, useEffect } from "react";

const Navbar = ({totalItems: propTotalItems}) => {
  
   const {currentUser,cartItems}=useUser()
   // console.log('quantity::',quantity)  

   const [len,setLen]=useState(propTotalItems)   
     
   useEffect(() => { 
      
      setLen(propTotalItems);
   }, [cartItems, propTotalItems]);
   
   return (
      <div>
         <nav>
            <ul>
               <li>
                  <Link to="/">Home</Link>
               </li>
               <li>
                  <Link to="/products">Products</Link>
               </li>
               <li>
                  <Link to="/cart">
                     <span className="material-symbols-outlined">
                        shopping_cart
                     </span>
                     {/* {len > 0 ? (<sup>{len}</sup>) : (<sup>{propTotalItems}</sup>)} */}
                     {len>0 ?(<sup>{len}</sup>) :null}
                  </Link>
               </li>
               <li>
                  <Link to="/login">Login</Link>
               </li>
               <li>
                  <select>
                     <option value="">
                        {currentUser ? currentUser.email : ""}
                     </option>
                     <option value="">
                        <Link to="/profile">My Profile</Link>
                     </option>
                  </select>
               </li>
               <li>
                  <Link to="/logout">Logout</Link>
               </li>
            </ul>
         </nav>
      </div>
   );
};
export default Navbar;
