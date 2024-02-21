import {useUser} from '../UseContext'
const LoggedInUser = ()=>{

   const {currentUser}=useUser()
   console.log('currentUser::',currentUser)

   return (
      <div className="user-login">
          <h1>Hello {currentUser? currentUser.username : 'Guest' }</h1>
      </div>
   )
}
export default LoggedInUser