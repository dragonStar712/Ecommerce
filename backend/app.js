const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const dotenv = require("dotenv");

const errorMiddleware = require("./middleware/error");

//config 
dotenv.config({path:"backend/config/config.env"});



app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended : true }));
app.use(fileUpload());

// Route imports
const product = require("./route/productRoute");
const user = require("./route/userRoute");
const order = require("./route/orderRoute");
const payment = require("./route/paymentRoute");

app.use("/api/v1", product);
app.use("/api/v1", user);
app.use("/api/v1", order);
app.use("/api/v1", payment);

// middleware for error !! 
app.use(errorMiddleware);

module.exports = app;