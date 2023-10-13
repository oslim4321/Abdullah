import { db } from './config/firebase'
import { stripe } from './lib/stripe'


export default async function handler(req, res) {

    if (!req.method == "POST") {
        return res.status(405).end();
    }

    const { offerId, buyerPreferredCurrency, conversionRate, enquiryId,commission } = req.body;
    
    if (!offerId || !conversionRate || !enquiryId || !commission) {
        return res.status(400).json({ error: "Missing parameters" })
    }

    const enquirySnapShot = await db.collection("enquiries").doc(enquiryId).get();

    const enquiry = enquirySnapShot.data();

    if (!enquiry) { return res.status(400).json({ error: "Enquiry not found" }) };

    const { offers } = enquiry;

    const offer = offers.find((o) => o.offerId === offerId);

    if (!offer) { return res.status(400).json({ error: "Offer not found" }) }

    let currency;
    let stripePrice;


    // Calculate total price by adding base price and delivery cost
    let totalPrice = offer?.price + offer?.deliveryCost;

    // Calculate VAT amount by multiplying the total price with VAT percentage
    const vatAmount = totalPrice * (offer?.vat / 100);

    // Add VAT amount to the total price
    totalPrice += vatAmount;

    // Calculate commission amount by multiplying the total price with commission percentage
    const commissionAmount = totalPrice * (commission / 100);

    // Calculate total price including VAT and commission (without adding commission)
    totalPrice += commissionAmount;
    totalPrice = totalPrice.toFixed(0);

    if (!buyerPreferredCurrency) {
        currency = offer?.preferredCurrency
        stripePrice = totalPrice
    }


    // Check if seller's and buyer's preferred currencies are the same
    if (offer?.preferredCurrency === buyerPreferredCurrency) {
        // Return the price with appropriate currency symbol
        if (offer?.preferredCurrency == "usd" && buyerPreferredCurrency == "usd") {
            currency = "usd"
            stripePrice = totalPrice
        } else {
            currency = "eur"
            stripePrice = totalPrice
        }
    }
    

    // Check if conversion rates are available for EUR to USD and USD to EUR
    if (conversionRate?.eurToUsd && conversionRate?.usdToEur) {
        // Convert price from EUR to USD if buyer prefers USD and seller prefers EUR
        if (buyerPreferredCurrency == "usd" && offer?.preferredCurrency == "eur") {
            stripePrice = (totalPrice * conversionRate?.eurToUsd).toFixed(0);
            currency = "usd";
        }

        // Convert price from USD to EUR if buyer prefers EUR and seller prefers USD
        if (buyerPreferredCurrency == "eur" && offer?.preferredCurrency == "usd") {
            stripePrice = (totalPrice * conversionRate?.usdToEur).toFixed(0);
            currency = "eur";
        }
    }
    

    const paymentIntent = await stripe.paymentIntents.create({
        amount: stripePrice * 100,
        currency: currency,
        automatic_payment_methods: {
            enabled: true,
        },
        metadata:{
            offerId,
            enquiryId
        }
    });

    res.status(200).json({ success: true, message: paymentIntent.client_secret })

}