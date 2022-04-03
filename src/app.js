const express = require("express");
const errorMiddleware = require("../middleware/error");
const cookieParser = require("cookie-parser");

const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());
//routers import

const product = require("../routes/productRouter");
const user = require("../routes/userRoute");
const order = require("../routes/orderRoute");
const PaymentRoute = require("../routes/paymentRoute");

app.use("/api/vi", product);
app.use("/api/vi", user);
app.use("/api/vi", order);
app.use("/api/vi", PaymentRoute);

//middleware for errors

app.use(errorMiddleware);

module.exports = app;
