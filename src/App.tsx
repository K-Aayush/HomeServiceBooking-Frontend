import { Route, Routes, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Category from "./pages/Category";
import BusinessDetails from "./pages/BusinessDetails";
import RequiterLogin from "./components/RequiterLogin";
import { useContext } from "react";
import { AppContext } from "./context/AppContext";
import { Toaster } from "sonner";
import RequiterDashboard from "./pages/RequiterDashboard/RequiterDashboard";
import AddService from "./pages/RequiterDashboard/AddService";
import ManageService from "./pages/RequiterDashboard/ManageService";
import ViewRequiterDashboard from "./pages/RequiterDashboard/ViewRequiterDashboard";

const App = () => {
  const location = useLocation();
  const { showRequiterLogin } = useContext(AppContext);
  return (
    <div>
      {!location.pathname.startsWith("/requiterDashboard") && <Navbar />}
      {showRequiterLogin && <RequiterLogin />}
      <Toaster richColors duration={5000} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/About" element={<About />} />
        <Route path="/Services" element={<Services />} />
        <Route path="/category/:id" element={<Category />} />
        <Route path="/businessDetails/:id" element={<BusinessDetails />} />
        <Route path="/requiterDashboard" element={<RequiterDashboard />}>
          <Route path="dashboard" element={<ViewRequiterDashboard />} />
          <Route path="add-service" element={<AddService />} />
          <Route path="manage-service" element={<ManageService />} />
        </Route>
      </Routes>
      {!location.pathname.startsWith("/category/") &&
        !location.pathname.startsWith("/requiterDashboard") && <Footer />}
    </div>
  );
};

export default App;
