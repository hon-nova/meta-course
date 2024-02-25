/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { useUser } from "../UseContext";
import { useState, useEffect } from "react";

const Navbar = ({totalItems}) => {
  
   const {currentUser,cartItems}=useUser()
     
   const [len,setLen]=useState(totalItems) 
   // console.log('quantity::',quantity)
   

   useEffect(() => {     
      let countItem = cartItems.reduce((total, {quantity}) => total + quantity, 0);

      setLen(countItem); 
      console.log('len useEffect:::',len)
   }, [cartItems, totalItems,len]);
   
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
                     {totalItems>0 | len>0? (<sup>{len}</sup>) : (<sup>{len}</sup>)}
                  </Link>
               </li>
               <li>
                  <Link to="/login">Login</Link>
               </li>
               
                  <select>
                     <option value="">
                        {currentUser ? currentUser.email : ""}
                     </option>
                     <option value="/profile">
                        <Link to="/profile">My Profile</Link>
                     </option>
                  </select>               
               <li>
                  <Link to="/logout">Logout</Link>
               </li>
            </ul>
         </nav>
      </div>
   );
};
export default Navbar;
