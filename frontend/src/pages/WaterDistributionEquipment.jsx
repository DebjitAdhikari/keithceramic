import { useEffect, useState } from "react";
import FetchProducts from "../services/ProductPage/FetchProducts";
import { Helmet } from "react-helmet-async";

function WaterDistributionEquipment() {
  const [products,setProducts]=useState([])
  async function fetchallproducts(){
    try {
      const get = await FetchProducts()
      console.log("product",get.getall)
      setProducts(get.getall.filter(item=>item.typeofproduct==="Water Distribution Equipment"))
    } catch (err) {
      console.log(err)
    }
  }
  // function filterProducts(){
  //   const filteredProducts = products.
  //   console.log("filtered",filteredProducts)
  //   setProducts(filterProducts)
  // }

  useEffect(()=>{
    fetchallproducts()
  },[])
  useEffect(()=>{
      window.scrollTo(0,0)
    },[])
  return (
    <div className="min-h-[60vh] w-full sm:py-6 px-2 py-2 sm:px-6 bg-gray-100">
      <Helmet>
      <title>Water Distribution Equipment | Keith Ceramic</title>
      <meta name="description" content="Discover premium water distribution equipment, including durable castings for pipelines, valves, and fittings for efficient water management." />
      <meta name="keywords" content="Water Distribution Equipment, Pipeline Castings, Water Valves, Durable Fittings, Water Management Solutions, Keith Ceramic" />
    </Helmet>
      {/* Section Title */}
      <div className="text-left lg:ml-14 mb-10">
        <h1 className="text-lg md:text-2xl lg:text-4xl font-bold text-[#FD5D14] border-l-4 border-blue-700 pl-4 mb-6">
        Water Distribution Equipment
        </h1>
      </div>

      {/* Products Grid Section */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 px-4">
        {products?.map((product, index) => (
          <div
            key={index}
            className="relative hover:cursor-pointer space-y-2 bg-white rounded-lg overflow-hidden shadow-lg"
          >
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-48 object-contain"
            />
            <div className="px-4 py-2 text-left">
              <h2 className="text-md sm:text-lg  text-slate-500">{product.title}</h2>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default WaterDistributionEquipment;
