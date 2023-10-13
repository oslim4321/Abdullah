import { NextApiRequest, NextApiResponse } from 'next';
import { stripe } from './lib/stripe';
import { updateOfferStatusInEnquiry } from './lib/offers';
import Stripe from 'stripe';

// Define a custom interface for the PaymentIntent metadata
interface CustomMetadata {
    offerId: string;
    enquiryId: string;
}

// Define an interface for the PaymentIntent object with custom metadata
interface PaymentIntentData extends Stripe.PaymentIntent {
    metadata: Stripe.Metadata & CustomMetadata;
}

/**
 * Buffer the request body data into a single Buffer.
 * 
 * @param {NextApiRequest} req - Next.js API request object.
 * @returns {Promise<Buffer>} - A Promise that resolves with a Buffer containing the raw request body data.
 * @throws {Error} - Throws an error if there is an issue reading the request data.
 */
const buffer = (req: NextApiRequest): Promise<Buffer> => {
    return new Promise((resolve, reject) => {
        const chunks: any[] = [];

        req.on('data', (chunk) => {
            chunks.push(chunk);
        });

        req.on('end', () => {
            resolve(Buffer.concat(chunks));
        });

        req.on('error', reject);
    });
};

/**
 * Handle Stripe webhook events.
 * 
 * @param {NextApiRequest} req - Next.js API request object.
 * @param {NextApiResponse} res - Next.js API response object.
 * @throws {Error} - Throws an error if there is an issue processing the webhook event.
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        // Buffer the raw request body
        const rawBody = await buffer(req);

        // Extract the Stripe signature from the request headers
        const signature = req.headers['stripe-signature'] as string;

        let event;

        try {
            // Verify the webhook signature and construct the event
            event = stripe.webhooks.constructEvent(rawBody, signature, "whsec_QoAJQsLeBxKiA0sy1JQwgGCxGGDjIsPz");
        } catch (error: any) {
            // Handle signature verification errors
            return res.status(400).json({ message: `Webhook Error: ${error.message}` });
        }

        // Extract metadata from the PaymentIntent
        const paymentIntentData: PaymentIntentData = event.data.object as PaymentIntentData;
        const { offerId, enquiryId } = paymentIntentData.metadata;

        if (event.type == "payment_intent.succeeded") {
            // If offerId and enquiryId are present in the metadata, update the offer status in the enquiry
            if (offerId && enquiryId) {
                await updateOfferStatusInEnquiry(enquiryId, offerId);
            }
        }

        // Send a success response to acknowledge receipt of the webhook event
        res.status(200).json({ success: true, message: "Webhook received" });
    } catch (error: any) {
        // Handle other errors that occur during webhook processing
        res.status(500).json({ error: 'Webhook handler failed' });
    }
};

// Configuration to disable the built-in Next.js body parsing middleware for custom body handling
export const config = {
    api: {
        bodyParser: false,
    },
};
