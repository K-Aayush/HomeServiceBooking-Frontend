import React, { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { Calendar } from "./ui/calendar";

const BookingSection = ({ children }: { children: React.ReactNode }) => {
  const [date, setDate] = useState<Date | undefined>(new Date());

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
  };
  
  return (
    <div>
      <Sheet>
        <SheetTrigger>{children}</SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Book an Service</SheetTitle>
            <SheetDescription>
              Select Date and Time Slot to book an service
            </SheetDescription>
          </SheetHeader>
          {/* Date Picker */}
          <div className="flex justify-center my-5 item-center">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="border rounded-md"
            />
          </div>
          <div>{/* Time Slot Picker */}</div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default BookingSection;
