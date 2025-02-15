import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Collection from "./pages/Collection";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Product from "./pages/Product";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import PlaceOrder from "./pages/PlaceOrder";
import Orders from "./pages/Orders";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import NewsletterBox from "./components/NewsletterBox";
import ShippingPolicy from "./pages/ShippingPolicy";
import TermConditions from "./pages/TermConditions";
import ReturnExchanges from "./pages/ReturnExchanges";
import SearchBar from "./components/SearchBar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Delivery from "./pages/Delivery";

function App() {
  const [isLoading, setIsLoading] = useState(true);

  // --------------Simulate a loading effect-----------------------------
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000); // Adjust timeout as needed
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-center">
          <div className="loader"></div>
          <p>Loading, please wait...</p>
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------------

  return (
    <>
      <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[7vw]">
        <ToastContainer />
        <Navbar />
        <SearchBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/collection" element={<Collection />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/product/:productId" element={<Product />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<Login />} />
          <Route path="/place-order" element={<PlaceOrder />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/shipping-policy" element={<ShippingPolicy />} />
          <Route path="/terms-conditions" element={<TermConditions />} />
          <Route path="/return-exchange" element={<ReturnExchanges />} />
          <Route path="/delivery" element={<Delivery />} />
        </Routes>
        <NewsletterBox />
        <Footer />
      </div>
    </>
  );
}

export default App;
