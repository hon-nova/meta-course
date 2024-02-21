/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { useUser } from "../UseContext";
import { useState, useEffect } from "react";

const Navbar = ({ totalItems }) => {
   const { currentUser, cartItems } = useUser();
   const [len, setLen] = useState(totalItems);

   useEffect(() => {
      setLen(totalItems);
   }, [totalItems]);

   useEffect(() => {
      let itemCount = cartItems.reduce(
         (total, { quantity }) => total + quantity,
         0
      );
      setLen(itemCount);
   }, [cartItems]);
   console.log("len::", len);
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
                     {totalItems ? <sup>{len}</sup> : ""}
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
