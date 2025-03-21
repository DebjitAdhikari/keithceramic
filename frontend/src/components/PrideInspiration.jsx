import { Link } from "react-router-dom";
import FetchManagement from "../services/AboutPage/FetchManagement";
import { useEffect, useState } from "react";

function PrideInspiration() {
  const [getmanagement, setmanagement] = useState([]);

  async function Fetchinspiration() {
    try {
      const get = await FetchManagement();
      console.log("inspire", get);
      setmanagement(get);
    } catch (error) {
      console.log("error", error);
    }
  }

  useEffect(() => {
    Fetchinspiration();
  }, []);

  return (
    <div className="min-h-[50vh] w-full py-10 px-4 bg-gray-100">
      {/* Section Title */}
      <div className="text-left lg:ml-14 mb-10">
        <h1 className="text-lg md:text-2xl border-l-4 border-blue-700 pl-2 md:text-4xl font-bold text-[#FD5D14]">
          Our Pride Our Inspiration
        </h1>
      </div>

      {/* Management Section */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
        {getmanagement?.map((item, index) => (
          <div
          key={index}
          className="relative group rounded-lg overflow-hidden shadow-lg"
        >
          {/* Blurred Background using the same image */}
          <div
            className="absolute inset-0 bg-cover bg-center filter blur-2xl brightness-50"
            style={{ backgroundImage: `url(${item.image})` }}
          ></div>
        
          {/* Main Image */}
          <img
            src={item.image}
            alt={item.name}
            className="relative w-full h-64 md:h-96 object-contain transition-transform duration-500 group-hover:scale-110"
          />
        
          {/* Gradient Overlay for better contrast */}
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-slate/90 to-transparent"></div>
        
          {/* Text Content */}
          <div className="absolute inset-0 flex items-end p-4">
            <div className="text-white drop-shadow-lg">
              <h2 className="text-lg sm:text-2xl font-bold">{item.name}</h2>
              <p className="text-sm sm:text-md font-light">{item.position}</p>
            </div>
          </div>
        </div>
        
        ))}
      </div>

      {/* See More Button */}
      <div className="mt-10 flex justify-center">
        <Link
          to="/about"
          className="bg-[#FD5D14] hover:bg-[#e04c0f] px-6 py-3 rounded-full text-white font-semibold shadow-md transition-transform transform hover:scale-105 flex items-center gap-2"
        >
          <span>See more</span>
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
      </div>
    </div>
  );
}

export default PrideInspiration;