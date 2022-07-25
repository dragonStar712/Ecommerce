import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { Navigate , Route, Routes } from "react-router-dom";
    // Redirect has been scrapped so, simply use Navigate "replace to" 
import Profile from "../../components/User/Profile.js"

const ProtectedRoutes = ({isAdmin}) => {
  const { loading, isAuthenticated, user } = useSelector((state) => state.user);

  // return (isAuthenticated === false ? (<Navigate replace to="/login" />) : <Profile/>);
  return (
    isAuthenticated === false ? (<Navigate replace to="/login" />) : (
      (isAdmin === true && user.role !== "admin")? (<Navigate replace to="/login" />) : (<Profile/>)
  )    

  );
}
export default ProtectedRoutes;