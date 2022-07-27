import React, { Fragment, useEffect , useState} from 'react'
// import Carousel from "react-material-ui-carousel";
import "./ProductDetails.css"
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, getProductDetails } from '../../actions/productAction';
import { useParams } from 'react-router-dom';
import ReactStars from 'react-rating-stars-component';
import ReviewCard from "./ReviewCard.js"
import Loader from '../layout/loader/Loader';
import { useAlert } from 'react-alert';
import MetaData from '../layout/MetaData';
import {addItemsToCart} from "../../actions/cartAction"

const ProductDetails = () => {

    const {id} = useParams();
    const alert = useAlert();
    const dispatch = useDispatch();

    const {product, loading, error} = useSelector(
        (state) => state.productDetails,
    );
    
    const[quantity, setQuantity] = useState(1);

    const increaseQuantity = () =>{
        if(product.stock <= quantity)   return;

        const qty = quantity + 1;
        setQuantity(qty);
    }

    const decreaseQuantity = () =>{
        if(1 >= quantity)   return;
        // console.log("!2");
        const qty = quantity - 1;
        setQuantity(qty);
    }

    const addToCartHandler = () =>{
        dispatch(addItemsToCart(id, quantity));
        alert.success("Items added to Cart");
    }

    // console.log(localStorage.getItem("cartItems"));
    useEffect(()=>{
        if(error){
            alert.error(error);
            dispatch(clearErrors());
        }
        dispatch(getProductDetails(id));
    }, [dispatch, id, error, alert]);
    
    const options ={
        edit : false,
        color : "rgba(20,20,20,0.1)",
        activeColor : "tomato",
        size : window.innerWidth < 600 ? 20 : 25,
        value : product.ratings,
        isHalf : true,
    
    }

    return (
    <Fragment>
        {loading ?(
            <Loader/>
        
            ) : (
            <Fragment>
                <MetaData title={`${product.name} ... ECOMMERECE`}></MetaData>
                <div className='ProductDetails'>
                <div>
                    {/* <Carousel>                                           ///////////////////// carousel not working*/}
                        {
                            product.image &&
                            product.image.map((item, i) =>{
                                return <img className='CarouselImage'
                                key={item.url}
                                src={item.url}
                                alt={`${i} Slide`}/>
                            })}
                    {/* </Carousel> */}
                </div>
                <div>

                <div className='detailsBlock-1'> 
                        <h2>{product.name}</h2>
                <p>Product # {product._id}</p>
                
                </div>

                <div className='detailsBlock-2'>
                    <ReactStars {...options} />
                    <span>({product.numOfReviews} Reviews)</span>
                </div>
                
                <div className='detailsBlock-3'>
                    <h1>{`₹${product.price}`}</h1>
                    <div className='detailsBlock-3-1'>
                        <div className='detailsBlock-3-1-1'>
                            <button onClick={decreaseQuantity}>-</button>
                            <input value={quantity} readOnly type="number"/>
                            <button onClick={increaseQuantity}>+</button>
                        </div>{" "}

                        <button onClick={addToCartHandler}> Add to Cart</button>
                    </div>

                    <p>
                        Status:{" "}
                        <b className={product.stock < 1 ? "redColor" : "greenColor"}>
                        {product.stock < 1 ? "OutOfStock" : "InStock"}
                            </b> 
                    </p>
                </div>
                
                <div className='detailsBlock-4'>
                    Description : <p>{product.description}</p>
                </div>

                <button className='submitReview'>Submit Review</button>
                </div>
        </div>
        <h3 className='reviewsHeading'>REVIEWS</h3>
        {
            product.reviews && product.reviews[0] ?(
                <div className='reviews'>
                    {product.reviews && 
                    product.reviews.map((review) => <ReviewCard review={review}/>)}
                </div>
            ) :(
                <p className='noReviews'>No Reviews Yet</p>
            )}
        </Fragment>
        
    ) }
</Fragment>
  )
}

export default ProductDetails
