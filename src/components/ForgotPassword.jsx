import { useState } from "react";
import { useNavigate } from "react-router-dom";
import bcrypt from "bcryptjs";

const ForgotPassword = () => {
   const [forgotPwdForm, setForgotPwdForm] = useState({
      email: "",
      password: "",
      confirm_password: "",
   });
   const [message, setMessage] = useState({
      error: "",
      success: "",
   });
   const [disabledButton,setDisabledButton]=useState(true)

   const handleKeyUp =() =>{
      let {email,password,confirm_password}=forgotPwdForm
      return email.length>0 && password.length>0 && confirm_password.length>0
   }

   const handleDisabledButton=()=>{
      let areInputsWeighted=handleKeyUp()
      setDisabledButton(!areInputsWeighted)
   }

   const navigateTo = useNavigate();
   const saltV = 10;

   const handleInputChange = (e) => {
      let { value, name } = e.target;
      setForgotPwdForm((prevState) => ({
         ...prevState,
         [name]: value,
      }));
   };

   const handleSubmitForgotPassword = async (e) => {
      e.preventDefault();
      //validation here...
      const { email, password, confirm_password } = forgotPwdForm;
      //use lookahead assertions
      // let pattern=/[a-zA-Z0-9!@#$%&*]/g

      const isPasswordValid = (pwd) => {
         const pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

         if (pwd.length < 8) {
            setMessage((mObject) => ({
               ...mObject,
               error: "Password is weak.",
            }));
            setTimeout(
               () => setMessage((mObject) => ({ ...mObject, error: "" })),
               2000
            );
            return false;
         }

         if (!pattern.test(pwd)) {
            setMessage((mObject) => ({
               ...mObject,
               error: "Password must contain at least one lowercase letter, one uppercase letter, and one digit.",
            }));
            setTimeout(
               () => setMessage((mObject) => ({ ...mObject, error: "" })),
               5000
            );
            return false;
         }

         return true;
      };

      if (email === "" || password === "" || confirm_password === "") {
         setMessage((prev) => ({
            ...prev,
            error: "Please fill out all required fields.",
         }));

         setTimeout(() => setMessage((prev) => ({ ...prev, error: "" })), 3000);
         return false;
      }

      if (!isPasswordValid(password)) {
         return false;
      } else if (password !== confirm_password) {
         setMessage((prev) => ({ ...prev, error: "Passwords don't match." }));

         setTimeout(() => setMessage((prev) => ({ ...prev, error: "" })), 3000);
         return false;
      }

      //1 retrieve users from localStorage
      //2 compare this current inputs against the localStorage users
      //...if foundUser, update, alert them, navigate to loginPage
      //... if not foundUser, alert them, return;

      let localUsers = JSON.parse(localStorage.getItem("appUsers"));
      // console.log('localUsers::',localUsers)
      const foundUser = localUsers.find((user) => user.newUser.email === email);
      console.log("foundUser::", foundUser);
      if (foundUser) {
         let hashedPassword = await bcrypt.hash(password, saltV);

         console.log("passwordH:::", hashedPassword);

         setForgotPwdForm((prev) => ({ ...prev, password: hashedPassword }));

         setMessage((prev) => ({ ...prev, success: "Password Updated" }));
         setTimeout(() => {
            setMessage((prev) => ({ ...prev, success: "" }));
            navigateTo("/login");
         }, 2000);
      } else {
         console.log("USER NOT FOUND");
         setMessage((prev) => ({ ...prev, error: "USER NOT FOUND" }));
         setTimeout(() => {
            setMessage((prev) => ({ ...prev, error: "" }));
         }, 3000);
         return;
      }
   };

   return (
      <div className="forgot-password-main">
         <div className="left"></div>
         <div className="forgot-password-center">
            <div className="forgot-password-left">
               <h1 className="store">TechScent</h1>
               <h2>Update Password</h2>
               
               {message.success && <p className="success">{message.success}</p>}
               {message.error && <p className="error">{message.error}</p>}
               <form onSubmit={handleSubmitForgotPassword}>
                  Enter email:{" "}
                  <input
                     type="email"
                     name="email"
                     value={forgotPwdForm.email}
                     onChange={handleInputChange}
                     onKeyUp={handleDisabledButton}
                     className="login-input"
                  />
                  <br />
                  Enter a new password:{" "}
                  <input
                     type="password"
                     name="password"
                     value={forgotPwdForm.password}
                     onChange={handleInputChange}
                     onKeyUp={handleDisabledButton}
                     className="login-input"
                  />
                  <br />
                  Re-enter the new password:{" "}
                  <input
                     type="password"
                     name="confirm_password"
                     value={forgotPwdForm.confirm_password}
                     onChange={handleInputChange}
                     onKeyUp={handleDisabledButton}
                     className="login-input"
                  />
                  <br />
                  <div id="submit_password">
                     <button type="submit" className="btn-submit"
                     disabled={disabledButton}
                   
                     >Submit</button>
                  </div>
               </form>
            </div>
            <div className="forgot-password-right">
               <img
                  src="https://www.getgds.com/images/blog/cybersecurity-threats-2021.jpg"
                  alt="attack"
               />
            </div>
         </div>
         <div className="right"></div>
      </div>
   );
};

export default ForgotPassword;
