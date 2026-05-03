import SearchInput from "../../components/SearchInput";
import "./medShop.css";
import { CiMenuKebab,CiShoppingCart  } from "react-icons/ci";
// Images import png

import Img1 from "./assets/homeopathy.png";
import Img2 from "./assets/medicalkit.png";
import Img3 from "./assets/covid.png";
import Img4 from "./assets/skincare.png";
import Img5 from "./assets/dental.png";
import Img6 from "./assets/healthdevice.png";

const categories = [
  { id: 0, image: "", name: "Medicines" },
  { id: 1, image: Img1, name: "Homeopathy" },
  { id: 2, image: "", name: "Harboil" },
  { id: 3, image: Img2, name: "Medical Kit" },
  { id: 4, image: Img3, name: "Corona Help" },
  { id: 5, image: Img6, name: "Health Device" },
  { id: 6, image: Img4, name: "Skin care" },
  { id: 7, image: Img5, name: "Dental care" },
];

const products = [
  { id: 1, image: "", name: "Paracetamol", describe: "abced", price: "₹ 30" },
  { id: 2, image: "", name: "Dispring", describe: "abced", price: "₹ 80" },
  { id: 3, image: "", name: "Ozon-D", describe: "abced", price: "₹ 120" },
];

const medicalShop = () => {
  return (
    <div className="min-h-screen md:pt-20 px-3">
      <nav className="flex justify-around bg-green-500/40 py-2  rounded-lg mb-2 mt-2 backdrop-blur-md transition-all duration-300">
        <CiMenuKebab className="border p-0.5 left-2 rounded-full absolute " size={26}/>
        <h1 className="uppercase">medicne shop</h1>
        <CiShoppingCart className="border p-0.5 right-2 absolute rounded-full " size={26}/>
      </nav>
      <div>
        <SearchInput
          name="medicinesearch"
          placeholder="Search medicine..."
          type="search"
        />
      </div>
      {/* Categories */}
      <div className="">
        <h1 className="font-bold py-1">Categories</h1>

        <div className="grid grid-cols-4 gap-2 p-2 rounded-lg">
          {categories.map((categorie, index) => (
            <div
              key={categorie.id}
              className="category-card bg-green-400/50 rounded-lg px-2 py-3"
              style={{ animationDelay: `${index * 90}ms` }}
            >
              <div className="flex flex-col items-center gap-1 px-2">
              <img
                src={
                  categorie.image ||
                  "https://imgs.search.brave.com/ZYLS9hrIgFMeRans2F3Ye0hal5ztLuY193CWMp7Q2h0/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4u/aWNvbnNjb3V0LmNv/bS9pY29uL3ByZW1p/dW0vcG5nLTI1Ni10/aHVtYi9tZWRpY2lu/ZS1pY29uLXN2Zy1k/b3dubG9hZC1wbmct/NDE2OTM5NS5wbmc_/Zj13ZWJwJnc9MTI4"
                }
                alt={categorie.name}
                className="h-10 w-10 object-contain"
              />
              <p className="text-[9px] text-center text-wrap truncate md:text-sm">
                {categorie.name}
              </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Products*/}

      <span className="flex justify-between py-1">
        <h1 className=" font-bold ">Products</h1>
        <p className=" underline ">More </p>
      </span>
      <div
        className="flex overflow-x-auto gap-4 p-4  scrollbar-hide scroll-smooth
      "
      >
        {products.map((product, index) => (
          <div
            key={product.id}
            className="product-card bg-green-400/50 min-w-40 p-4 rounded-lg shadow"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div
              className=" p-2 rounded-lg"
            >
              <img
                src={
                  product.image ||
                  "https://imgs.search.brave.com/-ThNulUFhpaEFEGrmLozYs-WdhBex8k8yNcs3XC94Lg/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvNDkw/Mzc1MzU3L3Bob3Rv/L2Nsb3NlLXVwLW9m/LW9wZW4tYmx1ZS1j/YXJkYm9hcmQtcGFj/a2V0LW9mLXBhcmFj/ZXRhbW9sLXBhaW4t/cmVsaWVmLmpwZz9z/PTYxMng2MTImdz0w/Jms9MjAmYz1xNUVz/a1QyRzBlZXZhMzlJ/Rm1aVW1udmZVWjRf/elRxVEZQNUVKMlFo/dVpZPQ "
                }
                alt="product"
                className="w-28 h-20"
              />
            </div>
            <div className="flex flex-col">
              <h3>{product.name}</h3>
              <p className="text-gray-400 ">{product.describe}</p>
              <b>{product.price}</b>
            </div>
            <button className="bg-blue-400 p-0.5 px-3 rounded">Add cart</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default medicalShop;
