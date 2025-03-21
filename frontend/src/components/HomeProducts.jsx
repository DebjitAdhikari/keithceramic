import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import FetchProducts from "../services/ProductPage/FetchProducts";

function HomeProducts() {
  const [allproducts, setAllProducts] = useState([]);

async function fetchProduct() {
  try {
    const get = await FetchProducts();
    console.log("getproducts", get.getall);

    // Define the required categories
    const requiredCategories = [
      "Municipal Castings",
      "Water Distribution Equipment",
      "Agricultural Castings",
      "Counter Weights"
    ];

    // Create a map to store one product per required category
    const uniqueProducts = new Map();

    get.getall.forEach((product) => {
      if (requiredCategories.includes(product.typeofproduct) && !uniqueProducts.has(product.typeofproduct)) {
        uniqueProducts.set(product.typeofproduct, product);
      }
    });

    // Convert map values to array and update state
    setAllProducts(Array.from(uniqueProducts.values()));
  } catch (error) {
    console.log(error);
  }
}

useEffect(() => {
  fetchProduct();
}, []);


  return (
    <div className="min-h-[50vh] w-full py-10 px-4 bg-gray-50">
      {/* Title Section */}
      <div className="text-left lg:ml-14 mb-10">
        <h1 className="text-lg md:text-2xl border-l-4 border-blue-700 pl-2 md:text-4xl font-bold text-[#FD5D14]">
          Products
        </h1>
      </div>

      {/* Product Images Section */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        {allproducts.map((item, index) => (
          <div
            key={index}
            className="relative group rounded-xl overflow-hidden shadow-lg"
          >
            <img
              src={item.image} // Dynamic image from API
              alt={item.title || `Product ${index + 1}`}
              className="w-full h-64 object-contain transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="absolute bottom-4 left-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <h2 className="text-lg font-bold">{item.title || "Product Name"}</h2>
            </div>
          </div>
        ))}
      </div>

      {/* Explore More Button */}
      <div className="mt-10  flex justify-center">
        <button className="bg-[#FD5D14] hover:bg-[#e04c0f] px-6 py-3 rounded-full text-white font-semibold shadow-md transition-transform transform hover:scale-105">
          <Link to="/products" className="flex items-center gap-2">
            <span>Explore more products</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
              />
            </svg>
          </Link>
        </button>
      </div>
    </div>
  );
}

export default HomeProducts;