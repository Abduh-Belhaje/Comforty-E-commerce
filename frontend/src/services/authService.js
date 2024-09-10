import axios from "axios";

async function signUpUser(userData) {
  try {
    const response = await axios.post(
      "http://localhost:8080/v1/auth/signup",
      userData
    );
    return response.data.token;
  } catch (error) {
    if (error.response && error.response.status === 400) {
      throw new Error("User already signed up. Please log in.");
    }
    console.error("Error signing up:", error);
    throw error;
  }
}

async function signInUser(userData) {
  try {
    const response = await axios.post(
      "http://localhost:8080/v1/auth/signin",
      userData
    );
    return response.data.token;
  } catch (error) {
    if (error.response && error.response.status === 401) {
       throw new Error("Invalid credentials Please try again");
    }
  }
}

export { signUpUser, signInUser };
