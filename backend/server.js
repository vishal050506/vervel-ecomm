import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet"; // Security middleware
import compression from "compression"; // Response compression
import rateLimit from "express-rate-limit"; // Prevent abuse
import morgan from "morgan"; // HTTP logging
import connectDB from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js";
import userRouter from "./routes/userRoute.js";
import productRouter from "./routes/productRoute.js";
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";

// Load environment variables
dotenv.config();

// App Config
const app = express();
const port = process.env.PORT || 4000;

// Connect to Database
connectDB();
connectCloudinary();

// 🚀 **Security Middleware**
app.use(helmet()); // Protect against common security vulnerabilities

// 🚀 **CORS Optimization** (Allow specific origins)
const corsOptions = {
  origin: process.env.FRONTEND_URL || "*", // Restrict access to frontend URL
  methods: "GET,POST,PUT,DELETE",
  credentials: true,
};
app.use(cors(corsOptions));

// 🚀 **Compression (Brotli + Gzip)**
app.use(compression({ threshold: 1024 })); // Compress only large responses

// 🚀 **Rate Limiting (Prevent DDoS Attacks)**
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per window
  message: "Too many requests, please try again later.",
});
app.use(limiter);

// 🚀 **HTTP Logging (For Debugging)**
app.use(morgan("dev"));

// 🚀 **Express JSON Middleware**
app.use(express.json({ limit: "10kb" })); // Limit payload size

// 🚀 **API Routes**
app.use("/api/user", userRouter);
app.use("/api/product", productRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);

app.get("/", (req, res) => {
  res.send("API is working!");
});

// 🚀 **Global Error Handling**
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Internal Server Error" });
});

// 🚀 **Start Server**
app.listen(port, () => console.log("Server started on Port :" + port));
