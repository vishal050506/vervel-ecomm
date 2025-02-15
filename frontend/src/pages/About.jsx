import React, { useEffect } from "react";
import Title from "../components/Title";
import { assets } from "../assets/assets";
const About = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div>
      <div className="text-2xl text-center pt-10 border-t">
        <Title text1={"ABOUT"} text2={"US"} />
      </div>
      <div className="my-10 flex flex-col md:flex-row gap-16">
        <img
          src={assets.about_img}
          className="w-full md:max-w-[480px]"
          alt=""
        />
        <div className="flex flex-col justify-center gap-6 md:w-2/4 text-gray-600">
          <p>
            At Rohit Rao, we believe that every outfit tells a story, and we are
            here to make yours truly special. Our handcrafted embroidered
            lehengas, suits, and sarees are designed with precision, passion,
            and a deep respect for tradition.
          </p>
          <p>
            But our journey with you doesn’t end at purchase—it begins there.
            From the moment you place an order to the final delivery, we stay in
            touch, ensuring a seamless experience tailored to your needs.
          </p>
          <p>All our products are proudly made in India.</p>
          <b className="text-gray-800">Mission</b>
          <p>
            Even beyond delivery, we are always here for styling tips,
            customization queries, and anything that helps you cherish your
            outfit for years to come. At Rohit Rao, it’s not just fashion; it’s
            a relationship built on trust, craftsmanship, and timeless elegance.
          </p>
        </div>
      </div>
      <div className="text-xl text-center py-4">
        <Title text1={"WHY"} text2={"CHOOSE US"} />
      </div>
      <div className="flex flex-col md:flex-row text-sm mb-20">
        <div className="border py-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Quality Assurance </b>
          <p className="text-gray-600">
            We meticulously select and vet each product to ensure it meets our
            stringent quality standards.
          </p>
        </div>
        <div className="border py-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Convenience </b>
          <p className="text-gray-600">
            With our user-friendly interface and hassle-free ordering process,
            shopping has never been easier.
          </p>
        </div>
        <div className="border py-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Exceptional Customer Service</b>
          <p className="text-gray-600">
            Our team of dedicated professionals is here to assist you the way,
            ensuring your satisfaction is our top priority.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
