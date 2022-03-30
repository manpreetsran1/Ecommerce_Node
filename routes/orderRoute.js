const express = require("express");
const {
  newOrder,
  getSingleOrder,
  myOrders,
  getAllOrder,
  updateOrder,
  deleteOrder,
} = require("../controllers/orderController");

const { isAuthenticatedUser, authrizeRoles } = require("../middleware/auth");
const router = express.Router();

router.route("/order/new").post(isAuthenticatedUser, newOrder);
router.route("/order/:id").get(isAuthenticatedUser, getSingleOrder);

router.route("/orders/me").get(isAuthenticatedUser, myOrders);

router
  .route("/admin/orders")
  .get(isAuthenticatedUser, authrizeRoles("admin"), getAllOrder);
router
  .route("/admin/order/:id")
  .put(isAuthenticatedUser, authrizeRoles("admin"), updateOrder)
  .delete(isAuthenticatedUser, authrizeRoles("admin"), deleteOrder);

module.exports = router;
