"use client";

import type React from "react";
import { useContext, useEffect, useState } from "react";
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
import { useLocation, useNavigate } from "react-router-dom";

interface BookingSectionProps {
  children: React.ReactNode;
  businessId: string;
}

const BookingSection = ({ children, businessId }: BookingSectionProps) => {
  const { backendUrl, userToken, isLoading, setIsLoading } =
    useContext(AppContext);

  // useState for selecting date and timeslots
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [timeSlot, setTimeSlot] = useState<{ time: string }[]>([]);
  const [selectedTime, setSelectedTime] = useState<string>();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const [amount, setAmount] = useState<number>(500);

  useEffect(() => {
    getTime();
  }, []);

  // Creating custom timelist
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
    setTimeSlot(timeList);
  };

  // Initiate Khalti payment
  const initiatePayment = async () => {
    if (!date || !selectedTime || !businessId) {
      toast.error("Please select date, time and business");
      return;
    }

    setIsLoading(true);

    try {
      // Store booking details in localStorage for retrieval after payment
      localStorage.setItem(
        "pendingBooking",
        JSON.stringify({
          businessId,
          date: date.toISOString().split("T")[0],
          time: selectedTime,
        })
      );

      // Prepare payment payload for Khalti
      const payload = {
        return_url: `${window.location.origin}/payment-success`,
        website_url: window.location.origin,
        amount: amount * 100,
        purchase_order_id: `BOOKING-${Date.now()}`,
        purchase_order_name: `Booking for ${selectedTime} on ${
          date.toISOString().split("T")[0]
        }`,
      };

      const { data } = await axios.post(
        `${backendUrl}/api/payment/khalti`,
        payload,
        {
          headers: {
            Authorization: userToken,
            "Content-Type": "application/json",
          },
        }
      );

      if (data.success) {
        // Store payment ID for later verification
        localStorage.setItem("paymentId", data.payment);

        // Redirect to Khalti payment page
        window.location.href = data.data.payment_url;
      } else {
        toast.error(data.message || "Failed to initiate payment");
      }
    } catch (error) {
      console.error("Payment initiation error:", error);
      if (error instanceof AxiosError && error.response) {
        toast.error(
          error.response.data.message || "Failed to initiate payment"
        );
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
            <SheetTitle>Book a Service</SheetTitle>
            <SheetDescription>
              Select Date and Time Slot to book a service
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

            {/* Payment Information */}
            <div className="mt-5">
              <h2 className="font-bold text-gray-600">Payment Details</h2>
              <div className="p-4 mt-2 border rounded-md">
                <p className="text-sm text-gray-600">
                  Service Fee: Rs. {amount}
                </p>
                <p className="mt-1 text-xs text-gray-500">
                  Payment will be processed via Khalti
                </p>
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
                <Button
                  disabled={!(selectedTime && date) || isLoading}
                  onClick={initiatePayment}
                >
                  {isLoading ? "Processing..." : "Pay & Book"}
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
