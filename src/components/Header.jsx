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
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nemo, velit alias deleniti perspiciatis praesentium cupiditate recusandae vitae id ad atque culpa hic molestiae sapiente, cumque, reiciendis nisi quia laudantium! Accusamus.
       Quis odio odit officia magnam tempora accusamus! Necessitatibus accusantium magni sapiente nisi nostrum totam neque commodi? In repellendus, corrupti, beatae laudantium nesciunt esse iusto architecto animi doloremque, consequuntur eaque aut?
       Aut, autem! Commodi non placeat quia fugit velit quibusdam praesentium molestias voluptas dolorem vero labore ea est illum itaque animi, perspiciatis cum blanditiis officia deserunt? Veritatis iure libero ipsum eveniet.
       Iure praesentium dicta, obcaecati facilis doloribus id sapiente, atque, nam deleniti ipsum molestias. Pariatur corporis reiciendis excepturi fugiat consequatur, tenetur suscipit asperiores exercitationem praesentium, similique nobis ab doloremque, iste repellendus.</p>
      </div>
   )
}
export default Header