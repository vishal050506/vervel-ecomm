import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const uri = process.env.MONGODB_URI;

    if (!uri) {
      throw new Error(
        "MONGODB_URI is not defined in the environment variables."
      );
    }
    mongoose.connection.on("connected", () => {
      console.log("Connected to database");
    });

    mongoose.connection.on("error", (err) => {
      console.error("Database connection error:", err);
    });

    mongoose.connection.on("disconnected", () => {
      console.log("Database disconnected");
    });

    // Connect to MongoDB
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    mongoose.connection.on("connected", () => {
      console.log("Connected to database");
    });

    mongoose.connection.on("error", (err) => {
      console.error("Database connection error:", err);
    });

    mongoose.connection.on("disconnected", () => {
      console.log("Database disconnected");
    });
  } catch (error) {
    console.error("Error connecting to the database:", error.message);
    process.exit(1); // Exit process on failure
  }
};
export default connectDB;
