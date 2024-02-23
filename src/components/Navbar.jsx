/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { useUser } from "../UseContext";
import { useState, useEffect } from "react";

const Navbar = ({totalItems: propTotalItems}) => {
  
   const {currentUser,cartItems,setCartItems}=useUser()
     
   const [len,setLen]=useState(propTotalItems) 

   useEffect(() => {
      setCartItems(cartItems)
      let countItem = cartItems.reduce((total, {quantity}) => total + quantity, 0);
      setLen(countItem || propTotalItems); // Use propTotalItems as fallback if countItem is 0
   }, [cartItems, propTotalItems,setCartItems]);
   
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
                     {len > 0 ? (<sup>{len}</sup>) : (<sup>{propTotalItems}</sup>)}
                   
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
