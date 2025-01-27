import logo from "../assets/Logo.svg";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { MenuIcon } from "lucide-react";
import { useClerk, UserButton, useUser } from "@clerk/clerk-react";
import { useState } from "react";

const Navbar = () => {
  const { openSignIn } = useClerk();
  const [isSheetOpen, setIsSheetOpen] = useState<boolean>(false);

  const handleSignIn = () => {
    setIsSheetOpen(false);
    openSignIn();
  };
  return (
    <div className="flex shadow-sm p-5 justify-between">
      <div className="flex items-center gap-8">
        {/* logo */}
        <img src={logo} alt="logo" width={200} height={200} />
        {/* navlinks */}
        <div className="md:flex hidden items-center gap-6">
          <h2 className="hover:scale-105 hover:text-primary">Home</h2>
          <h2 className="hover:scale-105 hover:text-primary">Services</h2>
          <h2 className="hover:scale-105 hover:text-primary">About Us</h2>
        </div>
      </div>
      {/* Auth links */}
      <div className="md:flex hidden gap-2">
        <Button variant="ghost">Recuriter Login</Button>
        <Button onClick={() => openSignIn()}>Login</Button>
      </div>

      {/* mobile screen */}
      <div className="flex md:hidden">
        <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
          <SheetTrigger>
            <MenuIcon />
          </SheetTrigger>
          <SheetContent>
            <div className="flex flex-col gap-2 mt-10">
              <div className="flex flex-col gap-2 text-center">
                <h2 className="p-2 border border-gray-600 rounded-md">Home</h2>
                <h2 className="p-2 border border-gray-600 rounded-md">
                  Service
                </h2>
                <h2 className="p-2 border border-gray-600 rounded-md">
                  About Us
                </h2>
              </div>
              <div className="flex flex-col gap-2">
                <Button variant="outline">Recuriter Login</Button>
                <Button onClick={handleSignIn}>Login</Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
};

export default Navbar;
