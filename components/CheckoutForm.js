import React from "react";
import {
    PaymentElement,
    LinkAuthenticationElement,
    useStripe,
    useElements
} from "@stripe/react-stripe-js";
import { useAuth } from "../context/AuthProvider";

export default function CheckoutForm({price,deliveryPrice,vat,commission,total}) {
    const stripe = useStripe();
    const elements = useElements();
    const { user } = useAuth();
    const [message, setMessage] = React.useState(null);



    const [isLoading, setIsLoading] = React.useState(false);

    React.useEffect(() => {
        if (!stripe) {
            return;
        }

        const clientSecret = new URLSearchParams(window.location.search).get(
            "payment_intent_client_secret"
        );

        if (!clientSecret) {
            return;
        }

        stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
            switch (paymentIntent.status) {
                case "succeeded":
                    setMessage("Payment succeeded!");
                    break;
                case "processing":
                    setMessage("Your payment is processing.");
                    break;
                case "requires_payment_method":
                    setMessage("Your payment was not successful, please try again.");
                    break;
                default:
                    setMessage("Something went wrong.");
                    break;
            }
        });
    }, [stripe]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!stripe || !elements) {
            // Stripe.js hasn't yet loaded.
            // Make sure to disable form submission until Stripe.js has loaded.
            return;
        }

        setIsLoading(true);

        const { error } = await stripe.confirmPayment({
            elements,
            confirmParams: {
                // Make sure to change this to your payment completion page
                return_url: "https://maglo-web-zysoftec.vercel.app/order/confirm",
            },
        });

        // This point will only be reached if there is an immediate error when
        // confirming the payment. Otherwise, your customer will be redirected to
        // your `return_url`. For some payment methods like iDEAL, your customer will
        // be redirected to an intermediate site first to authorize the payment, then
        // redirected to the `return_url`.
        if (error.type === "card_error" || error.type === "validation_error") {
            setMessage(error.message);
        } else {
            setMessage("An unexpected error occurred.");
        }

        setIsLoading(false);
    };

    const paymentElementOptions = {
        layout: "tabs",
    };


    const [formData, setFormData] = React.useState({
        firstname: user?.firstname || "",
        lastname: user?.lastname || "",
        email: user?.email || "",
        country: user?.country || "",
        companyName: "",
        streetAddress: "",
        appartment: "",
        city: "",
        postalCode: "",
        number: user?.phoneNumber || "",
    })

    return (
        <>
            <h1 className="text-3xl text-center mt-10 font-bold text-[#00]">Checkout</h1>
            <div className="min-h-screen container md:mt-10 mt-3 md:p-10 p-5 shadow-lg mx-auto grid md:grid-cols-3 grid-cols-1 gap-4">
                <div className="flex flex-col  space-y-6 p-5 md:col-span-2">
                    <h1 className="text-xl mb-8 font-medium text-[#000]">Purchase Information</h1>
                    <div className="grid md:grid-cols-2 grid-cols-1  gap-2 ">
                        <div className="flex flex-col  space-y-2">
                            <label className="ml-1 text-[#000] text-sm font-normal" htmlFor="firstname">First Name: </label>
                            <input className="px-5 focus:outline-none placeholder:text-gray-400 py-2 bg-[#f6fafd] rounded-md" value={formData?.firstname} type="text" placeholder="First Name" name="firstname" id="firstname" onChange={handleChange} />
                        </div>
                        <div className="flex flex-col space-y-2">
                            <label className="ml-1 text-[#000] text-sm font-normal" htmlFor="lastname">Last Name: </label>
                            <input className="px-5 focus:outline-none placeholder:text-gray-400 py-2 bg-[#f6fafd] rounded-md" value={formData?.lastname} type="text" placeholder="Last Name" name="lastname" id="lastname" onChange={handleChange} />

                        </div>
                    </div>
                    <div className="flex flex-col">
                        <label className="ml-1 text-[#000] text-sm font-normal" htmlFor="companyName">Company Name: </label>
                        <input className="px-5 focus:outline-none placeholder:text-gray-400 py-2 bg-[#f6fafd] rounded-md" value={formData?.companyName} type="text" placeholder="Company name" name="companyName" id="companyName" onChange={handleChange} />
                    </div>

                    <div className="flex flex-col">
                        <label className="ml-1 text-[#000] text-sm font-normal" htmlFor="country">Country: </label>
                        <input className="px-5 focus:outline-none placeholder:text-gray-400 py-2 bg-[#f6fafd] rounded-md" value={formData?.country} type="text" placeholder="Country" name="country" id="country" onChange={handleChange} />
                    </div>


                    <div className="flex flex-col">
                        <label className="ml-1 text-[#000] text-sm font-normal" htmlFor="streetAddress">Street Address: </label>
                        <input className="px-5 focus:outline-none placeholder:text-gray-400 py-2 bg-[#f6fafd] rounded-md" value={formData?.streetAddress} type="text" placeholder="Street Address" name="streetAddress" id="streetAddress" onChange={handleChange} />
                    </div>

                    <div className="flex flex-col">
                        <label className="ml-1 text-[#000] text-sm font-normal" htmlFor="appartment">Appartment, Suite etc: </label>
                        <input className="px-5 focus:outline-none placeholder:text-gray-400 py-2 bg-[#f6fafd] rounded-md" value={formData?.appartment} type="text" placeholder="Appartment, Suite etc" name="appartment" id="appartment" onChange={handleChange} />
                    </div>


                    <div className="flex flex-col">
                        <label className="ml-1 text-[#000] text-sm font-normal" htmlFor="city">Town, City: </label>
                        <input className="px-5 focus:outline-none placeholder:text-gray-400 py-2 bg-[#f6fafd] rounded-md" value={formData?.city} type="text" placeholder="Town, City" name="city" id="city" onChange={handleChange} />
                    </div>

                    <div className="flex flex-col">
                        <label className="ml-1 text-[#000] text-sm font-normal" htmlFor="postalCode">Postal Code </label>
                        <input className="px-5 focus:outline-non placeholder:text-gray-400e py-2 bg-[#f6fafd] rounded-md" value={formData?.postalCode} type="text" placeholder="Postal Code" name="postalCode" id="postalCode" onChange={handleChange} />
                    </div>

                    <div className="grid md:grid-cols-2 grid-cols-1 gap-2">
                        <div className="flex flex-col">
                            <label className="ml-1 text-[#000] text-sm font-normal" htmlFor="email">Email </label>
                            <input className="px-5 focus:outline-none placeholder:text-gray-400 py-2 bg-[#f6fafd] rounded-md" value={formData?.email} type="text" placeholder="Email" name="email" id="email" onChange={handleChange} />
                        </div>
                        <div className="flex flex-col ">
                            <label className="ml-1 text-[#000] text-sm font-normal" htmlFor="number">Number </label>
                            <input className="px-5 focus:outline-none placeholder:text-gray-400 py-2 bg-[#f6fafd] rounded-md" value={formData?.number} type="text" placeholder="Number" name="number" id="number" onChange={handleChange} />
                        </div>
                    </div>


                </div>







                {/* stripe payment form */}
                <div className="bg-white p-10 rounded shadow-md">

                    {/* Order Details */}
                    <h1 className="text-xl mb-4 mt-10 font-medium text-[#00]">Your Order</h1>
                    <hr />
                    <div className="mt-5 flex justify-between">
                        <p className="text-[#000] font-medium">Sub Total</p>
                        <p className="text-[#777]">{price}</p>
                    </div>
                    <div className="mt-5 flex justify-between">
                        <p className="text-[#000] font-medium">Delivery Cost</p>
                        <p className="text-[#777]">{deliveryPrice}</p>
                    </div>
                    <div className="mt-5 flex justify-between">
                        <p className="text-[#000] font-medium">Vat</p>
                        <p className="text-[#777]">{vat}%</p>
                    </div>
                    <div className="mt-5 flex justify-between mb-4">
                        <p className="text-[#000] font-medium">Maglo Commission</p>
                        <p className="text-[#777]">{commission}%</p>
                    </div>
                    <hr />
                    <div className="mt-5 flex justify-between">
                        <p className="text-[#000] font-bold">Total</p>
                        <p className="text-[#777]">{total}</p>
                    </div>

                    <form id="payment-form" className="mt-10" onSubmit={handleSubmit}>
                        <PaymentElement id="payment-element" options={paymentElementOptions} />
                        <button
                            className="mt-4 w-full bg-[#f6be00] hover:bg-[#c9ac4c] text-white font-bold py-2 px-4 rounded disabled:opacity-50"
                            disabled={isLoading || !stripe || !elements}
                            id="submit"
                        >
                            <span id="button-text">
                                {isLoading ? <div className="spinner" id="spinner"></div> : "Pay now"}
                            </span>
                        </button>
                        {/* Show any error or success messages */}
                        {message && <div className="mt-4 text-red-500" id="payment-message">{message}</div>}
                    </form>
                </div>
            </div>
        </>
    );
}