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

const App = () => {
  const location = useLocation();
  const { showRequiterLogin } = useContext(AppContext);
  return (
    <div>
      <Navbar />
      {showRequiterLogin && <RequiterLogin />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/About" element={<About />} />
        <Route path="/Services" element={<Services />} />
        <Route path="/category/:id" element={<Category />} />
        <Route
          path="/businessDetails/:businessDetailsid"
          element={<BusinessDetails />}
        />
      </Routes>
      {!location.pathname.startsWith("/category/") && <Footer />}
    </div>
  );
};

export default App;
