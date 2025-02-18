import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const FAST2SMS_API_KEY = process.env.FAST2SMS_API_KEY;

export const sendSMS = async (phone, orderStatus) => {
  try {
    let message = "";

    if (orderStatus === "Order Placed") {
      message = `
🎉 Woo-hoo! Your order is officially placed! 🎉
Thank you for choosing us. We're excited to get your items to you!
Stay tuned, it's coming soon! 🚚
Visit us anytime at rohitraolabel.com for more awesomeness! 💫
`;
    } else if (orderStatus === "Shipped") {
      message = `
    📦 Your order has been shipped! 🚚  
    It's on its way to you and will be there soon.  
    Track your order anytime at rohitraolabel.com.  
    We can't wait for you to enjoy your purchase! ✨
  `;
    } else if (orderStatus === "Out For Delivery") {
      message = `
    🚚 Your order is out for delivery!  
    Get ready, it's almost there! 📦  
    Our delivery team is on the way, and your order will arrive soon.  
    Track your delivery and more at rohitraolabel.com.  
    Enjoy your shopping experience with us! ✨
  `;
    } else if (orderStatus === "Delivered") {
      message = `
    🎉 Your order has been delivered! 📦  
    We hope you're excited to enjoy your new items! 😍  
    Thank you for shopping with us.  
    For future orders and more, visit rohitraolabel.com.  
    See you again soon! ✨
  `;
    } else {
      console.log("ℹ️ No SMS sent. Order status:", orderStatus);
      return; // Exit if no matching status
    }

    const response = await axios.post(
      "https://www.fast2sms.com/dev/bulkV2",
      {
        message,
        language: "english",
        route: "q",
        numbers: phone,
      },
      {
        headers: {
          authorization: FAST2SMS_API_KEY,
        },
      }
    );

    console.log("✅ SMS Sent:", response.data);
  } catch (error) {
    console.error("❌ SMS Error:", error.response?.data || error.message);
  }
};
