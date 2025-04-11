import { Button } from "../../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { Users } from "lucide-react";

interface Booking {
  id: string;
  userId: string;
  businessId: string;
  date: string;
  time: string;
  bookingStatus: string;
  createdAt: string;
  user: {
    name: string;
    email: string;
    userProfileImage?: string;
  };
  business: {
    name: string;
    category: string;
    amount: number;
  };
}

interface BookingTableProps {
  bookings: Booking[];
  isRecent?: boolean;
  onViewAll?: () => void;
  onUpdateStatus: (bookingId: string, status: string) => void;
}

export const BookingTable = ({
  bookings,
  isRecent = false,
  onViewAll,
  onUpdateStatus,
}: BookingTableProps) => {
  const displayBookings = isRecent ? bookings.slice(0, 5) : bookings;

  return (
    <Card>
      <CardHeader>
        <CardTitle>{isRecent ? "Recent Bookings" : "All Bookings"}</CardTitle>
        {!isRecent && (
          <CardDescription>Manage all your service bookings</CardDescription>
        )}
      </CardHeader>
      <CardContent>
        {bookings.length === 0 ? (
          <div className="py-8 text-center">
            <Users className="w-12 h-12 mx-auto text-gray-400" />
            <h3 className="mt-2 text-lg font-medium">No bookings yet</h3>
            <p className="mt-1 text-gray-500">
              When customers book your services, they'll appear here.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="px-4 py-3 text-left">Service</th>
                  <th className="px-4 py-3 text-left">Customer</th>
                  <th className="px-4 py-3 text-left">Date & Time</th>
                  <th className="px-4 py-3 text-left">Status</th>
                  <th className="px-4 py-3 text-left">Amount</th>
                  <th className="px-4 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {displayBookings.map((booking) => (
                  <tr key={booking.id} className="border-b hover:bg-gray-50">
                    <td className="px-4 py-3">{booking.business.name}</td>
                    <td className="px-4 py-3">{booking.user.name}</td>
                    <td className="px-4 py-3">
                      {new Date(booking.date).toLocaleDateString()} at{" "}
                      {booking.time}
                    </td>
                    <td className="px-4 py-3">
                      <Badge
                        variant={
                          booking.bookingStatus === "COMPLETED"
                            ? "default"
                            : booking.bookingStatus === "PENDING"
                            ? "secondary"
                            : "outline"
                        }
                        className={
                          booking.bookingStatus === "COMPLETED"
                            ? "bg-green-100 text-green-800 hover:bg-green-100"
                            : booking.bookingStatus === "PENDING"
                            ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
                            : ""
                        }
                      >
                        {booking.bookingStatus}
                      </Badge>
                    </td>
                    <td className="px-4 py-3">
                      ${booking.business.amount.toFixed(2)}
                    </td>
                    <td className="px-4 py-3 text-right">
                      {booking.bookingStatus === "PENDING" && (
                        <Button
                          size="sm"
                          onClick={() =>
                            onUpdateStatus(booking.id, "COMPLETED")
                          }
                        >
                          Mark Complete
                        </Button>
                      )}
                      {booking.bookingStatus === "COMPLETED" && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => onUpdateStatus(booking.id, "PENDING")}
                        >
                          Mark Pending
                        </Button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        {isRecent && bookings.length > 5 && (
          <div className="mt-4 text-center">
            <Button variant="outline" onClick={onViewAll}>
              View All Bookings
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
