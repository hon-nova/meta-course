import { useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import { useUser} from "../UseContext";
import bcrypt from 'bcryptjs'

const LoginUser = () => {
   const [formLogin, setFormLogin] = useState({
      email: "",
      password: "",
   });
   const [message, setMessage] = useState({
      error: "",
      success: "",
   });
   const {currentUser,setCurrentUser}=useUser()

   const navigateTo = useNavigate()

   const handleInputChange = (e) => {
      let { value, name } = e.target;
     
      setFormLogin((formObject) => ({ ...formObject, [name]: value }));
   };
   const hanldeSubmitLogin = async(e) => {
      e.preventDefault();
      
      const { email, password } = formLogin;
      if(email===''|| password===''){
         console.log('All fields are required.')
         setMessage((mObj)=>({...mObj,error:"Errors! All fields are required."}))

         setTimeout(()=> setMessage((mObj)=>({...mObj,error:""})),3000)
      }

      const localUsers = JSON.parse(localStorage.getItem("appUsers"));
      console.log('localUsers array:::',localUsers)
      if (localUsers) {
         //use PK as email
         const foundUser = localUsers.find((user)=>user.newUser.email===email)
         console.log('foundUser::',foundUser)

         if (foundUser){
            let matchedPs=await bcrypt.compare(password, foundUser.newUser.password)
            console.log('matchedPs:::',matchedPs)
            if(matchedPs){
            
               console.log("Logged in successfully.");
               setMessage((mObj) => ({
                  ...mObj,
                  success: "Success.",
               }));
               setCurrentUser(foundUser.newUser)
               console.log('currentUser:::',currentUser)

               setFormLogin({
                  email:'',
                  password:''
               })
               setTimeout(() => {
                  setMessage((mObj) => ({ ...mObj, success: "" }));
                  navigateTo('/products')
               }, 2000);
            } else {
               console.log("Incorrect Password. Try again.");
               setMessage((mObj) => ({
                  ...mObj,
                  error: "Incorrect Password. Try again.",
               }));
               setTimeout(() => {
                  setMessage((mObj) => ({ ...mObj, error: "" }));
   
               }, 2000);
            }
         
         } else {
               console.log("NOT FOUND 404");
               setMessage((mObj) => ({ ...mObj, error: "NOT FOUND 404" }));

               setTimeout(() => setMessage((mObj) => ({ ...mObj, error: "" })), 2000);
         }
      }
   };

   return (
      <div>
      {message.error && <p className="error">{message.error}</p>}
      {message.success && <p className="success">{message.success}</p>}
         <div className="login">
            <form onSubmit={hanldeSubmitLogin}>
               Enter email:{" "}
               <input
                  type="email"
                  name="email"
                  value={formLogin.email}
                  onChange={handleInputChange}
               />
               <br />
               Enter password:{" "}
               <input
                  type="password"
                  name="password"
                  value={formLogin.password}
                  onChange={handleInputChange}
               />
               <br />
               <div id="login-forgot-pwd">
               <button type="submit">Login</button>
               <Link to='/forgot-password'>Forgot Password? </Link>
               </div>
            </form>
         </div>

         <div className="register">
            <p>
               Haven&apos;t got an account yet? Register{" "}
               <Link to="/register">here...</Link>
            </p>
         </div>
      </div>
   );
};
export default LoginUser;
