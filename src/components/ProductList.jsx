/* eslint-disable react/prop-types */

// eslint-disable-next-line react/prop-types
import {useState} from 'react'
const ProductList = ({ products, callback }) => {

   const [cartProducts, setCartProducts]=useState([])
   const [message,setMessage]=useState('')
   
   const handleAdd =(item)=>{     
      setMessage("Item added.")
      setTimeout(()=>setMessage(''),3000)
      let tempCart=[...cartProducts]

      let existingItemIndex = tempCart.findIndex((elem)=>elem.id===item.id)     

      if(existingItemIndex===-1){
         tempCart.push({...item,quantity:1})
         setCartProducts(tempCart)

         // console.log('cart in main')
         // console.log(tempCart)
      } else {

         tempCart[existingItemIndex].quantity++;
         setCartProducts(tempCart);
       
         // console.log('cart in else')
         // console.log(tempCart)
      }     

      if(callback){
         callback(tempCart)
      }
   }

   return (
      <div className="top">
      {message && <p className='success'>{message}</p>}
  <div className="products-container">
       
         <div className="left"></div>
       
         <div className="products">
      
            {products &&
               products.map((item) => {
                  let {
                     id,
                     title,
                     description,
                     price,
                     discountPercentage,
                     stock,
                     category,
                     thumbnail,
                  } = item;
                  return (
                    
                     <li key={id}>
                   
                        <div className="product-card">
                       
                        <p>
                              <img src={thumbnail} alt="product" id="product-img"/>
                           </p>
                           <p>id: {id}</p>
                           <p>{title}</p>
                           <h3>Price: ${price}</h3>
                           <p>Discount Percent: {discountPercentage}%</p>
                           <p><em>Details: {description}</em></p>
                           <p>In stock: {stock}</p>
                           <p><em>Category:</em> <span id="category">{category}</span></p>
                           <div id="btn-add">
                              <button 
                              onClick={()=>{handleAdd(item)}}
                              id="click-add">Add to Cart</button>
                           </div>
                          
                        </div>
                     </li>
                  );
               })}
         </div>
         <div className="right"></div>
      </div>
<div className="products-container">
       
       <div className="left"></div>
     
       <div className="products">
    
          {products &&
             products.map((item) => {
                let {
                   id,
                   title,
                   description,
                   price,
                   discountPercentage,
                   stock,
                   category,
                   thumbnail,
                } = item;
                return (
                  
                   <li key={id}>
                 
                      <div className="product-card">
                     
                      <p>
                            <img src={thumbnail} alt="product" id="product-img"/>
                         </p>
                         <p>id: {id}</p>
                         <p>{title}</p>
                         <h3>Price: ${price}</h3>
                         <p>Discount Percent: {discountPercentage}%</p>
                         <p><em>Details: {description}</em></p>
                         <p>In stock: {stock}</p>
                         <p><em>Category:</em> <span id="category">{category}</span></p>
                         <div id="btn-add">
                            <button 
                            onClick={()=>{handleAdd(item)}}
                            id="click-add">Add to Cart</button>
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
