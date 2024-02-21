import {createContext,useContext,useState} from 'react'

const UserContext = createContext(undefined)

// eslint-disable-next-line react/prop-types
export const UserProvider = ({children})=>{
   //which variables you want?

   const [user,setUser]=useState({
      name: 'hon',
      email: 'hon@vancouver.ca',
      dob: '01/01/2024'
   })

   return <UserContext.Provider value={{user,setUser}}>{children}</UserContext.Provider>
}

export const useUser=()=>useContext(UserContext)