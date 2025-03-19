import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import FetchAboutus from "../services/AboutPage/FetchAboutHeading";


function ShortAbout() {
    const[data, setdata]=useState("")
    
    async function fetchabout()
    {
     try{
        const get=await FetchAboutus();
        console.log('get',get)
        setdata(get)
     }
     catch(error)
     {
        console.log('error',error)
     }
    }
    useEffect(()=>{
       fetchabout();
    },[])
    
    return (
        <div className="min-h-[50vh] w-full py-12 px-4 flex items-center justify-center bg-gray-100">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12 px-4 md:px-8">
        {/* Text Section */}
        <div className="max-w-2xl text-center lg:text-left">
          <h1 className="text-2xl md:text-4xl font-extrabold border-l-4 border-blue-800 pl-3 text-[#FD5D14] mb-6">
            {data.header}
          </h1>
          <ul className="space-y-4 text-gray-700 text-base md:text-lg leading-relaxed">
            <li dangerouslySetInnerHTML={{ __html: data?.content }} />
          </ul>
          <div className="mt-6">
            <Link
              to="/about"
              className="inline-flex items-center gap-2 bg-[#FD5D14] text-white px-5 py-3 rounded-md text-lg font-semibold shadow-md transition-all hover:bg-orange-600 hover:scale-105"
            >
              See more
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6"
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

        {/* Image Section */}
        <div className="w-full max-w-lg">
          <img
            className="rounded-lg shadow-lg w-full object-cover transition-all duration-300 hover:scale-105"
            src="./assets/images/full-keith.webp"
            alt="Who we are"
          />
        </div>
      </div>
    </div>
    )
}

export default ShortAbout