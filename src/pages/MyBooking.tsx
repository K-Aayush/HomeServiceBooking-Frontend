import BookingHistoryList from "../components/BookingHistoryList";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs";

const MyBooking = () => {
  return (
    <div className="min-h-screen mx-5 my-10 md:mx-36">
      <h2 className="my-2 text-3xl font-bold text-gray-700">My Bookings</h2>
      <Tabs defaultValue="booked" className="w-full">
        <TabsList className="justify-start w-full">
          <TabsTrigger value="booked">Booked</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
        </TabsList>
        <TabsContent value="booked">
          <BookingHistoryList />
        </TabsContent>
        <TabsContent value="completed">Change your password here.</TabsContent>
      </Tabs>
    </div>
  );
};

export default MyBooking;
