import { SignUp } from "@clerk/clerk-react";
import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

function SignUpPage() {
  const location = useLocation();

  useEffect(() => {
    // Store the current path in session storage
    sessionStorage.setItem("previousPath", location.pathname);
  }, [location]);

  return (
    <div>
      <SignUp afterSignUpUrl="/" />
    </div>
  );
}

export default SignUpPage;
