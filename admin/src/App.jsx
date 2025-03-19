import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import AdminDashboard from "./pages/AdminDashboard";

function App() {
  return (
    <Routes>
      {/* Redirect `/admin` to `/admin/home` */}
      <Route path="/" element={<Navigate to="/admin/home" replace />} />
      <Route path="/admin/*" element={<AdminDashboard />} />
      {/* Add other non-admin routes here if needed */}
    </Routes>
  );
}

export default function Main() {
  return (
    <Router>
      <HelmetProvider>
        <App />
      </HelmetProvider>
    </Router>
  );
}
