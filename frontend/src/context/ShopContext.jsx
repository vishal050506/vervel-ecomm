import { createContext, useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";
// import { products } from "../assets/assets";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
  const currency = "Rs.";
  const deliveryFee = 0;
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState({});
  const [token, setToken] = useState("");

  const navigate = useNavigate();
  const isAuthenticated = !!token;
  // -------------------- ✅ Fetch products from backend ----------------------
  const getProductsData = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/product/list`);
      if (response.data.success) {
        setProducts(response.data.products);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      toast.error("Failed to load products.");
    }
  };

  const getUserCart = async (token) => {
    try {
      const response = await axios.post(
        backendUrl + "/api/cart/get",
        {},
        { headers: { token } }
      );
      if (response.data.success) {
        setCartItems(response.data.cartData);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    getProductsData();
  }, []);
  useEffect(() => {
    if (!token && localStorage.getItem("token")) {
      setToken(localStorage.getItem("token"));
      getUserCart(localStorage.getItem("token"));
    }
  }, []);

  //--------------- ✅ Add to cart with size validation------------------

  const addToCart = async (itemId, size) => {
    if (!size) {
      toast.error("Select Product Size");
      return;
    }
    if (size) {
      if (size === "CUSTOM FIT") {
        toast.info(
          "Custom size selected. Please provide measurements in the cart."
        );
      } else {
        toast.success(`Size ${size} selected. Proceed to cart.`);
      }
    }

    setCartItems((prevCart) => {
      const updatedCart = { ...prevCart };
      updatedCart[itemId] = updatedCart[itemId] || {};
      updatedCart[itemId][size] = (updatedCart[itemId][size] || 0) + 1;
      return updatedCart;
    });
    // ---------------------------------token not working -------------
    if (token) {
      try {
        await axios.post(
          backendUrl + "/api/cart/add",
          { itemId, size },
          { headers: { token } }
        );
      } catch (error) {
        console.log(error);
        toast.error(error.message);
      }
    }
  };

  // ------------------------✅ Get total cart count---------------------------
  const getCartCount = () => {
    return Object.values(cartItems).reduce(
      (count, item) =>
        count + Object.values(item).reduce((acc, qty) => acc + qty, 0),
      0
    );
  };

  // -----------------------✅ Update item quantity------------------------------
  const updateQuantity = async (itemId, size, quantity) => {
    setCartItems((prevCart) => {
      const updatedCart = { ...prevCart };
      if (quantity > 0) {
        updatedCart[itemId][size] = quantity;
      } else {
        delete updatedCart[itemId][size];
        if (Object.keys(updatedCart[itemId]).length === 0) {
          delete updatedCart[itemId];
        }
      }
      return updatedCart;
    });

    if (token) {
      try {
        await axios.post(
          backendUrl + "/api/cart/update",
          { itemId, size, quantity },
          { headers: { token } }
        );
      } catch (error) {
        console.log(error);
        toast.error(error.message);
      }
    } else {
    }
  };

  // ✅ Calculate total cart amount
  const getCartAmount = () => {
    return Object.entries(cartItems).reduce((total, [itemId, sizes]) => {
      const product = products.find((product) => product._id === itemId);
      if (product) {
        return (
          total +
          Object.values(sizes).reduce(
            (sum, qty) => sum + qty * product.price,
            0
          )
        );
      }
      return total;
    }, 0);
  };

  const value = {
    products,
    currency,
    deliveryFee,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    cartItems,
    addToCart,
    getCartCount,
    updateQuantity,
    getCartAmount,
    navigate,
    backendUrl,
    token,
    setToken,
    setCartItems,
    isAuthenticated,
  };

  return (
    <ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>
  );
};

export default ShopContextProvider;
