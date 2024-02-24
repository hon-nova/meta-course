/* eslint-disable no-unused-vars */
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
import ForgotPassword from "./components/ForgotPassword";


function App() {
   const {setCartItems,cartItems,quantity,setQuantity}=useUser()
   const [appUsers, setAppUsers]=useState([])
   const [cartPassed,setCartPassed]=useState([])
   const [totalItems, setTotalItems] = useState(quantity);

   const takeCart = (data)=>{
      setCartPassed(data)
   }
   const takeUsers = (data)=>{
     setAppUsers([...appUsers,data])
   }  
console.log('quantityApp:::',quantity)
   const takeTotalItems =(data)=>{
      setTotalItems(data)
      setCartItems(cartItems)
     setQuantity(data)
   }

   useEffect(()=>{
      let countItem=cartPassed.reduce((total,{quantity})=>total+quantity,0)     
      setTotalItems(countItem)
   },[cartPassed,setQuantity,quantity])
  
   console.log('totalItems::',totalItems)
   console.log('quantity::',quantity)
 
   useEffect(()=>{
      const localUsers = localStorage.getItem('appUsers')
     
      if(localUsers){
         setAppUsers(JSON.parse(localUsers))
      }
   },[])

   useEffect(()=>localStorage.setItem('appUsers',JSON.stringify(appUsers)),[appUsers])
   // localStorage.clear()

   /**Products Part */
   const [productsApp,setProductsApp]=useState([])
   const [filteredProducts,setFilteredProducts]=useState([])
   
   const fetchProducts= async ()=>{
     const response = await fetch('https://dummyjson.com/products')
     const result = await response.json()
     const dataReturn = result.products
  
     setProductsApp(dataReturn)
     setFilteredProducts(dataReturn)
   }
  
   useEffect(()=>{
     fetchProducts()
   },[])

   const handleSelectChange =(e)=>{
      let selectedCategory=e.target.value
      let filtered =productsApp.filter(elem=>elem.category===selectedCategory)
      
      console.log('filtered:::',filtered)
      if(selectedCategory==='all'){
         setFilteredProducts(productsApp)
      } else {
          setFilteredProducts(filtered)
   }
      }

   let {setContextProducts}=useUser()
   // setContextProducts(productsApp)
   
   useEffect(() => {
      // setCartItems(cartPassed);
   }, [cartPassed, setCartItems]);
   
   /**cartProducts */
   
   return (
      <Router basename="/meta-course">
         <Navbar totalItems={totalItems}/>
         
         <Routes>
         <Route path="/" element={<Header/>}/>
            <Route path="/register" element={<RegisterUser callback={takeUsers} />} />
            <Route path="/profile" element={<Profile />}/>
            <Route path="/login" element={<LoginUser />}/>
            <Route path="/logout" element={<Logout />}/>
            <Route path="/cart" element={<Cart cart={cartPassed}/>}/>
            <Route path="/products" element={<ProductList products={filteredProducts} callback={takeCart} cbTotalItem={takeTotalItems} handleSelectChange={handleSelectChange}/>}/>
            <Route path='/forgot-password' element={<ForgotPassword/>}/>
         </Routes>
        <Footer/>
      </Router>
   );
}

export default App;
