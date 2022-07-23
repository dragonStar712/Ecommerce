import './App.css';
import Header from "./components/layout/header/Header"
import Footer from "./components/layout/footer/Footer"
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import webfont from "webfontloader"
import React from 'react';
import Home from "./components/home/home.js"
import ProductDetails from "./components/Product/ProductDetails.js"
import Products from "./components/Product/Products.js" 
import Search  from './components/Product/Search.js';
import LoginSignUp from './components/User/LoginSignUp';

function App() {

  React.useEffect(()=>{
    webfont.load({
      google :{
        families : ["Roboto", "Droid Sans", "Chilanka"]
      }
    })
  })
  

  return (
   <>
   <Router>
      <Header/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/product/:id' element={<ProductDetails/>}/>
        <Route path='/products' element={<Products/>}/>
        <Route path='/products/:keyword' element={<Products/>}/>
        <Route path='/search' element={<Search/>}/>
        <Route path='/login' element={<LoginSignUp/>}/>
      </Routes>
      <Footer/>
   </Router>
    
   </>
  );
}

export default App;
