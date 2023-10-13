import {db} from '../config/firebase'

/**
 * Updates the status of an offer to 'accepted' and sets acceptedDate in an enquiry document based on paymentIntent metadata.
 *
 * @param {string} enquiryId - The ID of the enquiry document to be updated.
 * @param {string} offerId - The ID of the offer to be accepted.
 * @returns {Promise<void>} - A Promise that resolves when the offer status is updated successfully.
 * @throws {Error} - Throws an error if the enquiry or offer is not found, or if there is an error during the update process.
 */
export async function updateOfferStatusInEnquiry(enquiryId, offerId) {
    try {
        const enquiryRef = db.collection("enquiries").doc(enquiryId);
        const enquirySnapshot = await enquiryRef.get();

        if (!enquirySnapshot.exists) {
            throw new Error("Enquiry not found.");
        }

        const enquiryData = enquirySnapshot.data();
        const offers = enquiryData.offers || [];

        // Find the offer with the provided offerId.
        const updatedOffers = offers.map(offer => {
            if (offer.offerId === offerId) {
                // Update the status to 'accepted'.
                offer.status = 'accepted';

                // Set acceptedDate to the current timestamp (milliseconds since epoch).
                offer.acceptedDate = Date.now();
            }
            return offer;
        });

        // Update the 'offers' field in the Firestore document.
        await enquiryRef.update({ offers: updatedOffers });

        // Offer status updated successfully.
        return Promise.resolve();
    } catch (error) {
        // Handle errors and throw an error if the update fails.
        console.error("Error updating offer status:", error);
        throw new Error(error);
    }
}