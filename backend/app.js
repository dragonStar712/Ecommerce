const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");

const errorMiddleware = require("./middleware/error");


app.use(express.json());
app.use(cookieParser());

// Route import
const product = require("./route/productRoute");
const user = require("./route/userRoute");
const order = require("./route/orderRoute");

app.use("/api/v1", product);
app.use("/api/v1", user);
app.use("/api/v1", order);

// middleware for error !! 
app.use(errorMiddleware);

module.exports = app;