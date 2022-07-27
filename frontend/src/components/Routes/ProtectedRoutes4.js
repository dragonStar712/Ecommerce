import React, { Fragment, useState } from "react";
import { useSelector } from "react-redux";
import { Navigate , Route, Routes } from "react-router-dom";
    // Redirect has been scrapped so, simply use Navigate "replace to" 
import Payment from "../cart/Payment.js"
import {Elements} from "@stripe/react-stripe-js"
import {loadStripe} from "@stripe/stripe-js"
import axios from 'axios';

const ProtectedRoutes4 = ({isAdmin}) => {
  
  const [stripeApiKey, setStripeApiKey] = useState("");

  async function getStripeApiKey() {
    const {data} = await axios.get("/api/v1/stripeapikey");
    setStripeApiKey(data.stripeApiKey);
  }

  
  React.useEffect(()=>{
    getStripeApiKey();
  },[]);

  const { loading, isAuthenticated, user } = useSelector((state) => state.user);

  return (
             isAuthenticated === false ? (<Navigate replace to="/login" />) : (
                (isAdmin === true && user.role !== "admin")? (<Navigate replace to="/login" />) : (
                  stripeApiKey  && 
                 <Elements stripe={loadStripe(stripeApiKey)}>
                    <Payment/>
                </Elements>)
            )              
  );
}
export default ProtectedRoutes4;