import React from "react";
import Title from "../components/Title";
import { useEffect } from "react";
const ReturnExchanges = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="px-4 md:px-8 lg:px-16 py-6">
      <div className="text-center text-3xl ">
        <Title text1={"RETURN &"} text2={"EXCHANGE"} />
      </div>
      <p className=" my-4 text-xs sm:text-sm md:text-base text-gray-600">
        We want you to love what you purchase, but if something isn’t right do
        let us know. Our garments are all on a made to order basis and specially
        handcrafted for you.
      </p>
      <p className=" my-4 text-xs sm:text-sm md:text-base text-gray-600">
        Once an order is placed, we do not offer any exchange or returns.
        However, in case of alterations, we will be happy to assist you.
      </p>
      <p className=" my-4 text-xs sm:text-sm md:text-base text-gray-600 ">
        Post Purchase Service offered: We are happy to extend complimentary
        alteration services up to 15 days from date of purchase. This
        complimentary service is only available for basic alterations. Other
        alterations requests are available upon reviewing the outfit and may
        incur a charge.
      </p>
      <p className=" my-4 text-xs sm:text-sm md:text-base text-gray-600">
        For International orders, we recommend alterations, if needed, are
        planned well so as to incur minimal shipping costs which will need to be
        borne by the recipient.
      </p>
      <p className=" my-4 text-xs sm:text-sm md:text-base text-gray-600">
        To place an alteration request, you can contact us here, WhatsApp us.
      </p>
    </div>
  );
};

export default ReturnExchanges;
