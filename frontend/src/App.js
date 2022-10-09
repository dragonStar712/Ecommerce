import './App.css';
import Header from "./components/layout/header/Header"
import Footer from "./components/layout/footer/Footer"
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import webfont from "webfontloader"
import React, { Fragment, useState } from 'react';
import Home from "./components/home/home.js"
import ProductDetails from "./components/Product/ProductDetails.js"
import Products from "./components/Product/Products.js" 
import Search  from './components/Product/Search.js';
import LoginSignUp from './components/User/LoginSignUp';
import store  from './store';
import { loadUser } from './actions/userAction';
import UserOptions from './components/layout/header/UserOptions.js'
import { useSelector } from 'react-redux';
import Profile from "./components/User/Profile.js"
import ProtectedRoute from './components/Routes/ProtectedRoutes';
import ProtectedRoute1 from './components/Routes/ProtectedRoutes1.js';
import ProtectedRoutes2 from './components/Routes/ProtectedRoutes2.js';
import ProtectedRoutes3 from './components/Routes/ProtectedRoutes3.js';
import ProtectedRoutes4 from './components/Routes/ProtectedRoutes4.js';
import ProtectedRoutes5 from './components/Routes/ProtectedRoutes5.js';
import ProtectedRoutes6 from './components/Routes/ProtectedRoutes6.js';
import ForgotPassword from "./components/User/ForgotPassword.js"
import ResetPassword from "./components/User/ResetPassword.js"
import Cart from "./components/cart/Cart.js"
import axios from 'axios';

function App() {


  const {isAuthenticated, user} = useSelector(state => state.user);

  const [stripeApiKey, setStripeApiKey] = useState("");

  async function getStripeApiKey() {
    const {data} = await axios.get("/api/v1/stripeapikey");
    setStripeApiKey(data.stripeApiKey);
  }

  React.useEffect(()=>{
    webfont.load({
      google :{
        families : ["Roboto", "Droid Sans", "Chilanka"]
      }
    })
    store.dispatch(loadUser());
    getStripeApiKey();
  },[]);
  

  return (
   <>
   <Router>
      <Header/>
      {isAuthenticated && <UserOptions user={user} />}

       <Routes>
        <Route path='/' element={<Home/>}/>
        
        {/* <Route path='/*' element={
          <ProtectedRoute path="/account" element={<Profile/>}/>
        }> 
          </Route> */}
        {/* <Route path='/account' element={<ProtectedRoute/>}/> */}
        <Route path='/account' element={<ProtectedRoute element={Profile}/>}/>
        <Route path='/me/update' element={<ProtectedRoute1/>}/>
        {/* <Route path='/me/update' element={<ProtectedRoute1/>}/> */}
        <Route path='/product/:id' element={<ProductDetails/>}/>
        <Route path='/products' element={<Products/>}/>
        <Route path='/products/:keyword' element={<Products/>}/>
        <Route path='/search' element={<Search/>}/>
        <Route path='/login' element={<LoginSignUp/>}/>
        <Route path='/password/update' element={<ProtectedRoutes2/>}/>
        <Route path='/password/forgot' element={<ForgotPassword/>}/>
        <Route path='/password/reset/:token' element={<ResetPassword/>}/>
        <Route path='/cart' element={<Cart/>}/>
        <Route path='/login/shipping' element={<ProtectedRoutes3/>}/>
        {/* <Route path='/shipping' element={<ProtectedRoutes3/>}/>     still not working 1!!!        */}
        <Route path='/order/confirm' element={<ProtectedRoutes5/>}/>       
        
        {/* <Elements stripe={loadStripe(stripeApiKey)}> */}

          <Route path='/process/payment' element={<ProtectedRoutes4/>}/>
          <Route path='/success' element={<ProtectedRoutes6/>}/>
        
        {/* </Elements> */}
       
       
       </Routes>
      <Footer/>
   </Router>
    
   </>
  );
}

export default App;
