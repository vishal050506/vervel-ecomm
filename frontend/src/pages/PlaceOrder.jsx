import React, { useContext, useState } from "react";
import Title from "../components/Title";
import CartTotal from "../components/CartTotal";
import { assets } from "../assets/assets";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";
// import { data } from "react-router-dom";
import { toast } from "react-toastify";

const PlaceOrder = () => {
  const {
    navigate,
    backendUrl,
    token,
    cartItems,
    setCartItems,
    getCartAmount,
    deliveryFee,
    products,
  } = useContext(ShopContext);

  const [method, setMethod] = useState("razorpay");
  const [formdata, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    apartment: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setFormData((data) => ({ ...data, [name]: value }));
  };

  const initPay = (order) => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: "Order Payment",
      description: "Order Payment",
      order_id: order.id,
      receipt: order.receipt,
      handler: async (response) => {
        console.log(response);
        try {
          const { data } = await axios.post(
            backendUrl + "/api/order/verifyRazorpay",
            response,
            { headers: { token } }
          );
          if (data.success) {
            navigate("/orders");
            setCartItems({});
          }
        } catch (error) {
          console.log(error);
          toast.error(error);
        }
      },
    };
    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      let orderItems = [];
      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            const itemInfo = structuredClone(
              products.find((product) => product._id === items)
            );
            if (itemInfo) {
              itemInfo.size = item;
              itemInfo.quantity = cartItems[items][item];
              orderItems.push(itemInfo);
            }
          }
        }
      }
      let orderData = {
        address: formdata,
        items: orderItems,
        amount: getCartAmount() + deliveryFee,
      };

      // Automatically set Razorpay as the payment method
      setMethod("razorpay");

      switch (method) {
        // API calls for cash on delivery method

        case "cod":
          const response = await axios.post(
            backendUrl + "/api/order/place",
            orderData,
            { headers: { token } }
          );
          // console.log(response.data.success);
          if (response.data.success) {
            setCartItems({});
            navigate("/orders");
          } else {
            toast.error(response.data.message);
          }
          break;

        case "razorpay":
          const responseRazorpay = await axios.post(
            backendUrl + "/api/order/razorpay",
            orderData,
            { headers: { token } }
          );
          if (responseRazorpay.data.success) {
            initPay(responseRazorpay.data.order);
          }
          break;

        default:
          break;
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };
  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col sm:flex-row justify-between gap-8 pt-5 sm:pt-14 min-h-[80vh] border-t "
    >
      {/* -------------------Left Side-------------------- */}
      <div className="flex flex-col gap-4 w-full sm:max-w-[480px]">
        <div className="text-xl sm:text-2xl my-3">
          <Title text1={"DELIVEREY"} text2={"INFORMATION"} />
        </div>
        <div className="flex gap-3">
          <input
            onChange={onChangeHandler}
            name="firstName"
            value={formdata.firstName}
            type="text"
            placeholder="First name"
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            required
          />
          <input
            onChange={onChangeHandler}
            name="lastName"
            value={formdata.lastName}
            type="text"
            placeholder="Last name (optional)"
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          />
        </div>
        <input
          onChange={onChangeHandler}
          name="email"
          value={formdata.email}
          type="email"
          placeholder="Email-address"
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          required
        />
        <input
          onChange={onChangeHandler}
          name="street"
          value={formdata.street}
          type="text "
          placeholder="Street"
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          required
        />
        <input
          onChange={onChangeHandler}
          name="apartment"
          value={formdata.apartment}
          type="text "
          placeholder="Apartment (optional)"
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
        />
        <div className="flex gap-3">
          <input
            onChange={onChangeHandler}
            name="city"
            value={formdata.city}
            type="text"
            placeholder="City"
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            required
          />
          <input
            onChange={onChangeHandler}
            name="state"
            value={formdata.state}
            type="text"
            placeholder="State"
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            required
          />
        </div>
        <div className="flex gap-3">
          <input
            onChange={onChangeHandler}
            name="zipcode"
            value={formdata.zipcode}
            type="number"
            placeholder="Zipcode"
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            required
          />
          <input
            onChange={onChangeHandler}
            name="country"
            value={formdata.country}
            type="text"
            placeholder="Country"
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            required
          />
        </div>
        <input
          onChange={onChangeHandler}
          name="phone"
          value={formdata.phone}
          type="number"
          placeholder="Phone"
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          required
        />
      </div>

      {/* ---------------Righ-Side---------------- */}

      <div className="mt-8">
        <div className="mt-8 min-w-80">
          <CartTotal />
        </div>
        <div className="mt-12 ">
          <Title text1={"PAYMENT"} text2={"METHOD"} />
          {/* ---------------Payment-Method Selection---------------- */}
          <div className="mt-6 p-4 border rounded-lg shadow-md max-w-2xl mx-auto">
            <h2 className="text-lg font-semibold">Payment</h2>
            <p className="text-sm text-gray-600 mt-1">
              All transactions are secure and encrypted.
            </p>

            <div className="mt-4 border border-blue-500 rounded-md p-4">
              <div className="flex flex-col md:flex-row justify-between items-center">
                <p className="font-medium text-gray-700 text-center md:text-left">
                  Razorpay Secure (UPI, Cards, Wallets, NetBanking)
                </p>
                <div className="mt-4 md:mt-0 flex flex-wrap justify-center gap-4">
                  <img
                    src={assets.upi_icon}
                    alt="UPI"
                    className="w-8 h-8"
                    loading="lazy"
                  />
                  <img
                    src={assets.visa_logo}
                    alt="Visa"
                    className="w-8 h-8"
                    loading="lazy"
                  />
                  <img
                    src={assets.mastercard_logo}
                    alt="Mastercard"
                    className="w-8 h-8"
                    loading="lazy"
                  />
                  <img
                    src={assets.bank_logo}
                    alt="NetBanking"
                    className="w-8 h-8"
                    loading="lazy"
                  />
                  <button className="w-8 h-8 text-gray-600 border border-gray-300 rounded-full flex items-center justify-center text-sm font-semibold">
                    +1
                  </button>
                </div>
              </div>

              <div className="mt-4 bg-gray-100 p-4 rounded-md flex flex-col items-center">
                <div className="flex-shrink-0 w-12 h-12 border rounded-lg flex items-center justify-center bg-white">
                  <img src={assets.icons_payment} alt="" loading="lazy" />
                </div>
                <p className="mt-4 text-sm text-gray-600 text-center">
                  After clicking
                  <span className="font-medium">“Place Order”</span>, you will
                  be redirected to Razorpay Secure (UPI, Cards, Wallets,
                  NetBanking) to complete your purchase securely.
                </p>
              </div>
            </div>
          </div>
          <div className="w-full text-end mt-8">
            <button
              type="submit"
              className="bg-black text-white px-16 py-3 text-sm"
            >
              PLACE ORDER
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
