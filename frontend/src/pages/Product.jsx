import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { useParams } from "react-router-dom";
import { assets } from "../assets/assets";
import RelatedProducts from "../components/RelatedProducts";

const Product = () => {
  const { products, currency, addToCart } = useContext(ShopContext);
  const { productId } = useParams();
  const [productData, setProductData] = useState(null);
  const [image, setImage] = useState("");
  const [size, setSize] = useState("");
  const [showSizeGuide, setShowSizeGuide] = useState(false); // State for size guide pop-up

  const fetchProductData = () => {
    const product = products.find((item) => item._id === productId);
    if (product) {
      setProductData(product);
      setImage(product.image[0]); // Set the first image as default
    }
  };

  useEffect(() => {
    fetchProductData();
  }, [productId, products]);

  return productData ? (
    <div className="border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100">
      {/* Product Data */}
      <div className="flex gap-12 sm:gap-12 flex-col sm:flex-row">
        {/* Product Images */}
        <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row">
          <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full">
            {productData.image.map((img, index) => (
              <img
                src={img}
                key={index}
                onClick={() => setImage(img)}
                className="w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer"
                alt={`Product image ${index + 1}`}
              />
            ))}
          </div>
          <div className="w-full sm:w-[80%]">
            <img className="w-full h-auto" src={image} alt="Selected product" />
          </div>
        </div>
        {/* Product Info */}
        <div className="flex-1">
          <h1 className="font-medium text-2xl mt-2">{productData.name}</h1>
          <div className="flex items-center gap-1 mt-2">
            <img className="w-3.5" src={assets.star_icon} alt="Star Icon" />
            <img className="w-3.5" src={assets.star_icon} alt="Star Icon" />
            <img className="w-3.5" src={assets.star_icon} alt="Star Icon" />
            <img className="w-3.5" src={assets.star_icon} alt="Star Icon" />
            <img
              className="w-3.5"
              src={assets.star_dull_icon}
              alt="Dull Star Icon"
            />
            {/* <p className="pl-2">(122)</p> */}
          </div>
          <p className="mt-5 text-3xl font-medium">
            {currency}
            {productData.price}
          </p>
          <p className="mt-5 text-gray-500 md:w-4/5">
            {productData.description}
          </p>
          <div className="flex flex-col gap-4 my-8">
            <div className="flex items-center justify-between">
              <p className="text-lg font-medium">Select Size</p>
              {/* Size Guide Button */}
              <button
                onClick={() => setShowSizeGuide(true)}
                className="text-sm text-gray-600 hover:underline"
              >
                Size Guide
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {productData.sizes.map((item, index) => (
                <button
                  onClick={() => setSize(item)}
                  className={`border py-2 px-4 min-w-[60px] sm:min-w-[80px] text-center bg-gray-100 ${
                    item === size ? "border-orange-500" : ""
                  }`}
                  key={index}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={() => addToCart(productData._id, size)}
            className="bg-black text-white px-8 py-3 text-sm active:bg-gray-700"
          >
            ADD TO CART
          </button>
          <hr className="mt-8 sm:w-4/5" />
          <div className="text-sm text-gray-500 mt-5 flex flex-col gap-1">
            <p>100% Original Product</p>
            <p>Enhance product pages for customization.</p>
            <p>Prepaid payment options ensure seamless and secure shopping.</p>
          </div>
        </div>
      </div>

      {/* Size Guide Pop-up */}
      {showSizeGuide && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-md shadow-lg max-w-lg w-full relative">
            <button
              onClick={() => setShowSizeGuide(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-black"
            >
              &times;
            </button>
            <img
              src={assets.size_guide_image} // Replace with your size guide image path
              alt="Size Guide"
              className="w-full h-auto"
            />
          </div>
        </div>
      )}

      {/* Description & Review Section */}
      <div className="mt-20">
        <div className="flex">
          <p className="border px-5 py-3 text-sm">Description</p>
          {/* <p className="border px-5 py-3 text-sm">Reviews (122)</p> */}
        </div>
        <div className="flex flex-col gap-4 border px-6 py-6 text-sm text-gray-600">
          <p className="font-medium">
            At <b>ROHIT RAO</b>, we are committed to delivering
            <b>unmatched quality, innovation, and reliability</b> in every
            product we offer. Our mission is to enhance your lifestyle with
            thoughtfully designed, high-performance products that combine
            elegance with durability.
          </p>
          <p className="font-medium">
            Each product undergoes rigorous quality control, ensuring
            <b>premium craftsmanship and lasting excellence</b>. Trusted by
            thousands of satisfied customers, we take pride in offering products
            that exceed expectations, backed by a commitment to customer
            satisfaction and excellence.
          </p>
          <p className="font-medium">
            <b>Experience the perfect blend of style, function, and trust.</b>
            With our unwavering dedication to quality and service, your
            confidence in our brand is our greatest achievement.
          </p>
        </div>
      </div>

      {/* Related Products */}
      <RelatedProducts category={productData.category} />
    </div>
  ) : (
    <div className="opacity-0">Loading...</div>
  );
};

export default Product;
