// components/custom/AlertDialogComponent.js

import React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import { useUserContext } from "../../contexte/UserContext";
import { signUpUser, signInUser } from "../../services/authService";

function AlertDialogComponent({ open, onClose, pathname }) {
  const { userUp } = useUserContext();
  const [loading, setLoading] = React.useState(false);

  const handleContinue = async () => {
    setLoading(true);
    try {
      if (userUp) {
        let response;
        if (pathname === "/auth/sign-up") {
          response = await signUpUser(userUp);
          toast.success("Sign-up successful!");
        } else if (pathname === "/auth/sign-in") {
          response = await signInUser(userUp);
          toast.success("Sign-in successful!");
        } else {
          throw new Error("Invalid action.");
        }
        localStorage.setItem("userToken", response.token);
        console.log("Token stored:", response.token);
        // Redirect or proceed to the dashboard
      }
    } catch (error) {
      const message = error.message || "An unexpected error occurred.";
      toast.error(message);
    } finally {
      setLoading(false);
      onClose();
    }
  };

  const handleCancel = () => {
    onClose();
  };

  const getAlertMessage = () => {
    switch (pathname) {
      case "/auth/sign-up":
        return "This action will finalize your sign-up process.";
      case "/auth/sign-in":
        return "This action will complete your sign-in process.";
      default:
        return "This action requires your confirmation.";
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>{getAlertMessage()}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={handleCancel}>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleContinue}>
            {loading ? (
              <div className="spinner"></div> // Your spinner component or styling
            ) : (
              "Continue"
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default AlertDialogComponent;
