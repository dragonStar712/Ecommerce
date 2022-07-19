const Order = require("../models/orderModel");
const Product = require("../models/productModels")
const ErrorHandler = require("../utils/errorHandler")
const catchasyncErrors = require("../middleware/catchasyncError");

// create new order
exports.newOrder = catchasyncErrors(async(req, res, next) => {
    const {
        shippingInfo,
        orderItems,
        paymentInfo,
        itemPrice,
        taxPrice,
        shippingPrice,
        totalPrice} = req.body;

    console.log("sgfgsgfgsdfg");
    
    const order = await Order.create({
        shippingInfo,
        orderItems,
        paymentInfo,
        itemPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paidAt : Date.now(),
        user : req.user._id,
    });

    console.log("sgfgsgfgsdfg");

    res.status(200).json({
        success : true,
        order,
    });
})

// get single order
exports.getSingleOrder = catchasyncErrors(async(req, res, next) => {
    
    
    const order = await Order.findById(req.params.id).populate(
        "user",
        "name email",
    );

    if(!order){
        return next(new ErrorHandler("Order not found with this Id", 404));
    }

    res.status(200).json({
        success : true,
        order,
    });
})

// get orders for logged in users 
exports.myOrders = catchasyncErrors(async(req, res, next) => {
    
    const orders = await Order.find({user : req.user._id});

    res.status(200).json({
        success : true,
        orders,
    });
})


// get all orders for admin 
exports.getAllOrders = catchasyncErrors(async(req, res, next) => {
    
    const orders = await Order.find();

    let totalAmount = 0;

    orders.forEach((order)=>{
        totalAmount += order.totalPrice;
    } )

    res.status(200).json({
        success : true,
        totalAmount,
        orders,
    });
})


// update order status -- Admin

exports.updateOrder = catchasyncErrors(async(req, res, next) => {
    
    const order = await Order.findById(req.params.id);

    if(!order){
        return next(new ErrorHandler("Order not found with this Id", 404));
    }
    
    if(order.orderStatus.toLowerCase() === "delivered"){
        return next(new ErrorHandler("You have already delivered this order", 400));
    }

    order.orderItems.forEach(async(o) =>{
        await updateStock(o.product, o.quantity);
    })

    order.orderStatus = req.body.status;
    
    if(req.body.status.toLowerCase() === "delivered")
        {order.deliveredAt = Date.now();}

    await order.save({ validateBeforeSave : false });

    res.status(200).json({
        success : true,
    });
})

async function updateStock(id, quantity){
    const product = await Product.findById(id);

    product.stock -= quantity;
    await product.save({ validateBeforeSave : false });
}


// delete orders for admin 
exports.deleteOrder = catchasyncErrors(async(req, res, next) => {
    
    const order = await Order.findById(req.params.id);

  if(!order){
        return next(new ErrorHandler("Order not found with this Id", 404));
    }

    await order.remove();

    res.status(200).json({
        success : true,
    });
})

