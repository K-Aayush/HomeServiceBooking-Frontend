import { Calendar, Clock, MapPin, User } from "lucide-react";
import { Booking } from "../lib/type";
import moment from "moment";

interface BookingHistoryListProps {
  bookingHistory: Booking[];
}

const BookingHistoryList = ({ bookingHistory }: BookingHistoryListProps) => {
  return (
    <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
      {bookingHistory?.map((booking, index) => (
        <div key={index} className="flex gap-4 p-4 mb-5 border rounded-lg">
          {booking?.business?.name && (
            <img
              src={booking?.business?.images[0].url}
              alt="image"
              width={120}
              height={120}
              className="rounded-lg"
            />
          )}
          <div className="flex flex-col gap-2">
            <h2>{booking?.business?.name}</h2>
            <h2 className="flex gap-2 text-primary">
              <User /> {booking?.business?.requiter?.name}
            </h2>
            <h2 className="flex gap-2 text-gray-600">
              <MapPin className="text-primary" />
              {booking?.business?.address}
            </h2>
            <h2 className="flex gap-2 text-gray-600">
              <Calendar className="text-primary" />
              Service on:{" "}
              <span className="text-gray-900">
                {moment(booking?.date).format("ll")}
              </span>
            </h2>
            <h2 className="flex gap-2 text-gray-600">
              <Clock className="text-primary" />
              {booking?.time}
            </h2>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BookingHistoryList;
