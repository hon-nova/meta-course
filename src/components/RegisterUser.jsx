import { useState, useEffect } from "react";

const RegisterUser = () => {
   const [formInput, setFormInput] = useState({
      username: "",
      email: "",
      password: "",
      confirm_password: "",
   });
   const [registeredUsers, setRegisteredusers] = useState([]);

   const [message, setMessage] = useState({
      error: "",
      success: "",
   });

   const handleInputChange = (e) => {
      let { name, value } = e.target;
      console.log("name - value:::", name, value);

      setFormInput((thisFormInputObject) => ({
         ...thisFormInputObject,
         [name]: value,
      }));
   };
   const handleSubmit = (e) => {
      e.preventDefault();
      setFormInput({});
      const { username, email, password, confirm_password } = formInput;
      const isValidPassword=(pwd)=>{
         const pattern=/[a-zA-Z0-9!#$%&*]/g
         if(pwd.length<8){
            setMessage((mObject)=>({...mObject,error:'Password is not strong.'}))
            setTimeout(()=> setMessage((mObject)=>({...mObject,error:''})),2000)
            return false
         }
         if(pattern.test(pwd)===false){
            setMessage((mObject)=>({...mObject,error:'Password must contain lowercase letters, uppercase letters, and special characters !#$%&*'}))

            setTimeout(()=> setMessage((mObject)=>({...mObject,error:''})),5000)
            return false
         }
         if(pwd.length<8){
            setMessage((mObject)=>({...mObject,error:"Password is not strong. Please try again."}))
            setTimeout(()=>setMessage((mObject=>({...mObject,error:''}))),2000)
            return false
         }
         return true;
      }

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
         );

         // setMessage()
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
      if(!isValidPassword(password)){
         return;
      }
      setRegisteredusers((prevState) => [
         ...prevState,
         { username, email, password },
      ]);
      setMessage((mObject) => ({
         ...mObject,
         success: "Successfully registered.",
      }))
      
      setFormInput({ 
         username: "",
         email: "",
         password: "",
         confirm_password: "",})

      setTimeout(()=>
         setMessage((mObject)=>({...mObject,success:''}))
         ,1000)
     
     
   };
   useEffect(() => console.log(registeredUsers), [registeredUsers]);
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
