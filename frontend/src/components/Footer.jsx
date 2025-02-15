import React from "react";
import { Link } from "react-router-dom";
import { assets } from "../assets/assets";

const Footer = () => {
  return (
    <div>
      {/* Footer Content */}
      <div className="sm:grid grid-cols-4 gap-14 my-10 mt-30 text-sm">
        {/* About Section */}
        <div>
          <img src={assets.footer} className="mb-5 w-32" alt="footer_img" />
          <p className="text-gray-600">
            At Rohit Rao, we believe in weaving dreams into reality with
            handcrafted elegance. Founded by Muskan, a zoology enthusiast, and
            Rohit, an engineer turned designer, the brand is a seamless blend of
            passion and precision. Our niche lies in crafting exquisite ethnic
            wear, specializing in embroidered lehengas, suits, and sarees that
            celebrate timeless traditions with a modern flair. Every piece we
            create reflects our dedication to artistry, quality, and
            personalization, making your special moments even more
            extraordinary. Driven by a shared dream, we are committed to
            redefining ethnic fashion while staying true to its cultural roots.
          </p>
          <Link to="/about">
            <p className="text-blue-500 hover:underline mt-2">Read more...</p>
          </Link>
        </div>

        {/* Company Section */}
        <div>
          <p className="text-xl font-medium my-5">COMPANY</p>
          <ul className="flex flex-col gap-1 text-gray-600">
            <Link to="/">
              <li className="hover:underline">Home</li>
            </Link>
            <Link to="/about">
              <li className="hover:underline">About Us</li>
            </Link>
            <Link to="/delivery">
              <li className="hover:underline">Delivery</li>
            </Link>
          </ul>
        </div>

        {/* Legal Section */}
        <div>
          <p className="text-xl font-medium my-5">LEGAL</p>
          <ul className="flex flex-col gap-1 text-gray-600">
            <Link to="/shipping-policy">
              <li className="hover:underline">Shipping Policy</li>
            </Link>
            <Link to="/return-exchange">
              <li className="hover:underline">Return & Exchanges</li>
            </Link>
            <Link to="/terms-conditions">
              <li className="hover:underline">Terms & Conditions & Privacy Policy</li>
            </Link>
          </ul>
        </div>

        {/* Get in Touch Section */}
        <div>
          <p className="text-xl font-medium my-5">GET IN TOUCH</p>
          <ul className="flex flex-col gap-1 text-gray-600">
            <li>+91 9599335100</li>
            <li>labelrohitrao@gmail.com</li>
            <a
              href="https://www.instagram.com/labelrohitrao/?igsh=aXhkcmk0Ym43cnpj&utm_source=qr"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline ttext-gray-600"
            >
              Instagram
            </a>
          </ul>
        </div>
      </div>

      {/* Footer Bottom */}
      <div>
        <hr />
        <p className="py-5 text-sm text-center">
          Copyright 2024 © RohitRao.com - All Rights Reserved.
        </p>
      </div>
    </div>
  );
};

export default Footer;
