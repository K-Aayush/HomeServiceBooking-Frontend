import React, { useEffect, useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { Calendar } from "./ui/calendar";
import { Button } from "./ui/button";

const BookingSection = ({ children }: { children: React.ReactNode }) => {
  //usestate for selecting date and timeslots
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [timeSlot, setTimeSLot] = useState<{ time: string }[]>([]);

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
                    className="p-2 px-3 border rounded-full"
                    key={index}
                    variant={"outline"}
                  >
                    {item.time}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default BookingSection;
