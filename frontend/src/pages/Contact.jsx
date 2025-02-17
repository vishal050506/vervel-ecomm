import React from "react";
import Title from "../components/Title";
import { assets } from "../assets/assets";
const Contact = () => {
  return (
    <div>
      <div className="text-center text-2xl pt-10 border-t">
        <Title text1={"CONTACT"} text2={"US"} />
      </div>
      <div className="my-10 flex flex-col justify-center md:flex-row gap-10 mb-28">
        <img
          src={assets.contact_img}
          alt="contact_img"
          className="w-full md:max-w-[480px]"
        />
        <div className="flex flex-col justify-center items-start gap-6">
          <p className="font-semibold text-xl text-gray-600">
            RGISTERED OFFICE
          </p>
          <p className="text-gray-500">
            Registered office A 123B , Chhattarpur enclave phase-1 ,
            <br />
            chhattarpur, New Delhi - 110074
          </p>
          <p className="font-semibold text-xl text-gray-600">Get In Touch!</p>
          <p className="text-gray-500">
            Call / WhatsApp: (+91) 95993-35100
            <br />
            E-mail: info@rohitraolabel.com
          </p>
        </div>
      </div>
    </div>
  );
};

export default Contact;
