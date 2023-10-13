import React, { useEffect, useState } from 'react'
import Header from '../../../components/layout/Header'
import { useRouter } from 'next/router'
import { getOffersWithSellerDataByEnquiryId, updateOfferInEnquiry } from '../../../lib/offers'
import { Select, Spin, message } from 'antd'
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
import CheckoutForm from '../../../components/CheckoutForm'
import { getCommission } from '../../../lib/settings'


const stripePromise = loadStripe("pk_test_51NdYXRIGQJBc7oLeL3xtIWQQ0qD5rUday1adupPFrkzwQC85NdhM1WuDN3vrroqnSHo3gihoKJDFURTM3NVyn0Mj0036Syn4Py")

const page = () => {

    const router = useRouter()
    const [offers, setOffers] = useState([])
    const [isOffersSpinning, setIsOffersSpinning] = useState(true)
    const [sortByPrice, setSortByPrice] = useState(null); // null for default, 'asc' for ascending, 'desc' for descending
    const [showPaymentForm, setShowPaymentForm] = useState(false);
    const [selectedOffer, setSelectedOffer] = useState(null);
    const [isAccepted, setIsAccepted] = useState(false);
    const [commission,setCommision] = useState(0);
    const [buyerPreferredCurrency, setBuyerPreferredCurrency] = useState(null);
    const [clientSecret, setClientSecret] = useState("");
    const [usdToEur, setUsdToEur] = useState(null);
    const [eurToUsd, setEurToUsd] = useState(null);
    const [checkoutPrice,setCheckoutPrice] = useState("");
    const [checkoutDeliveryPrice,setCheckoutDeliveryPrice] = useState("");
    const [checkoutTotal,setCheckoutTotal] = useState("")
    const [checkoutVat,setCheckoutVat] = useState("");


    // Async function to fetch and handle currency conversion rates
    const handleCurrencyConversion = async () => {
        // Set loading state while fetching data
        setIsOffersSpinning(true);
        try {
            // Fetch USD to EUR exchange rate from the API
            let usdToEur = await fetch(`https://v6.exchangerate-api.com/v6/51b6e228736c115dd50f7d2b/pair/usd/eur`);
            // Parse the response as JSON
            usdToEur = await usdToEur.json();

            // Fetch EUR to USD exchange rate from the API
            let eurToUsd = await fetch(`https://v6.exchangerate-api.com/v6/51b6e228736c115dd50f7d2b/pair/eur/usd`);
            // Parse the response as JSON
            eurToUsd = await eurToUsd.json();

            // Check if both API calls were successful
            if (usdToEur.result === "success" && eurToUsd.result === "success") {
                // Set the obtained exchange rates in the state variables
                setUsdToEur(usdToEur.conversion_rate);
                setEurToUsd(eurToUsd.conversion_rate);
            }

        } catch (error) {
            // Handle errors and display error messages
            message.error(error.message);
        } finally {
            // Reset loading state after API call is complete
            setIsOffersSpinning(false);
        }
    };


    useEffect(() => {
        handleCurrencyConversion();
    }, [])

    useEffect(()=>{
        getCommission()
         .then(commission=>setCommision(commission))
          .catch(error=>message.error("Something went wrong"))
    },[])


    useEffect(() => {

        if (router?.query?.id) {
            getOffersWithSellerDataByEnquiryId(router?.query?.id)
                .then((offers) => setOffers(offers))
                .catch((err) => message.error(err.message))
                .finally(() => setIsOffersSpinning(false))
        }

    }, [router?.query?.id])

    useEffect(() => {
        const accepted = offers.find((o) => o.status === "accepted" || o.status === "completed");
        if (accepted) {
            setIsAccepted(true)
        }

    }, [offers])

    const handlePaymentIntent = async () => {
        setIsOffersSpinning(true)
        try {

            const api = await fetch("/api/create-payment-intent", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    offerId: selectedOffer,
                    buyerPreferredCurrency,
                    enquiryId:router?.query?.id,
                    conversionRate: {
                        usdToEur,
                        eurToUsd,
                    },
                    commission
                })
            })

            if (!api.ok) {
                message.error("Something went wrong")
                return
            }

            const response = await api.json();
            if (response.success) {
                setClientSecret(response.message);
                return
            }

            message.error(response.message);

        } catch (error) {
            message.error(error.message);
        }finally{
            setIsOffersSpinning(false)
        }
    }

    useEffect(() => {

        if (showPaymentForm && selectedOffer) {
            handlePaymentIntent();
        }

    }, [showPaymentForm])

    const sortedOffers = [...offers].sort((a, b) => {
        const priceA = parseFloat(a.price);
        const priceB = parseFloat(b.price);

        if (sortByPrice === 'asc') {
            return priceA - priceB;
        } else if (sortByPrice === 'desc') {
            return priceB - priceA;
        }
        return 0;
    });

    const handleAccept = async (offerId,price,deliveryCost,vat,total) => {
        setShowPaymentForm(true);
        setSelectedOffer(offerId);
        setCheckoutPrice(price);
        setCheckoutDeliveryPrice(deliveryCost);
        setCheckoutVat(vat)
        setCheckoutTotal(total);

    }
    
    // Function to handle amount conversion based on seller's and buyer's preferred currencies
    const handleAmountConversion = (sellerPreferredCurrency, price) => {
        // Check if buyer's preferred currency is not provided
        if (!buyerPreferredCurrency) {
            // Convert and return the price with appropriate currency symbol
            if (sellerPreferredCurrency == "usd") {
                return `$${price}`;
            } else {
                return `€${price}`;
            }
        }

        // Check if seller's and buyer's preferred currencies are the same
        if (sellerPreferredCurrency === buyerPreferredCurrency) {
            // Return the price with appropriate currency symbol
            if (sellerPreferredCurrency == "usd" && buyerPreferredCurrency == "usd") {
                return `$${price}`;
            } else {
                return `€${price}`;
            }
        }

        // Check if conversion rates are available for EUR to USD and USD to EUR
        if (eurToUsd && usdToEur) {
            // Convert price from EUR to USD if buyer prefers USD and seller prefers EUR
            if (buyerPreferredCurrency == "usd" && sellerPreferredCurrency == "eur") {
                return `$${(price * eurToUsd).toFixed(0)}`;
            }

            // Convert price from USD to EUR if buyer prefers EUR and seller prefers USD
            if (buyerPreferredCurrency == "eur" && sellerPreferredCurrency == "usd") {
                return `€${(price * usdToEur).toFixed(0)}`;
            }
        }

        // If conversion rates are not available, display an error message and return the original price
        message.error("Can't convert currency at the moment, try again later");

        // Return the price with appropriate currency symbol based on seller's preferred currency
        if (sellerPreferredCurrency == "usd") {
            return `$${price}`;
        } else {
            return `€${price}`;
        }
    };


    /**
 * Calculate the total price based on the given inputs including price, delivery price, VAT, and commission.
 * 
 * @param {number} price - The base price of the product.
 * @param {number} deliveryPrice - The cost of delivery.
 * @param {number} vat - Value Added Tax (VAT) percentage.
 * @param {number} commissionPercentage - The percentage of the total price that the admin will take as commission.
 * @param {string} sellerPreferredCurrency - The preferred currency of the seller.
 * 
 * @return {number} - The total price after adding delivery price, applying VAT, and adding the commission.
 */
    const calculateTotalPrice = (price, deliveryPrice, vat, sellerPreferredCurrency) => {
        // Calculate total price by adding base price and delivery price
        let totalPrice = price + deliveryPrice;

        // Calculate VAT amount by multiplying the total price with VAT percentage
        const vatAmount = totalPrice * (vat / 100);

        // Add VAT amount to the total price
        totalPrice += vatAmount;

        // Calculate commission amount by multiplying the total price with commission percentage
        const commissionAmount = totalPrice * (commission / 100);

        // Calculate total price including VAT and commission (without adding commission)
        totalPrice += commissionAmount;
        totalPrice = totalPrice.toFixed(0);

        if (!buyerPreferredCurrency) {
            if (sellerPreferredCurrency == "usd") {
                return `$${totalPrice}`;
            } else {
                return `€${totalPrice}`;
            }
        }

        // Check if seller's and buyer's preferred currencies are the same
        if (sellerPreferredCurrency === buyerPreferredCurrency) {
            // Return the price with appropriate currency symbol
            if (sellerPreferredCurrency == "usd" && buyerPreferredCurrency == "usd") {
                return `$${totalPrice}`;
            } else {
                return `€${totalPrice}`;
            }
        }

        // Check if conversion rates are available for EUR to USD and USD to EUR
        if (eurToUsd && usdToEur) {
            // Convert price from EUR to USD if buyer prefers USD and seller prefers EUR
            if (buyerPreferredCurrency == "usd" && sellerPreferredCurrency == "eur") {
                return `$${(totalPrice * eurToUsd).toFixed(0)}`;
            }

            // Convert price from USD to EUR if buyer prefers EUR and seller prefers USD
            if (buyerPreferredCurrency == "eur" && sellerPreferredCurrency == "usd") {
                return `€${(totalPrice * usdToEur).toFixed(0)}`;
            }
        }

        // If conversion rates are not available, display an error message and return the original price
        message.error("Can't convert currency at the moment, try again later");


    };

    return (
        <>
            <Header />
            {
                showPaymentForm && clientSecret ? <Elements stripe={stripePromise} options={{ clientSecret, appearance: { theme: "flat", variables: { colorPrimary: "#F6BE00" } } }}>
                    <CheckoutForm total={checkoutTotal} vat={checkoutVat} commission={commission} price={checkoutPrice} deliveryPrice={checkoutDeliveryPrice} />
                </Elements> : <div className='p-20'>
                    <Spin spinning={isOffersSpinning}>
                        <div className="mb-4 flex items-center justify-between">
                            <h1 className="text-2xl font-semibold text-gray-800">Offers</h1>
                            <div className="mb-4 flex items-center space-x-2">
                                <span className="text-gray-600">Sort by Price:</span>
                                <button
                                    onClick={() => setSortByPrice('asc')}
                                    className={`px-2 py-1 rounded ${sortByPrice === 'asc' ? 'bg-blue-500 text-white' : 'hover:bg-gray-200'
                                        }`}
                                >
                                    Asc
                                </button>
                                <button
                                    onClick={() => setSortByPrice('desc')}
                                    className={`px-2 py-1 rounded ${sortByPrice === 'desc' ? 'bg-blue-500 text-white' : 'hover:bg-gray-200'
                                        }`}
                                >
                                    Desc
                                </button>
                                <button
                                    onClick={() => setSortByPrice(null)}
                                    className={`px-2 py-1 rounded ${sortByPrice === null ? 'bg-blue-500 text-white' : 'hover:bg-gray-200'
                                        }`}
                                >
                                    Clear
                                </button>
                            </div>
                        </div>
                        <div className='my-5'>
                            <Select placeholder="Select your preferred currency" value={buyerPreferredCurrency} onChange={(e) => setBuyerPreferredCurrency(e)} size='large'>
                                <Select.Option value="usd">USD ($)</Select.Option>
                                <Select.Option value="eur">EUR (€)</Select.Option>
                            </Select>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {sortedOffers.map((offer, index) => (
                                <div
                                    key={index}
                                    className={`bg-gray-100 p-6 space-y-4 rounded-lg shadow-lg ${offer.status === 'accepted' || offer.status === "completed" ? 'border-2 border-green-500' : ''
                                        }`}
                                >
                                    <h1 className='text-xl font-semibold mb-2 text-gray-900'>{offer.sellerInfo.firstname} {offer.sellerInfo.lastname}</h1>
                                    <div className='grid grid-cols-2 gap-2 mb-4'>
                                        <p className='text-sm text-gray-700 font-bold'><span className='font-semibold'>Price:</span>
                                            {handleAmountConversion(offer?.preferredCurrency, offer?.price)}
                                        </p>
                                        <p className='text-sm text-gray-700 font-bold'><span className='font-semibold'>Delivery Cost:</span>
                                            {handleAmountConversion(offer?.preferredCurrency, offer?.deliveryCost)}
                                        </p>
                                        <p className='text-sm text-gray-700 font-bold'><span className='font-semibold'>Vat:</span> %{offer.vat}</p>
                                        <p className='text-sm text-gray-700 font-bold'><span className='font-semibold'>Incoterms:</span> {offer.incoterms}</p>
                                        <p className='text-sm text-gray-700 font-bold'><span className='font-semibold'>Maglo Commision:</span>{commission}%</p>
                                        <p className='text-sm text-gray-700 font-bold'><span className='font-semibold'>Total:</span> {calculateTotalPrice(offer?.price, offer?.deliveryCost, offer.vat,offer?.preferredCurrency) }</p>
                                        <p className='text-sm text-gray-700 font-bold col-span-2'><span className='font-semibold'>Description:</span> {offer.description}</p>
                                    </div>
                                    {offer.status !== 'accepted' ? (
                                        <button
                                            disabled={isAccepted}
                                            onClick={() => handleAccept(offer?.offerId,handleAmountConversion(offer?.preferredCurrency, offer?.price),handleAmountConversion(offer?.preferredCurrency, offer?.deliveryCost),offer?.vat,calculateTotalPrice(offer?.price, offer?.deliveryCost, offer.vat,offer?.preferredCurrency))}
                                            className={`${isAccepted? "bg-gray-500 cursor-not-allowed" :"bg-blue-500 hover:bg-blue-700"} text-white font-semibold py-2 px-4 rounded-full focus:outline-none ${isAccepted ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                                        >
                                            {isAccepted ? 'An order has already been placed' : 'Place Order'}
                                        </button>
                                    ) : (
                                        <span className="text-green-600 font-semibold mt-4 block">
                                            {offer.status === "accepted" ? "Offer Accepted" : "Offer Completed"}
                                        </span>
                                    )}
                                </div>
                            ))}
                        </div>

                    </Spin>
                </div>
            }
        </>
    )
}

export default page