import React, { Fragment, useEffect, useState } from 'react'
import "./Products.css"
import { useSelector, useDispatch } from 'react-redux';
import { clearErrors, getProduct } from '../../actions/productAction';
import Loader from '../layout/loader/Loader';
import ProductCard from '../home/ProductCard';
import { useParams } from 'react-router-dom';
import Pagination from "react-js-pagination";       
// import { Typography } from '@mui/material';
// import Slider from '@mui/material/Slider';       price filtere not working!!

const Products = () => {

    const dispatch = useDispatch();
    const {keyword} = useParams();

    const [currentPage, setCurrentPage] = useState(1);
    // const [price, setPrice] = useState([0, 25000]);

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
        dispatch(getProduct(keyword,currentPage));
    }, [dispatch, keyword,currentPage, error]);
    // }, [dispatch, keyword,currentPage, price, error]);

    // let count = filteredProductsCount;
    // console.log(filteredProductsCount);
    return (
    <Fragment>
        {loading? (<Loader/>) : (
        
        <Fragment>
            <h2 className='productsHeading'>Products</h2>
            
            <div className='products'>

                {products && products.map((product)=>{
                    return <ProductCard key={product._id} product={product}/>
                })}
            </div>

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
                
                </div> */}

                {/* <div className='filterBox'>
                    <Typography>Categories</Typography>
                    <Slider
                        value={price}
                        onChange={priceHandler}
                        valueLabelDisplay="on"
                        aria-labelledby="range-slider"
                        min={0}
                        max={25000}
                    />
                
                </div> */}


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
