import './App.css';
import Header from "./components/layout/header/Header"
import Footer from "./components/layout/footer/Footer"
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import webfont from "webfontloader"
import React, { Fragment } from 'react';
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
// import ProtectedRoutes3 from './components/Routes/ProtectedRoutes3.js';
import ForgotPassword from "./components/User/ForgotPassword.js"
import ResetPassword from "./components/User/ResetPassword.js"
import Cart from "./components/cart/Cart.js"

function App() {


  const {isAuthenticated, user} = useSelector(state => state.user);

  React.useEffect(()=>{
    webfont.load({
      google :{
        families : ["Roboto", "Droid Sans", "Chilanka"]
      }
    })
    store.dispatch(loadUser());

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
        
       </Routes>
      <Footer/>
   </Router>
    
   </>
  );
}

export default App;
