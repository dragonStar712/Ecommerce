const ErrorHandler = require("../utils/errorHandler")
const catchasyncErrors = require("../middleware/catchasyncError");
const User = require("../models/userModels");
const { json } = require("body-parser");
const catchasyncError = require("../middleware/catchasyncError");
const sendToken = require("../utils/jwtToken");
const { validate } = require("../models/userModels");
const sendEmail = require("../utils/sendEmail")
const crypto = require("crypto");
const cloudinary = require("cloudinary");

exports.registerUser = catchasyncErrors( async(req, res, next)=>{
    
    const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
        folder : "avatars",
        width : 150,
        crop : "scale",
    });


    const {name, email, password} = req.body;

    const user = await User.create({
        name, email, password,
        avatar:{
            public_id : myCloud.public_id ,
            url : myCloud.secure_url,
        }
    })

    // const token = user.getJWTToken();

    // res.status(201).json({
    //     success : true,
    //     token,
    // });
    sendToken(user, 201, res);

}) 

// logn users

exports.loginUser = catchasyncErrors (async (req, res, next)=>{
    const {email,password} = req.body;
    // console.log(email);
    // console.log(password);
    
    // checking if user has given password and email both 

    if(!email || !password){
        return next(new ErrorHandler("Please enter email and password"), 400);
    }

    const user = await User.findOne({email}).select("+password");

    if(!user){
        return next(new ErrorHandler("Invalid email or password", 401));  // 401 --> unauthorized access !!
    }

    const isPasswordMatched = await user.comparepassword(password);

    if(!isPasswordMatched){
        return next(new ErrorHandler("Invalid email or password",401));
    }

    sendToken(user, 200, res);
    // const token = user.getJWTToken();

    // res.status(200).json({
    //     success : true,
    //     token,
    // });

})

//  Logout

exports.logout = catchasyncError( async(req, res, next)=>{


    res.cookie("token",null, {
        expiresIn : new Date(Date.now()),
        httpOnly : true,
    });

    res.status(200).json({
        success : true,
        message : "Logged Out",
    });
});


// forgot passwrod 

exports.forgotPasword = catchasyncError(async(req, res, next)=>{
  const user =   await User.findOne({email : req.body.email});

  if(!user){
    return next(new ErrorHandler("User not found !! ", 404));
  }

  //get resetPassword token 
  const resetToken = user.getResetPasswordToken();

  await user.save({ validateBeforeSave : false }); //////////////////////////////////////////////
  
//   console.log("nanananana");

  const resetPasswordUrl = `${process.env.FRONTEND_URL}://${req.get("host")}/password/reset/${resetToken}`;
  
//   console.log(resetPasswordUrl);
 
  const message = `Your password reset token is :- \n\n ${resetPasswordUrl} \n\nIf you have not requested this email then please ignore it.`;

  try{
    
    // console.log(resetToken);
    await sendEmail({
        email : user.email,
        subject : `Ecommerce password change Recovery`,
        message,
    });
    res.status(200).json({
        success : true,
        message : `Email sent to ${user.email} successfully`,
    });
  } 
  catch(error){
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save({validateBeforeSave : false});

    return next(new ErrorHandler(error.message , 500));
}
});

exports.resetPassword = catchasyncError( async(req, res, next)=>{


    // creating token hash
    const resetPasswordToken = 
    crypto.createHash("sha256").
    update(req.params.token)
    .digest("hex");
    // console.log(req.params.token);

    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire: {$gt : Date.now()},

    });

    if(!user){
        return next(new ErrorHandler("Reset password token is invaid or has been expired", 404));
    }
    
    if(!req.body.password !== req.body.confirmPassword){
        return next(new ErrorHandler("Password doesn't match", 404));
    }


    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
   
    await user.save();

    sendToken(user, 200, res);
});


    // get user Profile or details
exports.getUserDetails = catchasyncError(async (req, res, next)=>{
    const user = await User.findById(req.user.id);
    res.status(200).json({
        success : true,
        user,
    });
})

    // update user password
    exports.updatePassword = catchasyncError(async (req, res, next)=>{

        const user = await User.findById(req.user.id).select("+password");    
        
        const isPasswordMatched = await user.comparepassword(req.body.oldPassword);
    
        if(!isPasswordMatched){
            return next(new ErrorHandler("Old password is incorrect",400));
        }
    
        if(req.body.newPassword !== req.body.confirmPassword){
            return next(new ErrorHandler("password doesn't match", 400));
        }
    
        user.password = req.body.newPassword;
    
        await user.save();
    
        sendToken(user, 200 ,res);
    })


    // update user profile
exports.updateProfile = catchasyncError(async (req, res, next)=>{

    const newUserData = {
        name:req.body.name,
        email : req.body.email, 
    };

   
  if (req.body.avatar !== "") {
    const user = await User.findById(req.user.id);

    const imageId = user.avatar.public_id;

    await cloudinary.v2.uploader.destroy(imageId);

    const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
      folder: "avatars",
      width: 150,
      crop: "scale",
    });

    newUserData.avatar = {
      public_id: myCloud.public_id,
      url: myCloud.secure_url,
    };
  }

    const user = await User.findByIdAndUpdate(req.user.id, newUserData,{
        new : true,
        runValidators : true,               //////////////////////// not working !!!! 
        useFindAndModify : false,           //////////////////////// not working !!!! 
    });

    res.status(200).json({
        success : true,
    });
});

// get all users {admin}

exports.getAllUser = catchasyncError(async(req, res, next)=>{
    const users = await User.find();

    res.status(200).json({
        success : true,
        users,
    })
})

// get single user {admin}
exports.getSingleUser = catchasyncError( async(req, res, next)=>{

    const user = await User.findById(req.params.id);
    
    if(!user){
        return next(new ErrorHandler(`No User exists with id : ${req.params.id}`));
    }

    res.status(200).json({
        success : true,
        user,
    });
})



    // update user role by admin {}
exports.updateUserRole = catchasyncError(async (req, res, next)=>{

    const newUserData = {
        name:req.body.name,
        email : req.body.email, 
        role : req.body.role,
    };

    const user = await User.findByIdAndUpdate(req.params.id, newUserData,{
        new : true,
        runValidators : true,               //////////////////////// not working !!!! 
        useFindAndModify : false,           //////////////////////// not working !!!! 
    });

    res.status(200).json({
        succes : true,
        message : `Updated user -${user.name}- successfully`,
    });
})
    
    


// delete user by admin
exports.deletUser = catchasyncError(async (req, res, next)=>{


    // we will remove cloudinary later

    const user = await User.findById(req.params.id);

    if(!user){
        return next(new ErrorHandler(`No User exists with id : ${req.params.id}`));
    }

    await user.remove();

    res.status(200).json({
        succes : true,
        message : `deleted user  -${user.name}- successfully`,
    });
})

