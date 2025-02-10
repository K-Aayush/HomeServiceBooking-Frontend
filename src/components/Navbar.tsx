import logo from "../assets/Logo.svg";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { MenuIcon } from "lucide-react";
import { useClerk, UserButton, useUser } from "@clerk/clerk-react";
import { useContext, useState } from "react";
import { ClipLoader } from "react-spinners";
import { Link } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const Navbar = () => {
  const { openSignIn } = useClerk();
  const { user, isLoaded } = useUser();
  const [isSheetOpen, setIsSheetOpen] = useState<boolean>(false);
  const { setShowRequiterLogin } = useContext(AppContext);

  //close the sidebar when opening the signin popup
  const handleSignIn = () => {
    setIsSheetOpen(false);
    openSignIn();
  };

  //close the sidebar when navigating the pages
  const handleCloseSheet = () => {
    setIsSheetOpen(false);
  };
  return (
    <div className="mx-6 md:mx-16">
      <div className="flex shadow-sm p-5 justify-between">
        <div className="flex items-center gap-8">
          {/* logo */}
          <Link to={"/"}>
            <img src={logo} alt="logo" width={200} height={200} />
          </Link>
          {/* navLinks */}

          <div className="md:flex hidden items-center gap-6">
            <Link to={"/"}>
              <h2 className="hover:scale-105 hover:text-primary">Home</h2>
            </Link>
            <Link to={"/Services"}>
              <h2 className="hover:scale-105 hover:text-primary">Services</h2>
            </Link>
            <Link to={"/About"}>
              <h2 className="hover:scale-105 hover:text-primary">About Us</h2>
            </Link>
          </div>
        </div>
        {!isLoaded ? (
          <div className="hidden md:flex">
            <ClipLoader />
          </div>
        ) : user ? (
          <div className="hidden md:flex gap-4">
            <p>Hi, {user.firstName + " " + user.lastName}</p>
            <UserButton />
          </div>
        ) : (
          <div className="md:flex hidden gap-2">
            <Button onClick={() => setShowRequiterLogin(true)} variant="ghost">
              Recuriter Login
            </Button>
            <Button onClick={handleSignIn}>Login</Button>
          </div>
        )}

        {/* mobile screen */}
        <div className="flex md:hidden">
          <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
            <SheetTrigger>
              <MenuIcon size={25} className="mr-2" />
            </SheetTrigger>
            <SheetContent>
              <div className="flex flex-col gap-2 mt-10">
                <div className="flex flex-col gap-2 text-center">
                  <Link to={"/"} onClick={handleCloseSheet}>
                    <h2 className="p-2 border border-gray-600 rounded-md">
                      Home
                    </h2>
                  </Link>
                  <Link to={"/Services"} onClick={handleCloseSheet}>
                    <h2 className="p-2 border border-gray-600 rounded-md">
                      Service
                    </h2>
                  </Link>
                  <Link to={"/About"} onClick={handleCloseSheet}>
                    <h2 className="p-2 border border-gray-600 rounded-md">
                      About Us
                    </h2>
                  </Link>
                </div>
                {user ? (
                  <div></div>
                ) : (
                  <div className="flex flex-col gap-2">
                    <Button
                      onClick={() => setShowRequiterLogin(true)}
                      variant="outline"
                    >
                      Recuriter Login
                    </Button>
                    <Button onClick={handleSignIn}>Login</Button>
                  </div>
                )}
              </div>
            </SheetContent>
          </Sheet>

          {isLoaded && user && <UserButton />}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
