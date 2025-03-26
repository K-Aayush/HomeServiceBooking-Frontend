import { Booking } from "../lib/type";

interface BookingHistoryListProps {
  bookingHistory: Booking[];
}

const BookingHistoryList = ({ bookingHistory }: BookingHistoryListProps) => {
  return <div>BookingHistoryList</div>;
};

export default BookingHistoryList;
