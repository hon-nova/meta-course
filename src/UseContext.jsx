import {createContext,useContext,useState} from 'react'

const UserContext = createContext(undefined)

// eslint-disable-next-line react/prop-types
export const UserProvider = ({children})=>{
   //which variables you want?

   const [currentUser,setCurrentUser]=useState(null)
   const [contextProducts, setContextProducts]=useState([]) 
   const [cartItems,setCartItems]=useState([])
  
   
 
   
   return <UserContext.Provider value={{currentUser,setCurrentUser,contextProducts,setContextProducts,cartItems,setCartItems}}>{children}</UserContext.Provider>
}

export const useUser=()=>useContext(UserContext)