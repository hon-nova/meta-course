/* eslint-disable react/prop-types */
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuid } from "uuid";
import bcrypt from "bcryptjs";

const RegisterUser = ({ callback }) => {
   const [formInput, setFormInput] = useState({
      username: "",
      email: "",
      password: "",
      confirm_password: "",
   });

   const [message, setMessage] = useState({
      error: "",
      success: "",
   });
   const navigateTo = useNavigate();

   const [buttonDisabled, setButtonDisabled] = useState(true);

   const saltV = 10;

   const handleInputChange = (e) => {
      let { name, value } = e.target;

      setFormInput((thisFormInputObject) => ({
         ...thisFormInputObject,
         [name]: value,
      }));
   };
   const handleKeyUp = () => {
      let { username, email, password, confirm_password } = formInput;
      return (
         username.length > 0 &&
         email.length > 0 &&
         password.length > 0 &&
         confirm_password.length > 0
      );
   };
   const handleDisabledButton = () => {
      const areInputWeighted=handleKeyUp()
      setButtonDisabled(!areInputWeighted);
   };

   const handleSubmit = async (e) => {
      e.preventDefault();

      setFormInput({});
      let { username, email, password, confirm_password } = formInput;
      const isPasswordValid = (pwd) => {
         const pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

         if (pwd.length < 8) {
            setMessage((mObject) => ({
               ...mObject,
               error: "Password is weak. ",
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
     
      if (password !== confirm_password) {
         setMessage((mObject) => ({
            ...mObject,
            error: "Passwords don't match. Try again.",
         }));
         setTimeout(() => setMessage(""), 2000);

         return;
      }
      if (!isPasswordValid(password)) {
         return;
      }

      const hashedPassword = await bcrypt.hash(password, saltV);

      console.log("passwordH:::", hashedPassword);

      let newUser = { id: uuid(), username, email, password: hashedPassword };
      if (callback) {
         callback({ newUser });
      }
      setMessage((mObject) => ({
         ...mObject,
         success: "Successfully registered.",
      }));
      setFormInput({
         username: "",
         email: "",
         password: "",
         confirm_password: "",
      });

      setTimeout(() => {
         setMessage((mObject) => ({ ...mObject, success: "" }));
         setFormInput;
         navigateTo("/login");
      }, 1000);
   };
   return (
      <div className="register-main-container">
         <div className="left"></div>
         <div className="register-main">
            <div className="register-left">
               {message.success && <p className="success">{message.success}</p>}

               {message.error && <p className="error">{message.error}</p>}
               <form onSubmit={handleSubmit}>
                  <h1 className="store">TechScent</h1>
                  Username:
                  <input
                     type="text"
                     name="username"
                     value={formInput.username}
                     onChange={handleInputChange}
                     onKeyUp={handleDisabledButton}
                     className="login-input"
                  />
                  <br />
                  Email address:
                  <input
                     type="email"
                     name="email"
                     value={formInput.email}
                     onChange={handleInputChange}
                     onKeyUp={handleDisabledButton}
                     className="login-input"
                  />
                  <br />
                  Password:
                  <input
                     type="password"
                     name="password"
                     value={formInput.password}
                     onChange={handleInputChange}
                     onKeyUp={handleDisabledButton}
                     className="login-input"
                  />
                  <br />
                  Re-type Password:{" "}
                  <input
                     type="password"
                     name="confirm_password"
                     value={formInput.confirm_password}
                     onChange={handleInputChange}
                     onKeyUp={handleDisabledButton}
                     className="login-input"
                  />
                  <br />
                  <button
                     type="submit"
                     className="btn-submit"
                     disabled={buttonDisabled}                   
                     
                  >
                     Register
                  </button>
               </form>
            </div>
            <div className="image-right">
               <img
                  src="https://neilpatel.com/wp-content/uploads/2015/04/ecommerce.jpg"
                  alt="img-right"
                  id="reg-image"
               />
            </div>
         </div>
         <div className="right"></div>
      </div>
   );
};
export default RegisterUser;
