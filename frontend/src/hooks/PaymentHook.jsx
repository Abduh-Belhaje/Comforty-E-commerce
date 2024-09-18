import { useEffect, useState } from 'react';
import CheckoutForm from '../components/custom/CheckoutForm';
import axios from "axios";

export default function PaymentHook() {
  const [clientSecret, setClientSecret] = useState('');
    
  useEffect(()=>{
    getSecretKey()
  },[])
  // Fetch the client secret from the backend
  const getSecretKey = async () => {
    
    try {
      const data = {amount : 100 , currency : "USD"};
      const response = await axios.post(
        "http://localhost:8080/v1/payment/payment-intent",
        data
      );
      console.log(response.data)
      setClientSecret(response.data);
      
    } catch (error) {
      console.log(error);
      
    }
  }

  
  
  return (
    clientSecret && <CheckoutForm clientSecret={clientSecret} />
  );
}
