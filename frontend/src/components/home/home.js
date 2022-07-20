import React, { Fragment } from 'react';
import { CgMouse } from "react-icons/cg";
import "./home.css"
import Product from "./Product.js"


const product = {
    name : "Blue Tshirt",
    images : [{ url : "https://www.dreamstime.com/photos-images/blue-shirt.html"}],
    price : "₹3000",
    

}


const home = () => {
  return (
    <Fragment>
      
      <div className='banner'>
        <p>Welcome to Ecommerce</p>
        <h1>FIND AMAZING PRODUCT BELOW</h1>

        <a href="#container">
            <button>
                Scroll <CgMouse/>
            </button>
        </a>
      </div>

    <h2 className='homeHeading'>Featured Products</h2>
    <div className='container' id='container'></div>
    
    <Product product={product}/>

    </Fragment>
  )
}

export default home
