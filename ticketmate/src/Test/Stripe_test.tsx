// import React from 'react';
// import { loadStripe } from '@stripe/stripe-js';
// import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
// import axios from 'axios';



// const stripePromise = loadStripe('pk_test_51PKw0t04aP7UQrlkXsmQnGlaCpfs21pIOLfkBQPwAk3Qr4HjZQ1NHPpsXDgsclOczo8xuhtCGwLRxLn1x18IK0iz00Gb2xtcqS');

// const PaymentForm: React.FC<{ clientSecret: string }> = ({ clientSecret }) => {
//   const stripe = useStripe();
//   const elements = useElements();

//   const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
//     event.preventDefault();

//     if (!stripe || !elements) {
//       return;
//     }

//     const cardElement = elements.getElement(CardElement);
//     if (!cardElement) {
//       console.error('Card Element not found');
//       return;
//     }

//     const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
//       payment_method: {
//         card: cardElement,
//         billing_details: {
//           name: 'Jenny Rosen',
//         },
//       },
//     });

//     if (error) {
//       console.error(error);
//     } else if (paymentIntent && paymentIntent.status === 'succeeded') {
//       console.log('Payment succeeded!', paymentIntent);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <CardElement />
//       <button type="submit" disabled={!stripe}>
//         Pay
//       </button>
//     </form>
//   );
// };

// const Stripe_test: React.FC = () => {
//   const [clientSecret, setClientSecret] = React.useState<string>('');

//   React.useEffect(() => {
//     // Fetch the client secret from your backend
//     axios.post('https://localhost:7296/api/stripe/create-payment-intent', { amount: 1000 }).then((response) => {
//       setClientSecret(response.data.clientSecret);
//     });
//   }, []);

//   return (
//     <Elements stripe={stripePromise}>
//       {clientSecret && <PaymentForm clientSecret={clientSecret} />}
//     </Elements>
//   );
// };


// export default Stripe_test;



import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, useStripe, useElements, CardNumberElement, CardExpiryElement, CardCvcElement } from '@stripe/react-stripe-js';
import axios from 'axios';

const stripePromise = loadStripe('pk_test_51PKw0t04aP7UQrlkXsmQnGlaCpfs21pIOLfkBQPwAk3Qr4HjZQ1NHPpsXDgsclOczo8xuhtCGwLRxLn1x18IK0iz00Gb2xtcqS');

const PaymentForm: React.FC<{ clientSecret: string }> = ({ clientSecret }) => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const cardNumberElement = elements.getElement(CardNumberElement);

    if (!cardNumberElement) {
      console.error('Card Number Element not found');
      return;
    }

    const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: cardNumberElement,
        billing_details: {
          name: 'Jenny Rosen',
        },
      },
    });

    if (error) {
      console.error(error);
    } else if (paymentIntent && paymentIntent.status === 'succeeded') {
      console.log('Payment succeeded!', paymentIntent);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardNumberElement />
      <CardExpiryElement />
      <CardCvcElement />
      <button type="submit" disabled={!stripe}>
        Pay
      </button>
    </form>
  );
};

const Stripe_test: React.FC = () => {
  const [clientSecret, setClientSecret] = React.useState<string>('');

  React.useEffect(() => {
    // Fetch the client secret from your backend
    axios.post('https://localhost:7296/api/stripe/create-payment-intent', { amount: 1000 }).then((response) => {
      setClientSecret(response.data.clientSecret);
    });
  }, []);

  return (
    <Elements stripe={stripePromise}>
      {clientSecret && <PaymentForm clientSecret={clientSecret} />}
    </Elements>
  );
};

export default Stripe_test;