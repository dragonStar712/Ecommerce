import React, {Fragment, useState} from 'react'
import "./Header.css"
import { Backdrop, SpeedDial, SpeedDialAction } from '@mui/material'
import DashBoardIcon from "@mui/icons-material/Dashboard"
import PersonIcon from "@mui/icons-material/Person"
import ExitToAppIcon from "@mui/icons-material/ExitToApp"
import ListAltIcon from "@mui/icons-material/ListAlt"
import { useNavigate } from 'react-router-dom'
import {useAlert} from "react-alert"
import { useSelector, useDispatch } from 'react-redux';
import {logout} from "../../../actions/userAction";
import ProfilePng from "../../../images/profilePng.jpg";

const UserOptions = ({ user }) => {
 
    const [open, setOpen] = useState(false);
    const history = useNavigate();
    const alert = useAlert();
    const dispatch = useDispatch();

    const options = [
        {icon : <ListAltIcon/>, name : "Orders", func: orders,},
        {icon : <PersonIcon/>, name : "Profile", func: account,},
        {icon : <ExitToAppIcon/>, name : "Logout", func: logoutUser,},
        
    ];

    if(user.role === "admin"){
        options.unshift({icon : <DashBoardIcon/>, name : "Dashboard", func: dashboard,});
    }

    function dashboard(){
        history(`/dashboard`);
    }

    function orders(){
        history(`/orders`);
    }

    function account(){
        history(`/account`);
    }

    function logoutUser(){
        dispatch(logout());
        alert.success("Logout Successfully");
    }


    return (
    <Fragment>
    <Backdrop open={open} style={{ zIndex: "10" }} />
    <SpeedDial
      ariaLabel="SpeedDial tooltip example"
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      style={{ zIndex: "11" }}
      open={open}
      direction="down"
      className="speedDial"
      icon={
        <img
          className="speedDialIcon"
          src={user.avatar.url ? user.avatar.url : ProfilePng}
          alt="Profile"
        />
      }
    >
      {options.map((item) => (
        <SpeedDialAction
          key={item.name}
          icon={item.icon}
          tooltipTitle={item.name}
          onClick={item.func}
          tooltipOpen={window.innerWidth <= 600 ? true : false}
        />
      ))}
    </SpeedDial>
  </Fragment>
  )
}

export default UserOptions
