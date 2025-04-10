import {
  Home,
  LayoutDashboard,
  LogOut,
  MessageCircle,
  Settings,
  SquarePlus,
  User,
} from "lucide-react";
import logo from "../../assets/Logo.svg";
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "../../components/ui/avatar";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
import axios from "axios";

const RequiterDashboard = () => {
  const { logout, requiterData, backendUrl, requiterToken } =
    useContext(AppContext);
  const [unreadCount, setUnreadCount] = useState<number>(0);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch unread message count
    const fetchUnreadCount = async () => {
      if (!requiterData || !requiterToken) return;

      try {
        const { data } = await axios.get(
          `${backendUrl}/api/chat/requiter/unread`,
          {
            headers: { Authorization: requiterToken },
          }
        );

        if (data.success) {
          setUnreadCount(data.unreadCount);
        }
      } catch (error) {
        console.error("Error fetching unread count:", error);
      }
    };

    fetchUnreadCount();

    // Set up interval to check for new messages every minute
    const intervalId = setInterval(fetchUnreadCount, 60000);

    return () => clearInterval(intervalId);
  }, [requiterData, backendUrl, requiterToken]);

  const handleLogout = async () => {
    logout();
    navigate("/");
  };

  const isProfilePage = location.pathname.includes(
    "/requiterDashboard/profile"
  );

  return (
    <div className="min-h-screen">
      {/*Navbar for requiter pannel*/}
      <div className="py-4 shadow">
        <div className="flex items-start justify-between px-5">
          <img
            className="cursor-pointer max-sm:w-32"
            src={logo || "/placeholder.svg"}
            alt="logo"
            width={200}
            height={200}
          />
          <div className="flex items-center gap-3">
            <p className="max-sm:hidden">Welcome, {requiterData?.name}</p>
            <div className="relative group">
              <Avatar className="w-12 h-12">
                <AvatarImage
                  className="object-cover object-top w-full h-full rounded-full"
                  src={requiterData?.requiterProfileImage}
                  alt={"username"}
                />
                <AvatarFallback>
                  <User />
                </AvatarFallback>
              </Avatar>
              <div className="absolute top-0 right-0 z-10 hidden pt-12 text-black rounded w-52 group-hover:block">
                <ul className="flex flex-col gap-2 p-2 m-0 text-sm list-none border rounded-md bg-gray-50 hover:bg-gray-100">
                  <Link to={"/requiterDashboard/profile"}>
                    <li className="flex items-center px-2 py-1 pr-10 cursor-pointer">
                      <Settings className="w-4 h-4 mr-2" />
                      Account Settings
                    </li>
                  </Link>
                  <Link to={"/chat"}>
                    <li className="relative flex items-center px-2 py-1 pr-10 cursor-pointer">
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Messages
                      {unreadCount > 0 && (
                        <span className="absolute flex items-center justify-center w-5 h-5 text-xs text-white bg-red-500 rounded-full -right-2 -top-1">
                          {unreadCount > 99 ? "99+" : unreadCount}
                        </span>
                      )}
                    </li>
                  </Link>

                  <li
                    onClick={handleLogout}
                    className="flex items-center px-2 py-1 pr-10 cursor-pointer"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Logout
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-start">
        {/*sidebar for requiter pannel*/}
        {/* Conditionally render sidebar based on the current route */}
        {!isProfilePage && (
          <div className="inline-block min-h-screen border-r-2">
            <ul className="flex flex-col items-start pt-5 text-gray-800">
              <NavLink
                className={({ isActive }) =>
                  `flex items-center p-3 sm:px-6 gap-2 w-full hover:bg-gray-100 ${
                    isActive && "bg-indigo-100 border-r-4 border-primary"
                  }`
                }
                to={"/requiterDashboard/dashboard"}
              >
                <LayoutDashboard />
                <p>Dashboard</p>
              </NavLink>
              <NavLink
                className={({ isActive }) =>
                  `flex items-center p-3 sm:px-6 gap-2 w-full hover:bg-gray-100 ${
                    isActive && "bg-indigo-100 border-r-4 border-primary"
                  }`
                }
                to={"/requiterDashboard/add-service"}
              >
                <SquarePlus />
                <p>Add Service</p>
              </NavLink>
              <NavLink
                className={({ isActive }) =>
                  `flex items-center p-3 sm:px-6 gap-2 w-full hover:bg-gray-100 ${
                    isActive && "bg-indigo-100 border-r-4 border-primary"
                  }`
                }
                to={"/requiterDashboard/manage-service"}
              >
                <Home />
                <p>Manage Services</p>
              </NavLink>
              <NavLink
                className={({ isActive }) =>
                  `flex items-center p-3 sm:px-6 gap-2 w-full hover:bg-gray-100 relative ${
                    isActive && "bg-indigo-100 border-r-4 border-primary"
                  }`
                }
                to={"/chat"}
              >
                <MessageCircle />
                <p>Messages</p>
                {unreadCount > 0 && (
                  <span className="absolute flex items-center justify-center w-5 h-5 text-xs text-white bg-red-500 rounded-full right-2">
                    {unreadCount > 99 ? "99+" : unreadCount}
                  </span>
                )}
              </NavLink>
            </ul>
          </div>
        )}

        <div className="flex-1 pt-5 ml-5">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default RequiterDashboard;
