const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required : [true, "Please enter the name"],
        maxLength : [30, "Name cannot exceed 30 letters "],
        minLength : [4, "Name should have at least 4 letters "]
    },

    email : {
        type:String,
        required : [true, "Please enter your email"],
        unique : true,
        validate : [validator.isEmail, "Please enter a valid Email"],
    },
    password : {
        type : String,
        required : [true, "Please enter your password"],
        minLength : [8, "Password should have at least 8 letters "],
        select : false,     // for security purpose password would not be shared with other entities 
    },
    avatar : {
        
            public_id:{
                type : String,
                required : true
            },
            url : {
                type : String,
                required : true
            }
    },
    role : {
        type:String,
        default : "user",
    },
    createdAt: {
        type: Date,
        default: Date.now,
      },
    resetPasswordToken:String,
    resetPasswordExpire:Date,
});

userSchema.pre("save", async function(next){

    if(!this.isModified("password")){
        next();
    }
    this.password = await bcrypt.hash(this.password, 10);
    
})


    // JWT TOKEN

userSchema.methods.getJWTToken = function (){
    return jwt.sign({id : this._id}, process.env.JWT_SECRET, {
        expiresIn : process.env.JWT_EXPIRE,
    });
}

// Compare password

userSchema.methods.comparepassword = async function(password){
    return await bcrypt.compare(password,this.password);
}

// generating password reset tokens 

userSchema.methods.getResetPasswordToken = function () {

    // generating token;

    const resetToken = crypto.randomBytes(20).toString("hex");

    // hashing and adding resetPasswordToken to userSchema

    this.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex");

    this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;

    return resetToken;
};


module.exports = mongoose.model("User",userSchema);
