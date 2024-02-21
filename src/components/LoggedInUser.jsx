import {useUser} from '../UseContext'
const LoggedInUser = ()=>{

   const {user}=useUser()

   return (
      <div className="user-login">
          <h1>Hello {user.name}</h1>
      </div>
     
   )
}
export default LoggedInUser