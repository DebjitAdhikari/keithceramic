import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Products from "./pages/Products";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Infrastructure from "./pages/Infrastructure";
import Quality from "./pages/Quality";
import AdminDashboard from "./pages/AdminDashboard";

function App() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");

  return (
    <HelmetProvider> {/* ✅ Wrap inside HelmetProvider */}
      {!isAdminRoute && <NavBar />}
      <div className="overflow-x-hidden">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products/*" element={<Products />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/infrastructure" element={<Infrastructure />} />
          <Route path="/quality" element={<Quality />} />
          <Route path="/admin/*" element={<AdminDashboard />} />
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