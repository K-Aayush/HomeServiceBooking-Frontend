import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Category from "./pages/Category";

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/About" element={<About />} />
        <Route path="/Services" element={<Services />} />
        <Route path="/category/:id" element={<Category />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
