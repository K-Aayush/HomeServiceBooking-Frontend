"use client";

import { useContext, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { AlertOctagon, CheckCircle } from "lucide-react";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import axios from "axios";
import { AppContext } from "../context/AppContext";

export function KhaltiSuccess() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isSuccess, setIsSuccess] = useState<boolean | null>(null);
  const { backendUrl } = useContext(AppContext);

  // Parse URL search params
  const searchParams = new URLSearchParams(location.search);
  const amount = searchParams.get("total_amount");
  const transactionId = searchParams.get("transaction_id");
  const status = searchParams.get("status");
  const pidx = searchParams.get("pidx");

  // Converting amount in rupees
  const amountInRupees = amount
    ? (Number.parseInt(amount, 10) / 100).toFixed(2)
    : null;

  // Formatting current Date
  const currentDate = new Date();
  const formattedDate = `${currentDate.getFullYear()}/${
    currentDate.getMonth() + 1
  }/${currentDate.getDate()}`;

  useEffect(() => {
    const checkPaymentStatus = async () => {
      try {
        const res = await axios.post(`${backendUrl}/api/khalti-lookup`, {
          pidx: searchParams.get("pidx"),
        });

        setIsSuccess(res.data.success);
      } catch (error) {
        console.error("Payment verification error:", error);
        setIsSuccess(false);
      }
    };

    if (pidx) {
      checkPaymentStatus();
    } else {
      setIsSuccess(false);
    }
  }, [pidx, searchParams, backendUrl]);

  return (
    <Card className="relative w-full max-w-lg">
      {isSuccess === null ? (
        <h3 className="px-5 py-10 text-2xl font-semibold">
          Verifying your payment...
        </h3>
      ) : isSuccess ? (
        <>
          <CardHeader>
            <CardTitle className="flex">
              <CheckCircle className="mr-2 text-green-500" /> Payment Successful
            </CardTitle>
            <CardDescription>
              Your Khalti Payment has been processed successfully
            </CardDescription>
          </CardHeader>
          <CardContent>
            <dl className="grid grid-cols-2 gap-4">
              <div>
                <dt className="font-medium text-gray-500">Amount</dt>
                <dd className="mt-1">
                  {amountInRupees ? `Rs. ${amountInRupees}` : "N/A"}
                </dd>
              </div>
              <div>
                <dt className="font-medium text-gray-500">TransactionID</dt>
                <dd className="mt-1">{transactionId || "N/A"}</dd>
              </div>
              <div>
                <dt className="font-medium text-gray-500">Date</dt>
                <dd className="mt-1">{formattedDate}</dd>
              </div>
              <div>
                <dt className="font-medium text-gray-500">Status</dt>
                <dd className="mt-1">{status}</dd>
              </div>
            </dl>
            <Button
              variant="outline"
              className="w-full mt-6"
              onClick={() => navigate("/")}
            >
              Go to home
            </Button>
          </CardContent>
        </>
      ) : (
        <>
          <CardHeader>
            <CardTitle className="flex">
              <AlertOctagon className="mr-2 text-red-500" /> Payment Failed
            </CardTitle>
            <CardDescription>
              Oops Some Problem occurred. Please Try again
            </CardDescription>
          </CardHeader>
          <CardContent>
            <dl className="grid grid-cols-2 gap-4">
              <div>
                <dt className="font-medium text-gray-500">Amount</dt>
                <dd className="mt-1">
                  {amountInRupees ? `Rs. ${amountInRupees}` : "N/A"}
                </dd>
              </div>
              <div>
                <dt className="font-medium text-gray-500">TransactionID</dt>
                <dd className="mt-1">{transactionId || "N/A"}</dd>
              </div>
              <div>
                <dt className="font-medium text-gray-500">Date</dt>
                <dd className="mt-1">{formattedDate}</dd>
              </div>
              <div>
                <dt className="font-medium text-gray-500">Status</dt>
                <dd className="mt-1">{status}</dd>
              </div>
            </dl>
            <Button
              variant="outline"
              className="w-full mt-6"
              onClick={() => navigate("/")}
            >
              Go to home
            </Button>
          </CardContent>
        </>
      )}
    </Card>
  );
}

export default KhaltiSuccess;
