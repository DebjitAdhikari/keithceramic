import { useState, useEffect } from "react";

function WhyUs() {
  const [isInView, setIsInView] = useState(false);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    
    const section = document.getElementById("why-us-section");
    if (section) observer.observe(section);
    
    return () => {
      if (section) observer.unobserve(section);
    };
  }, []);

  return (
    <section id="why-us-section" className="bg-white py-16 md:py-24 overflow-hidden relative">
      {/* Background decorative elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#FD5D14]/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-800/5 rounded-full translate-y-1/3 -translate-x-1/3 blur-3xl"></div>
      
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Heading section with elegant styling */}
        <div className={`relative mb-16 transition-all duration-1000 ${isInView ? 'opacity-100' : 'opacity-0 translate-y-10'}`}>
          <div className="flex items-center space-x-4">
            <div className="h-1 w-12 bg-blue-800"></div>
            <h2 className="text-lg text-blue-800 font-semibold uppercase tracking-wider">Our Advantage</h2>
          </div>
          <h1 className="mt-4 text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900">
            Why <span className="text-[#FD5D14]">Keith Ceramic?</span>
          </h1>
          <p className="mt-6 text-gray-600 max-w-2xl text-lg">
            Discover how our three decades of excellence in manufacturing sets us apart in the industry.
          </p>
        </div>

        {/* Main content area */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left side - Text content */}
          <div className={`transition-all duration-1000 delay-300 ${isInView ? 'opacity-100' : 'opacity-0 translate-y-10'}`}>
            <div className="bg-gray-50 border border-gray-100 rounded-2xl p-6 md:p-8 shadow-lg">
              <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-6 flex items-center">
                <span className="text-[#FD5D14] mr-2">▣</span>
                Heritage & Expertise
              </h3>
              <div className="prose prose-lg text-gray-700">
                <p className="mb-6">
                  <strong>KEITH CERAMIC (KTC)</strong>: Leading & well-established manufacturer & 
                  exporter of grey iron castings since 1992.
                </p>
                <p>
                  KEITH CERAMIC (KTC) is a family-owned business with over three decades 
                  of experience in manufacturing grey iron castings. Founded in 1992, we 
                  have become a distinguished manufacturer and exporter of high-quality 
                  grey iron castings with an annual installed production capacity of 30,000 MT.
                </p>
              </div>
            </div>

            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-50 border border-gray-100 rounded-2xl p-6 shadow-lg h-full">
                <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                  <span className="text-[#FD5D14] mr-2">▣</span>
                  Strategic Location
                </h3>
                <p className="text-gray-700">
                  KTC is strategically located with easy access to 2 nearby ports and a 
                  railway station, making it easier to transport multi-axle goods efficiently. 
                  Our facility is conveniently situated along a national highway, ensuring 
                  smooth logistics and timely delivery.
                </p>
              </div>

              <div className="bg-gray-50 border border-gray-100 rounded-2xl p-6 shadow-lg h-full">
                <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                  <span className="text-[#FD5D14] mr-2">▣</span>
                  Raw Material Access
                </h3>
                <p className="text-gray-700">
                  Our site is in close proximity to essential raw materials such as pig iron, 
                  hard coke, scrap, and ferro alloys, allowing us to maintain a consistent 
                  supply chain and produce high-quality castings.
                </p>
              </div>
            </div>
          </div>
          
          {/* Right side - Image gallery */}
          <div className={`transition-all duration-1000 delay-500 ${isInView ? 'opacity-100' : 'opacity-0 translate-x-10'}`}>
            <div className="relative">
              <div className="absolute -inset-4 bg-[#FD5D14]/10 rounded-xl blur-md z-0"></div>
              <div className="relative z-10 grid gap-4">
                <div className="overflow-hidden rounded-xl shadow-xl">
                  <img 
                    className="w-full h-64 md:h-72 object-cover transition-transform duration-700 hover:scale-105" 
                    src="./assets/images/infra/HIGH PRESSURE MOULDING MACHINE-min.jpg" 
                    alt="High Pressure Moulding Machine" 
                  />
                  <div className="bg-white p-4">
                    <h4 className="font-bold text-gray-800">High Pressure Moulding Machine</h4>
                    <p className="text-sm text-gray-600">State-of-the-art equipment for precision manufacturing</p>
                  </div>
                </div>
                
                <div className="overflow-hidden rounded-xl shadow-xl">
                  <img 
                    className="w-full h-64 md:h-72 object-cover transition-transform duration-700 hover:scale-105" 
                    src="./assets/images/infra/FULLY AUTOMATIC SAND PLANT-min.jpg" 
                    alt="Fully Automatic Sand Plant" 
                  />
                  <div className="bg-white p-4">
                    <h4 className="font-bold text-gray-800">Fully Automatic Sand Plant</h4>
                    <p className="text-sm text-gray-600">Advanced technology for consistent quality control</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Call to action */}
        {/* <div className={`mt-16 text-center transition-all duration-1000 delay-700 ${isInView ? 'opacity-100' : 'opacity-0 translate-y-10'}`}>
          <div className="inline-block bg-gradient-to-r from-blue-800 to-[#FD5D14] p-px rounded-lg">
            <button className="bg-white hover:bg-gray-50 text-gray-800 font-bold py-3 px-8 rounded-lg transition-all duration-300">
              Learn More About Our Manufacturing Process
            </button>
          </div>
        </div> */}
      </div>
    </section>
  );
}

export default WhyUs;