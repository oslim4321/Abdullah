import React, { useState } from 'react'
import Header from '../../../components/layout/Header'
import { Button, Result } from 'antd';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Elements } from '@stripe/react-stripe-js';
import { useStripe } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe('pk_test_51NdYXRIGQJBc7oLeL3xtIWQQ0qD5rUday1adupPFrkzwQC85NdhM1WuDN3vrroqnSHo3gihoKJDFURTM3NVyn0Mj0036Syn4Py');

const Index = () => {

    const router = useRouter();
    const stripe = useStripe();
    const [success, setSuccess] = useState(null);
    const [message, setMessage] = useState("");

    React.useEffect(() => {
        if (!stripe) {
            return;
        }

        const clientSecret = new URLSearchParams(window.location.search).get(
            "payment_intent_client_secret"
        );

        if (!clientSecret) {
            router.push({ pathname: "/" });
            return
        }

        stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
            switch (paymentIntent.status) {
                case "succeeded":
                    setSuccess(true)
                    setMessage("Payment succeeded!");
                    break;
                case "processing":
                    setSuccess(false)
                    setMessage("Your payment is processing.");
                    break;
                case "requires_payment_method":
                    setSuccess(false)
                    setMessage("Your payment was not successful, please try again.");
                    break;
                default:
                    setSuccess(false)
                    setMessage("Something went wrong.");
                    break;
            }
        });
    }, [stripe]);

    return (
        <>
            <Header />
            {
                message && (
                    <Result
                        status={success ? "success" : "error"}
                        title={message}
                        subTitle={success?"Thank you for your order seller will contact you soon.":"Your payment was not successful, please try again."}
                    />
                )
            }
        </>
    )
}


function MyApp() {
    return (
        <Elements stripe={stripePromise}>
            <Index />
        </Elements>
    );
}

export default MyApp;