/* eslint-disable react/prop-types */

// eslint-disable-next-line react/prop-types
const ProductList = ({ products }) => {
   return (
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
                              <button id="click-add">Add to Cart</button>
                           </div>
                          
                        </div>
                     </li>
                  );
               })}
         </div>
         <div className="right"></div>
      </div>
   );
};
export default ProductList;
