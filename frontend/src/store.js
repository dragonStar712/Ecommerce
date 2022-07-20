// import {combineReducers, applyMiddleware} from "redux"
// import thunk from "redux-thunk"
import { configureStore } from '@reduxjs/toolkit';
import { productReducer } from "./reducers/productReducer";

// const reducer = combineReducers({
//     products : productReducer,
// });

// let initialState = {};

// const middleware = [thunk];

const store = configureStore({
    reducer : {
        products : productReducer,
        
    },
})
    

export default store;
