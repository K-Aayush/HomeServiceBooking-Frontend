import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  ArrowLeft,
  Mail,
  Phone,
  Calendar,
  MapPin,
  Lock,
  Ban,
  UserX,
  CheckCircle,
} from "lucide-react";
import { Badge } from "../../components/ui/badge";
import { useNotifications } from "../../context/NotificationContext";

// Mock user data
const mockUser = {
  id: "user123",
  name: "Jane Smith",
  email: "jane.smith@example.com",
  contactNumber: "+1 (555) 123-4567",
  status: "active",
  createdAt: "2023-01-15T14:30:00.000Z",
  address: "123 Main St, Anytown, CA 90210",
  profileImage: "https://i.pravatar.cc/300",
  recentBookings: [
    {
      id: "booking1",
      service: "House Cleaning",
      date: "2023-05-20T10:00:00.000Z",
      status: "completed",
    },
    {
      id: "booking2",
      service: "Lawn Mowing",
      date: "2023-05-15T14:00:00.000Z",
      status: "completed",
    },
    {
      id: "booking3",
      service: "Computer Repair",
      date: "2023-05-25T16:30:00.000Z",
      status: "pending",
    },
  ],
};

const UserDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [user, setUser] = useState(mockUser);
  const { addNotification } = useNotifications();
  const [isBanned, setIsBanned] = useState(false);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const handleBanUser = () => {
    setIsBanned(!isBanned);

    addNotification({
      message: `User ${isBanned ? "unbanned" : "banned"}: ${user.name}`,
      isRead: false,
      type: isBanned ? "success" : "warning",
      userId: user.id,
    });
  };

  const handleDeleteUser = () => {
    if (window.confirm(`Are you sure you want to delete user: ${user.name}?`)) {
      addNotification({
        message: `User deleted: ${user.name}`,
        isRead: false,
        type: "error",
        userId: user.id,
      });

      // Redirect would happen here in a real application
      window.history.back();
    }
  };

  const handleResetPassword = () => {
    addNotification({
      message: `Password reset initiated for: ${user.name}`,
      isRead: false,
      type: "info",
      userId: user.id,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Link
            to="/admin/users"
            className="p-2 mr-2 text-gray-600 bg-white rounded-full hover:bg-gray-100"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">User Details</h1>
        </div>
        <div className="flex gap-2">
          <button
            onClick={handleBanUser}
            className={`flex items-center px-4 py-2 text-sm font-medium rounded-md ${
              isBanned
                ? "text-green-700 bg-green-50 hover:bg-green-100"
                : "text-yellow-700 bg-yellow-50 hover:bg-yellow-100"
            }`}
          >
            {isBanned ? (
              <CheckCircle className="w-4 h-4 mr-2" />
            ) : (
              <Ban className="w-4 h-4 mr-2" />
            )}
            {isBanned ? "Unban User" : "Ban User"}
          </button>
          <button
            onClick={handleDeleteUser}
            className="flex items-center px-4 py-2 text-sm font-medium text-red-700 rounded-md bg-red-50 hover:bg-red-100"
          >
            <UserX className="w-4 h-4 mr-2" />
            Delete User
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {/* User Profile Card */}
        <div className="md:col-span-1">
          <div className="overflow-hidden bg-white border rounded-lg shadow">
            <div className="p-6">
              <div className="flex flex-col items-center">
                <img
                  src={user.profileImage}
                  alt={user.name}
                  className="w-24 h-24 mb-4 rounded-full"
                />
                <h2 className="text-xl font-bold text-gray-900">{user.name}</h2>
                <p className="text-gray-600">User ID: {user.id}</p>
                <div className="mt-2">
                  {isBanned ? (
                    <Badge variant="destructive">Banned</Badge>
                  ) : (
                    <Badge variant="default">Active</Badge>
                  )}
                </div>
                <div className="w-full mt-6 space-y-4">
                  <div className="flex items-center text-gray-700">
                    <Mail className="w-5 h-5 mr-3 text-gray-400" />
                    <span>{user.email}</span>
                  </div>
                  <div className="flex items-center text-gray-700">
                    <Phone className="w-5 h-5 mr-3 text-gray-400" />
                    <span>{user.contactNumber}</span>
                  </div>
                  <div className="flex items-center text-gray-700">
                    <Calendar className="w-5 h-5 mr-3 text-gray-400" />
                    <span>Joined {formatDate(user.createdAt)}</span>
                  </div>
                  <div className="flex items-start text-gray-700">
                    <MapPin className="flex-shrink-0 w-5 h-5 mr-3 text-gray-400" />
                    <span>{user.address}</span>
                  </div>
                </div>
              </div>
              <div className="pt-5 mt-6 border-t">
                <button
                  onClick={handleResetPassword}
                  className="flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                >
                  <Lock className="w-4 h-4 mr-2" />
                  Reset Password
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Bookings */}
        <div className="md:col-span-2">
          <div className="overflow-hidden bg-white border rounded-lg shadow">
            <div className="px-6 py-4 border-b">
              <h3 className="text-lg font-medium text-gray-900">
                Recent Bookings
              </h3>
            </div>
            <div className="p-6">
              {user.recentBookings.length > 0 ? (
                <div className="overflow-hidden border rounded-md">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th
                          scope="col"
                          className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                        >
                          Service
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                        >
                          Date
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                        >
                          Time
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                        >
                          Status
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {user.recentBookings.map((booking) => (
                        <tr key={booking.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">
                              {booking.service}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-500">
                              {formatDate(booking.date)}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-500">
                              {formatTime(booking.date)}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <Badge
                              variant={
                                booking.status === "completed"
                                  ? "default"
                                  : "destructive"
                              }
                            >
                              {booking.status === "completed"
                                ? "Completed"
                                : "Pending"}
                            </Badge>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-center text-gray-500">
                  <p>No bookings found</p>
                </div>
              )}
            </div>
          </div>

          {/* Activity Log */}
          <div className="mt-6 overflow-hidden bg-white border rounded-lg shadow">
            <div className="px-6 py-4 border-b">
              <h3 className="text-lg font-medium text-gray-900">
                Activity Log
              </h3>
            </div>
            <div className="p-6">
              <ul className="space-y-4">
                <li className="flex items-start pb-4 border-b last:border-0 last:pb-0">
                  <div className="flex items-center justify-center flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full">
                    <Mail className="w-4 h-4 text-blue-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-900">
                      Changed email address
                    </p>
                    <p className="text-xs text-gray-500">
                      May 15, 2023 at 2:30 PM
                    </p>
                  </div>
                </li>
                <li className="flex items-start pb-4 border-b last:border-0 last:pb-0">
                  <div className="flex items-center justify-center flex-shrink-0 w-8 h-8 bg-green-100 rounded-full">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-900">
                      Completed profile information
                    </p>
                    <p className="text-xs text-gray-500">
                      May 10, 2023 at 11:15 AM
                    </p>
                  </div>
                </li>
                <li className="flex items-start pb-4 border-b last:border-0 last:pb-0">
                  <div className="flex items-center justify-center flex-shrink-0 w-8 h-8 bg-indigo-100 rounded-full">
                    <Calendar className="w-4 h-4 text-indigo-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-900">
                      Account created
                    </p>
                    <p className="text-xs text-gray-500">
                      January 15, 2023 at 2:30 PM
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetails;
