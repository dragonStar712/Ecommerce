const mongoose = require("mongoose");

const productSchema = new mongoose.Schema ({
    name :{
        type : String,
        required : [true, "please enter product name !! "]
    },

    description :{
        type: String,
        required :[true, "please enter product description !! "]
    },

    price:{
        type: Number,
        required: [true, "please enter product price !! "],
        maxLength : [8, "price cannot exceed 8 characters !!"]
    },    

    ratings : {
        type : Number,
        default : 0
    },

    image :[{
        public_id:{
            type : String,
            required : true
        },
        url : {
            type : String,
            required : true
        }
    }],

    category : {
        type : String,
        required : [true, "Please enter product category"]
    },

    stock:{
        type : Number,
        required: true,
        maxLength : [4,"stocks cannot exceed 4 characters"],
        default : 1
    },

    numOfReviews : {
        type : Number,
        default : 0
    },

    reviews : [
        {
            user : {
                type : mongoose.Schema.ObjectId,
                ref : "User",
                required : true,
            },
        
            // name : {
            //     type: String,
            //     required : true
            // },

            rating : {
                type : Number,
                required : true
            },
            comment : {
                type : String,
                requried : true
            }
        }
    ],

    user : {
        type : mongoose.Schema.ObjectId,
        ref : "User",
        required : true,
    },

    createdAt : {
        type: Date,
        default :Date.now
    }
});

module.exports = mongoose.model("Product", productSchema);