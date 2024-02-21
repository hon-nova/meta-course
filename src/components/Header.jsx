import LoggedInUser from "./LoggedInUser";
/*
import {useUser} from '../UseContext'
import ProductList from './ProductList'; */

const Header =()=>{

   /*const {contextProducts} =useUser()*/

   return (
      <div>  
      <h2>Blog Post</h2>
      <LoggedInUser />
      {/* <ProductList products={contextProducts}/> */}
      {/* <Page /> */}
      </div>
   )
}
export default Header