const ErrorHandler = require("../utils/errorHandler");
const catchasyncError = require("./catchasyncError");
const jwt = require("jsonwebtoken");
const User = require("../models/userModels");

exports.isAuthenticatedUser = catchasyncError( async(req, res, next) =>{
    const {token} = req.cookies;

    // console.log(token);

    if(token ==="j:null"){
        // if(!token){
        return next(new ErrorHandler("Please login to access this resource", 401));
    }

    const decodedData = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await User.findById(decodedData.id);

    next();
});

exports.authorizeRoles = (...roles) =>{
    return (req, res,next) => {
        // 403 --> server understood what user wants but still denies !
        if(!roles.includes(req.user.role)){
            return next(new ErrorHandler(`Role : ${req.user.role} is not allowed to access this resource !! `, 403)
        );
    }

        next();
    };
}