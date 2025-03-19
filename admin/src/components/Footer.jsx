import { Link, useNavigate } from "react-router-dom";
function Footer() {
    return (
        <footer className="bg-slate-800 text-gray-300">
            {/* Main Footer Content */}
            <div className="container mx-auto px-6 py-12 flex flex-wrap gap-3 sm:justify-center  text-left">
                {/* Logo and Description */}
                <div className="flex flex-col items-start space-y-4  w-full md:w-1/5">
                    <div className="bg-white p-2 w-[140px] lg:w-[160px]">
                        <img 
                            src="/assets/images/logo.png" 
                            alt="Keith Ceramic Logo" 
                            className="w-full h-auto"
                        />
                    </div>
                    <p className="text-sm text-gray-400">
                        <strong>Keith Ceramic.</strong><br></br> Casting a better future together since 1992
                    </p>
                </div>

                {/* Products */}
                <div className="flex flex-col text-left  items-start space-y-3 w-full md:w-1/5 mt-6 md:mt-0">
                    <h3 className="text-white font-semibold  tracking-wider text-sm">
                        Products
                    </h3>
                    <ul className="space-y-2">
                        {[
                            {title:"Municipal Castings",url:"/products/municipal-public-utility-castings"},
                            {title:"Water Distribution Equipment",url:"/products/water-distribution-equipment"},
                            {title:"Agricultural Castings",url:"/products/agricultural-castings"}, 
                            {title:"Railway Castings",url:"/products/railway-castings"},
                            {title:"Counter Weights",url:"/products/counter-weights"},
                            {title:"High Tension Power Transmission",url:"/products/high-tension-power-transmission"},
                            {title:"Miscellaneous Castings",url:"/products/miscellaneous-castings"}, 
                            ].map((item) => (
                            <li key={item.title}>
                                <Link to={item.url} className="text-gray-400 hover:text-white transition-colors text-sm">
                                    {item.title}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Company */}
                <div className="flex flex-col items-start space-y-3 w-full md:w-1/5 mt-6 md:mt-0">
                    <h3 className="text-white font-semibold  tracking-wider text-sm">
                        Company
                    </h3>
                    <ul className="space-y-2">
                    {[
                            {title:"About Us",url:"/about"}, 
                            // {title:"Teams",url:"/about"},
                            {title:"Infrastructure",url:"/infrastructure"},
                            {title:"Quality",url:"/quality"},
                            ].map((item) => (
                            <li key={item.title}>
                                <Link to={item.url} className="text-gray-400 hover:text-white transition-colors text-sm">
                                    {item.title}
                                </Link>
                            </li>
                        ))}
                        
                    </ul>
                </div>

                {/* Contact */}
                <div className="flex flex-col items-start space-y-3 w-full md:w-1/5 mt-6 md:mt-0">
                    <h3 className="text-white font-semibold  tracking-wider text-sm">
                        Contact
                    </h3>
                    <ul className="space-y-2 text-gray-400 text-sm">
                        <li>+91 33 26775922</li>
                        <li>info@keithceramic.com</li>
                        <li>Suite-5, Mahamaya Apartments<br></br> 58/1/1,Natabar Paul Road<br></br> Howrah – 711101<br></br>West Bengal, India</li>
                        <li></li>
                    </ul>
                </div>
            </div>

            {/* Copyright Section */}
            <div className="border-t border-gray-600/50 mt-6">
                <div className="container mx-auto px-6 py-4 flex flex-col md:flex-row items-center justify-between text-xs text-gray-400">
                    <p className="text-center md:text-left">
                        © {new Date().getFullYear()} Keith Ceramic. All rights reserved.
                    </p>
                    <div className="mt-2 md:mt-0">
                        Developed by {" "}
                        <a
                            href="https://www.thinknxtmedia.com"
                            className="text-blue-300 hover:text-blue-400 transition-colors"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Think nXt Media
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
