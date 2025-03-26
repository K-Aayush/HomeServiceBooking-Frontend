import { useContext, useEffect, useState } from "react";
import BookingHistoryList from "../components/BookingHistoryList";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs";
import { AppContext } from "../context/AppContext";
import axios, { AxiosError } from "axios";
import { Booking } from "../lib/type";

interface BookingResponse {
  success: boolean;
  booking: Booking[];
}

const MyBooking = () => {
  const { backendUrl, userToken, isLoading, setIsLoading, error, setError } =
    useContext(AppContext);
  const [bookingHistory, setBookingHistory] = useState<BookingResponse | null>(
    null
  );

  useEffect(() => {
    const getUserBookingsData = async () => {
      setError("");
      setIsLoading(true);
      try {
        const { data } = await axios.get(
          `${backendUrl}/api/booking/getUserBookings`,
          {
            headers: {
              Authorization: userToken,
            },
          }
        );

        if (data.success) {
          setBookingHistory(data.booking);
        } else {
          setError(data.message);
        }
      } catch (error) {
        if (error instanceof AxiosError && error.response) {
          setError(error.response.data.message);
        } else if (error instanceof Error) {
          setError(error.message || "An error occoured while fetching data");
        } else {
          setError("Internal Server Error");
        }
      } finally {
        setIsLoading(false);
      }
    };
    getUserBookingsData();
  }, [backendUrl, setError, setIsLoading, userToken]);

  if (isLoading) return <div>Loading data...</div>;
  if (error) return <div className="text-sm text-red-500">{error}</div>;

  return (
    <div className="min-h-screen mx-5 my-10 md:mx-36">
      <h2 className="my-2 text-3xl font-bold text-gray-700">My Bookings</h2>
      <Tabs defaultValue="booked" className="w-full">
        <TabsList className="justify-start w-full">
          <TabsTrigger value="booked">Booked</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
        </TabsList>
        <TabsContent value="booked">
          <BookingHistoryList bookingHistory={bookingHistory} />
        </TabsContent>
        <TabsContent value="completed">Change your password here.</TabsContent>
      </Tabs>
    </div>
  );
};

export default MyBooking;
