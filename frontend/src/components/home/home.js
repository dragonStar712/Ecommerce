import React, { Fragment } from 'react';
import { CgMouse } from "react-icons/cg";
import "./home.css"
import Product from "./Product.js"
import shirt from "./images_for_ex/shirt.png"         // /// temp

const product = {
    name : "Blue Tshirt",
    // images : [{ url : "https://www.indiamart.com/proddetail/sky-blue-plain-t-shirt-18709267312.html"}],
    images : shirt,                     //// temp
    price : "₹3000",
    _id : "maulik",
};


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

        <div className='container' id='container'>
            <Product product={product}/>
            <Product product={product}/>
            <Product product={product}/>
            <Product product={product}/>
            <Product product={product}/>
            <Product product={product}/>
            <Product product={product}/>
            <Product product={product}/>
            <Product product={product}/>
            <Product product={product}/>
            <Product product={product}/>
        </div>

    </Fragment>
  )
}

export default home
