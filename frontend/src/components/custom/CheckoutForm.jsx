"use client";

import { useState } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { CreditCard, CheckCircle, AlertCircle, X } from "lucide-react";

function CheckoutForm({ clientSecret }) {
  const stripe = useStripe();
  const elements = useElements();
  const [errorMessage, setErrorMessage] = useState("");
  const [paymentStatus, setPaymentStatus] = useState("");
  const [isOpen, setIsOpen] = useState(true);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);

    const { error, paymentIntent } = await stripe.confirmCardPayment(
      clientSecret,
      {
        payment_method: {
          card: cardElement,
        },
      }
    );

    if (error) {
      setErrorMessage(error.message);
    } else {
      setPaymentStatus(`Payment ${paymentIntent.status}`);
    }
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  if (!isOpen) return null; // If closed, render nothing

  return (
    <Card className="w-full max-w-md mx-auto mt-16 shadow-lg relative">
      <Button
        onClick={handleClose}
        className="absolute top-2 right-2 p-2 rounded-full hover:bg-gray-100"
        variant="ghost"
        size="icon"
      >
        <X className="h-4 w-4" />
        <span className="sr-only">Close</span>
      </Button>
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">
          Secure Checkout
        </CardTitle>
        <CardDescription className="text-center">
          Enter your card details to complete the payment
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="card" className="text-sm font-medium text-gray-700">
              Card Details
            </Label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <CardElement
                id="card"
                options={{
                  style: {
                    base: {
                      fontSize: "16px",
                      color: "#32325d",
                      "::placeholder": {
                        color: "#aab7c4",
                      },
                    },
                    invalid: {
                      color: "#dc2626",
                    },
                  },
                }}
                className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter>
        <Button
          type="submit"
          disabled={!stripe}
          className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-bold py-2 px-4 rounded-md transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg"
          onClick={handleSubmit}
        >
          <CreditCard className="mr-2 h-5 w-5" /> Pay Securely
        </Button>
      </CardFooter>
      {errorMessage && (
        <Alert variant="destructive" className="mt-4">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Payment Failed</AlertTitle>
          <AlertDescription>{errorMessage}</AlertDescription>
        </Alert>
      )}
      {paymentStatus && (
        <Alert className="mt-4 bg-green-50 border-green-200">
          <CheckCircle className="h-4 w-4 text-green-500" />
          <AlertTitle className="text-green-700">Payment Successful</AlertTitle>
          <AlertDescription className="text-green-600">
            {paymentStatus}
          </AlertDescription>
        </Alert>
      )}
    </Card>
  );
}

export default CheckoutForm;
