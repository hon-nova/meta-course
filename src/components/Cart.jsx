/* eslint-disable react/prop-types */
const Cart = ({cart})=>{

   console.log('cart in Cart:::',cart)
   const onDecrease = ()=>{

   }
   const onIncrease = ()=>{
      
   }
   return (
      <div className="cart">
         <div className="cart-center"> <table>
               <thead>
                  <tr>
                     <th>id</th>
                     <th>Preview</th>
                     <th>Title</th><th>Discount</th>
                     <th>Price</th>
                     <th>Quantity</th>
                     <th>SubTotal</th>
                     <th>Action</th>
                  </tr>
               </thead>
               <tbody>
               {cart.length>0&& cart.map((item,index)=>(
                  <tr key={index}>
                     <td>{item.id}</td>
                     <td><img src={item.thumbnail} alt="logo" id="photo"/></td>
                     <td width="250px">{item.title}</td>
                     <td>{item.discountPercentage}%</td>
                     <td>${item.price}</td>
                     <td>
                        <div>
                           <button id="q-decrease" onClick={onDecrease}>-</button>
                           <input type="text" id="quantity" name="quantity"  value={item.quantity}
                           />
                           <button id="q-increase" onClick={onIncrease}>+</button>
                        </div>
                     </td>
                     <td>$$$</td>
                     <td>
                     <button id="delete">
                           <span className="material-symbols-outlined">
                              delete
                           </span> Remove All
                           </button>
                     </td>
                  </tr>
            ))}
               
               </tbody>
            </table></div>
         <div className="payment-area">Payment</div>
      </div>
   )
}

export default Cart;