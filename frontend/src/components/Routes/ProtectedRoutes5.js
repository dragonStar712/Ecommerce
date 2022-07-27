import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { Navigate , Route, Routes } from "react-router-dom";
    // Redirect has been scrapped so, simply use Navigate "replace to" 
import ConfirmOrder from "../cart/ConfirmOrder"


const ProtectedRoutes5 = ({isAdmin}) => {
  const { loading, isAuthenticated, user } = useSelector((state) => state.user);

  return (
             isAuthenticated === false ? (<Navigate replace to="/login" />) : (
                (isAdmin === true && user.role !== "admin")? (<Navigate replace to="/login" />) : (<ConfirmOrder/>)
            )              
  );
}
export default ProtectedRoutes5;