/* eslint-disable react/prop-types */
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuid } from 'uuid';

import bcrypt from 'bcryptjs';
const RegisterUser = ({callback}) => {
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
   const navigateTo=useNavigate()

   const saltV=10

   const handleInputChange = (e) => {
      let { name, value } = e.target;     

      setFormInput((thisFormInputObject) => ({
         ...thisFormInputObject,
         [name]: value,
      }));
   };
   const handleSubmit = async(e) => {
      e.preventDefault();
      setFormInput({});
      let { username, email, password, confirm_password } = formInput;
      const isPasswordValid = (pwd) => {
         const pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
      
         if (pwd.length < 8) {
            setMessage((mObject) => ({
               ...mObject,
               error: 'Password is weak. It must be at least 8 characters long.',
            }));
            setTimeout(() => setMessage((mObject) => ({ ...mObject, error: '' })), 2000);
            return false;
         }
      
         if (!pattern.test(pwd)) {
            setMessage((mObject) => ({
               ...mObject,
               error:
                  'Password must contain at least one lowercase letter, one uppercase letter, and one digit.',
            }));
            setTimeout(() => setMessage((mObject) => ({ ...mObject, error: '' })), 5000);
            return false;
         }
      
         return true;
      };
      

      if (
         username === "" ||
         email === "" ||
         password === "" ||
         confirm_password === ""
      ) {
         setMessage((mObject) => ({
            ...mObject,
            error: "Please fill out all fields.",
         }))
         setTimeout(
            () =>setMessage(''),2000
         )
         return;
      }
      if (password !== confirm_password) {
         setMessage((mObject) => ({
            ...mObject,
            error: "Passwords don't match. Try again.",
         }))         
         setTimeout(
            () =>setMessage('')
              ,
            2000
         );

         return;
      }
      if(!isPasswordValid(password)){
         return;
      }

      const hashedPassword=await bcrypt.hash(password,saltV)

      console.log('passwordH:::',hashedPassword)

      let newUser={id: uuid(),username,email,password:hashedPassword}
      if(callback){
         callback({newUser})
      }
      setMessage((mObject) => ({
         ...mObject,
         success: "Successfully registered.",
      }))
      setFormInput({  
      username: "",
      email: "",
      password: "",
      confirm_password: "",})

      setTimeout(()=>{
         setMessage((mObject)=>({...mObject,success:''}))
         setFormInput
         navigateTo('/login')
      }  
     
      ,1000)
   };
  
   return (
      <div className="register-main">
         {message.success && <p className="success">{message.success}</p>}

         {message.error && <p className="error">{message.error}</p>}
         <form onSubmit={handleSubmit}>
            Username:
            <input
               type="text"
               name="username"
               value={formInput.username}
               onChange={handleInputChange}
            />
            <br />
            Email:
            <input
               type="email"
               name="email"
               value={formInput.email}
               onChange={handleInputChange}
            />
            <br />
            Password:
            <input
               type="password"
               name="password"
               value={formInput.password}
               onChange={handleInputChange}
            />
            <br />
            Re-type Password:{" "}
            <input
               type="password"
               name="confirm_password"
               value={formInput.confirm_password}
               onChange={handleInputChange}
            />
            <br />
            <button type="submit">Register</button>
         </form>
      </div>
   );
};
export default RegisterUser;
