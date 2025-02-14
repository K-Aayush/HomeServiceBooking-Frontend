import { User } from "lucide-react";
import logo from "../assets/Logo.svg";
import { Avatar, AvatarImage, AvatarFallback } from "../components/ui/avatar";

const RequiterDashboard = () => {
  return (
    <div className="min-h-screen">
      {/*Navbar for requiter pannel*/}
      <div className="py-4 shadow">
        <div className="flex items-start justify-between px-5">
          <img
            className="cursor-pointer max-sm:w-32"
            src={logo}
            alt="logo"
            width={200}
            height={200}
          />
          <div className="flex items-center gap-3">
            <p className="max-sm:hidden">Welcome, Rquiter</p>
            <div className="relative group">
              <Avatar>
                <AvatarImage />
                <AvatarFallback>
                  <User />
                </AvatarFallback>
              </Avatar>
              <div className="absolute top-0 right-0 z-10 hidden pt-12 text-black rounded group-hover:block">
                <ul className="p-2 m-0 text-sm list-none border rounded-md bg-gray-50">
                  <li className="px-2 py-1 pr-10 cursor-pointer">Logout</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RequiterDashboard;
