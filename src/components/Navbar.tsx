import logo from "../assets/Logo.svg";
import { Button } from "./ui/button";

const Navbar = () => {
  return (
    <div className="flex shadow-sm p-5 justify-between">
      <div className="flex items-center gap-8">
        <img src={logo} alt="logo" width={200} height={200} />
        <div className="flex items-center gap-6">
          <h2>Home</h2>
          <h2>Services</h2>
          <h2>About Us</h2>
        </div>
      </div>
      <div className="flex gap-2">
        <Button variant="ghost">Recuriter Login</Button>
        <Button>Login</Button>
      </div>
    </div>
  );
};

export default Navbar;
