import React, { useContext, useMemo } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "./Title";
import ProductItems from "./ProductItems";

const BestSeller = () => {
  const { products } = useContext(ShopContext);

  // Memoize best-selling products sorted by most recent date
  const bestSeller = useMemo(() => {
    return products
      ? products
          .filter((item) => item.bestseller) // Filter only best sellers
          .sort((a, b) => b.date - a.date) // Sort by latest date
          .slice(0, 5) // Get the latest 5 best sellers
      : [];
  }, [products]);

  return (
    <div className="my-10">
      <div className="text-center text-3xl py-8">
        <Title text1="MOST" text2="LOVED" />
        <p className="w-11/12 sm:w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600">
          "Discover the products everyone is talking about – top picks, top
          quality!"
        </p>
      </div>

      {/* Render the product items */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
        {bestSeller.length > 0 ? (
          bestSeller.map((item) => (
            <ProductItems
              key={item._id}
              id={item._id}
              name={item.name}
              image={item.image}
              price={item.price}
            />
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500">
            No best sellers available...
          </p>
        )}
      </div>
    </div>
  );
};

export default BestSeller;
