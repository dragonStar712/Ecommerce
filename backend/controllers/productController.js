const Product = require("../models/productModels")
const ErrorHandler = require("../utils/errorHandler")
const catchasyncErrors = require("../middleware/catchasyncError");
const apiFeatures = require("../utils/apiFeatures");


// create product -- admin 
exports.createProduct = catchasyncErrors(async(req, res, next) =>{
    
    req.body.user = req.user.id;
    
    const product = await Product.create(req.body);

    res.status(201).json({
        success : true,
        product
    })
});

// get all product
exports.getAllProducts = catchasyncErrors(async(req, res, next)=>{

    // return next(new ErrorHandler("thisf error", 500));

    const resultPerPage = 8;
    const productsCount = await Product.countDocuments();

    const apiFeature = new apiFeatures(Product.find(), req.query)
    .search()
    .filter()
    .pagination(resultPerPage);

    let products = await apiFeature.query;
    // console.log(products);
    // let filteredProductsCount = products.length;

    // products = await apiFeature.query;

    res.status(200).json({
        success : true,
        products,
        productsCount,
        resultPerPage,
        // filteredProductsCount,
    });
});

//update product -- admin

exports.updateProduct = catchasyncErrors(async(req, res, next) =>{
    let product = Product.findById(req.params.id);

    if(!product){
        return next(new ErrorHandler("Product not found!!" , 404));
    }

    product = await Product.findByIdAndUpdate(req.params.id, req.body, {new:true, runValidators:true, useFindAndModify:false});

    res.status(200).json({
        success : true,
        product
    })
});


//Delete Product 
exports.deleteProduct = catchasyncErrors(async(req, res, next) =>{
    const product = await Product.findById(req.params.id);

    if(!product){
        return next(new ErrorHandler("Product not found!!" , 404));
    }

    await product.remove();

    res.status(200).json({
        success : true,
        message : "Product deleted successFUlly !! "
    })
})


// get product details 
exports.getProductDetails = catchasyncErrors(async(req, res, next) =>{
    
    // return next(new ErrorHandler("thisf error", 500));

    const product = await Product.findById(req.params.id);

    if(!product){
        return next(new ErrorHandler("Product not found!!" , 404));
    }

    res.status(200).json({
        success : true,
        product,
    })
})


exports.createProductReview = catchasyncErrors(async(req, res, next) => {

    const {rating, comment, productId} = req.body;


    const review = {
        user : req.user._id,
        name : req.user.name,
        rating : Number(rating),
        comment,
    }

    // console.log(review);
    const product = await Product.findById(productId);

    const isReviewed = product.reviews.find( (rev) => rev.user.toString() === req.user._id.toString());

    if(isReviewed){
        product.reviews.forEach((rev) =>{
            if(rev.user.toString() === req.user._id.toString())
                (rev.rating = rating),(rev.comment = comment);
        });
    }
    else{
        product.reviews.push(review);
        product.numOfReviews = product.reviews.length;
        
    }

    let avg = 0;
    product.reviews.forEach( (rev) =>{
        avg += rev.rating;
    });
    
    product.ratings = avg/product.reviews.length;

    await product.save({ validateBeforeSave : false});

    res.status(200).json({
        succes : true,
    })
})

// get all reviews of products

exports.getProdudctReviews = catchasyncErrors(async(req, res, next) => {

    const product = await Product.findById(req.query.id);

    if(!product){
        return next(new ErrorHandler("Product not found!!" , 404));
    }

    res.status(200).json({
        succes : true,
        reviews : product.reviews,
    })
})

// delete product review 

exports.deleteReview = catchasyncErrors(async(req, res, next) => {

    const product = await Product.findById(req.query.productId);

    if(!product){
        return next(new ErrorHandler("Product not found!!" , 404));
    }

    const reviews = product.reviews.filter( (rev) => rev._id.toString() !== req.query.id.toString());

    let avg = 0;
    reviews.forEach( (rev) =>{
        avg += rev.rating;
    })
    
    const ratings = avg/reviews.length;

    const numOfReviews = reviews.length;

    await Product.findByIdAndUpdate(req.query.productId, {
        reviews,
        ratings,
        numOfReviews,
    },{
        new : true,
        runValidators : true,
        useFindAndModify : false,
    })
    // await product.save({ validateBeforeSave : false});


    res.status(200).json({
        succes : true,
        reviews : product.reviews,
    })
})