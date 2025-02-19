import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import { Link } from "react-router-dom";
import axios from "axios";

const Orders = () => {
  const { backendUrl, token, currency } = useContext(ShopContext);

  const [orderData, setorderData] = useState([]);

  const loadOrderData = async () => {
    try {
      if (!token) return;

      const response = await axios.post(
        `${backendUrl}/api/order/userorders`,
        {},
        { headers: { token } }
      );

      if (response.data.success) {
        let allOrdersItem = [];

        response.data.orders.forEach((order) => {
          // Flatten nested item arrays
          const flatItems = order.items.flat(); // This removes nested arrays

          flatItems.forEach((item) => {
            allOrdersItem.push({
              ...item,
              status: order.status,
              payment: order.payment,
              paymentMethod: order.paymentMethod,
              date: order.date,
            });
          });
        });

        // console.log("Flattened Orders:", allOrdersItem); // Debugging output

        setorderData(
          Array.isArray(allOrdersItem) ? [...allOrdersItem.reverse()] : []
        );
      } else {
        setorderData([]); // If API fails, set empty array to avoid undefined error
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
      setorderData([]); // Prevent crashing by ensuring orderData is always an array
    }
  };

  useEffect(() => {
    loadOrderData();
  }, [token]);
  return (
    <div className="border-t pt-16">
      <div className="text-2xl">
        <Title text1={"MY"} text2={"ORDERS"} />
      </div>
      <div>
        {orderData.map((item, index) => (
          <div
            key={index}
            className="py-4 border-t border-b text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
          >
            <div className="flex items-start gap-6 text-sm">
              <Link to={`/product/${item._id}`}>
                <img
                  src={item.image[0]}
                  className="w-16 sm:w-20"
                  alt=""
                  loading="lazy"
                />
              </Link>
              <div>
                <p className="text-base font-medium">{item.name}</p>
                <div className="flex items-center gap-3 mt-2 text-gray-700">
                  <p>
                    {currency}
                    {item.price}
                  </p>
                  <p>Quantity: {item.quantity}</p>
                  <p>Size: {item.size}</p>
                </div>
                <p className="mt-2">
                  Date:
                  <span className="text-gray-400">
                    {" "}
                    {new Date(item.date).toDateString()}
                  </span>
                </p>
                <p className="mt-2">
                  Payment:
                  <span className="text-gray-400"> {item.paymentMethod}</span>
                </p>
              </div>
            </div>
            <div className="md:w-1/2 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <p className="min-w-2 h-2 rounded-full bg-green-500"></p>
                <p className="text-sm text-base">{item.status}</p>
              </div>
              <button
                onClick={loadOrderData}
                className="border px-4 py-2 text-sm font-medium rounded-sm"
              >
                Track Order
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
