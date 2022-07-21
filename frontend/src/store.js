// import {combineReducers, applyMiddleware} from "redux"
// import thunk from "redux-thunk"
import { configureStore } from '@reduxjs/toolkit';
import { productDetailsReducer, productReducer } from "./reducers/productReducer";

// const reducer = combineReducers({
//     products : productReducer,
// });

// let initialState = {};

// const middleware = [thunk];

const store = configureStore({
    reducer : {
        products : productReducer,
        productDetails : productDetailsReducer,
        
    },
})
    

export default store;
