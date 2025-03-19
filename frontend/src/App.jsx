import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Products from "./pages/Products";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Infrastructure from "./pages/Infrastructure";
import Quality from "./pages/Quality";
import { useEffect } from "react";

// External redirection component
function ExternalRedirect() {
  useEffect(() => {
    window.location.href = "http://localhost:5174/";
  }, []);

  return null;
}

function App() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");

  return (
    <HelmetProvider>
      {!isAdminRoute && <NavBar />}
      <div className="overflow-x-hidden">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products/*" element={<Products />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/infrastructure" element={<Infrastructure />} />
          <Route path="/quality" element={<Quality />} />
          {/* Use ExternalRedirect Component for Admin Route */}
          <Route path="/admin/*" element={<ExternalRedirect />} />
        </Routes>
      </div>
      {!isAdminRoute && <Footer />}
    </HelmetProvider>
  );
}

export default function Main() {
  return (
    <Router>
      <App />
    </Router>
  );
}
