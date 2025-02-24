import React, { useState } from "react";
import { assets } from "../assets/assets";
import axios from "axios";
import { backendUrl } from "../App";
import { toast } from "react-toastify";

const Add = ({ token }) => {
  const [image1, setImage1] = useState(false);
  const [image2, setImage2] = useState(false);
  const [image3, setImage3] = useState(false);
  const [image4, setImage4] = useState(false);

  const [name, setName] = useState("");
  const [description, setDescription] = useState({
    tagline: "",
    fabric: "",
    color: "",
    components: "",
    customization: "",
    additionalnote: "",
  });
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("Suits");
  const [bestseller, setBestseller] = useState(false);
  const [sizes, Setsizes] = useState([]);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", JSON.stringify(description));
      formData.append("price", price);
      formData.append("category", category);
      formData.append("bestseller", bestseller);
      formData.append("sizes", JSON.stringify(sizes));

      image1 && formData.append("image1", image1);
      image2 && formData.append("image2", image2);
      image3 && formData.append("image3", image3);
      image4 && formData.append("image4", image4);

      const response = await axios.post(
        backendUrl + "/api/product/add",
        formData,
        { headers: { token } }
      );
      // console.log(response.data);  // for checking data is added succesfully or not
      if (response.data.success) {
        toast.success(response.data.message);
        setName("");
        setDescription({
          tagline: "",
          fabric: "",
          color: "",
          components: "",
          customization: "",
          additionalnote: "",
        });
        setPrice("");
        setImage1(false);
        setImage2(false);
        setImage3(false);
        setImage4(false);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col w-full items-start gap-3"
    >
      <div>
        <p className="mb-2">Upload Image</p>
        <div className="flex gap-2">
          <label htmlFor="image1">
            <img
              className="w-20"
              src={!image1 ? assets.upload_area : URL.createObjectURL(image1)}
              alt="upload_area"
            />
            <input
              type="file"
              id="image1"
              hidden
              onChange={(e) => setImage1(e.target.files[0])}
            />
          </label>
          <label htmlFor="image2">
            <img
              className="w-20"
              src={!image2 ? assets.upload_area : URL.createObjectURL(image2)}
              alt="upload_area"
            />
            <input
              type="file"
              id="image2"
              hidden
              onChange={(e) => setImage2(e.target.files[0])}
            />
          </label>
          <label htmlFor="image3">
            <img
              className="w-20"
              src={!image3 ? assets.upload_area : URL.createObjectURL(image3)}
              alt="upload_area"
            />
            <input
              type="file"
              id="image3"
              hidden
              onChange={(e) => setImage3(e.target.files[0])}
            />
          </label>
          <label htmlFor="image4">
            <img
              className="w-20"
              src={!image4 ? assets.upload_area : URL.createObjectURL(image4)}
              alt="upload_area"
            />
            <input
              type="file"
              id="image4"
              hidden
              onChange={(e) => setImage4(e.target.files[0])}
            />
          </label>
        </div>
      </div>

      <div className="w-full mt-2">
        <p className="mb-2">Product Name</p>
        <input
          type="text"
          onChange={(e) => setName(e.target.value)}
          value={name}
          placeholder="Type here"
          className="w-full max-w-[500px] px-3 py-2 mb-2"
          required
        />
      </div>

      <div className="w-full ">
        <p className="mb-2">Product Description</p>
        <input
          type="text"
          value={description.tagline}
          onChange={(e) =>
            setDescription({ ...description, tagline: e.target.value })
          }
          placeholder="tagline...."
          className="w-full px-3 py-2 border rounded mb-3"
        />
        <input
          type="text"
          value={description.fabric}
          onChange={(e) =>
            setDescription({ ...description, fabric: e.target.value })
          }
          placeholder="fabric.... "
          className="w-full px-3 py-2 border rounded mb-3"
        />
        <input
          type="text"
          value={description.color}
          onChange={(e) =>
            setDescription({ ...description, color: e.target.value })
          }
          placeholder="color..."
          className="w-full px-3 py-2 border rounded mb-3"
        />
        <input
          type="text"
          value={description.components}
          onChange={(e) =>
            setDescription({ ...description, components: e.target.value })
          }
          placeholder="components.... "
          className="w-full px-3 py-2 border rounded mb-3"
        />
        <input
          type="text"
          value={description.customization}
          onChange={(e) =>
            setDescription({ ...description, customization: e.target.value })
          }
          placeholder="customization..."
          className="w-full px-3 py-2 border rounded mb-3"
        />
        <textarea
          value={description.additionalnote}
          placeholder="Additional comments...."
          onChange={(e) =>
            setDescription({ ...description, additionalnote: e.target.value })
          }
          className="w-full px-3 py-2 border rounded bg-gray-100 "
        />
      </div>

      <div className="flex flex-col sm:flex-row gap-2 w-full sm:gap-8">
        <div>
          <p className="mb-2">Product Category</p>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-3 py-2"
            required
          >
            <option value="Saree">Saree</option>
            <option value="Lehnga">Lehnga</option>
            <option value="Suits">Suits</option>
            <option value="Cape">Cape</option>
          </select>
        </div>
        <div>
          <p className="mb-2">Product Price</p>
          <input
            onChange={(e) => setPrice(e.target.value)}
            value={price}
            className="w-full px-3 py-2 sm:w-[120px]"
            type="number"
            placeholder="25"
            required
          />
        </div>
      </div>

      <div>
        <p className="mb-2">Product Sizes</p>
        <div className="flex gap-3">
          <div
            onClick={() =>
              Setsizes((prev) =>
                prev.includes("S")
                  ? prev.filter((item) => item !== "S")
                  : [...prev, "S"]
              )
            }
          >
            <p
              className={`mb-2 px-3 py-1 cursor-pointer ${
                sizes.includes("S") ? "bg-gray-500 text-white" : "bg-slate-200"
              }`}
            >
              S
            </p>
          </div>
          <div
            onClick={() =>
              Setsizes((prev) =>
                prev.includes("M")
                  ? prev.filter((item) => item !== "M")
                  : [...prev, "M"]
              )
            }
          >
            <p
              className={`mb-2 px-3 py-1 cursor-pointer ${
                sizes.includes("M") ? "bg-gray-500 text-white" : "bg-slate-200"
              }`}
            >
              M
            </p>
          </div>
          <div
            onClick={() =>
              Setsizes((prev) =>
                prev.includes("L")
                  ? prev.filter((item) => item !== "L")
                  : [...prev, "L"]
              )
            }
          >
            <p
              className={`mb-2 px-3 py-1 cursor-pointer ${
                sizes.includes("L") ? "bg-gray-500 text-white" : "bg-slate-200"
              }`}
            >
              L
            </p>
          </div>
          <div
            onClick={() =>
              Setsizes((prev) =>
                prev.includes("CUSTOM FIT")
                  ? prev.filter((item) => item !== "CUSTOM FIT")
                  : [...prev, "CUSTOM FIT"]
              )
            }
          >
            <p
              className={`mb-2 px-3 py-1 cursor-pointer ${
                sizes.includes("CUSTOM FIT")
                  ? "bg-gray-500 text-white"
                  : "bg-slate-200"
              }`}
            >
              CUSTOM FIT
            </p>
          </div>
        </div>
      </div>

      <div className="flex gap-2 mt-2">
        <input
          type="checkbox"
          id="bestseller"
          onChange={() => setBestseller((prev) => !prev)}
          checked={bestseller}
        />
        <label className="cursor-pointer" htmlFor="bestseller">
          Add to Bestseller
        </label>
      </div>

      <button type="submit" className="w-28 py-3 mt-4 bg-black text-white">
        ADD
      </button>
    </form>
  );
};

export default Add;
