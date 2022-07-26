import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { Navigate , Route, Routes } from "react-router-dom";
    // Redirect has been scrapped so, simply use Navigate "replace to" 
import UpdatePassword from "../../components/User/UpdatePassword.js"

const ProtectedRoutes2 = ({isAdmin}) => {
  const { loading, isAuthenticated, user } = useSelector((state) => state.user);

  return (
             isAuthenticated === false ? (<Navigate replace to="/login" />) : (
                (isAdmin === true && user.role !== "admin")? (<Navigate replace to="/login" />) : (<UpdatePassword/>)
            )              
  );
}
export default ProtectedRoutes2;