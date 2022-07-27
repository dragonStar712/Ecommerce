// import {combineReducers, applyMiddleware} from "redux"
import thunk from "redux-thunk"
import { configureStore } from '@reduxjs/toolkit';
import { cartReducer } from './reducers/cartReducer';
import { productDetailsReducer, productReducer } from "./reducers/productReducer";
import {forgotPasswordReducer, profileReducer, userReducer} from "./reducers/userReducer"
import {
    allOrdersReducer,
    myOrdersReducer,
    newOrderReducer,
    orderDetailsReducer,
    orderReducer,
  } from "./reducers/orderReducer";
// const reducer = combineReducers({
    //     products : productReducer,
    // });
    
    // let initialState = {};
    
    const middleware = [thunk];
    
    let initialState = {
        cart : {
            cartItems : localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItems")) : [],
            shippingInfo : localStorage.getItem("shippingInfo") ? JSON.parse(localStorage.getItem("shippingInfo")) : [],
        },
    };
      
const store = configureStore({
    reducer : {
        products : productReducer,
        productDetails : productDetailsReducer,
        user : userReducer,
        profile : profileReducer,
        forgotPassword : forgotPasswordReducer,
        cart : cartReducer,
        newOrder: newOrderReducer,
    },

    middleware,
    initialState,
})
    

export default store;
