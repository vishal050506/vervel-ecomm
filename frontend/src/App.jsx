import { useState, useEffect, lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import SearchBar from "./components/SearchBar";
import NewsletterBox from "./components/NewsletterBox";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Loading Component (Fallback UI)
const Loading = () => (
  <div className="flex justify-center items-center h-screen">
    <div className="text-center">
      <div className="loader"></div>
      <p>Loading, please wait...</p>
    </div>
  </div>
);

// Lazy Load Pages
const Home = lazy(() => import("./pages/Home"));
const Collection = lazy(() => import("./pages/Collection"));
const About = lazy(() => import("./pages/About"));
const Contact = lazy(() => import("./pages/Contact"));
const Product = lazy(() => import("./pages/Product"));
const Cart = lazy(() => import("./pages/Cart"));
const Login = lazy(() => import("./pages/Login"));
const PlaceOrder = lazy(() => import("./pages/PlaceOrder"));
const Orders = lazy(() => import("./pages/Orders"));
const ShippingPolicy = lazy(() => import("./pages/ShippingPolicy"));
const TermConditions = lazy(() => import("./pages/TermConditions"));
const ReturnExchanges = lazy(() => import("./pages/ReturnExchanges"));
const Delivery = lazy(() => import("./pages/Delivery"));

function App() {
  const [isLoading, setIsLoading] = useState(true);

  // Simulate a loading effect
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000); // Adjust timeout as needed
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[7vw]">
        <ToastContainer />
        <Navbar />
        <SearchBar />
        <Suspense fallback={<Loading />}>
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
        </Suspense>
        <NewsletterBox />
        <Footer />
      </div>
    </>
  );
}

export default App;
