import React from "react";
import { useEffect } from "react";
import Title from "../components/Title";
const Delivery = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="px-4 md:px-8 lg:px-16 py-6">
      <div className="text-center text-3xl ">
        <Title text1={"DELIVERY"} text2={"POLICY"} />
      </div>
      <div className="mt-12">
        <p className="text-lg md:text-xl text-gray-800 mt-4 ">DELIVERY</p>
        <p className="text-sm md:text-base text-gray-600 mt-4">
          Product will be delivered in 35 – 40 days depending on the outfit
          ordered. For urgent deliveries/queries, please contact us directly.
          Please note that deliveries can be affected in case we do not receive
          any of the below information on time :
        </p>
        <p className="text-sm md:text-base text-gray-600">Information :</p>
        <ol className="text-sm md:text-base text-gray-600 my-2">
          <li>1. Complete payment is not received</li>
          <li>2. Incorrect/inaccurate address details</li>
          <li>3. Measurements</li>
          <li>
            4. No response from the customer Please note that we try our best in
            ensuring that the product reaches you within time. In order to
            fasten our process, we have tied up with several third party vendors
            for quicker deliveries. However, in case of delay from a third
            party, we do not take any responsibility.
          </li>
        </ol>
      </div>
    </div>
  );
};

export default Delivery;
