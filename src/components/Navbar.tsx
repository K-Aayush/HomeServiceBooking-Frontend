import logo from "../assets/Logo.svg";
import { Button } from "./ui/button";

const Navbar = () => {
  return (
    <div className="flex shadow-sm p-5 justify-between">
      <div className="flex items-center gap-8">
        <img src={logo} alt="logo" width={200} height={200} />
        <div className="md:flex hidden items-center gap-6">
          <h2 className="hover:scale-105 hover:text-primary">Home</h2>
          <h2 className="hover:scale-105 hover:text-primary">Services</h2>
          <h2 className="hover:scale-105 hover:text-primary">About Us</h2>
        </div>
      </div>
      <div className="md:flex hidden gap-2">
        <Button variant="ghost">Recuriter Login</Button>
        <Button>Login</Button>
      </div>
    </div>
  );
};

export default Navbar;
