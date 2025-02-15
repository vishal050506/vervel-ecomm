import React from "react";
import Title from "../components/Title";
import { useEffect } from "react";
const ShippingPolicy = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="px-4 md:px-8 lg:px-16 py-6">
      <div className="text-center text-3xl ">
        <Title text1={"SHIPPING"} text2={"POLICY"} />
      </div>
      <div className="mt-8">
        <p className="text-lg md:text-xl text-gray-800 ">WE SHIP WORLDWIDE!</p>
        <h4 className="font-bold text-base md:text-lg mt-6">WITHIN INDIA:</h4>
        <p className="text-sm md:text-base text-gray-600 mt-2">
          Shipping of our products within India is free and completely borne by
          us.
        </p>
        <h4 className="font-bold text-base md:text-lg mt-6">
          INTERNATIONAL SHIPPING :
        </h4>
        <div>
          <p className="text-sm md:text-base text-gray-600 mt-2">
            The charges for international shipping are included as part of the
            maximum retail price as displayed on the website. However, for
            custom/made-to-order and bulk orders, shipping charges will be
            calculated based on the weight and volume of the package and the
            destination country.
          </p>
          <p className="text-sm md:text-base text-gray-600 mt-2">
            Shipping charges for such orders will be shared upon inquiry.
          </p>
          <p className="text-sm md:text-base text-gray-600 mt-2">
            For international orders, we will do complimentary alterations if
            needed, provided clients bear the shipping cost.
          </p>
        </div>
      </div>
      <div className="mt-12">
        <hr className="border-gray-300" />
        <div className="mt-6">
          <p className="text-lg md:text-xl text-gray-800">TAXES & DUTIES</p>
          <h4 className="font-bold text-base md:text-lg mt-6">
            FOR INDIAN CUSTOMERS:
          </h4>
          <p className="text-sm md:text-base text-gray-600 mt-2">
            Product prices displayed are inclusive of all taxes and duties.
          </p>
          <h4 className="font-bold text-base md:text-lg mt-6">
            FOR INTERNATIONAL CUSTOMERS:
          </h4>
          <div>
            <p className="text-sm md:text-base text-gray-600 mt-2">
              Most countries are shipped to on a DDU (Delivery Duty Unpaid)
              basis, which means product prices displayed are exclusive of all
              import duties. As the recipient, you are liable for all import
              duties, customs, and local sales taxes levied by your country.
            </p>
            <p className="text-sm md:text-base text-gray-600 mt-2">
              Payment of these at the time of delivery is necessary to release
              your order from customs on arrival.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShippingPolicy;
