import React, { useEffect, useState } from "react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { Calendar } from "./ui/calendar";
import { Button } from "./ui/button";

interface BookingSectionProps {
  children: React.ReactNode;
  businessId: string;
}

const BookingSection = ({ children, businessId }: BookingSectionProps) => {
  //usestate for selecting date and timeslots
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [timeSlot, setTimeSLot] = useState<{ time: string }[]>([]);
  const [selectedTime, setSelectedTime] = useState<string>();

  useEffect(() => {
    getTime();
  }, []);

  //Creating custom timelist
  const getTime = () => {
    const timeList = [];
    for (let i = 10; i <= 12; i++) {
      timeList.push({
        time: i + ":00 AM",
      });
      timeList.push({
        time: i + ":30 AM",
      });
    }
    for (let i = 1; i <= 6; i++) {
      timeList.push({
        time: i + ":00 PM",
      });
      timeList.push({
        time: i + ":30 PM",
      });
    }
    setTimeSLot(timeList);
  };

  const onBooking = () => {};

  return (
    <div>
      <Sheet>
        <SheetTrigger>{children}</SheetTrigger>
        <SheetContent className="overflow-auto">
          <SheetHeader>
            <SheetTitle>Book an Service</SheetTitle>
            <SheetDescription>
              Select Date and Time Slot to book an service
            </SheetDescription>
          </SheetHeader>
          <div>
            {/* Date Picker */}
            <div className="flex flex-col items-baseline gap-5">
              <h2 className="mt-5 font-bold text-gray-600">Select Date</h2>
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="border rounded-md"
              />
            </div>

            <div className="">
              {/* Time Slot Picker */}
              <h2 className="my-5 font-bold text-gray-600">Select Time Slot</h2>
              <div className="grid grid-cols-3 gap-3">
                {timeSlot.map((item, index) => (
                  <Button
                    className={`p-2 px-3 border rounded-full hover:bg-primary hover:text-white ${
                      selectedTime == item.time && "bg-primary text-white"
                    }`}
                    key={index}
                    variant={"outline"}
                    onClick={() => setSelectedTime(item.time)}
                  >
                    {item.time}
                  </Button>
                ))}
              </div>
            </div>
          </div>
          <SheetFooter className="mt-5">
            <SheetClose asChild>
              <div className="flex gap-5">
                <Button variant="destructive">Cancel</Button>
                <Button disabled={!(selectedTime && date)} onClick={onBooking}>
                  Book
                </Button>
              </div>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default BookingSection;
