const express = require("express");
const errorMiddleware = require("../middleware/error");
const cookieParser = require("cookie-parser");
const app = express();

app.use(express.json());
app.use(cookieParser());
//routers import

const product = require("../routes/productRouter");
const user = require("../routes/userRoute");
const order = require("../routes/orderRoute");

app.use("/api/vi", product);
app.use("/api/vi", user);
app.use("/api/vi", order);

//middleware for errors

app.use(errorMiddleware);

module.exports = app;
