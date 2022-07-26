import {
    ADD_TO_CART,

} from "../constants/cartConstants"

import axios from "axios"

// add to cart 
export const addItemsToCart = (id, quantity) => async (dispatch, getState) => {
        
    const {data} = await axios.get(`/api/v1/product/${id}`);

        dispatch({ type : ADD_TO_CART, payload: {
            product : data.product._id,
            name :  data.product.name,
            price : data.product.price,
            image : data.product.image[0].url,
            stock : data.product.stock,
            quantity,
        }});

        localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems)) ;
            /// on clicking refresh, items in cart should not revert back to its intital state, thus taking help of localstorage
        // console.log(localStorage.getItem("cartItems"));
}


// remove from  cart 
export const removeItemsFromCart = (id, quantity) => async (dispatch, getState) => {
        
    const {data} = await axios.get(`/api/v1/product/${id}`);

        dispatch({ type : ADD_TO_CART, payload: {
            product : data.product._id,
            name :  data.product.name,
            price : data.product.price,
            image : data.product.image[0].url,
            stock : data.product.stock,
            quantity,
        }});

        localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems)) ;
            /// on clicking refresh, items in cart should not revert back to its intital state, thus taking help of localstorage
        // console.log(localStorage.getItem("cartItems"));
}
