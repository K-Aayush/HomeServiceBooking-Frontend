import React, { useContext, useEffect, useState } from "react";
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
import { AppContext } from "../context/AppContext";
import { toast } from "sonner";
import axios, { AxiosError } from "axios";

interface BookingSectionProps {
  children: React.ReactNode;
  businessId: string;
}

const BookingSection = ({ children, businessId }: BookingSectionProps) => {
  const { backendUrl, userToken, isLoading, setIsLoading } =
    useContext(AppContext);

  //usestate for selecting date and timeslots
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [timeSlot, setTimeSLot] = useState<{ time: string }[]>([]);
  const [selectedTime, setSelectedTime] = useState<string>();
  const [isOpen, setIsOpen] = useState<boolean>(false);

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

  const onBooking = async () => {
    if (!date || !selectedTime || !businessId) {
      toast.error("Please select date, time and business");
      return;
    }

    setIsLoading(true);

    try {
      const { data } = await axios.post(
        `${backendUrl}/api/booking/create`,
        {
          businessId,
          date: date.toISOString().split("T")[0],
          time: selectedTime,
        },
        {
          headers: {
            Authorization: userToken,
            "Content-Type": "application/json",
          },
        }
      );

      if (data.success) {
        toast.success(data.message);
        setIsOpen(false);
        // Reset form
        setDate(new Date());
        setSelectedTime(undefined);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Booking error:", error);
      if (error instanceof AxiosError && error.response) {
        toast.error(error.response.data.message || "Failed to create booking");
      } else {
        toast.error("Something went wrong");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger onClick={() => setIsOpen(true)}>{children}</SheetTrigger>
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
                disabled={(date) =>
                  date < new Date(new Date().setHours(0, 0, 0, 0))
                }
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
                <Button
                  variant="destructive"
                  onClick={() => setIsOpen(false)}
                  disabled={isLoading}
                >
                  Cancel
                </Button>
                <Button disabled={!(selectedTime && date)} onClick={onBooking}>
                  {isLoading ? "Booking..." : "Book"}
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
