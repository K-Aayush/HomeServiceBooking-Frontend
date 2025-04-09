"use client";

import type React from "react";
import { useContext, useEffect, useState } from "react";
import {
  Sheet,
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
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

// Initialize Stripe
const stripePromise = loadStripe(process.env.STRIPE_PUBLISHABLE_KEY as string);

interface BookingSectionProps {
  children: React.ReactNode;
  businessId: string;
}

interface TimeSlot {
  time: string;
  isBooked: boolean;
}

const BookingSection = ({ children, businessId }: BookingSectionProps) => {
  const { backendUrl, userToken, isLoading, setIsLoading, business } =
    useContext(AppContext);

  // useState for selecting date and timeslots
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [timeSlot, setTimeSlot] = useState<TimeSlot[]>([]);
  const [selectedTime, setSelectedTime] = useState<string>();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [bookedSlots, setBookedSlots] = useState<string[]>([]);
  const [clientSecret, setClientSecret] = useState<string>("");
  const [paymentId, setPaymentId] = useState<string>("");
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [bookingComplete, setBookingComplete] = useState(false);

  // Find the current business from the context
  const currentBusiness = business.find((b) => b.id === businessId);

  // Get the amount in dollars
  const amountInDollars = currentBusiness
    ? currentBusiness.amount.toFixed(2)
    : "0.00";

  // Fetch booked slots when date changes
  useEffect(() => {
    if (date && businessId) {
      fetchBookedTimeSlots();
    }
  }, [date, businessId]);

  // Initialize time slots
  useEffect(() => {
    getTime();
  }, [bookedSlots]);

  // Reset state when sheet is closed
  useEffect(() => {
    if (!isOpen) {
      setShowPaymentForm(false);
      setBookingComplete(false);
      setClientSecret("");
      setPaymentId("");
    }
  }, [isOpen]);

  // Fetch booked time slots for the selected date
  const fetchBookedTimeSlots = async () => {
    if (!date) return;

    try {
      setIsLoading(true);
      const formattedDate = date.toISOString().split("T")[0];

      const { data } = await axios.get(
        `${backendUrl}/api/booking/booked-slots?businessId=${businessId}&date=${formattedDate}`,
        {
          headers: {
            Authorization: userToken,
          },
        }
      );

      if (data.success) {
        setBookedSlots(data.bookedSlots || []);
      }
    } catch (error) {
      console.error("Error fetching booked slots:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Creating custom timelist with booked status
  const getTime = () => {
    const timeList: TimeSlot[] = [];
    for (let i = 10; i <= 12; i++) {
      timeList.push({
        time: i + ":00 AM",
        isBooked: bookedSlots.includes(i + ":00 AM"),
      });
      timeList.push({
        time: i + ":30 AM",
        isBooked: bookedSlots.includes(i + ":30 AM"),
      });
    }
    for (let i = 1; i <= 6; i++) {
      timeList.push({
        time: i + ":00 PM",
        isBooked: bookedSlots.includes(i + ":00 PM"),
      });
      timeList.push({
        time: i + ":30 PM",
        isBooked: bookedSlots.includes(i + ":30 PM"),
      });
    }
    setTimeSlot(timeList);
  };

  // Initiate Stripe payment
  const initiatePayment = async () => {
    if (!date || !selectedTime || !businessId || !currentBusiness) {
      toast.error("Please select date and time");
      return;
    }

    setIsLoading(true);

    try {
      // Create a payment intent with Stripe
      const { data } = await axios.post(
        `${backendUrl}/api/payment/stripe/create-payment`,
        {
          amount: Number.parseFloat(amountInDollars),
          businessName: currentBusiness.name,
        },
        {
          headers: {
            Authorization: userToken,
            "Content-Type": "application/json",
          },
        }
      );

      if (data.success) {
        // Store payment ID for later verification
        setPaymentId(data.paymentId);
        setClientSecret(data.clientSecret);
        setShowPaymentForm(true);
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

  // Handle successful booking
  const handleBookingSuccess = () => {
    setBookingComplete(true);
    // Refresh booked slots after a successful booking
    fetchBookedTimeSlots();
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

          {bookingComplete ? (
            <div className="flex flex-col items-center justify-center mt-10 text-center">
              <div className="flex items-center justify-center w-16 h-16 mb-4 bg-green-100 rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-8 h-8 text-green-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h2 className="mb-2 text-2xl font-bold">Booking Confirmed!</h2>
              <p className="mb-6 text-gray-600">
                Your booking has been successfully confirmed for{" "}
                {date?.toLocaleDateString()} at {selectedTime}.
              </p>
              <Button onClick={() => setIsOpen(false)}>Close</Button>
            </div>
          ) : !showPaymentForm ? (
            <div>
              {/* Date Picker */}
              <div className="flex flex-col items-baseline gap-5">
                <h2 className="mt-5 font-bold text-gray-600">Select Date</h2>
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={(newDate) => {
                    setDate(newDate);
                    setSelectedTime(undefined); // Reset selected time when date changes
                  }}
                  className="border rounded-md"
                  disabled={(date) =>
                    date < new Date(new Date().setHours(0, 0, 0, 0))
                  }
                />
              </div>

              <div className="">
                {/* Time Slot Picker */}
                <h2 className="my-5 font-bold text-gray-600">
                  Select Time Slot
                </h2>
                <div className="grid grid-cols-3 gap-3">
                  {timeSlot.map((item, index) => (
                    <Button
                      className={`p-2 px-3 border rounded-full 
                        ${
                          item.isBooked
                            ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                            : "hover:bg-primary hover:text-white"
                        } 
                        ${
                          selectedTime === item.time && !item.isBooked
                            ? "bg-primary text-white"
                            : ""
                        }`}
                      key={index}
                      variant={"outline"}
                      onClick={() =>
                        !item.isBooked && setSelectedTime(item.time)
                      }
                      disabled={item.isBooked}
                    >
                      {item.time}
                      {item.isBooked && (
                        <span className="ml-1 text-xs">(Booked)</span>
                      )}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Payment Information */}
              <div className="mt-5">
                <h2 className="font-bold text-gray-600">Payment Details</h2>
                <div className="p-4 mt-2 border rounded-md">
                  <p className="text-sm text-gray-600">
                    Service Fee: ${amountInDollars}
                  </p>
                  <p className="mt-1 text-xs text-gray-500">
                    Payment will be processed via Stripe
                  </p>
                </div>
              </div>

              <SheetFooter className="mt-5">
                <div className="flex w-full gap-5">
                  <Button
                    variant="destructive"
                    onClick={() => setIsOpen(false)}
                    disabled={isLoading}
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                  <Button
                    disabled={
                      !(selectedTime && date) || isLoading || !currentBusiness
                    }
                    onClick={initiatePayment}
                    className="flex-1"
                  >
                    {isLoading ? "Processing..." : "Proceed to Payment"}
                  </Button>
                </div>
              </SheetFooter>
            </div>
          ) : (
            <div className="mt-5">
              <h2 className="mb-4 font-bold text-gray-600">Complete Payment</h2>
              {clientSecret && (
                <Elements stripe={stripePromise} options={{ clientSecret }}>
                  <CheckoutForm
                    paymentId={paymentId}
                    bookingDetails={{
                      businessId,
                      date: date?.toISOString().split("T")[0] || "",
                      time: selectedTime || "",
                    }}
                    onSuccess={handleBookingSuccess}
                    backendUrl={backendUrl}
                    userToken={userToken}
                  />
                </Elements>
              )}
              <Button
                variant="outline"
                onClick={() => setShowPaymentForm(false)}
                className="w-full mt-4"
              >
                Back to Booking Details
              </Button>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
};

interface CheckoutFormProps {
  paymentId: string;
  bookingDetails: {
    businessId: string;
    date: string;
    time: string;
  };
  onSuccess: () => void;
  backendUrl: string;
  userToken: string | null;
}

const CheckoutForm = ({
  paymentId,
  bookingDetails,
  onSuccess,
  backendUrl,
  userToken,
}: CheckoutFormProps) => {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements || !userToken) {
      return;
    }

    setIsProcessing(true);

    try {
      // Confirm the payment
      const result = await stripe.confirmPayment({
        elements,
        redirect: "if_required",
        confirmParams: {
          return_url: window.location.origin, // This won't be used since we're handling it in-app
        },
      });

      if (result.error) {
        toast.error(result.error.message || "Payment failed");
      } else if (result.paymentIntent) {
        // Payment succeeded, verify on server
        const verifyResponse = await axios.post(
          `${backendUrl}/api/payment/stripe/verify-payment`,
          {
            paymentIntentId: result.paymentIntent.id,
            paymentId,
          }
        );

        if (verifyResponse.data.success) {
          // Create booking
          const bookingResponse = await axios.post(
            `${backendUrl}/api/booking`,
            {
              ...bookingDetails,
              paymentId,
            },
            {
              headers: {
                Authorization: userToken,
              },
            }
          );

          if (bookingResponse.data.success) {
            toast.success("Booking created successfully!");
            onSuccess();
          } else {
            toast.error(
              "Payment successful but booking failed. Please contact support."
            );
          }
        } else {
          toast.error("Payment verification failed");
        }
      }
    } catch (error) {
      console.error("Payment processing error:", error);
      toast.error("An error occurred while processing your payment");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement />
      <Button
        type="submit"
        disabled={!stripe || isProcessing}
        className="w-full mt-4"
      >
        {isProcessing ? "Processing..." : "Pay Now"}
      </Button>
    </form>
  );
};

export default BookingSection;
