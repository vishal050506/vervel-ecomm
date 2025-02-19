import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import { assets } from "../assets/assets";
import CartTotal from "../components/CartTotal";
import { Link } from "react-router-dom";
import RelatedProducts from "../components/RelatedProducts";
import { toast } from "react-toastify";

const Cart = () => {
  const {
    products,
    currency,
    cartItems,
    updateQuantity,
    navigate,
    isAuthenticated,
  } = useContext(ShopContext);
  const [cartData, setCartData] = useState([]);
  const [relatedCategory, setRelatedCategory] = useState(null);
  const [measurements, setMeasurements] = useState({});

  // Debugging isAuthenticated
  // useEffect(() => {
  //   console.log("isAuthenticated:", isAuthenticated); // ✅ Debugging auth state
  // }, [isAuthenticated]);

  useEffect(() => {
    const tempData = [];
    const categoryCount = {};

    for (const itemId in cartItems) {
      for (const size in cartItems[itemId]) {
        if (cartItems[itemId][size] > 0) {
          tempData.push({
            _id: itemId,
            size: size,
            quantity: cartItems[itemId][size],
          });

          const product = products.find((p) => p._id === itemId);
          if (product) {
            categoryCount[product.category] =
              (categoryCount[product.category] || 0) + 1;
          }
        }
      }
    }

    setCartData(tempData);

    const mostCommonCategory = Object.keys(categoryCount).reduce(
      (a, b) => (categoryCount[a] > categoryCount[b] ? a : b),
      null
    );

    setRelatedCategory(mostCommonCategory);
  }, [cartItems, products]);

  const handleInputChange = (e, field) => {
    setMeasurements({
      ...measurements,
      [field]: e.target.value,
    });
  };
  const handleProceedToCheckout = () => {
    if (!isAuthenticated) {
      toast.error("Please login first!");
    }
    if (cartData.length === 0) {
      toast.error("Your cart is empty!");
      return;
    } else {
      navigate("/place-order");
    }
  };

  // Check if "Custom Fit" size exists in the cart
  const hasCustomFit = cartData.some((item) => item.size === "CUSTOM FIT");

  return (
    <div className="border-t pt-14">
      <div className="text-2xl mb-3">
        <Title text1={"YOUR"} text2={"CART"} />
      </div>

      {/* Cart Items */}
      <div>
        {cartData.length === 0 ? (
          <p className="text-gray-700">Your cart is empty.</p>
        ) : (
          cartData.map((item) => {
            const productData = products.find(
              (product) => product._id === item._id
            );

            if (!productData) {
              return null;
            }

            return (
              <div
                key={`${item._id}-${item.size}`}
                className="py-4 border-t border-b text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4"
              >
                <div className="flex items-start gap-6">
                  <Link to={`/product/${item._id}`}>
                    <img
                      className="w-16 sm:w-20"
                      src={productData.image[0]}
                      alt={productData.name}
                      loading="lazy"
                    />
                  </Link>

                  <div>
                    <p className="text-xs sm:text-lg font-medium">
                      {productData.name}
                    </p>
                    <div className="flex items-center gap-5 mt-2">
                      <p>
                        {currency}
                        {productData.price}
                      </p>
                      <p className="px-2 sm:px-3 sm:py-1 border bg-slate-50">
                        {item.size}
                      </p>
                    </div>
                  </div>
                </div>
                <input
                  className="border max-w-10 sm:max-w-20 px-1 sm:px-2 py-1"
                  type="number"
                  min={1}
                  defaultValue={item.quantity}
                  onChange={(e) =>
                    e.target.value === "" || e.target.value === "0"
                      ? null
                      : updateQuantity(
                          item._id,
                          item.size,
                          Number(e.target.value)
                        )
                  }
                />
                <img
                  className="w-4 mr-4 sm:w-5 cursor-pointer"
                  src={assets.bin_icon}
                  alt="Bin icon"
                  onClick={() => updateQuantity(item._id, item.size, 0)}
                  loading="lazy"
                />
              </div>
            );
          })
        )}
      </div>

      {/* Layout for Measurements and Cart Total */}
      <div className="flex flex-col sm:flex-row justify-between my-20 gap-10">
        {hasCustomFit && (
          <div className="flex-1 border p-4">
            <h3 className="text-lg font-semibold mb-4">
              Provide Your Measurements (For Custom Fit)
            </h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              {/* Upper Body Measurements */}
              <div className="col-span-2">
                <h4 className="font-semibold">
                  Upper Body Measurements (in inches)
                </h4>
              </div>
              {[
                "collar/Neck",
                "Shoulder",
                "Upper Bust",
                "Bust",
                "Lower Bust",
                "Dart/Apex Point",
                "Armhole",
                "Tummy",
                "Sleeves",
                "Biceps",
                "Mori",
                "Elbow",
                "Blouse Length",
                "Suit Length",
                "Anarkali Length",
                "Floor Length",
              ].map((field) => (
                <div key={field}>
                  <label>{field}:</label>
                  <input
                    type="number"
                    step="0.1"
                    className="border w-full p-1 mt-1"
                    onChange={(e) => handleInputChange(e, field)}
                  />
                </div>
              ))}

              {/* Lower Body Measurements */}
              <div className="col-span-2 mt-4">
                <h4 className="font-semibold">
                  Lower Body Measurements (in inches)
                </h4>
              </div>
              {[
                "Waist",
                "Hip",
                "Thigh",
                "Length",
                "Inner Length (Asan)",
                "Knee",
                "Calf",
                "Mohri",
                "Sharara Length",
                "Lehenga Length",
              ].map((field) => (
                <div key={field}>
                  <label>{field}:</label>
                  <input
                    type="number"
                    step="0.1"
                    className="border w-full p-1 mt-1"
                    onChange={(e) => handleInputChange(e, field)}
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Cart Total */}
        <div className="flex-1 sm:w-[450px]">
          <CartTotal />
          <div className="w-full text-end">
            <button
              onClick={handleProceedToCheckout}
              // onClick={() => navigate("/place-order")}
              className="bg-black text-white my-8 px-8 py-3"
            >
              PROCEED TO CHECKOUT
            </button>
          </div>
        </div>
      </div>

      {/* Display Related Products */}
      {relatedCategory && (
        <div className="mt-10">
          <RelatedProducts category={relatedCategory} />
        </div>
      )}
    </div>
  );
};

export default Cart;
