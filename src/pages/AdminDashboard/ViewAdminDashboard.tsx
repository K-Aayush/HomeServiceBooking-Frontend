import { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import {
  Users,
  UserCheck,
  UserX,
  ShoppingBag,
  AlertTriangle,
  CheckCircle,
  Clock,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import UserStatsCard from "../../components/adminDashboard/UserStatsCard";
import { useNotifications } from "../../context/NotificationContext";

const ViewAdminDashboard = () => {
  const { error, isLoading, totalUsers } = useContext(AppContext);
  const { notifications } = useNotifications();

  // Mock data for charts and stats
  const mockStats = {
    totalServices: 87,
    pendingApprovals: 12,
    totalBookings: 156,
    completedBookings: 124,
    cancelledBookings: 8,
    pendingBookings: 24,
    recentActivity: [
      {
        id: 1,
        action: "User Registration",
        user: "John Doe",
        time: "2 hours ago",
      },
      {
        id: 2,
        action: "Service Added",
        user: "Jane Smith",
        time: "5 hours ago",
      },
      {
        id: 3,
        action: "Booking Completed",
        user: "Alex Johnson",
        time: "1 day ago",
      },
      {
        id: 4,
        action: "Service Updated",
        user: "Michael Brown",
        time: "1 day ago",
      },
      {
        id: 5,
        action: "User Banned",
        user: "Robert Davis",
        time: "2 days ago",
      },
    ],
  };

  if (isLoading)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-8 h-8 border-4 rounded-full border-t-indigo-600 animate-spin"></div>
      </div>
    );

  if (error) return <div className="p-4 text-red-500">{error}</div>;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <UserStatsCard
          title="Total Users"
          value={totalUsers?.total || 0}
          icon={<Users className="w-6 h-6 text-indigo-600" />}
          trend="+12% from last month"
        />
        <UserStatsCard
          title="Active Users"
          value={totalUsers?.user || 0}
          icon={<UserCheck className="w-6 h-6 text-green-600" />}
          trend="+8% from last month"
        />
        <UserStatsCard
          title="Recruiters"
          value={totalUsers?.requiter || 0}
          icon={<UserX className="w-6 h-6 text-amber-600" />}
          trend="+5% from last month"
        />
        <UserStatsCard
          title="Total Services"
          value={mockStats.totalServices}
          icon={<ShoppingBag className="w-6 h-6 text-blue-600" />}
          trend="+15% from last month"
        />
      </div>

      {/* Booking Stats */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">
              Pending Bookings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Clock className="w-5 h-5 mr-2 text-amber-500" />
              <span className="text-2xl font-bold">
                {mockStats.pendingBookings}
              </span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">
              Completed Bookings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <CheckCircle className="w-5 h-5 mr-2 text-green-500" />
              <span className="text-2xl font-bold">
                {mockStats.completedBookings}
              </span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">
              Cancelled Bookings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <AlertTriangle className="w-5 h-5 mr-2 text-red-500" />
              <span className="text-2xl font-bold">
                {mockStats.cancelledBookings}
              </span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity & Notifications */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockStats.recentActivity.map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-start pb-3 border-b last:border-0 last:pb-0"
                >
                  <div className="flex-1">
                    <p className="font-medium">{activity.action}</p>
                    <p className="text-sm text-gray-500">
                      {activity.user} - {activity.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Notifications */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Recent Notifications</CardTitle>
            <a
              href="/admin/notifications"
              className="text-sm text-blue-600 hover:underline"
            >
              View all
            </a>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {notifications.slice(0, 5).map((notification) => {
                const getIcon = () => {
                  switch (notification.type) {
                    case "success":
                      return <CheckCircle className="w-4 h-4 text-green-500" />;
                    case "warning":
                      return (
                        <AlertTriangle className="w-4 h-4 text-yellow-500" />
                      );
                    case "error":
                      return <AlertTriangle className="w-4 h-4 text-red-500" />;
                    default:
                      return <Clock className="w-4 h-4 text-blue-500" />;
                  }
                };

                return (
                  <div
                    key={notification.id}
                    className="flex items-start gap-3 pb-3 border-b last:border-0 last:pb-0"
                  >
                    <div className="flex items-center justify-center flex-shrink-0 w-8 h-8 bg-gray-100 rounded-full">
                      {getIcon()}
                    </div>
                    <div className="flex-1">
                      <p
                        className={`font-medium ${
                          !notification.isRead
                            ? "text-gray-900"
                            : "text-gray-700"
                        }`}
                      >
                        {notification.message}
                      </p>
                      <p className="text-sm text-gray-500">
                        {new Date(notification.createdAt).toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                );
              })}

              {notifications.length === 0 && (
                <p className="text-gray-500">No notifications</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ViewAdminDashboard;
