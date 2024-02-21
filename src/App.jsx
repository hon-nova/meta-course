import Header from "./components/Header";
// import Page from "./components/Page";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RegisterUser from "./components/RegisterUser";
import Navbar from './components/Navbar'
import Profile from './components/Profile'
import Logout from './components/Logout'
import {useState, useEffect} from 'react'
import LoginUser from "./components/LoginUser";
import Cart from './components/Cart'
import ProductList from "./components/ProductList";
import { useUser } from './UseContext'
import Footer from "./components/Footer";

function App() {
   const [appUsers, setAppUsers]=useState([])
   const [cartPassed,setCartPassed]=useState([])

   const takeCart = (data)=>{
      setCartPassed(data)
   }

   const takeUsers = (data)=>{
     setAppUsers([...appUsers,data])
   }  

   useEffect(()=>{
      const localUsers = localStorage.getItem('appUsers')
      // console.log('localUsers::',localUsers)
      if(localUsers){
         setAppUsers(JSON.parse(localUsers))
      }
   },[])
   useEffect(()=>localStorage.setItem('appUsers',JSON.stringify(appUsers)),[appUsers])
   // localStorage.clear()

   /**Products Part */
   const [productsApp,setProductsApp]=useState([])
   // const [cart,setCart]=useState([])
  
   const fetchProducts= async ()=>{
     const response = await fetch('https://dummyjson.com/products')
     const result = await response.json()
     const dataReturn = result.products
   //   console.log(dataReturn)
     setProductsApp(dataReturn)
   }
  
   useEffect(()=>{
     fetchProducts()
   },[])

   let {setContextProducts}=useUser()
   setContextProducts(productsApp)
   /**cartProducts */
   
   return (
      <Router basename="/meta-course">
         <Navbar />
         
         <Routes>
         <Route path="/" element={<Header/>}/>
            <Route path="/register" element={<RegisterUser callback={takeUsers} />} />
            <Route path="/profile" element={<Profile />}/>
            <Route path="/login" element={<LoginUser />}/>
            <Route path="/logout" element={<Logout />}/>
            <Route path="/cart" element={<Cart cart={cartPassed}/>}/>
            <Route path="/products" element={<ProductList products={productsApp} callback={takeCart}/>}/>
         </Routes>
        <Footer/>
      </Router>
   );
}

export default App;
