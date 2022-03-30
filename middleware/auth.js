const ErrorHander = require("../util/errorHandler");
const catchAsyncErrors = require("./catchValidationError");
const jwt = require("jsonwebtoken");

const User = require("../models/userModel");

exports.isAuthenticatedUser = catchAsyncErrors(async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return next(new ErrorHander("Please Login"));
  }

  const decodedData = jwt.verify(token, process.env.JWT_SECRET);
  //   console.log(decodedData, "------------decodedData----------------");

  req.user = await User.findById(decodedData.id);

  next();
});

// module. = isAuthenticatedUser;

exports.authrizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorHander(
          `Role: ${req.user.role} is not allowed to access this resource`,
          403
        )
      );
    }

    next();
  };
};
