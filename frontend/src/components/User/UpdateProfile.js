import React, { Fragment, useState, useEffect } from "react";
import "./UpdateProfile.css";
import Loader from "../layout/loader/Loader";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import FaceIcon from "@mui/icons-material/Face";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, loadUser, updateProfile } from "../../actions/userAction";
import { useAlert } from "react-alert";
import {useNavigate } from "react-router-dom"
import { UPDATE_PROFILE_RESET } from "../../constants/userConstant";
import MetaData from "../layout/MetaData";

const UpdateProfile = () => {
 
    const alert = useAlert();
    let history = useNavigate();
    const dispatch = useDispatch();
    
    const {user} = useSelector(state => state.user);
    const {error, isUpdated, loading} = useSelector((state) => state.profile);
    

    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [avatar, setAvatar] = useState("");
    const [avatarPreview, setAvatarPreview] = useState("/profile.jpg"); 

    
  const updateProfileSubmit  = (e) => {
    e.preventDefault();

    const myForm = new FormData();        // taking form data as input in FormData datatype

    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("avatar", avatar);
    // console.log(" Sign Up Form Submitted");
    dispatch(updateProfile(myForm));
  };

  const updateProfileDataChange  = (e) => {
    const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatarPreview(reader.result);
          setAvatar(reader.result);
        }
      };

      reader.readAsDataURL(e.target.files[0]);
  } 

  
  useEffect(() => {
    if(user){
        setName(user.name);
        setEmail(user.email);
        setAvatarPreview(user.avatar.url);
    }
    if(error){
      alert.error(error);
      dispatch(clearErrors());
    }
  if(isUpdated){
    alert.success("Profile Updated Successfully");
    dispatch(loadUser());

    history("/account");

    dispatch({
        type : UPDATE_PROFILE_RESET,
    });
  }

  },[dispatch, error, alert, history, user, isUpdated]);

    return (
        <Fragment>
        {loading ? (
          <Loader />
        ) : (
          <Fragment>
            <MetaData title="Update Profile" />
            <div className="updateProfileContainer">
              <div className="updateProfileBox">
                <h2 className="updateProfileHeading">Update Profile</h2>
  
                <form
                  className="updateProfileForm"
                  encType="multipart/form-data"
                  onSubmit={updateProfileSubmit}
                >
                  <div className="updateProfileName">
                    <FaceIcon />
                    <input
                      type="text"
                      placeholder="Name"
                      required
                      name="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div className="updateProfileEmail">
                    <MailOutlineIcon />
                    <input
                      type="email"
                      placeholder="Email"
                      required
                      name="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
  
                  <div id="updateProfileImage">
                    <img src={avatarPreview} alt="Avatar Preview" />
                    <input
                      type="file"
                      name="avatar"
                      accept="image/*"
                      onChange={updateProfileDataChange}
                    />
                  </div>
                  <input
                    type="submit"
                    value="Update"
                    className="updateProfileBtn"
                  />
                </form>
              </div>
            </div>
          </Fragment>
        )}
      </Fragment>
  )
};


export default UpdateProfile
