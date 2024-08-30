import { Button } from "@/components/ui/button";
import { Outlet } from "react-router-dom";
import Header from "./components/custom/Header";
import Footer from "./components/custom/Footer";
import { useEffect } from "react";
import { useUser } from "@clerk/clerk-react";

function App() {
  const { user } = useUser();

  useEffect(() => {
    if (user) {
      // const fetchUserData = async () => {
      //   try {
      //     const userData = {
      //       firstname: user.firstName,
      //       lastname: user.lastName,
      //       email: user.emailAddresses[0]?.emailAddress, // Adjust based on the structure of `emailAddresses`
      //     };

      //     // Call the API function to send user data
      //     const response = await fetchUserDataFromAuthApi(userData);

      //     // Process the response as needed
      //     console.log('User data from API:', response);
      //   } catch (error) {
      //     console.error('Failed to fetch user data:', error);
      //   }
      // };

      // fetchUserData();
    }
    console.log(user);
    
  }, [user]);
  return (
    <>
      <Header />
      <Outlet />

      <Footer />


    </>
  );
}

export default App;
