import React, { Fragment, useEffect, useState } from 'react'
import "./Products.css"
import { useSelector, useDispatch } from 'react-redux';
import { clearErrors, getProduct } from '../../actions/productAction';
import Loader from '../layout/loader/Loader';
import ProductCard from '../home/ProductCard';
import { useParams } from 'react-router-dom';
import Pagination from "react-js-pagination";       
import { Typography } from '@mui/material';
import Slider from '@mui/material/Slider';       //price filtere not working!!
import { useAlert } from "react-alert"
import MetaData from "../layout/MetaData";

const categories = [
    "Laptop",
    "Footwear",
    "Bottom",
    "Tops",
    "Attire",
    "Camera",
    "SmartPhones",
  ];
  

const Products = () => {

    const alert = useAlert();
    const dispatch = useDispatch();
    const {keyword} = useParams();
    const [currentPage, setCurrentPage] = useState(1);
    // const [price, setPrice] = useState([0, 25000]);
    const [category, setCategory ] = useState("");
    const [ratings, setRatings] = useState(0);
    
    const { 
        loading, 
        error, 
        products,
        productsCount,
        resultPerPage,
        // filteredProductsCount,
        } = useSelector(
        (state) => state.products
      );
    
    const setCurrentPageNo =(e) => {
        setCurrentPage(e);
    }

    // const priceHandler =(e, newPrice) => {
    //     setPrice(newPrice);
    // }

    useEffect(()=>{
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
          }
        // dispatch(getProduct(keyword,currentPage,price));
        console.log(category);
        dispatch(getProduct(category, keyword,currentPage, ratings, error));
    }, [dispatch, category, keyword,currentPage, ratings, alert, error]);
    // }, [dispatch, keyword,currentPage, price, error]);

    // let count = filteredProductsCount;
    console.log(category);
    return (
    <Fragment>
        {loading? (<Loader/>) : (
        
        <Fragment>

            <MetaData title="PRODUCTS -- ECOMMERCE" />
            <h2 className='productsHeading'>Products</h2>
            
            <div className='products'>

                {products && products.map((product)=>{
                    return <ProductCard key={product._id} product={product}/>
                })}
            </div>

                {/* {keyword && */}
                <div>
                {/* <div className='filterBox'>
                     <Typography>Price</Typography>
                     <Slider
                         value={price}
                         onChange={priceHandler}
                         valueLabelDisplay="on"
                         aria-labelledby="range-slider"
                         min={0}
                         max={25000}
                     />
                
                 </div>  */}
            <div className='widthset'>

            <Typography>Categories</Typography>
            <ul className="categoryBox">
              {categories.map((category) =>  <li className="category-link" key={category} onClick={() => setCategory(category)}> {category} </li>)}
            </ul>
            </div>

            <div className='widthset'>
            <fieldset>
              <Typography component="legend">Ratings Above</Typography>
              <Slider
                value={ratings}
                onChange={(e, newRating) => {
                  setRatings(newRating);
                }}
                aria-labelledby="continuous-slider"
                valueLabelDisplay="auto"
                min={0}
                max={5}
              />
            </fieldset>
            </div>
            </div>
            {/* } */}

                {resultPerPage<productsCount &&
                <div className='paginationBox'>
                <Pagination
                activePage={currentPage}
                itemsCountPerPage={resultPerPage}
                totalItemsCount={productsCount}
                onChange={setCurrentPageNo}
                nextPageText="Next"
                prevPageText="Prev"
                firstPageText="1st"
                lastPageText="Last"
                itemClass="page-item"
                linkClass="page-link"
                activeClass="pageItemActive"
                activeLinkClass="pageLinkActive"
                />
            </div>
            }
        </Fragment>)}

    </Fragment>
  )
}

export default Products
