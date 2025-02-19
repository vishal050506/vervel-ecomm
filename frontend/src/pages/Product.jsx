import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { useParams } from "react-router-dom";
import { assets } from "../assets/assets";
import { FaWhatsapp, FaTruck } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import RelatedProducts from "../components/RelatedProducts";

const Product = () => {
  const { products, currency, addToCart } = useContext(ShopContext);
  const { productId } = useParams();
  const [productData, setProductData] = useState(null);
  const [image, setImage] = useState("");
  const [size, setSize] = useState("");
  const [showSizeGuide, setShowSizeGuide] = useState(false); // State for size guide pop-up
  const [activeTab, setActiveTab] = useState("description");

  const fetchProductData = () => {
    const product = products.find((item) => item._id === productId);
    if (product) {
      setProductData(product);
      setImage(product.image[0]); // Set the first image as default
    }
  };
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
            <img
              className="w-3.5"
              src={assets.star_icon}
              alt="Star Icon"
              loading="lazy"
            />
            <img
              className="w-3.5"
              src={assets.star_icon}
              alt="Star Icon"
              loading="lazy"
            />
            <img
              className="w-3.5"
              src={assets.star_icon}
              alt="Star Icon"
              loading="lazy"
            />
            <img
              className="w-3.5"
              src={assets.star_icon}
              alt="Star Icon"
              loading="lazy"
            />
            <img
              className="w-3.5"
              src={assets.star_dull_icon}
              alt="Dull Star Icon"
            />
            {/* <p className="pl-2">(122)</p> */}
          </div>
          <p className="mt-5 mb-1 text-3xl font-medium">
            {currency}
            {productData.price}
          </p>
          <p className="text-sm text-gray-400 font-semibold">
            (Inclusive of all taxes)
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
            className="bg-black text-white px-8 py-3 text-sm active:bg-gray-700 mb-5"
          >
            ADD TO CART
          </button>
          <div className="flex flex-col gap-4  ">
            <h3 className="text-sm ">Contact us For Product Related Query</h3>

            {/* WhatsApp Contact */}
            <div className="flex items-center gap-3">
              <FaWhatsapp className="text-lg" />
              <span className="text-sm">Text or WhatsApp</span>
            </div>
            <p className="pl-7 text-sm">+91 9996732623</p>

            {/* Email Contact */}
            <div className="flex items-center gap-3">
              <MdEmail className="text-lg" />
              <span className="text-sm">Email Us</span>
            </div>
            <p className="pl-7 text-sm">info@rohitraolabel.com</p>

            {/* Shipping Info */}
            <div className="flex items-center gap-3">
              <FaTruck className="text-lg" />
              <span className="text-sm">
                Hand Made and Shipped within 4 to 6 weeks
              </span>
            </div>
          </div>
          <hr className="mt-8 mb-3 sm:w-4/5" />
          <p className="text-lg text-gray-800">Description</p>
          <div className="mt-5 text-gray-800 md:w-4/5">
            {productData.description &&
            typeof productData.description === "string" ? (
              (() => {
                try {
                  const desc = JSON.parse(productData.description);
                  return (
                    <>
                      {desc.tagline && <p>{desc.tagline}</p>}
                      {desc.fabric && <p>{desc.fabric}</p>}
                      {desc.color && <p>{desc.color}</p>}
                      {desc.components && <p>{desc.components}</p>}
                      {desc.customization && <p>{desc.customization}</p>}
                      {desc.additionalnote && <p>{desc.additionalnote}</p>}
                    </>
                  );
                } catch (error) {
                  return <p>{productData.description}</p>;
                }
              })()
            ) : (
              <p>{productData.description}</p>
            )}
          </div>
        </div>
      </div>
      {/* Size Guide Pop-up */}
      {showSizeGuide && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-md shadow-lg max-w-2xl w-full relative">
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
          <p
            className={`border px-5 py-3 text-sm cursor-pointer ${
              activeTab === "description" ? "font-bold" : ""
            }`}
            onClick={() => setActiveTab("description")}
          >
            Additional Description
          </p>
          <p
            className={`border px-5 py-3 text-sm cursor-pointer ${
              activeTab === "shipping" ? "font-bold" : ""
            }`}
            onClick={() => setActiveTab("shipping")}
          >
            Shipping & Delivery
          </p>
        </div>
        {activeTab === "description" && (
          <div className="flex flex-col gap-4 border px-6 py-6 text-sm text-gray-600">
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <b>Care Instructions:</b> Dry Clean Only.
              </li>
              <li>
                This product is <b>made to order</b>.
              </li>
              <li>
                Contact us on <b>WhatsApp</b> for urgent delivery inquiries.
              </li>
              <li>
                <b>Fabric colors</b> may vary slightly due to photographic
                lighting and screen settings.
              </li>
              <li>
                Handmade weaves may have natural variations, including slubs or
                minor weaving irregularities.
              </li>
              <li>
                <b>No order cancellations or rejections</b> will be accepted
                after placing an order.
              </li>
            </ul>
          </div>
        )}
        {activeTab === "shipping" && (
          <div className="flex flex-col gap-4 border px-6 py-6 text-sm text-gray-600 ">
            <p className="text-sm ">
              We proudly offer worldwide shipping. For all orders within India,
              shipping is completely free, as we cover all domestic shipping
              costs. However, international shipping charges apply and will be
              calculated based on the product's weight, volume, and destination
              country. Exact shipping costs will be provided upon inquiry.
            </p>
            <p className="text-sm">
              For international orders, some countries may impose import duties
              and taxes upon arrival. While most shipments do not incur these
              additional fees, customs regulations vary, and we are unable to
              predict the exact charges. If any customs duties or taxes are
              applied, the customer is responsible for settling them. Rohit Rao
              Label is not liable for non-delivery of orders if these duties and
              taxes are refused by the recipient. In such cases, refunds will
              not be provided.
            </p>
          </div>
        )}
      </div>
      {/* Related Products */}
      <RelatedProducts category={productData.category} />
    </div>
  ) : (
    <div className="opacity-0">Loading...</div>
  );
};

export default Product;
