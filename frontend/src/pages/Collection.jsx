import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";
import Title from "../components/Title";
import ProductItems from "../components/ProductItems";

const Collection = () => {
  const { products, search, showSearch } = useContext(ShopContext); // Default to an empty array
  const [showFilter, setShowFilter] = useState(false);
  const [filterProducts, setFilterProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [sortType, setSortType] = useState("relevant");

  const toggleCategory = (e) => {
    if (category.includes(e.target.value)) {
      setCategory((prev) => prev.filter((item) => item !== e.target.value));
    } else {
      setCategory((prev) => [...prev, e.target.value]);
    }
  };

  const applyFilter = () => {
    let productsCopy = products.slice();

    if (showSearch && search) {
      productsCopy = productsCopy.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (category.length > 0) {
      productsCopy = productsCopy.filter((item) =>
        category.includes(item.category)
      );
    }
    setFilterProducts(productsCopy);
  };

  const SortProducts = () => {
    let fpCopy = [...filterProducts];
    switch (sortType) {
      case "low-high":
        fpCopy.sort((a, b) => a.price - b.price);
        break;
      case "high-low":
        fpCopy.sort((a, b) => b.price - a.price);
        break;
      default:
        applyFilter();
        return; // No further action needed for "relevant"
    }
    setFilterProducts(fpCopy);
  };

  useEffect(() => {
    applyFilter(); // Initial filter application
  }, [category, search, showSearch,products]);

  useEffect(() => {
    SortProducts(); // Re-sort products when sort type changes
  }, [sortType]);

  return (
    <div className="flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t">
      {/* Filter Options */}
      <div className="min-w-60">
        <p
          onClick={() => setShowFilter(!showFilter)}
          className="my-2 text-xl flex items-center cursor-pointer gap-2"
        >
          FILTERS
          <img
            src={assets.dropdown_icon}
            alt="filters dropdown"
            className={`h-3 sm:hidden ${showFilter ? "rotate-90" : ""}`}
          />
        </p>

        {/* Category Filter */}
        <div
          className={`border border-gray-300 pl-5 py-3 mt-6 ${
            showFilter ? "" : "hidden"
          } sm:block`}
        >
          <p className="mb-3 text-sm font-medium">CATEGORIES</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            <p className="flex gap-2">
              <input
                type="checkbox"
                className="w-3"
                value="Saree"
                onChange={toggleCategory}
              />
              Saree
            </p>
            <p className="flex gap-2">
              <input
                type="checkbox"
                className="w-3"
                value="Lehnga"
                onChange={toggleCategory}
              />
              Lehnga
            </p>
            <p className="flex gap-2">
              <input
                type="checkbox"
                className="w-3"
                value="Suits"
                onChange={toggleCategory}
              />
              Suits
            </p>
            <p className="flex gap-2">
              <input
                type="checkbox"
                className="w-3"
                value="Cape"
                onChange={toggleCategory}
              />
              Cape
            </p>
          </div>
        </div>
      </div>

      {/* Right Side */}
      <div className="flex-1">
        <div className="flex justify-between text-base sm:text-2xl mb-4">
          <Title text1="ALL" text2="COLLECTIONS" />
          {/* Sort Feature */}
          <select
            onChange={(e) => setSortType(e.target.value)}
            className="border-2 border-gray-300 text-sm px-2"
          >
            <option value="relevant">Sort by: Relevant</option>
            <option value="low-high">Sort by: Low to High</option>
            <option value="high-low">Sort by: High to Low</option>
          </select>
        </div>

        {/* Map All Products or Show No Products Message */}
        {filterProducts.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
            {filterProducts.map((item, index) => (
              <ProductItems
                key={index}
                image={item.image}
                name={item.name}
                id={item._id}
                price={item.price}
              />
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-500 text-lg mt-10">
            No products available for the selected category.
          </div>
        )}
      </div>
    </div>
  );
};

export default Collection;
