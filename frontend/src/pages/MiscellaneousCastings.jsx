import { useEffect, useState } from "react";
import FetchProducts from "../services/ProductPage/FetchProducts";
import { Helmet } from "react-helmet-async";

// const products = [
//   { name: "HARD LINER PLATES OF 400+BHN", image: "/assets/images/products/miscellaneous-castings/HARD LINER PLATES OF 400+BHN.jpg" },
//   { name: "MATCH PLATE FOR HIGH PRESSURE MOULDING MACHINE", image: "/assets/images/products/miscellaneous-castings/MATCH PLATE FOR HIGH PRESSURE MOULDING MACHINE.jpg" },
//   { name: "MATCH PLATE FOR SIMULTANEOUS JOLT SQUEEZE MACHINE", image: "/assets/images/products/miscellaneous-castings/MATCH PLATE FOR SIMULTANEOUS JOLT SQUEEZE MACHINE.jpg" },
//   { name: "MOULD BOX FOR HIGH PRESSURE MOULDING LINE", image: "/assets/images/products/miscellaneous-castings/MOULD BOX FOR HIGH PRESSURE MOULDING LINE.jpg" },
//   { name: "PALLET CAR FOR AUTOMATED MOULD HANDLING SYSTEM", image: "/assets/images/products/miscellaneous-castings/PALLET CAR FOR AUTOMATED MOULD HANDLING SYSTEM.jpg" },

// // Add more products as needed
// ];
function MiscellaneousCastings() {
  const [products,setProducts]=useState([])
  async function fetchallproducts(){
    try {
      const get = await FetchProducts()
      console.log("product",get.getall)
      setProducts(get.getall.filter(item=>item.typeofproduct==="Counter Weights"))
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
      <title>Miscellaneous Castings | Keith Ceramic</title>
      <meta name="description" content="Explore our range of high-quality miscellaneous castings for various industrial applications." />
      <meta name="keywords" content="Miscellaneous Castings, Industrial Castings, Custom Castings" />
    </Helmet>
      {/* Section Title */}
      <div className="text-left lg:ml-14 mb-10">
        <h1 className="text-lg md:text-2xl lg:text-4xl font-bold text-[#FD5D14] border-l-4 border-blue-700 pl-4 mb-6">
        Miscellaneous Castings
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

export default MiscellaneousCastings;

