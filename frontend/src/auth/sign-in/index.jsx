import { SignIn } from "@clerk/clerk-react";
import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
function SignInPage() {
  const location = useLocation();

  useEffect(() => {
    // Store the current path in session storage
    sessionStorage.setItem("previousPath", location.pathname);
  }, [location]);
  return (
    <div className="flex justify-center my-20 items-center">
      <SignIn />
    </div>
  );
}

export default SignInPage;
