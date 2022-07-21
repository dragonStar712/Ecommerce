import React, { Fragment, useEffect } from 'react';
import { CgMouse } from "react-icons/cg";
import "./home.css"
import Product from "./Product.js"
import MetaData from '../layout/metaData';
import {getProduct} from '../../actions/productAction';
import {useSelector, useDispatch} from 'react-redux';
import Loader from "../layout/loader/Loader"
import {useAlert} from "react-alert"

// const product = {
//     name : "Blue Tshirt",
//     images : [{ url : "https://5.imimg.com/data5/JH/SP/MY-33710583/men-s-blue-shirt-500x500.jpg"}],
//     price : "₹3000",
//     _id : "maulik",
// };


const Home = () => {

  const alert = useAlert();
  const dispatch = useDispatch();

  const { loading, error, products, productsCount} = useSelector(
    (state) => state.products
  );

  useEffect(()=>{
    if(error){
      return alert.error(error);
    }
    dispatch(getProduct());
  }, [dispatch, error, alert]);

  return (
    <Fragment>
    {loading? (<Loader/>) :   <Fragment>
                    <MetaData title="eCOMMERCE"></MetaData>

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
              
                        {
                          products && products.map(product =>{
                            return <Product product={product}/>
                          })
                        }
                      </div>
                      </Fragment>
      }
    </Fragment>
  )
}

export default Home;
