const Order = require("../models/orderModel");
const Product = require("../models/productModel");
const ErrorHandler = require("../util/errorHandler");
const catchAsyncErrors = require("../middleware/catchValidationError");

//create new Order

exports.newOrder = catchAsyncErrors(async (req, res, next) => {
  const {
    shippingInfo,
    orderItems,
    paymentInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  const order = await Order.create({
    shippingInfo,
    orderItems,
    paymentInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    paidAt: Date,
    user: req.user._id,
  });

  res.status(201).json({
    success: true,
    order,
  });
});

////get Single Order

exports.getSingleOrder = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.findById(req.params.id).populate("user");
  if (!order) {
    return next(new ErrorHandler("Order Not Found", 404));
  }
  res.status(201).json({
    success: true,
    order,
  });
});

////get logged in user Orders

exports.myOrders = catchAsyncErrors(async (req, res, next) => {
  const orders = await Order.find({ user: req.user._id });

  res.status(201).json({
    success: true,
    orders,
  });
});

////get All Orders -- Admin

exports.getAllOrder = catchAsyncErrors(async (req, res, next) => {
  const orders = await Order.find();

  let totalAmount = 0;
  let totalOrder = orders.length;
  orders.forEach((order) => {
    totalAmount += order.totalPrice;
  });

  res.status(201).json({
    success: true,
    totalAmount,
    totalOrder,
    orders,
  });
});

////update Order Status -- Admin

exports.updateOrder = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (order.orderStatus === "Delivered") {
    return next(new ErrorHandler("You have already delivered this order", 400));
  }

  order.orderItems.forEach(async (o) => {
    await updateStock(o.product, o.quantity);
  });

  order.orderStatus = req.body.status;

  if (req.body.status === "Delivered") {
    order.deliveredAt = Date.now();
  }

  await order.save({ validateBeforeSave: false });

  res.status(201).json({
    success: true,
    // order,
  });
});

async function updateStock(id, qty) {
  const product = await Product.findById(id);

  product.stock -= qty;

  await product.save({ validateBeforeSave: false });
}

//delete Order --Admin

exports.deleteOrder = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.findById(req.params.id);
  if (!order) {
    return next(new ErrorHandler("Order Not Found with this id", 404));
  }

  await order.remove();

  res.status(200).json({
    success: true,
  });
});
