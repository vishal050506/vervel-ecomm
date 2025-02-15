import React from "react";
import { assets } from "../assets/assets";
import Title from "./Title";

const OurPolicy = () => {
  return (
    <div className="my-10">
      <div className="text-center text-3xl py-8">
        <Title text1={"OUR"} text2={"POLICY"} />
        <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600">
          "Your satisfaction and security are our top priorities in every
          transaction."
        </p>
      </div>
      <div className="flex flex-col sm:flex-row justify-around gap-12 sm:gap-2 text-center py-5 text-xs sm:text-sm md:text-base text-gray-700">
        <div>
          <img
            src={assets.Globe}
            alt="exchange-icon"
            className="w-12 m-auto mb-5"
          />
          <p className="font-semibold">World Wide Delivery</p>
          <p className="text-gray-400">Delivering across the world.</p>
        </div>
        <div>
          <img
            src={assets.quality_icon}
            alt="exchange-icon"
            className="w-12 m-auto mb-5"
          />
          <p className="font-semibold">Alteration Applicable</p>
          <p className="text-gray-400">Easy Alteration, Guaranteed Fit.</p>
        </div>
        <div>
          <img
            src={assets.support_img}
            alt="exchange-icon"
            className="w-12 m-auto mb-5"
          />
          <p className="font-semibold">Best Customer Support</p>
          <p className="text-gray-400">Six days support</p>
        </div>
      </div>
    </div>
  );
};

export default OurPolicy;
