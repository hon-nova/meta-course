/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { useUser } from "../UseContext";
import { useState, useEffect } from "react";

const Navbar = ({totalItems: propTotalItems}) => {
  
   const {currentUser,cartItems,quantity}=useUser()
     
   const [len,setLen]=useState(quantity) 
   console.log('quantity::',quantity)
   

   useEffect(() => {     
      let countItem = cartItems.reduce((total, {quantity}) => total + quantity, 0);

      setLen(countItem); 
      console.log('len useEffect:::',len)
   }, [cartItems, propTotalItems,len]);
   
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
                     {len > 0 || propTotalItems>0? (<sup>{len}</sup>) : (<sup>{len}</sup>)}
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
                     <option value="/profile">
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
