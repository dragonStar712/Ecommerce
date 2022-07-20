import './App.css';
import Header from "./components/layout/header/Header"
import Footer from "./components/layout/footer/Footer"
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import webfont from "webfontloader"
import React from 'react';
import Home from "./components/home/home.js"


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
      </Routes>
      
      <Footer/>
   </Router>
    
   </>
  );
}

export default App;
