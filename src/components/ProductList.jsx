/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

// eslint-disable-next-line react/prop-types

import { useState, useEffect } from "react";
import {useUser} from '../UseContext'

const ProductList = ({ products, callback, cbTotalItem,handleSelectChange }) => {
   const [cartProducts, setCartProducts] = useState([]);
   const { cartItems,setCartItems,quantity }=useUser()
   const [totalItems, setTotalItems] = useState(quantity);
   const [message, setMessage] = useState({
      success: "",
      warning: "",
   });

 useEffect(()=>setTotalItems(totalItems),[totalItems])
 console.log('quan ProductList:::',quantity)
   const handleAdd = (item) => {
      /*  if(!currentUser){

         setMessage((mObj)=>({...mObj,warning: "Please log in to save your items."}))
         setTimeout(() => {
            setMessage((mObj)=>({...mObj,warning: ""}))
         }, 3000);

         return;
      }*/
      // setTimeout(()=>setMessage(''),3000)
      let tempCart = [...cartProducts];

      let existingItemIndex = tempCart.findIndex((elem) => elem.id === item.id);

      if (existingItemIndex === -1) {
         tempCart.push({ ...item, quantity: 1 });
        
      } else {
         tempCart[existingItemIndex].quantity++;
      
         if (tempCart[existingItemIndex].length < 10) {
            alert('max 10')
            return;
         }
      }
      setCartProducts(tempCart);

      if (callback) {
         callback(tempCart);         
      }
   };
   useEffect(() => {  

      let itemCount = cartProducts.reduce(
         (total, { quantity }) => total + quantity,
         0
      );
      setTotalItems(itemCount);

      if(cbTotalItem){
         cbTotalItem(itemCount)
      }
   }, [cartProducts, cbTotalItem]);

   useEffect(()=>{
      // setCartItems(cartProducts)
   },[cartItems])

   const categoryArr=[...new Set(products.map(product => product.category))]
   // console.log('categoryArr:::',categoryArr)
   return (
      <div className="top">
      
         {message.success && <p className="success">{message.success}</p>}
         {message.warning && <p className="warning">{message.warning}</p>}

         <h1 id="productList">ALL PRODUCTS FOR THIS SEASON.</h1>
         <div className="products-container">
         
            <div className="left">
                 <select onChange={handleSelectChange} id="select-category">
               <option value="all">All</option>
               {categoryArr && categoryArr.map(cate=>
                  <option value={cate} key={cate}>{cate}</option>
               )}
              
            </select>
            </div>
          
            <div className="products">
           
               {products &&
                  products.map((item) => {  
                     let {id,thumbnail,title,price,discountPercentage,description,stock,category}=item              
                     return (
                        <li key={id}>
                           <div className="product-card">
                              <p>
                                 <img
                                    src={thumbnail}
                                    alt="product"
                                    id="product-img"
                                 />
                              </p>
                              <p>id: {id}</p>
                              <p>{title}</p>
                              <h3>Price: ${price}</h3>
                              <p>Discount Percent: {discountPercentage}%</p>
                              <p>
                                 <em>Details: {description}</em>
                              </p>
                              <p>In stock: {stock}</p>
                              <p>
                                 <em>Category:</em>{" "}
                                 <span id="category">{category}</span>
                              </p>
                              <div id="btn-add">
                                 <button
                                    onClick={() => {
                                       handleAdd(item);
                                    }}
                                    id="click-add"
                                 >
                                    Add to Cart
                                 </button>
                              </div>
                           </div>
                        </li>
                     );
                  })}
            </div>
            <div className="right"></div>
         </div>
       
      </div>
   );
};
export default ProductList;
