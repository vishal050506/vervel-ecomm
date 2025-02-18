import orderModel from "../model/orderModel.js";
import userModel from "../model/userModel.js";
import razorpay from "razorpay";
import dotenv from "dotenv";
import { sendSMS } from "../helpers/sendSms.js";
dotenv.config();

//global variables
const currency = "inr";
// const deliveryCharge = 0;

// gateway Initialize
const razorpayInstance = new razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// placing order using COD

const placeOrder = async (req, res) => {
  try {
    const { userId, items, amount, address } = req.body;

    const orderData = {
      userId,
      items,
      address,
      amount,
      paymentMethod: "COD",
      payment: false,
      date: Date.now(),
    };

    const newOrder = new orderModel(orderData);
    await newOrder.save();

    await userModel.findByIdAndUpdate(userId, { cartData: {} });
    res.json({ success: true, message: "Order placed " });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// placing order using Razorpay Method
const placeorderRozorpay = async (req, res) => {
  try {
    const { userId, items, amount, address } = req.body;

    // Ensure amount is in paise (Razorpay requires it)
    const razorpayAmount = amount * 100;

    const orderData = {
      userId,
      items,
      address,
      amount,
      paymentMethod: "Razorpay",
      payment: false,
      date: Date.now(),
    };

    const newOrder = new orderModel(orderData);
    await newOrder.save();

    // Razorpay Order Creation
    const options = {
      amount: razorpayAmount, // Convert to paise
      currency: currency.toUpperCase(),
      receipt: newOrder._id.toString(),
    };

    console.log("Creating Razorpay order with options:", options);

    // Await the order creation to properly return response
    const order = await razorpayInstance.orders.create(options);

    console.log("Razorpay order created successfully:", order);

    res.json({ success: true, order });
  } catch (error) {
    console.error("Error creating Razorpay order:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// verify razorpay

const verifyRazorpay = async (req, res) => {
  try {
    const { razorpay_order_id, userId } = req.body;

    const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id);

    if (orderInfo.status == "paid") {
      await orderModel.findByIdAndUpdate(orderInfo.receipt, { payment: true });
      await userModel.findByIdAndUpdate(userId, { cartData: {} }); // Fixed method
      res.json({ success: true, message: "payment successful" });
    } else {
      res.json({ success: false, message: "payment failed" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// All orders data for Admin Panel

const allOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({});
    res.json({ success: true, orders });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// user order data for frontend

const userOrders = async (req, res) => {
  try {
    const { userId } = req.body;
    const orders = await orderModel.find({ userId });
    res.json({ success: true, orders });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// update Orders Status from admin panel

const updateStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body;

    // Fetch the order from the database using the orderId
    const order = await orderModel.findById(orderId);

    if (!order) {
      return res
        .status(404)
        .json({ success: false, message: "Order not found" });
    }

    // Access the phone number from the order's address
    const phone = order.address.phone;

    if (!phone) {
      return res
        .status(400)
        .json({ success: false, message: "Phone number is missing" });
    }

    // Update the order status
    order.status = status;
    await order.save(); // Save the updated order

    // Send SMS notification based on the order status
    await sendSMS(phone, status); // Send SMS with phone number and status

    res.json({ success: true, message: "Order status updated and SMS sent" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export {
  placeorderRozorpay,
  allOrders,
  userOrders,
  updateStatus,
  placeOrder,
  verifyRazorpay,
};
