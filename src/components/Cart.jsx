/* eslint-disable react/prop-types */

import { useState, useEffect } from "react";
const Cart = ({ cart,totalItems}) => {
   const [myCart, setMyCart] = useState(cart || []);
   const [message, setMessage] = useState("");
   const [items, setItems] = useState(totalItems);
   
   const onDecrease = (item) => {
      const foundItemIndex = myCart.findIndex((elem) => elem.id === item.id);
      console.log("foundItem::", foundItemIndex);
      // console.log('foundItem quantity:::',)
      if (foundItemIndex !== -1) {
         let tempCart = [...myCart];
         if (tempCart[foundItemIndex].quantity > 0) {
            tempCart[foundItemIndex].quantity--;
         }

         if (tempCart[foundItemIndex].quantity === 0) {
            tempCart.splice(foundItemIndex, 1);
         }

         setMyCart(tempCart);
      }
   };

   const onIncrease = (item) => {
      let foundItemIndex = myCart.findIndex((elem) => elem.id === item.id);
      if (foundItemIndex !== -1) {
         let tempCart = [...myCart];
         if (tempCart[foundItemIndex].quantity < 10) {
            tempCart[foundItemIndex].quantity++;
         }

         if (tempCart[foundItemIndex].quantity === 10) {
            setMessage("Limit: 10");
            setTimeout(() => setMessage(""), 5000);
         }

         setMyCart(tempCart);
      }
   };

   const onRemove = (index) => {
      let tempCart = [...myCart];
      tempCart.splice(index, 1);
      // alert('item deleted')
      setMyCart(tempCart);
   };
   
  

   useEffect(()=>{
      let itemCount = myCart.reduce((total, { quantity }) => total + quantity, 0);
      console.log('itemCount::',itemCount)
      setItems(itemCount)
   },[myCart])
 

   return (
      <div className="cart">
         {message && <p className="error">{message}</p>}
         <div className="cart-center">
            <table>
               <thead>
                  <tr>
                     <th>id</th>
                     <th>Preview</th>
                     <th>Title</th>
                     <th>Discount</th>
                     <th>Price</th>
                     <th>Quantity</th>
                     <th>SubTotal</th>
                     <th>Action</th>
                  </tr>
               </thead>
               <tbody>
                  {myCart.length > 0 &&
                     myCart.map((item, index) => (
                        <tr key={index}>
                           <td>{item.id}</td>
                           <td>
                              <img src={item.thumbnail} alt="logo" id="photo" />
                           </td>
                           <td width="250px">{item.title}</td>
                           <td>{item.discountPercentage}%</td>
                           <td>${item.price}</td>
                           <td>
                              <div>
                                 <button
                                    id="q-decrease"
                                    onClick={() => {
                                       onDecrease(item);
                                    }}
                                 >
                                    -
                                 </button>
                                 <input
                                    type="text"
                                    id="quantity"
                                    name="quantity"
                                    value={item.quantity}
                                 />
                                 <button
                                    id="q-increase"
                                    onClick={() => {
                                       onIncrease(item);
                                    }}
                                 >
                                    +
                                 </button>
                              </div>
                           </td>
                           <td>$$$</td>
                           <td>
                              <button
                                 id="delete"
                                 onClick={() => {
                                    onRemove(index);
                                 }}
                              >
                                 <span className="material-symbols-outlined">
                                    delete
                                 </span>{" "}
                                 Remove All
                              </button>
                           </td>
                        </tr>
                     ))}
               </tbody>
            </table>
         </div>
         <div className="payment-area">Payment</div>
      </div>
   );
};

export default Cart;
