const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");

router.post("/checkout", orderController.createOrder);
router.get("/my-orders/:usuario_id", orderController.getOrdersByUser);

router.get("/admin/all", orderController.getAllOrders);
router.patch("/admin/update-status", orderController.updateOrderStatus);

module.exports = router;
