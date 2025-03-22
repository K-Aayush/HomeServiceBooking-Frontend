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
  return (
    <div>
      <Sheet>
        <SheetTrigger>{children}</SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Book an Service</SheetTitle>
            <SheetDescription>
              Select Date and Time Slot to book an service
              {/* Date Picker */}
              <div>
                <h2>Select Date</h2>
              </div>
              <div>{/* Time Slot Picker */}</div>
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default BookingSection;
