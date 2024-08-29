// services/authService.js

import axios from "axios";

export async function signUpUser(userData) {
  try {
    const response = await axios.post('http://localhost:8080/v1/auth/signup', userData);

    return response.data; 
  } catch (error) {
    console.error('Error signing up:', error);
    throw error;
  }
}
