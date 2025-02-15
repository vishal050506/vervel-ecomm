import express from "express";
import adminAuth from "../middleware/adminAuth.js";
import authUser from "../middleware/auth.js";
import {
  placeorderRozorpay,
  allOrders,
  userOrders,
  updateStatus,
  placeOrder,verifyRazorpay
} from "../controllers/orderController.js";

const orderRouter = express.Router();

// Admin features
orderRouter.post("/list", adminAuth, allOrders);
orderRouter.post("/status", adminAuth, updateStatus);

//Payement features
orderRouter.post("/place", authUser, placeOrder);
orderRouter.post("/razorpay", authUser, placeorderRozorpay);

//user feature

orderRouter.post("/userorders", authUser, userOrders);

//verify payment
orderRouter.post('/verifyRazorpay', authUser,verifyRazorpay)
export default orderRouter;
