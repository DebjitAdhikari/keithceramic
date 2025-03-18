import { useEffect, useState } from "react";
import FetchQuality from "../services/Quality/FetchQuality";

import { Helmet } from "react-helmet-async";

function Infrastructure() {
  const [QualityData, setQualityData] = useState([]);

  async function fetchquality() {
    try {
      const get = await FetchQuality();
      setQualityData(get.filter(item=>item.typeofproduct==="Item For Infrastructure"));
      console.log("get", get);
    } catch (error) {
      console.log("error", error);
    }
  }
  const filted = QualityData?.filter(
    (item) => item.typeofproduct === "Item For Infrastructure"
  );
  
  useEffect(() => {
    fetchquality();
  }, []);
  return (
    <div className="w-full min-h-screen pt-[120px] bg-gray-100 sm:pt-[150px] flex flex-col items-center py-10 animate-fadeIn">
        <Helmet>
            <title>Keith Ceramic Infrastructure | Advanced Ceramic Manufacturing Facilities</title>
            <meta name="description" content="Explore Keith Ceramic's state-of-the-art manufacturing infrastructure. Learn how our advanced facilities ensure the highest quality in ceramic production." />
            <meta name="keywords" content="Keith Ceramic, ceramic manufacturing, pottery production, handmade ceramics infrastructure, advanced ceramic facilities, ceramic production process" />
            <meta name="author" content="Keith Ceramic" />
        </Helmet>

        <h1 className="text-xl self-start ml-4 sm:ml-16 md:text-3xl font-bold border-l-4 border-blue-800 pl-2 text-[#FD5D14] mb-4 md:mb-10 animate-fadeIn">
          Infrastructure
        </h1>

        <div className="w-[90%] md:w-[80%] bg-white shadow-lg rounded-lg p-2 sm:p-6 mb-10 animate-fadeIn">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {QualityData?.map((item, index) => (
              <div
                key={index}
                className="bg-gray-100 hover:cursor-pointer rounded-lg shadow-lg overflow-hidden relative group"
              >
                <div className="relative">
                <img
                  src={item.image || "./assets/images/default.jpg"}
                  alt={item.name || "Equipment Image"}
                  className="w-full h-60 object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-60 opacity-0 group-hover:opacity-100 transition duration-300 flex items-center justify-center">
                  <p className="text-white text-center px-4">
                    {item.description || "Equipment Name"}
                  </p>
                </div>
                </div>
                <div className="p-3 h-full bg-gray-100 text-center">
                  <h3 className=" text-xs sm:text-lg font-semibold text-gray-800">
                    {item.name}
                  </h3>
                </div>
                
              </div>
            ))}
          </div>
        </div>
      </div>
  );
}

export default Infrastructure;


