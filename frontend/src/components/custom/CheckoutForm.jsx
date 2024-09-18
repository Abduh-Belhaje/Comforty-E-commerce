import { useState } from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';

function CheckoutForm({ clientSecret }) {
  const stripe = useStripe();
  const elements = useElements();
  const [errorMessage, setErrorMessage] = useState('');
  const [paymentStatus, setPaymentStatus] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);

    const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: cardElement,
      },
    });

    if (error) {
      setErrorMessage(error.message);
    } else {
      setPaymentStatus(`Payment ${paymentIntent.status}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className='border z-20 p-5 w-full '>
      <CardElement className='border  flex-col  p-5' />
      <button type="submit" disabled={!stripe} className='bg-blue-500 py-2 mt-2 px-16 rounded text-white' >Pay</button>
      {errorMessage && <div>{errorMessage}</div>}
      {paymentStatus && <div>{paymentStatus}</div>}
    </form>
  );
}

export default CheckoutForm;
