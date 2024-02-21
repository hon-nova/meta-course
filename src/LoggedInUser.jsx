import {useUser} from './UseContext'
const LoggedInUser = ()=>{

   const {user}=useUser()

   return (
      <h1>Hello {user.name}</h1>
   )
}
export default LoggedInUser