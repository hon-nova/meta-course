import {useState} from 'react'
import { useNavigate } from 'react-router-dom';
const ForgotPassword = () => {


const [forgotPwdForm,setForgotPwdForm]=useState({
   email:'',
   password:'',
   confirm_password:''
})
const [message,setMessage]=useState({
   error:'',
   success:''
})

const navigateTo =useNavigate()

const handleInputChange =(e)=>{
   let {value,name}= e.target
   setForgotPwdForm((prevState)=>({
      ...prevState,
      [name]: value
   }))
}

const handleSubmitForgotPassword =(e)=>{
   e.preventDefault()
   //validation here...
   const {email,password, confirm_password}=forgotPwdForm

   let pattern=/[a-zA-Z0-9!@#$%&*]/g

   const isPasswordValid = (pwd)=>{
      if(pattern.test(pwd)===true){
         return true
      } else {
         return false
      }
   }

   if(email==='' || password===''||confirm_password===''){
      setMessage((prev)=>({...prev, error: 'Please fill out all required fields.'}))

      setTimeout(()=>setMessage((prev)=>({...prev, error: ''})),3000)
      return false
   }

   if(!isPasswordValid(password)){

      setMessage((prev)=>({...prev, error: 'Invalid Password. Password must contain lowercases, uppercase, numbers, special characters: !@#$%&*'}))

      setTimeout(()=>setMessage((prev)=>({...prev, error: ''})),3000)

      return false;

   } else if(password!==confirm_password){
      setMessage((prev)=>({...prev, error: 'Please fill out all required fields.'}))

      setTimeout(()=>setMessage((prev)=>({...prev, error: ''})),3000)
      return false;
   }
   
   //1 retrieve users from localStorage
   //2 compare this current inputs against the localStorage users
   //...if foundUser, update, alert them, navigate to loginPage
   //... if not foundUser, alert them, return;
   
   let localUsers=JSON.parse(localStorage.getItem('appUsers'))
   // console.log('localUsers::',localUsers)
   const foundUser = localUsers.find((user)=>user.newUser.email===email)
   console.log('foundUser::',foundUser)
   if(foundUser){

      setForgotPwdForm((prev)=>({...prev,password: password}))

      setMessage((prev)=>({...prev,success:'Password Updated'}))
      setTimeout(() => {
         setMessage((prev)=>({...prev,success:''}))
         navigateTo('/login')
      }, 2000);

   } else {
      console.log("USER NOT FOUND")
      setMessage((prev)=>({...prev,error:'USER NOT FOUND'}))
      setTimeout(() => {
         setMessage((prev)=>({...prev,error:''}))
      }, 3000);
      return;
   }
}

   return (
      <div className="forgot_password">
      <h2>Update Password</h2>
      {message.success && <p className='success'>{message.success}</p>}
      {message.error && <p className='error'>{message.error}</p>}
         <form onSubmit={handleSubmitForgotPassword}>
            Enter email: <input type="email" name="email" value={forgotPwdForm.email} onChange={handleInputChange} />
            <br />
            Enter a new password: <input type="password" name="password" value={forgotPwdForm.password} onChange={handleInputChange}/>
            <br />
            Re-enter the new password: <input type="password" name="confirm_password" value={forgotPwdForm.confirm_password} onChange={handleInputChange} />
            <br />
            <div id="submit_password">
               <button type="submit">Submit</button>
            </div>
         </form>
      </div>
   );
};

export default ForgotPassword;
