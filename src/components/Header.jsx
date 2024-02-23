import LoggedInUser from "./LoggedInUser";
import { useNavigate } from "react-router-dom";

const Header = () => {
   /*const {contextProducts} =useUser()*/
   const navigateTo = useNavigate()
   return (
      <div className="header-main">
         <div className="left">left</div>
         <div className="center">
            <LoggedInUser />
            <div className="intro">
               <h2>Welcome to TechScent Store!</h2>
            </div>
            <div className="start">
               <p id='short-intro'>
                  There is a comprehensive list of products available for
                  purchase, organized into categories for easy navigation.The
                  detailed information about each product encompassing images,
                  descriptions, prices and its stock availability for your
                  convenience.
               </p>
               <button id="btn-start" onClick={()=>{navigateTo('/products')}}>Let&apos;s start exploring</button>
               
            </div>
         </div>
         <div className="right">right</div>
      </div>
   );
};
export default Header;
