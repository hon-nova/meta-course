import React from 'react'
import {Link} from 'react-router-dom'
class Footer extends React.Component{
   constructor(props){
      super(props)
      this.state={

      }
   }
   render(){
      return(
         <div id="footer">
            <footer>
               <p>Copyright &#169;2024 <Link to="https://www.linkedin.com/in/hon-nguyen/" target="_blank">Hon Nguyen</Link></p>
            </footer>
         </div>
      )
   }
}
export default Footer