import React, { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import { Link } from "react-router-dom";

const ProductItems = ({ id, image, name, price }) => {
  const { currency } = useContext(ShopContext);

  return (
    <Link className="block text-gray cursor-pointer" to={`/product/${id}`}>
      <div className="w-full h-56 md:h-60 lg:h-64 overflow-hidden flex justify-center items-center bg-gray-100 rounded-lg">
        <img
          className="w-full h-full object-cover hover:scale-110 transition-transform duration-300 ease-in-out"
          src={image[0]}
          alt="productimage"
          loading="lazy"
        />
      </div>
      <p className="pt-3 pb-1 text-sm">{name}</p>
      <p className="text-sm font-medium">
        {currency}
        {price}
      </p>
    </Link>
  );
};

export default ProductItems;
